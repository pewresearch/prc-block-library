<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Tabs_Menu_Item extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-menu-item
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_menu_item( $attributes, $content, $block ) {
		$is_accordion = array_key_exists( 'asAccordion', $attributes ) ? $attributes['asAccordion'] : false;

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'            => 'tab-' . $attributes['uuid'],
				'href'          => '#panel-' . $attributes['uuid'],
				'aria-controls' => 'panel-' . $attributes['uuid'],
				'aria-role'     => 'tab',
				'aria-selected' => 'false',
			)
		);

		ob_start();
		?>
		<a <?php echo $wrapper_attributes; ?>>
			<?php echo $is_accordion ? '<i class="dropdown icon"></i>' : null; ?>
			<?php echo wp_kses( $attributes['title'], 'post' ); ?>
		</a>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/topic-index-condensed-menu-item block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-menu-item',
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
			plugin_dir_path( __DIR__ ) . 'menu-item',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_menu_item' ),
			)
		);
	}
}

new Tabs_Menu_Item( true );
