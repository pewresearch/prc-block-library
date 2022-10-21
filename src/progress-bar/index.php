<?php

// Require the composer autoload for getting conflict-free access to enqueue
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class PRC_Progress_Bar extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return null;
	}

	public function render_progress_bar( $attributes, $content = '' ) {
		if ( is_admin() ) {
			return $content;
		}

		$this->enqueue_frontend();

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               		=> md5( wp_json_encode( $attributes ) ),
				'data-max-width'   		=> $attributes['maxWidth'],
				'data-bar-color'   		=> $attributes['barColor'],
				'data-background-color' => $attributes['backgroundColor'],
				'data-max-value' 		=> $attributes['maxValue'],
				'data-current-value' 	=> $attributes['currentValue'],
				'data-axis-label' 		=> $attributes['axisLabel'],
				'data-axis-padding' 	=> $attributes['axisPadding'],
				'data-label-format' 	=> $attributes['labelFormat'],
				'data-label-position-dx' => $attributes['labelPositionDX'],
				'data-label-position-dy' => $attributes['labelPositionDY'],
				'data-show-axis-label' 	=> $attributes['showAxisLabel'],
				)
		);

		return wp_sprintf(
			'<div %1$s><div class="ui active centered inline loader"></div></div>',
			$wrapper_attributes
		);
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			'frontend',
			'progress-bar',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered = $this->register_frontend();
		wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
		return array_pop( $registered['js'] )['handle'];
	}

	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'progress-bar',
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
			plugin_dir_path( __DIR__ ) . '/progress-bar',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_progress_bar' ),
			)
		);
	}
}

new PRC_Progress_bar( true );
