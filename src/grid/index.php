<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Grid_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/grid
	 * If there is only one row block then well treat that row block as the grid, otherwise (if there is more than one rwo) treat this as the grid and the rows as rows. 
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_grid( $attributes, $content, $block ) {
		$inner_blocks = $block->parsed_block['innerBlocks'];
		$count        = count( $inner_blocks );
		ob_start();
		if ( $count > 1 ) {
			$class_names = classNames(
				array(
					'ui',
					'grid',
				)
			);
			echo '<div class="' . esc_attr( $class_names ) . '">';
		}
		foreach ( $inner_blocks as $row_block ) {
			if ( $count > 1 ) {
				$row_block['attrs']['asRow'] = true;
			}
			echo render_block( $row_block );
		}
		if ( $count > 1 ) {
			echo '</div>';
		}
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'grid',
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
			plugin_dir_path( __DIR__ ) . '/grid',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'editor_style'    => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_grid' ),
			)
		);
	}
}

new Grid_Block( true );
