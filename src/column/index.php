<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Column_Block extends PRC_Block_Library {
	/**
	 * Constructor
	 *
	 * @param bool $init
	 * @return void
	 */
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Render callback for prc-block/column
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_column( $attributes, $content, $block ) {
		$dictionary = array(
			1  => 'one',
			2  => 'two',
			3  => 'three',
			4  => 'four',
			5  => 'five',
			6  => 'six',
			7  => 'seven',
			8  => 'eight',
			9  => 'nine',
			10 => 'ten',
			11 => 'eleven',
			12 => 'twelve',
			13 => 'thirteen',
			14 => 'fourteen',
			15 => 'fifteen',
			16 => 'sixteen',
		);
		$width      = $dictionary[ $attributes['width'] ];
		$classes    = array(
			'column',
		);
		if ( null !== $width ) {
			$classes[] = "{$width} wide";
		}
		ob_start();
		?>
		<div class="<?php echo esc_attr( classNames( $classes ) ); ?>">
			<?php print_r( $attributes ); ?>
			<?php echo wp_kses( $content, 'post' ); ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/column block.
	 *
	 * @uses render_column()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'column',
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
			plugin_dir_path( __DIR__ ) . '/column',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_column' ),
			)
		);
	}
}

new Column_Block( true );
