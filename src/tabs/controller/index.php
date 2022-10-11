<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

/**
 * Tabs Block Controller Class
 *
 * @package
 */
class Tabs_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'menuItem';
		return $qvars;
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-controller
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_controller( $attributes, $content, $block ) {
		$this->enqueue_frontend();
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $attributes ) ),
				'class' => classnames( array(
					'is-vertical-tabs' => $attributes['vertical'],
					'is-horizontal-tabs' => ! $attributes['vertical'],
				) ),
			)
		);
		ob_start();
		?>
		<div <?php echo $wrapper_attributes; ?>>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'wp-dom-ready', 'wp-url' );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'tabs-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered    = $this->register_frontend();
		$script_handle = array_pop( $registered['js'] )['handle'];
		wp_localize_script( $script_handle, 'prcTopicIndexCondensed', array( 'active' => get_query_var( 'menuItem', false ) ) );
		wp_enqueue_script( $script_handle );
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-controller',
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
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )
				['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_controller' ),
			)
		);
	}
}

new Tabs_Controller( true );
