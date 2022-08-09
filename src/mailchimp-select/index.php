<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/mailchimp-select` block.
 *
 * @package gutenberg
 */

class Mailchimp_Select extends PRC_Block_Library {
	public static $version = '1.0.2';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}
		$this->enqueue_frontend_assets();

		$block_attrs = get_block_wrapper_attributes(array(
			'data-interests' => implode( ',', $attributes['interests'] ),
		));

		return wp_sprintf(
			'<div %1$s></div>',
			$block_attrs,
		);
	}

	public function enqueue_frontend_assets() {
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'frontend',
			'mailchimp-select',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array('underscore'),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function register_block() {
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'mailchimp-select',
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
			plugin_dir_path( __DIR__ ) . '/mailchimp-select',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'editor_style'    => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Mailchimp_Select( true );
