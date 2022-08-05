<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/collection-kicker` block.
 *
 * @package gutenberg
 */

class Collection_Kicker extends PRC_Block_Library {
	public static $version = '1.0.0';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'prc_do_collection_kicker', array( $this, 'do_collection_kicker' ), 10, 1 );
		}
	}

	public function do_collection_kicker($post_id = null) {
		if ( null === $post_id ) {
			return;
		}
		// get the collection term by the post id
		$terms = get_the_terms( $post_id, 'collection' );
		if ( false === $terms || empty( $terms ) ) {
			return;
		}
		// get the first term in the list and pop it off the array for use.
		$term = array_shift( $terms );
		if ( false === $term || empty( $term ) ) {
			return;
		}
		// get the collection term id
		$term_id = $term->term_id;
		$parsed = new WP_Block_Parser_Block(
			'prc-block/collection-kicker',
			array(
				'termId' => $term_id
			),
			array(),
			'',
			'',
		);
		echo wp_kses( render_block( (array) $parsed ), 'post' );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$term_id = array_key_exists('termId', $attributes) ? $attributes['termId'] : false;

		if ( ! $term_id ) {
			return;
		}

		$term = get_term( $term_id, 'collection' );
		if ( empty( $term ) || is_wp_error($term) ) {
			return;
		}

		$term_name = $term->name;
		$term_link = get_term_link( $term_id, 'collection' );
		$kicker_bug_img_id = get_term_meta( $term_id, 'kicker', true );
		$kicker_bug_img_url = wp_get_attachment_image_url( $kicker_bug_img_id, 'full' );
		$kicker_text_color = get_term_meta( $term_id, 'kicker_text_color', true );

		$block_attrs = array();
		if ( false !== $kicker_text_color || '' !== $kicker_text_color ) {
			$block_attrs['style'] = 'color: ' . $kicker_text_color . ';';
		}

		// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
		// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L131 for how to use `$this->_get_block_wrapper_attributes()`
		$block_attrs = get_block_wrapper_attributes($block_attrs);

		$content = wp_sprintf(
			'<a href="%1$s">%2$s</a>',
			$term_link,
			$term_name
		);

		if ( $kicker_bug_img_url ) {
			$content = wp_sprintf(
				'<img src="%1$s" alt="%2$s" /> %3$s',
				$kicker_bug_img_url,
				$term_name,
				$content
			);
		}

		return wp_sprintf(
			'<div %1$s>%2$s <i class="ui icon caret right" style="margin-left: 5px"></i></div>',
			$block_attrs,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'collection-kicker',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/collection-kicker',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Collection_Kicker( true );
