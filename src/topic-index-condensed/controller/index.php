<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Topic_Index_Condensed_Controller extends PRC_Block_Library {
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
	public function render_controller_placeholder( $attributes, $content, $block ) {
		$this->enqueue_frontend();
		ob_start();
		?>
		<div class="wp-block-prc-block-topic-index-condensed ui divided grid">
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'topic-index-condensed',
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
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-condensed-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . 'controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_controller_placeholder' ),
			)
		);
	}
}

new Topic_Index_Condensed_Controller( true );