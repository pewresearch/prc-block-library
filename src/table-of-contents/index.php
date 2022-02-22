<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
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

	public function recursively_search_for_chapters( $array ) {
		$key = 'blockName';
		$value = 'core/heading';
		$results = array();

		if ( is_array( $array ) ) {

			if ( isset( $array[ $key ] ) && $array[ $key ] == $value ) {
				if ( array_key_exists('isChapter', $array['attrs']) && true === $array['attrs']['isChapter'] ) {
					$results[] = $array;
				}
			}

			foreach ( $array as $subarray ) {
				$results = array_merge( $results, $this->recursively_search_for_chapters( $subarray, $key, $value ) );
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

	public function legacy_lookup() {
		// First see if there are any of the new blocks...
		// THen see if there are any prc block chapters in here and if so gather them up...
		// If not then fallback to dom lookup.
		// In either case we should update_post_meta($post_id, '_migration_flag_chapters', true);
		// Then we can run a report on each site to see what posts need updating... maybe even add a flag or red light in the admin area for posts that require gutenberg mirgation assistance.
	}

	public function construct_toc( $post_id, $content = null ) {
		// If this post doesn't have blocks OR if it specifically does not have heading blocks then we can't do anything so just return false.
		if ( !has_blocks( $post_id ) || !has_block( 'core/heading', $post_id ) ) {
			return false;
		}

		$chapters = array();

		if ( null !== $content ) {
			$blocks = parse_blocks($content);
		} else {
			$content = get_post_field( 'post_content', $post_id );
			$blocks = parse_blocks($content);
		}

		$chapter_blocks = $this->recursively_search_for_chapters( $blocks );

		foreach ( $chapter_blocks as $chapter ) {
			$attrs = $this->extract_html_attributes($chapter['innerHTML']);
			$chapters[] = array(
				'id' => $attrs['attributes']['id'],
				'icon' => !empty($chapter['attrs']['icon']) ? $chapter['attrs']['icon'] : false,
				'content' => wp_strip_all_tags( !empty($chapter['attrs']['altTocText']) ? $chapter['attrs']['altTocText'] : $chapter['innerHTML'] ),
			);
		}

		return $chapters;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];
		$chapters = $this->construct_toc( $post_id );

		ob_start();
		?>
		<ul>
		<?php foreach ( $chapters as $chapter ) {
			echo '<li><a href="#' . $chapter['id'] . '">' . $chapter['content'] . '</a></li>';
		} ?>
		</ul>
		<?php
		$content = ob_get_clean();

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
