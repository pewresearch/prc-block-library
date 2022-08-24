<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/collapsible` block.
 *
 * @package gutenberg
 */

class Collapsible extends PRC_Block_Library {
	public static $version = '2.0.0';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_collapsible_block( $attributes, $content, $block ) {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'frontend',
			'collapsible',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-collapsible__title">%2$s<div class="wp-block-prc-block-collapsible__icon"></div></div><div class="wp-block-prc-block-collapsible__content">%3$s</div></div>',
			get_block_wrapper_attributes(),
			array_key_exists( 'title', $attributes ) ? $attributes['title'] : 'How we did this',
			$content,
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$block = $enqueue->register(
			'blocks',
			'collapsible',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		// @TODO Perhaps view_script is not supported yet, maybe need to wait for 6.1 or Gutenberg 14.0
		// $view = $enqueue->register(
		// 	'frontend',
		// 	'collapsible',
		// 	array(
		// 		'js'        => true,
		// 		'css'       => false,
		// 		'js_dep'    => array(),
		// 		'css_dep'   => array(),
		// 		'in_footer' => true,
		// 		'media'     => 'all',
		// 	)
		// );

		$registered = register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/collapsible',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				// 'view_script'     => array_pop( $view['js'] )['handle'],
				'style'   		  => array_pop( $block['css'] )['handle'],
				'render_callback' => array( $this, 'render_collapsible_block' ),
			)
		);
		do_action('qm/debug', 'Collapsible' . print_r($registered, true));
	}
}

new Collapsible( true );
