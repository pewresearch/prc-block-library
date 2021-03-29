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
		if ( array_key_exists( 'active', $attributes ) && true === $attributes['active'] ) {
			$active = true;
		} else {
			$active = get_query_var( 'menuItem' ) === $attributes['uuid'];
		}
		$context          = wp_parse_args(
			$block->context,
			array(
				'prc-block/tabs-vertical'    => false,
				'prc-block/tabs-panes-style' => 'is-style-bordered',
				'prc-block/tabs-style'       => 'is-style-tabular',
			)
		);
		$is_accordion     = array_key_exists( 'asAccordion', $attributes ) ? $attributes['asAccordion'] : false;
		$is_vertical      = $context['prc-block/tabs-vertical'];
		$style            = $context['prc-block/tabs-panes-style'];
		$controller_style = $context['prc-block/tabs-style'];

		$classes = array(
			'ui',
			'bottom attached' => true !== $is_vertical && 'is-style-tabular' === $controller_style,
			'basic'           => 'is-style-not-bordered' === $style,
			'segment tab',
		);
		if ( true === $is_accordion ) {
			$classes = array( 'content' );
		}
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'     => classnames( $classes, array( 'active' => $active ) ),
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
