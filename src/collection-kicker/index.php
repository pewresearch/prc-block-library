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
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$term_id = array_key_exists('termId', $attributes) ? $attributes['termId'] : false;
		$text_color = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : false;

		if ( ! $term_id ) {
			return;
		}

		$block_attrs = array();
		if ( $text_color ) {
			$block_attrs['style'] = 'color: ' . $text_color . ';';
		}

		// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
		// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L131 for how to use `$this->_get_block_wrapper_attributes()`
		$block_attrs = get_block_wrapper_attributes($block_attrs);


		$term = get_term( $term_id, 'collection' );
		$term_name = $term->name;
		$term_link = get_term_link( $term_id, 'collection' );
		$kicker_bug_img_id = get_term_meta( $term_id, 'kicker', true );
		$kicker_bug_img_url = wp_get_attachment_image_url( $kicker_bug_img_id, 'full' );

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
			'<div %1$s>%2$s <i class="ui icon caret right"></i></div>',
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
