<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Tabs_Pane extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-page
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_tab_pane( $attributes, $content, $block ) {
		$is_vertical        = $block->context['prc-block/tabs-vertical'];
		$style              = $block->context['prc-block/tabs-panes-style'];
		$controller_style   = $block->context['prc-block/tabs-style'];
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'     => classnames(
					'ui',
					array(
						'bottom attached' => ! $is_vertical && 'is-style-tabular' === $controller_style,
						'basic'           => 'is-style-not-bordered' === $style,
						'active'          => get_query_var( 'menuItem' ) === $attributes['uuid'],
					),
					'segment tab'
				),
				'data-uuid' => $attributes['uuid'],
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

	/**
	 * Register the prc-block/topic-index-condensed-page block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-pane',
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
			plugin_dir_path( __DIR__ ) . 'pane',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_tab_pane' ),
			)
		);
	}
}

new Tabs_Pane( true );
