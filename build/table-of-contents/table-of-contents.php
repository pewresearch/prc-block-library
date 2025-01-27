<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Table of Contents
 * Description:       Displays a list of all heading blocks set to chapter headings.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Table_Of_Contents {
	/**
	 * Constructor
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initializes the block.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * This function structures raw multiSectionReport and package_parts data.
	 * First it checks for if we have package parts or not. If not then it assumes this is a simple report and returns the chapters.
	 *
	 * @param int $parent_id The parent post id.
	 * @param int $current_post_id The current post id.
	 * @return array
	 */
	protected function parce_toc_items( $parent_id, $current_post_id ) {
		$package_parts        = get_post_meta( $parent_id, 'package_parts', true );
		$chapters             = get_post_meta( $parent_id, 'multiSectionReport', true );
		$chapters_not_in_part = array();
		// We need to get all the chapters by their postId value and put them in the parts on the items array if the existign parts items array of postIds contains the chapter postId.
		// If there are no package_parts, just return the chapters with their titles.
		$toc_items = array();
		if ( empty( $package_parts ) && ! empty( $chapters ) ) {
			$toc_items = array_map(
				function ( $chapter ) use ( $current_post_id ) {
					$chapter['label']     = html_entity_decode( get_the_title( $chapter['postId'] ) );
					$chapter['url']       = get_permalink( $chapter['postId'] );
					$chapter['is_active'] = $chapter['postId'] === $current_post_id;
					$chapter['sections']  = array();
					return $chapter;
				},
				$chapters
			);
		} elseif ( ! empty( $package_parts ) && ! empty( $chapters ) ) {
			// Start the toc_items array with the package_parts.
			// Add the selected chapters from part.items to part.chapters.
			$toc_items = array_map(
				function ( $part ) use ( $chapters ) {
					$part['sections'] = array();
					$part['chapters'] = array_values(
						array_filter(
							$chapters,
							function ( $chapter ) use ( $part ) {
								return array_key_exists( 'items', $part ) && in_array( $chapter['postId'], $part['items'] );
							}
						)
					);
					return $part;
				},
				$package_parts
			);
			// Add a label to each chapter in a part. Uses the postId of the chapter to get the title.
			$toc_items = array_map(
				function ( $part ) use ( $current_post_id ) {
					$part['chapters'] = array_map(
						function ( $chapter ) use ( $current_post_id ) {
							$chapter['label']     = html_entity_decode( get_the_title( $chapter['postId'] ) );
							$chapter['url']       = get_permalink( $chapter['postId'] );
							$chapter['is_active'] = $chapter['postId'] === $current_post_id;
							$chapter['sections']  = array();
							return $chapter;
						},
						$part['chapters']
					);
					return $part;
				},
				$toc_items
			);
			// Make the $parts add a 'url' property and make it point to the first chapter in the part.
			$toc_items = array_map(
				function ( $part ) {
					// Make the url point to the first chapter.
					$part['url'] = $part['chapters'][0]['url'];
					// This part is active if any of the chapters are active.
					$part['is_active'] = array_reduce(
						$part['chapters'],
						function ( $carry, $chapter ) {
							return $carry || $chapter['is_active'];
						},
						false
					);
					return $part;
				},
				$toc_items
			);

			// Now we need to find all the chapters that are "unattached" to a package part.
			$chapters_not_in_part = array_values(
				array_filter(
					$chapters,
					function ( $chapter ) use ( $toc_items ) {
							$chapter_in_part = array_reduce(
								$toc_items,
								function ( $carry, $part ) use ( $chapter ) {
									return $carry || in_array( $chapter['postId'], $part['items'] );
								},
								false
							);
							return ! $chapter_in_part;
					}
				)
			);
			// Remap the unattached chapter so each item matches the structure of the package parts (label, url, is_active, sections, items, chapters)...
			$chapters_not_in_part = array_map(
				function ( $chapter ) use ( $current_post_id ) {
					$chapter['key']       = 'unattachedPackagePart_' . $chapter['postId'];
					$chapter['label']     = html_entity_decode( get_the_title( $chapter['postId'] ) );
					$chapter['url']       = get_permalink( $chapter['postId'] );
					$chapter['is_active'] = $chapter['postId'] === $current_post_id;
					$chapter['sections']  = array();
					$chapter['items']     = array();
					$chapter['chapters']  = array();
					return $chapter;
				},
				$chapters_not_in_part
			);
		}

		// Finally, we always add the package root to the toc_items array.
		$package_root        = array(
			'key'       => 'unattachedPackagePart_' . $parent_id,
			'label'     => html_entity_decode( get_the_title( $parent_id ) ),
			'url'       => get_permalink( $parent_id ),
			'postId'    => $parent_id,
			'is_active' => $parent_id === $current_post_id,
			'items'     => array(),
			'chapters'  => array(),
			'sections'  => array(),
		);
		$unattached_chapters = array(
			$package_root,
			...$chapters_not_in_part,
		);
		// Sanity Check: Ensure our inputs are arrays.
		if ( ! is_array( $unattached_chapters ) ) {
			$unattached_chapters = array();
		}
		if ( ! is_array( $toc_items ) ) {
			$toc_items = array();
		}
		// Add unattached_chapters to the beginning of the toc_items array.
		$toc_items = array_merge( $unattached_chapters, $toc_items );
		// Reset the indexes of the array.
		$toc_items = array_values( $toc_items );

		return $toc_items;
	}

	protected function get_section_list_template( $list_item_classnames, $sections_source = 'chapter' ) {
		ob_start();
		?>
		<template data-wp-each--section="context.<?php echo $sections_source; ?>.sections">
			<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive" data-wp-watch--for-current-section="callbacks.watchForCurrentSection">
				<a data-wp-bind--href="context.section.url" data-wp-text="context.section.label" data-wp-on--click="callbacks.scrollSmoothly"></a>
			</li>
		</template>
		<?php
		return ob_get_clean();
	}

	protected function get_list_template( $attributes, $parts_enabled = false ) {
		$block_gap            = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );
		$color_supports       = new Additional_Color_Supports();
		$list_item_classnames = $color_supports->get_list_classnames(
			'wp-block-prc-block-table-of-contents',
			false,
			$attributes,
		);
		ob_start();
		if ( ! $parts_enabled ) {
			do_action( 'qm/debug', 'Standard TOC' );
			// If there are no parts then we're just going to display the chapters. So we're going to start the structure at `chapter`
			?>
			<template data-wp-each--chapter="state.items">
				<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive">
					<a data-wp-bind--href="context.chapter.url" data-wp-text="context.chapter.label"></a>
				<?php // Sections. ?>
					<ul class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasSections">
						<?php echo $this->get_section_list_template( $list_item_classnames ); ?>
					</ul>
				</li>
			</template>
			<?php
		} else {
			do_action( 'qm/debug', 'Parts TOC' );
			// This has parts, so we're going to start the structure at `part`
			?>
		<template data-wp-each--part="state.items">
			<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive">
				<a data-wp-bind--href="context.part.url" data-wp-text="context.part.label"></a>
			<?php // Top level sections. ?>
				<ul class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasListItems">
					<?php echo $this->get_section_list_template( $list_item_classnames, 'part' ); ?>
				</ul>
			<?php // Chapters. ?>
				<ul class="wp-block-prc-block-table-of-contents__list chapters" data-wp-hidden="callbacks.hasListItems">
					<template data-wp-each--chapter="context.part.chapters">
						<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive">
							<a data-wp-bind--href="context.chapter.url" data-wp-text="context.chapter.label"></a>
						<?php // Sections. ?>
							<ul class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasListItems">
								<?php echo $this->get_section_list_template( $list_item_classnames ); ?>
							</ul>
						</li>
					</template>
				</ul>
			</li>
		</template>
			<?php
		}
		$list_template = ob_get_clean();

		return wp_sprintf(
			'<ul class="wp-block-prc-block-table-of-contents__list" role="list" %1$s>%2$s</ul>',
			'style="--block-gap: ' . $block_gap . ';"',
			$list_template
		);
	}

	protected function get_heading_markup( $attributes ) {
		$heading_text = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : false;
		return wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-' . $attributes['headingTextColor'] . '-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-' . $attributes['headingBackgroundColor'] . '-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden'      => true === $attributes['hideHeading'],
				),
			),
			$heading_text,
		);
	}

	protected function get_dropdown_markup( $attributes ) {
		$heading_text = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : false;
		$plus_icon    = \PRC\Platform\Icons\render( 'light', 'plus' );
		$minus_icon   = \PRC\Platform\Icons\render( 'light', 'minus' );
		$icon_button  = wp_sprintf(
			'<button class="wp-block-prc-block-table-of-contents__dropdown-trigger"><span data-wp-bind--hidden="context.isDropdownOpen">%s</span><span data-wp-bind--hidden="!context.isDropdownOpen">%s</span></button>',
			$plus_icon,
			$minus_icon,
		);
		return wp_sprintf(
			'<div class="%1$s" data-wp-on--click="actions.onDropdownClick"><h2>%2$s</h2>%3$s</div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__dropdown__heading',
				array(
					'has-text-color' => $attributes['dropdownTextColor'],
					'has-' . $attributes['dropdownTextColor'] . '-color' => $attributes['dropdownTextColor'],
					'has-background' => $attributes['dropdownBackgroundColor'],
					'has-' . $attributes['dropdownBackgroundColor'] . '-background-color' => $attributes['dropdownBackgroundColor'],
				),
			),
			$heading_text,
			$icon_button,
		);
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id   = $block->context['postId'];
		$parent_id = wp_get_post_parent_id( $post_id );
		$parent_id = 0 === $parent_id ? $post_id : $parent_id;

		$items = $this->parce_toc_items( $parent_id, $post_id );

		$parts_enabled               = (bool) get_post_meta( $parent_id, 'package_parts__enabled', true );
		$parts_enabled               = (bool) ( $parts_enabled && ! empty( $items ) );
		$currently_active_part_label = '';
		if ( $parts_enabled && ! empty( $items ) ) {
			$currently_active_part = array_filter(
				$items,
				function ( $part ) use ( $post_id ) {
					return is_array( $part ) && $part['is_active'] && in_array( $post_id, array_column( $part['chapters'], 'postId' ) );
				}
			);
			if ( ! empty( $currently_active_part ) ) {
				$currently_active_part       = array_values( $currently_active_part );
				$currently_active_part       = array_shift( $currently_active_part );
				$currently_active_part_label = $currently_active_part['label'];
			}
		}

		wp_interactivity_state(
			'prc-block/table-of-contents',
			array(
				'postId'                      => $post_id,
				'parentId'                    => $parent_id,
				'partsEnabled'                => $parts_enabled,
				'currentlyActivePartLabel'    => $currently_active_part_label,
				'items'                       => $items,
				'enableWatchForSectionScroll' => false,
				'currentSection'              => null,
				'sectionsWatchList'           => array(),
			)
		);

		// Determine if this should be present in the "Dropdown" user interface or not.
		$default_to_dropdown = array_key_exists( 'className', $attributes ) && false !== strpos( $attributes['className'], 'is-style-dropdown' );
		$default_to_dropdown = 'mobile' === \PRC\Platform\get_current_device() ? true : $default_to_dropdown;
		// remove the is-style-dropdown class from the block attributes ???
		$attributes['className'] = array_key_exists( 'className', $attributes ) ? str_replace( 'is-style-dropdown', '', $attributes['className'] ) : '';

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class'                                    => \PRC\Platform\Block_Utils\classNames(
					array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
					'common-block-style--baseball-card',
					array(
						'has-text-color' => $attributes['textColor'],
						'has-' . $attributes['textColor'] . '-color' => $attributes['textColor'],
						'has-background' => $attributes['backgroundColor'],
						'has-' . $attributes['backgroundColor'] . '-background-color' => $attributes['backgroundColor'],
					),
				),
				'aria-role'                                => 'navigation',
				'data-wp-interactive'                      => 'prc-block/table-of-contents',
				'data-wp-context'                          => wp_json_encode(
					array(
						'isDropdown'              => $default_to_dropdown,
						'isDropdownOpen'          => false,
						'autoDropdownEnabled'     => $attributes['autoDropdownEnabled'],
						'autoDropdownWidth'       => $attributes['autoDropdownWidth'],
						'highlightCurrentSection' => $attributes['showCurrentChapter'],
					)
				),
				'data-wp-init--map-sections-to-chapters'   => 'callbacks.mapFoundSectionsToChapters',
				'data-wp-init--watch-for-section-scroll'   => 'callbacks.initWatchForSectionScroll',
				'data-wp-on-window--resize'                => 'callbacks.onResizeToggleDropdown',
				'data-wp-on-window--click'                 => 'callbacks.onWindowClickCloseDropdown',
				'data-wp-class--is-style-dropdown'         => 'context.isDropdown',
				'data-wp-bind--aria-expanded'              => 'context.isDropdownOpen',
				'data-wp-bind--data-auto-dropdown-enabled' => 'context.autoDropdownEnabled',
				'data-wp-bind--data-auto-dropdown-width'   => 'context.autoDropdownWidth',
			)
		);
		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$this->get_heading_markup( $attributes ) . $this->get_dropdown_markup( $attributes ),
			$this->get_list_template( $attributes, $parts_enabled ),
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/table-of-contents',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
