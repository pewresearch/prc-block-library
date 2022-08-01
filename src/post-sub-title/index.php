<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Sub_Title_Block extends PRC_Block_Library {
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_post_sub_title( $attributes ) {
		$post_id = get_the_ID();
		if ( false === $post_id ) {
			return null;
		}
		$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
		$block_attrs = get_block_wrapper_attributes(array(
			'class' => 'has-text-align' . '-' . $text_align,
		));
		$sub_title = prc_get_subheadline( (int) $post_id );
		return wp_sprintf( '<h2 %1$s>%2$s</h2>', $block_attrs, $sub_title );
	}

	/**
	 * Register the sub title block.
	 *
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'post-sub-title',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_post_meta(
			'post',
			'sub_headline',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title that appears under the post title.',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/post-sub-title',
			array(
				'editor_script' => array_pop( $registered['js'] )['handle'],
				'style' 	   => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_post_sub_title' ),
			)
		);
	}
}

new Sub_Title_Block( true );
