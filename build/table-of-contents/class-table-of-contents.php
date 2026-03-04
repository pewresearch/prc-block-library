<?php
/**
 * Table of Contents Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Block_Type_Registry;

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
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initializes the block.
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_filter( 'allowed_block_types_all', $this, 'disable_other_toc_blocks', 10, 2 );
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Filter the allowed blocks in the editor.
	 *
	 * @hook allowed_block_types_all
	 *
	 * @internal
	 * @param array|bool $allowed_block_types Array of allowed block types or a boolean.
	 * @param object     $editor_context The editor context.
	 * @return array Array of allowed block types.
	 */
	public function disable_other_toc_blocks( $allowed_block_types, $editor_context ) {
		$registry         = WP_Block_Type_Registry::get_instance();
		$registerd_blocks = $registry->get_all_registered();
		$registerd_blocks = array_keys( $registerd_blocks );

		$blocks_to_remove = array(
			'core/table-of-contents',
			'yoast-seo/table-of-contents',
		);

		$allowed_block_types = array_diff( $registerd_blocks, $blocks_to_remove );
		$allowed_block_types = array_values( $allowed_block_types );

		return $allowed_block_types;
	}

	/**
	 * Returns the CSS styles for adding the plus/minus icon to any defined style of the details block.
	 *
	 * @param string $part_slug The slug of the part.
	 * @param string $icon The icon to use.
	 * @param string $library The library to use.
	 * @return string The CSS styles.
	 */
	public static function get_new_icon_styles( $part_slug, $icon = false, $library = 'solid' ) {
		$open_icon  = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-plus', 'black' );
		$close_icon = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-minus', 'black' );
		if ( $icon ) {
			$open_icon = \PRC\Platform\Icons\get_icon_as_data_uri( $library, $icon );
		}
		return wp_sprintf( '.wp-block-prc-block-table-of-contents details[part-slug="%1$s"] > summary:before { --icon: url(%2$s);} .wp-block-prc-block-table-of-contents details[part-slug="%1$s"][open] > summary:before { --icon: url(%3$s); }', $part_slug, $open_icon, $close_icon );
	}

	/**
	 * Register the block's style assets.
	 * This is for the front end.
	 *
	 * @hook init
	 */
	public function register_styles() {
		$style_buffer  = '';
		$style_buffer .= self::get_new_icon_styles( 'executive-summary', 'clipboard-list', 'regular' );
		$style_buffer .= self::get_new_icon_styles( 'i-religious-affiliation-and-religious-switching', 'person-walking-arrow-loop-left' );
		$style_buffer .= self::get_new_icon_styles( 'ii-religion-and-family-life', 'family-dress' );
		$style_buffer .= self::get_new_icon_styles( 'iii-religious-or-spiritual-beliefs-and-practices', 'person-praying' );
		$style_buffer .= self::get_new_icon_styles( 'iv-social-and-political-views', 'person-booth' );
		$style_buffer .= self::get_new_icon_styles( 'v-opinions-on-religions-place-in-society', 'hands-praying' );
		$style_buffer .= self::get_new_icon_styles( 'vi-demographics-of-u-s-religious-groups', 'user-plus' );
		register_block_style(
			'prc-block/table-of-contents',
			array(
				'name'         => 'rls-accordion',
				'label'        => 'RLS Accordion',
				'inline_style' => $style_buffer,
			)
		);
	}

	/**
	 * This function structures raw multiSectionReport and package_parts data.
	 * First it checks for if we have package parts or not. If not then it assumes this is a simple report and returns the chapters.
	 *
	 * @param int $parent_id The parent post id.
	 * @param int $current_post_id The current post id.
	 * @return array
	 */
	protected function parse_toc_items( $parent_id, $current_post_id ) {
		// Check cached items first.
		$cached_items = wp_cache_get( 'prc_toc', 'post_' . $current_post_id );
		// Always serve the freshest TOC items to logged in users. This also lets logged in users "reset" the cache by refreshing the page.
		if ( $cached_items && ! is_user_logged_in() ) {
			return $cached_items;
		}

		$package_parts        = get_post_meta( $parent_id, 'package_parts', true );
		$chapters             = get_post_meta( $parent_id, 'multiSectionReport', true );

		// Normalize chapters array structure.
		// WordPress's preview filter can mangle revisions_enabled meta, returning a single
		// chapter object {key, postId} instead of an array [{key, postId}].
		// Detect and fix this malformed structure.
		if ( is_array( $chapters ) && isset( $chapters['key'] ) && isset( $chapters['postId'] ) ) {
			$chapters = array( $chapters );
		}

		$chapters_not_in_part = array();
		// We need to get all the chapters by their postId value and put them in the parts on the items array if the existign parts items array of postIds contains the chapter postId.
		// If there are no package_parts, just return the chapters with their titles.
		$toc_items = array();
		if ( empty( $package_parts ) && ! empty( $chapters ) ) {
			$toc_items = array_map(
				function ( $chapter ) use ( $current_post_id ) {
					if ( ! is_array( $chapter ) ) {
						return array(
							'label'     => '',
							'slug'      => '',
							'url'       => '',
							'is_active' => false,
							'sections'  => array(),
						);
					}
					$chapter['label']     = html_entity_decode( get_the_title( $chapter['postId'] ) );
					$chapter['slug']      = sanitize_title( $chapter['label'] );
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
							$chapter['slug']      = sanitize_title( $chapter['label'] );
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
					$part['url']  = $part['chapters'][0]['url'];
					$part['slug'] = sanitize_title( $part['label'] );
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
					$chapter['slug']      = sanitize_title( $chapter['label'] );
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
			'slug'      => sanitize_title( get_the_title( $parent_id ) ),
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

		// Cache the items for 1 hour.
		wp_cache_set( 'prc_toc', $toc_items, 'post_' . $current_post_id, 1 * HOUR_IN_SECONDS );

		return $toc_items;
	}

	/**
	 * Generate color styles using CSS custom properties.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Inline CSS string.
	 */
	private function generate_styles( array $attributes ): string {
		$hover_bg    = $attributes['customHoverBackgroundColor'] ?? '';
		$hover_text  = $attributes['customHoverTextColor'] ?? '';
		$active_bg   = $attributes['customActiveBackgroundColor'] ?? '';
		$active_text = $attributes['customActiveTextColor'] ?? '';
		$block_gap   = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$styles = array(
			'--hover-background-color'  => $hover_bg,
			'--hover-text-color'        => $hover_text,
			'--active-background-color' => $active_bg,
			'--active-text-color'       => $active_text,
			'--block-gap'               => $block_gap,
		);

		$style_string = array_map(
			static function ( string $key, string $value ): string {
				return ! empty( $value ) ? $key . ': ' . $value . ';' : '';
			},
			array_keys( $styles ),
			$styles
		);

		return implode( ' ', array_filter( $style_string ) );
	}

	/**
	 * Get the section list template
	 *
	 * @param string $sections_source Sections source.
	 * @return string
	 */
	protected function get_section_list_template( $sections_source = 'chapter' ) {
		ob_start();
		?>
		<template data-wp-each--section="context.<?php echo $sections_source; ?>.sections">
			<li class="wp-block-prc-block-table-of-contents__list-item" data-wp-class--is-active="state.isActive" data-wp-watch--for-current-section="callbacks.watchForCurrentSection">
				<a data-wp-bind--href="context.section.url" data-wp-text="context.section.label" data-wp-on--click="callbacks.scrollSmoothly"></a>
			</li>
		</template>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get the list template
	 *
	 * @param array $attributes Attributes.
	 * @param bool  $parts_enabled Parts enabled.
	 * @return string
	 */
	protected function get_list_template( $attributes, $parts_enabled = false ) {
		$block_gap            = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );
		$list_item_classnames = 'wp-block-prc-block-table-of-contents__list-item';
		ob_start();
		if ( ! $parts_enabled ) {
			// If there are no parts then we're just going to display the chapters. So we're going to start the structure at `chapter`
			?>
			<template data-wp-each--chapter="context.items">
				<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="state.isActive">
					<a data-wp-bind--href="context.chapter.url" data-wp-text="context.chapter.label"></a>
				<?php // Sections. ?>
					<ul class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasSections">
						<?php echo $this->get_section_list_template(); ?>
					</ul>
				</li>
			</template>
			<?php
		} else {
			// This has parts, so we're going to start the structure at `part`
			?>
		<template data-wp-each--part="context.items">
			<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="state.isActive">
				<a data-wp-bind--href="context.part.url" data-wp-text="context.part.label"></a>
			<?php // Top level sections. ?>
				<ol class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasListItems">
					<?php echo $this->get_section_list_template( 'part' ); ?>
				</ol>
			<?php // Chapters. ?>
				<ol class="wp-block-prc-block-table-of-contents__list chapters" data-wp-hidden="callbacks.hasListItems">
					<template data-wp-each--chapter="context.part.chapters">
						<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive">
							<a data-wp-bind--href="context.chapter.url" data-wp-text="context.chapter.label"></a>
						<?php // Sections. ?>
							<ol class="wp-block-prc-block-table-of-contents__list sections" data-wp-hidden="callbacks.hasListItems">
								<?php echo $this->get_section_list_template(); //phpcs:ignore ?>
							</ol>
						</li>
					</template>
				</ol>
			</li>
		</template>
			<?php
		}
		$list_template = ob_get_clean();

		return $list_template;
	}

	/**
	 * Get the accordion markup
	 *
	 * @deprecated 3.0.0 Accordion view has been removed in favor of the list view.
	 *
	 * @param array $attributes Attributes.
	 * @return string
	 */
	protected function get_accordion_markup( $attributes ) {
		$block_gap            = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );
		$list_item_classnames = 'wp-block-prc-block-table-of-contents__list-item';
		ob_start();
		?>
		<div style="--block-gap: <?php echo $block_gap; ?>;">
		<template data-wp-each--part="context.items">
			<details data-wp-bind--name="state.parentSlug" data-wp-bind--part-slug="context.part.slug">
				<summary>
					<span data-wp-text="context.part.label"></span>
				</summary>
				<ol class="wp-block-prc-block-table-of-contents__list chapters" data-wp-hidden="callbacks.hasListItems">
					<template data-wp-each--chapter="context.part.chapters">
						<li class="<?php echo $list_item_classnames; ?>" data-wp-class--is-active="callbacks.isActive">
							<a data-wp-bind--href="context.chapter.url" data-wp-text="context.chapter.label"></a>
						</li>
					</template>
				</ol>
			</details>
		</template>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Render the block callback
	 *
	 * @param array    $attributes Attributes.
	 * @param string   $content Content.
	 * @param WP_Block $block Block.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$post_id    = $block->context['postId'];
		$parent_id  = wp_get_post_parent_id( $post_id );
		$parent_id  = 0 === $parent_id ? $post_id : $parent_id;
		$attributes = \PRC\Platform\Block_Utils\get_block_attributes( 'prc-block/table-of-contents', $attributes );

		$items = $this->parse_toc_items( $parent_id, $post_id );

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
				'parentSlug'                  => sanitize_title( get_the_title( $parent_id ) ) . '_package',
				'partsEnabled'                => $parts_enabled,
				'currentlyActivePartLabel'    => $currently_active_part_label,
				'enableWatchForSectionScroll' => false,
				'currentSection'              => null,
				'sectionsWatchList'           => array(),
			)
		);

		$interactive_context = array(
			'items'                   => $items,
			'highlightCurrentSection' => $attributes['showCurrentChapter'],
		);

		$interior_content = $this->get_list_template( $attributes, $parts_enabled );
		if ( 'is-style-rls-accordion' === $attributes['className'] ) {
			$interior_content = $this->get_accordion_markup( $attributes );
		}

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class'                                  => \PRC\Platform\Block_Utils\classNames(
					array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
					array(
						'has-text-color' => $attributes['textColor'],
						'has-' . $attributes['textColor'] . '-color' => $attributes['textColor'],
						'has-background' => $attributes['backgroundColor'],
						'has-' . $attributes['backgroundColor'] . '-background-color' => $attributes['backgroundColor'],
					),
					'wp-block-prc-block-table-of-contents__list',
				),
				'aria-role'                              => 'navigation',
				'data-wp-interactive'                    => 'prc-block/table-of-contents',
				'data-wp-context'                        => wp_json_encode(
					$interactive_context,
				),
				'data-wp-init--map-sections-to-chapters' => 'callbacks.mapFoundSectionsToChapters',
				'data-wp-init--watch-for-section-scroll' => 'callbacks.initWatchForSectionScroll',
				'data-wp-on-document--scroll'            => 'callbacks.watchForSectionScroll',
			)
		);

		$markup = wp_sprintf(
			'<ol %1$s>%2$s</ol>',
			$block_attrs,
			$interior_content,
		);

		// Use WP_HTML_Tag_Processor to append color styles to existing style attribute.
		$tag_processor = new \WP_HTML_Tag_Processor( $markup );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-prc-block-table-of-contents' ) ) ) {
			$style  = (string) $tag_processor->get_attribute( 'style' );
			$style .= ' ' . $this->generate_styles( $attributes );
			$tag_processor->set_attribute( 'style', $style );
		}

		return $tag_processor->get_updated_html();
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
		$this->register_styles();
	}
}
