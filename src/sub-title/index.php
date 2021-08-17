<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Sub_Title_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}
	
	/**
	 * Register the sub title block.
	 *
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps = array( 'react', 'react-dom', 'wp-element', 'wp-i18n', 'wp-polyfill', 'wp-block-editor' );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'sub-title',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
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
			plugin_dir_path( __DIR__ ) . '/sub-title',
			array(
				'editor_script' => array_pop( $registered['js'] )['handle'],
			)
		);
	}
}

new Sub_Title_Block( true );
