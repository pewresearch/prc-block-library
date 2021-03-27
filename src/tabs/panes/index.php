<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Tabs_Panes extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-pages
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_tabs_panes( $attributes, $content, $block ) {
		// if is vertical then wrap in div and class column twelve wide
		$is_vertical        = array_key_exists( 'prc-block/tabs-vertical', $block->context ) ? $block->context['prc-block/tabs-vertical'] : false;
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => 'column twelve wide',
			)
		);
		ob_start();
		?>
		<?php echo $is_vertical ? '<div ' . $wrapper_attributes . '>' : null; ?>
		<?php echo wp_kses( $content, 'post' ); ?>
		<?php echo $is_vertical ? '</div> ' : null; ?>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/topic-index-condensed-menu block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-panes',
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
			plugin_dir_path( __DIR__ ) . 'panes',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_tabs_panes' ),
			)
		);
	}
}

new Tabs_Panes( true );
