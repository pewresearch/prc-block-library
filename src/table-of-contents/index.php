<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Exceptions\ChildNotFoundException;
use PHPHtmlParser\Exceptions\CircularException;
use PHPHtmlParser\Exceptions\CurlException;
use PHPHtmlParser\Exceptions\StrictException;
use PHPHtmlParser\Exceptions\NotLoadedException;

/**
 * Server-side rendering of the `prc-block/table-of-contents` block.
 *
 * @package gutenberg
 */

class Table_of_Contents extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
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
	public function prepare_chapter_blocks( $array) {
		$results = array();

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

		return $results;
	}

	/**
	 * This will only match h2 and h3 elements and assign them as chapters...
	 */
	public function prepare_legacy_headings($post_id, $content) {
		if ( has_blocks($content) ) {
			return false;
		}
		if ( !in_array( get_post_type($post_id), array( 'post', 'fact-sheets' ) ) ) {
			return false;
		}
		// First see if there are any of the new blocks...
		// THen see if there are any prc block chapters in here and if so gather them up...
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
		$chapters = array();

		// You can pass through any string and extract the table of contents from it.
		// If there is no content then we'll fallback to the give post id's content.
		if ( null === $content ) {
			$content = get_post_field( 'post_content', $post_id );
		}

		$legacy_chapters = $this->prepare_legacy_headings( $post_id, $content );
		if ( false !== $legacy_chapters ) {
			return $legacy_chapters;
		}

		// If this post doesn't have blocks OR if it specifically does not have heading blocks then we can't do anything so just return false.
		if ( !has_block( 'core/heading', $content ) && !has_block( 'prc-block/chapter', $content ) ) {
			return false;
		}
		$blocks = parse_blocks($content);
		return $this->prepare_chapter_blocks( $blocks );
	}

	public function get_list_items($chapters = false) {
		if ( false === $chapters || !is_array($chapters) || empty( $chapters ) ) {
			return false;
		}
		ob_start();
		?>
		<?php foreach ( $chapters as $chapter ) {
			echo '<a role="listitem" class="item" href="#' . $chapter['id'] . '">' . $chapter['content'] . '</a>';
		} ?>
		<?php
		return ob_get_clean();
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];
		$mobile_threshold = $block->context['core/group/mobileAttachThreshold'];
		$chapters = $this->construct_toc( $post_id );

		// If this is a multisection report then we'll wrap the TOC with the multi section report list.
		$content = wp_sprintf(
			'<div role="list" class="ui link selection list">%s</div>',
			apply_filters( 'prc-block/table-of-contents', $this->get_list_items( $chapters ), $post_id )
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes(array(
				'data-mobile-threshold' => $mobile_threshold,
			)),
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'table-of-contents',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/table-of-contents',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Table_of_Contents( true );
