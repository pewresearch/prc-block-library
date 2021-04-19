<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Row_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/row
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_row( $attributes, $content, $block ) {
		$as_row      = array_key_exists( 'asRow', $attributes ) ? $attributes['asRow'] : false;
		$row_classes = array(
			'ui',
			'equal width' => $attributes['equal'],
			'divided'     => $attributes['divided'],
			'stackable'   => array_key_exists( 'stackable', $attributes ) ? $attributes['stackable'] : false,
			'grid'        => ! $as_row,
			'row'         => $as_row,
		);
		ob_start();
		?>
		<div class="<?php echo esc_attr( classNames( $row_classes ) ); ?>">
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/row block.
	 *
	 * @uses render_row()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'row',
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
			plugin_dir_path( __DIR__ ) . '/row',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_row' ),
			)
		);
	}
}

new Row_Block( true );
