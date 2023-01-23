<?php
/**
 * Block Name:        Table of Contents
 * Description:       Displays a list of all heading blocks set to chapter headings.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

require_once PRC_VENDOR_DIR . '/autoload.php';
use PHPHtmlParser\Dom;

class TableOfContents extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'block_init' ) );
			add_filter( 'prc_the_content_raw', array( $this, 'handle_legacy_content' ), 1, 1 );
			add_filter( 'prc_get_chapters', array($this, 'construct_toc'), 10, 2 );
		}
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

	/**
	 * Will recrusively build the table of contents through navigating all blocks and grabbing core/heading and prc-block/chapter
	 * @param mixed $array
	 * @return array
	 */
	public function prepare_chapter_blocks( $array, $post_id = false ) {
		$results = array();

		$needs_migration = false;

		if ( is_array( $array ) ) {
			// We get the first level of the array first, then sub levels...
			if ( isset( $array[ 'blockName' ] ) && in_array($array[ 'blockName' ], array('core/heading', 'prc-block/chapter')) ) {
				if ( array_key_exists('isChapter', $array['attrs']) && true === $array['attrs']['isChapter'] ) {
					$attrs = $this->extract_html_attributes($array['innerHTML']);
					$results[] = array(
						'id' => $attrs['attributes']['id'],
						'icon' => !empty($array['attrs']['icon']) ? $array['attrs']['icon'] : false,
						'content' => wp_strip_all_tags( !empty($array['attrs']['altTocText']) ? $array['attrs']['altTocText'] : $array['innerHTML'] ),
					);
				} elseif ( 'prc-block/chapter' === $array['blockName'] ) {
					$needs_migration = true;
					$results[] = array(
						'id' => $array['attrs']['id'],
						'icon' => false,
						'content' => wp_strip_all_tags( $array['attrs']['value'] ),
					);
				}
			}

			foreach ( $array as $subarray ) {
				$results = array_merge( $results, $this->prepare_chapter_blocks( $subarray ) );
			}
		}

		if ( $needs_migration && false !== $post_id ) {
			update_post_meta($post_id, '_migration_flag_chapters', true);
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
		if ( !in_array( get_post_type($post_id), array( 'post', 'fact-sheets' ) ) ) {
			return false;
		}

		// First see if there are any of the new blocks...
		// If not then fallback to dom lookup.
		// In either case we should update_post_meta($post_id, '_migration_flag_chapters', true);
		// Then we can run a report on each site to see what posts need updating... maybe even add a flag or red light in the admin area for posts that require gutenberg mirgation assistance.

		$dom = new Dom();
		$dom->load(
			$content,
			array(
				'whitespaceTextNode' => true,
				'preserveLineBreaks' => true,
			)
		);

		$chapters = array();
		$headers = $dom->find( 'h2,h3' );

		foreach ( $headers as $elm ) {
			// If a heading element has a class of no-toc then skip it.
			if ( $elm->getAttribute( 'no-toc' ) ) {
				return;
			}

			$id = sanitize_title( $elm->text );

			$text = $elm->text;
			if ( ! empty( $alt_text = $elm->getAttribute( 'toc-title' ) ) ) {
				$text = $alt_text;
			}

			$chapters[] = array(
				'id'  => $id,
				'icon' => false,
				'content' => $text,
			);
		}

		if ( ! empty( $chapters ) ) {
			update_post_meta($post_id, '_migration_flag_chapters', true);
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
			$dom = new Dom();
			$dom->load(
				$content,
				array(
					'whitespaceTextNode' => true,
					'preserveLineBreaks' => true,
				)
			);

			$headers = $dom->find( 'h2,h3' );

			foreach ( $headers as $elm ) {
				// If a heading element has a class of no-toc then skip it.
				if ( $elm->getAttribute( 'no-toc' ) ) {
					return;
				}

				$id = sanitize_title( $elm->text );
				$elm->setAttribute( 'id', $id );
			}

			$content = $dom;
		}

		return $content;
	}

	public function construct_toc( $post_id, $content = null ) {
		// You can pass through any string and extract the table of contents from it.
		// If there is no content then we'll fallback to the give post id's content.
		if ( null === $content ) {
			$content = get_post_field( 'post_content', $post_id );
		}

		$legacy_chapters = $this->prepare_legacy_headings( $content, $post_id );
		if ( false !== $legacy_chapters ) {
			return $legacy_chapters;
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
			$icon = !empty($chapter['icon']) ? $chapter['icon'] : false;
			$icon_src = wp_get_attachment_image_src( $icon, 'full' );
			$extra = '';
			if ( $icon_src ) {
				$extra = "data-icon-src='{$icon_src[0]}'";
			}
			echo '<a role="listitem" class="item" href="#' . $chapter['id'] . '"'.$extra.'>' . $chapter['content'] . '</a>';
		} ?>
		<?php
		return ob_get_clean();
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];
		$group_is_sticky = array_key_exists('core/group/isSticky', $block->context) ? $block->context['core/group/isSticky'] : false;
		$mobile_threshold = array_key_exists('core/group/responsiveThreshold', $block->context) ? $block->context['core/group/responsiveThreshold'] : false;
		$chapters = $this->construct_toc( $post_id );
		$content = apply_filters( 'prc-block/table-of-contents', $this->get_list_items( $chapters ), $post_id );

		if ( empty($content) ) {
			return;
		}

		$block_attrs = array();

		if ( false !== $mobile_threshold && !empty($mobile_threshold) ) {
			$block_attrs['data-mobile-threshold'] = $mobile_threshold;
		}

		if ( array_key_exists('showCurrentChapter', $attributes) && $attributes['showCurrentChapter'] ) {
			$block_attrs['data-show-current-chapter'] = true;
		}

		if ( false !== $group_is_sticky && !empty($group_is_sticky) ) {
			$block_attrs['data-is-sticky'] = true;
		}

		$block_attrs = get_block_wrapper_attributes($block_attrs);

		// If this is a multisection report then we'll wrap the TOC with the multi section report list.
		$content = wp_sprintf(
			'<div role="list" class="ui link selection list">%s</div>',
			$content
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
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

new TableOfContents(true);
