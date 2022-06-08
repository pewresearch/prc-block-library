<?php

// Require the composer autoload for getting conflict-free access to enqueue
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class PRC_Chart_Builder extends PRC_Block_Library {

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

	public function render_chart_builder( $attributes, $content = '', $block ) {
		if ( is_admin() ) {
			return $content;
		}
		$script_handle = $this->enqueue_frontend();
		$attrs         = wp_json_encode( $block->attributes );
		$id            = array_key_exists('id', $attributes) ? $attributes['id'] : false;
		if ( false === $id ) {
			new WP_Error( 'missing_id', __( 'Chart Block is missing ID', 'prc-block-library' ) );
			return;
		}
		$post_id 	   = get_the_ID();
		wp_add_inline_script($script_handle, "if ( !window.chartConfigs ) {window.chartConfigs = {};} chartConfigs['".$id."'] = " . $attrs . ";");

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'wp-chart-builder-inner',
				'data-chart-hash' => $id,
				'data-chart-orientation' => $block->attributes['chartOrientation'],
				'data-width' => $this->cherry_pick_attr( 'width', $attributes ),
				'data-height' => $this->cherry_pick_attr( 'height', $attributes ),
				'data-padding-top' => $this->cherry_pick_attr( 'paddingTop', $attributes ),
				'data-padding-left' => $this->cherry_pick_attr( 'paddingLeft', $attributes ),
				'data-padding-bottom' => $this->cherry_pick_attr( 'paddingBottom', $attributes ),
				'data-padding-right' => $this->cherry_pick_attr( 'paddingRight', $attributes ),
				'data-x-label' => $this->cherry_pick_attr( 'xLabel', $attributes ),
				'data-x-min-domain' => $this->cherry_pick_attr( 'xMinDomain', $attributes ),
				'data-x-max-domain' => $this->cherry_pick_attr( 'xMaxDomain', $attributes ),
				'data-y-min-domain' => $this->cherry_pick_attr( 'yMinDomain', $attributes ),
				'data-y-max-domain' => $this->cherry_pick_attr( 'yMaxDomain', $attributes ),
				'data-colors' => $this->cherry_pick_attr( 'colorValue', $attributes ),
				'data-post-id' => $post_id,
				'data-post-url' => get_permalink( $post_id ),
				'data-iframe-height' => null,
			)
		);

		ob_start();
		?>
		<div <?php echo $block_attrs;?>>
			<div class="ui active centered inline loader"></div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.2', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			'frontend',
			'chart-builder',
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
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.2', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'chart-builder',
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
			plugin_dir_path( __DIR__ ) . '/chart-builder',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_chart_builder' ),
			)
		);
	}
}

new PRC_Chart_Builder( true );
