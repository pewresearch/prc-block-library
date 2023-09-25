<?php
namespace PRC\Platform\Blocks;
use WP_Error;
use WP_HTML_Heading_Processor;
/**
 * Block Name:        Table of Contents
 * Description:       Displays a list of all heading blocks set to chapter headings.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Table_Of_Contents {
	public static $dir = __DIR__;

	public function __construct( $plugin_version ) {
		require_once self::$dir . '/class-wp-html-heading-processor.php';
	}

	// Cribbed from https://codepad.co/snippet/extract-html-attributes-with-regex-in-php
	public function extract_html_attributes($input) {
		if( ! preg_match('#^(<)([a-z0-9\-._:]+)((\s)+(.*?))?((>)([\s\S]*?)((<)\/\2(>))|(\s)*\/?(>))$#im', $input, $matches)) return false;
		$matches[5] = preg_replace('#(^|(\s)+)([a-z0-9\-]+)(=)(")(")#i', '$1$2$3$4$5<attr:value>$6', $matches[5]);
		$results = array(
			'element' => $matches[2],
			'attributes' => null,
			'content' => isset($matches[8]) && $matches[9] == '</' . $matches[2] . '>' ? $matches[8] : null
		);
		if(preg_match_all('#([a-z0-9\-]+)((=)(")(.*?)("))?(?:(\s)|$)#i', $matches[5], $attrs)) {
			$results['attributes'] = array();
			foreach($attrs[1] as $i => $attr) {
				$results['attributes'][$attr] = isset($attrs[5][$i]) && ! empty($attrs[5][$i]) ? ($attrs[5][$i] != '<attr:value>' ? $attrs[5][$i] : "") : $attr;
			}
		}
		return $results;
	}

	public function convert_number_to_words($num) {
		if (!is_int($num)) {
		  return new WP_Error('invalid_input', 'Input must be an integer.');
		}

		$ones = array(
		  0 => 'zero', 1 => 'one', 2 => 'two', 3 => 'three', 4 => 'four',
		  5 => 'five', 6 => 'six', 7 => 'seven', 8 => 'eight', 9 => 'nine'
		);
		$tens = array(
		  0 => '', 1 => 'ten', 2 => 'twenty', 3 => 'thirty', 4 => 'forty',
		  5 => 'fifty', 6 => 'sixty', 7 => 'seventy', 8 => 'eighty', 9 => 'ninety'
		);
		$hundreds = array(
		  'hundred', 'thousand'
		);

		if ($num < 0 || $num >= 1000) {
		  return new WP_Error('out_of_range', 'Input must be between 0 and 999.');
		}

		if ($num == 0) {
		  return esc_html($ones[0]);
		}

		$result = '';
		$hundred = (int) ($num / 100);
		$ten = (int) ($num / 10) % 10;
		$one = $num % 10;

		if ($hundred > 0) {
		  $result .= $ones[$hundred] . ' ' . $hundreds[0];
		}

		if ($ten > 0 || $one > 0) {
		  if (!empty($result)) {
			$result .= ' ';
		  }

		  if ($ten < 2) {
			$result .= $ones[$ten * 10 + $one];
		  } else {
			$result .= $tens[$ten];
			if ($one > 0) {
			  $result .= '-' . $ones[$one];
			}
		  }
		}

		return esc_html($result);
	}

	/**
	 * Will recrusively build the table of contents through navigating all blocks and grabbing core/heading and prc-block/chapter
	 * @param mixed $array
	 * @return array
	 */
	public function prepare_chapter_blocks( $array, $post_id = false ) {
		$results = array();

		$needs_migration = false;

		if ( is_array( $array ) ) {
			$block_name = array_key_exists('blockName', $array) ? $array['blockName'] : false;
			// We get the first level of the array first, then sub levels...
			if ( in_array($block_name, array('core/heading', 'prc-block/chapter')) ) {
				if ( array_key_exists('isChapter', $array['attrs']) && true === $array['attrs']['isChapter'] ) {
					$level = $array['attrs']['level'];

					$tags = new WP_HTML_Heading_Processor($array['innerHTML']);
					$tags->next_tag('H'.$level);
					$id = $tags->get_attribute('id');

					// Check if the heading has a number in it and if so then we'll convert it to words and remove the h-. Otherwise just ensure h- is removed.
					if ( preg_match( '/^h-(\d+)-/', $id, $matches ) ) {
						$number = $matches[1];
						$number = intval( $number );
						$number = $this->convert_number_to_words( $level );
						if ( is_wp_error( $number ) ) {
							$id = preg_replace( '/^h-(\d+)-/', '', $id );
						} else {
							$id = preg_replace( '/^h-(\d+)-/', $number . '-', $id );
						}
					} else {
						$id = preg_replace( '/^h-/', '', $id );
					}

					$results[] = array(
						'id' => $id,
						'content' => wp_strip_all_tags( !empty($array['attrs']['altTocText']) ? $array['attrs']['altTocText'] : $array['innerHTML'] ),
					);
				} elseif ( 'prc-block/chapter' === $array['blockName'] ) {
					$needs_migration = true;
					$id = $array['attrs']['id'];
					// Ensure the ID is clean and none of the core/heading block id stuff gets added.
					if ( preg_match( '/^h-\d+/', $id ) ) {
						$id = preg_replace( '/^h-\d+-/', '', $id );
					} elseif ( preg_match( '/^h-/', $id ) ) {
						$id = preg_replace( '/^h-/', '', $id );
					}
					$results[] = array(
						'id' => $id,
						'content' => wp_strip_all_tags( $array['attrs']['value'] ),
					);
				}
			}

			foreach ( $array as $subarray ) {
				$results = array_merge( $results, $this->prepare_chapter_blocks( $subarray ) );
			}
		}

		if ( $needs_migration && false !== $post_id ) {
			update_post_meta($post_id, '_migration_legacy_prc_block_chapter_detected', true);
		}

		return $results;
	}

	/**
	 * This will only match h2 and h3 elements and assign them as chapters...
	 */
	public function prepare_legacy_headings($content, $post_id) {
		if ( has_blocks($content) ) {
			return false;
		}
		if ( !in_array( get_post_type($post_id), array( 'post', 'fact-sheets', 'fact-sheet' ) ) ) {
			return false;
		}

		$chapters = parse_document_for_headings($content);

		if ( ! empty( $chapters ) ) {
			update_post_meta($post_id, '_migration_legacy_headings_detected', true);
		}

		return $chapters;
	}

	public function handle_legacy_content( $content ) {
		// If we have blocks immediately return $content.
		if ( has_blocks( $content ) ) {
			return $content;
		}

		// If this is in an authorized post type then find h2,h3 and set id's accordingly.
		if ( in_array( get_post_type(), array( 'post', 'fact-sheets' ) ) ) {
			$content = update_document_headings_with_ids( $content );
		}

		return $content;
	}

	public function construct_toc( $post_id, $content = null ) {
		// You can pass through any string and extract the table of contents from it.
		// If there is no content then we'll fallback to the give post id's content.
		if ( null === $content ) {
			$content = get_post_field( 'post_content', $post_id );
		}

		if ( !has_blocks($content) ) {
			$legacy_chapters = $this->prepare_legacy_headings( $content, $post_id );
			if ( false !== $legacy_chapters ) {
				return $legacy_chapters;
			}
		}

		// If this post doesn't have blocks OR if it specifically does not have heading blocks then we can't do anything so just return false.
		if ( !has_block( 'core/heading', $content ) && !has_block( 'prc-block/chapter', $content ) ) {
			return false;
		}

		$blocks = parse_blocks($content);

		return $this->prepare_chapter_blocks( $blocks, $post_id );
	}

	public function get_list_items($chapters = false) {
		if ( false === $chapters || !is_array($chapters) || empty( $chapters ) ) {
			return false;
		}
		ob_start();
		?>
		<?php foreach ( $chapters as $chapter ) {
			$link = '#' . $chapter['id'];
			echo '<li><a role="listitem" class="item" href="' . $link . '">' . $chapter['content'] . '</a></li>';
		} ?>
		<?php
		return ob_get_clean();
	}

	public function get_default_classnames() {

	}

	public function generate_heading_and_dropdown_styles() {
		if ( !function_exists('wp_get_global_settings') ) {
			return new WP_Error('missing_function', 'wp_get_global_settings() is missing');
		}

		$colors = \wp_get_global_settings();
		$colors = $colors['color']['palette']['theme'];

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-prc-block-table-of-contents:not(.is-style-dropdown) .wp-block-prc-block-table-of-contents__heading.has-heading-<?php echo $slug; ?>-color {
				color: var(--wp--preset--color--<?php echo $slug; ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.is-style-dropdown .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo $slug; ?>-color {
				color: var(--wp--preset--color--<?php echo $slug; ?>) !important;
			}
			.wp-block-prc-block-table-of-contents:not(.is-style-dropdown) .wp-block-prc-block-table-of-contents__heading.has-heading-<?php echo $slug; ?>-background-color {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.is-style-dropdown .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo $slug; ?>-background-color {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>) !important;
			}
			<?php
		}
		$styles = ob_get_clean();
		return $styles;
	}

	/**
	 * @hook enqueue_block_assets, enqueue_block_editor_assets
	 * @return void
	 */
	public function enqueue_custom_heading_and_dropdown_styles() {
		$styles = $this->generate_heading_and_dropdown_styles();
		if ( is_wp_error($styles) ) {
			return;
		}
		wp_add_inline_style( 'prc-block-table-of-contents-style', $styles );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$is_dropdown = array_key_exists('className', $attributes) && false !== strpos($attributes['className'], 'is-style-dropdown');
		$post_id = $block->context['postId'];

		$heading = array_key_exists('heading', $attributes) ? $attributes['heading'] : false;

		$chapters = $this->construct_toc( $post_id );

		$content = apply_filters( 'prc-block/table-of-contents', $this->get_list_items( $chapters ), $post_id );

		$block_attrs = array(
			'aria-is-expanded' => !$is_dropdown,
			'class' => classNames(
				$attributes['className'],
				array(
					'has-text-color' => $attributes['textColor'],
					'has-text-color-' . $attributes['textColor'] => $attributes['textColor'],
					'has-background' => $attributes['backgroundColor'],
					'has-background-color-' . $attributes['backgroundColor'] => $attributes['backgroundColor'],
				),
			),
		);

		if ( !$is_dropdown ) {
			$block_attrs['data-auto-dropdown-width'] = $attributes['autoDropdownWidth'];
		}

		if ( array_key_exists('showCurrentChapter', $attributes) && $attributes['showCurrentChapter'] ) {
			$block_attrs['data-show-current-chapter'] = true;
		}

		$block_attrs = get_block_wrapper_attributes($block_attrs);

		if ( empty($content) ) {
			$content = '<p>No chapters found.</p>';
		} else {
			$content = wp_sprintf(
				'<ul class="wp-block-prc-block-table-of-contents__list" role="list">%s</ul>',
				$content
			);
		}

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2>%3$s</div>',
			classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-heading-color' => $attributes['headingTextColor'],
					'has-heading-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
					'has-dropdown-color' => $attributes['dropdownTextColor'],
					'has-dropdown-'.$attributes['dropdownTextColor'].'-color' => $attributes['dropdownTextColor'],
					'has-heading-background' => $attributes['headingBackgroundColor'],
					'has-heading-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
					'has-dropdown-background' => $attributes['dropdownBackgroundColor'],
					'has-dropdown-'.$attributes['dropdownBackgroundColor'].'-background-color' => $attributes['dropdownBackgroundColor'],
					'is-hidden' => true === $attributes['hideHeading'],
				),
			),
			$heading,
			'<button class="wp-block-prc-block-table-of-contents__dropdown">+</button>',
		);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$heading,
			$content
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
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

