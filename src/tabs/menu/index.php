<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Tabs_Menu extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/topic-index-condensed-menu
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_menu( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes(array(
			'aria-role' => 'tablist',
		));
		ob_start();
		?>
		<ul <?php echo $wrapper_attributes; ?>>
			<?php
			$uuids = array_map(
				function( $item ) {
					return $item['attrs']['uuid'];
				},
				$block->parsed_block['innerBlocks']
			);
			foreach ( $block->parsed_block['innerBlocks'] as $i => $menu_item ) {
				if ( ! in_array( get_query_var( 'menuItem' ), $uuids ) && 0 === $i ) {
					$menu_item['attrs']['active'] = true;
				}
				echo '<li>' . render_block( $menu_item ) . '</li>';
			}
			?>
		</ul>
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
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'tabs-menu',
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
			plugin_dir_path( __DIR__ ) . 'menu',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_menu' ),
			)
		);
	}
}

new Tabs_Menu( true );
