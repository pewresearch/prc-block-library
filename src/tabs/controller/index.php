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

	public function mobile_accordion( $block ) {
		// We're going to need to gather all the block innerblocks menu innerblocks up in an array and then add some attr like 'asAccordion = true`
		// Same for pane blocks.
		// When asAccordion = true in attributes the render on menu item and pane should reflect the accordion html https://semantic-ui.com/modules/accordion.html.
		// Here we will enclose with an accordion div.
		$root_inner_blocks = $block->parsed_block['innerBlocks'];
		$menu_block        = array_pop(
			array_filter(
				$root_inner_blocks,
				function( $block ) {
					return 'prc-block/tabs-menu' === $block['blockName'];
				}
			)
		);
		$panes_block       = array_pop(
			array_filter(
				$root_inner_blocks,
				function( $block ) {
					return 'prc-block/tabs-panes' === $block['blockName'];
				}
			)
		);
		$uuids             = array_map(
			function( $item ) {
				return $item['attrs']['uuid'];
			},
			$menu_block['innerBlocks']
		);

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $uuids ) ),
				'class' => classnames( 'ui basic styled accordion' ),
			)
		);

		ob_start();
		?>
		<div <?php echo $wrapper_attributes; ?>>
		<?php
		foreach ( $menu_block['innerBlocks'] as $i => $menu_item ) {
			$uuid                              = $menu_item['attrs']['uuid'];
			$menu_item['attrs']['asAccordion'] = true;

			$matched_pane = array_pop(
				array_filter(
					$panes_block['innerBlocks'],
					function( $pane ) use ( &$uuid ) {
						return $pane['attrs']['uuid'] === $uuid;
					}
				)
			);

			$matched_pane['attrs']['asAccordion'] = true;

			echo render_block( $menu_item );
			echo render_block( $matched_pane );
		}
		?>
		</div>
		<?php
		return ob_get_clean();
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
		if ( jetpack_is_mobile() ) {
			return $this->mobile_accordion( $block );
		}
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'    => md5( wp_json_encode( $attributes ) ),
				'class' => classnames( array( 'ui grid' => $attributes['vertical'] ) ),
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
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-controller',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
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
