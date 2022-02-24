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
			add_filter( 'prc_get_chapters', array($this, 'construct_toc'), 10, 2 );
		}
	}

	public function recursively_search_for_chapters( $array, $block_name = 'core/heading' ) {
		$search = $block_name;
		$results = array();

		if ( is_array( $array ) ) {

			if ( isset( $array[ 'blockName' ] ) && $array[ 'blockName' ] === $search ) {
				if ( array_key_exists('isChapter', $array['attrs']) && true === $array['attrs']['isChapter'] ) {
					$results[] = $array;
				} elseif ( 'prc-block/chapter' === $array['blockName'] ) {
					$results[] = $array;
				}
			}

			foreach ( $array as $subarray ) {
				$results = array_merge( $results, $this->recursively_search_for_chapters( $subarray, $search ) );
			}
		}

		return $results;
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
	 * This will only match h2 and h3 elements and assign them as chapters...
	 * @param mixed $content
	 * @return void|Dom
	 * @throws ChildNotFoundException
	 * @throws CircularException
	 * @throws CurlException
	 * @throws StrictException
	 * @throws NotLoadedException
	 */
	public function legacy_lookup($content) {
		if ( has_blocks($content) ) {
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
			// $elm->setAttribute( 'id', $id );
			// $elm->setAttribute( 'class', 'toc-chapter' . ' ' . $elm->getAttribute( 'class' ) );

			$text = $elm->text;
			if ( ! empty( $alt_text = $elm->getAttribute( 'toc-title' ) ) ) {
				$text = $alt_text;
			}

			$chapters[] = (object) array(
				'content' => $text,
				'id'  => $id,
				'icon' => false,
			);
		}

		return $chapters;
	}

	public function construct_toc( $post_id, $content = null ) {
		$chapters = array();

		// You can pass through any string and extract the table of contents from it.
		// If there is no content then we'll fallback to the give post id's content.
		if ( null === $content ) {
			$content = get_post_field( 'post_content', $post_id );
		}

		// If this post doesn't have blocks OR if it specifically does not have heading blocks then we can't do anything so just return false.
		if ( !has_block( 'core/heading', $content ) ) {
			return false;
		}

		$blocks = parse_blocks($content);
		$chapter_blocks = $this->recursively_search_for_chapters( $blocks, 'core/heading' );
		// $legacy_chapter_blocks = $this->recursively_search_for_chapters( $blocks, 'prc-block/chapter' );

		foreach ( $chapter_blocks as $chapter ) {
			$attrs = $this->extract_html_attributes($chapter['innerHTML']);
			$chapters[] = array(
				'id' => $attrs['attributes']['id'],
				'icon' => !empty($chapter['attrs']['icon']) ? $chapter['attrs']['icon'] : false,
				'content' => wp_strip_all_tags( !empty($chapter['attrs']['altTocText']) ? $chapter['attrs']['altTocText'] : $chapter['innerHTML'] ),
			);
		}

		// if ( $legacy_chapter_blocks ) {
		// 	foreach( $legacy_chapter_blocks as $chapter_block ) {
		// 		// Add ?
		// 	}
		// }

		return $chapters;
	}

	public function render_list($chapters = false) {
		if ( false === $chapters ) {
			return false;
		}
		// Enqueue mobile logic for the list...
		ob_start();
		?>
		<div role="list" class="ui link selection list">
		<?php foreach ( $chapters as $chapter ) {
			echo '<a role="listitem" class="item" href="#' . $chapter['id'] . '">' . $chapter['content'] . '</a>';
		} ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];
		$chapters = $this->construct_toc( $post_id );
		if ( empty($chapters) ) {
			return $post_id;
		}

		$content = $this->render_list( $chapters );

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes(),
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
