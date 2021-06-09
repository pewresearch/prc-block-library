<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\EnqueueNew;

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
		$dictionary       = array(
			0  => 'zero',
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
		$width            = $dictionary[ $attributes['width'] ];
		$is_row_stackable = $block->context['prc-block/row-stackable'];
		$desktop_width    = $width;
		$tablet_order     = 100 === $attributes['tabletOrder'] ? false : $dictionary[ $attributes['tabletOrder'] ];
		$tablet_width     = 100 === $attributes['tabletWidth'] ? $width : $dictionary[ $attributes['tabletWidth'] ];
		$mobile_width     = 100 === $attributes['mobileWidth'] ? $width : $dictionary[ $attributes['mobileWidth'] ];
		$mobile_order     = 100 === $attributes['mobileOrder'] ? false : $dictionary[ $attributes['mobileOrder'] ];

		$unstackable_classes = array(
			"mobile-order-{$mobile_order}"   => false !== $mobile_order && false === $is_row_stackable,
			"{$mobile_width} wide mobile"    => false === $is_row_stackable,
			"tablet-order-{$tablet_order}"   => false !== $tablet_order && false === $is_row_stackable,
			"{$tablet_width} wide tablet"    => false === $is_row_stackable,
			"{$desktop_width} wide computer" => false === $is_row_stackable,
		);

		$classes = array();
		if ( 'zero' !== $width && true === $is_row_stackable ) {
			$classes[] = "{$width} wide";
		} elseif ( 'zero' !== $width && false === $is_row_stackable ) {
			$classes = $unstackable_classes;
		}
		if ( array_key_exists( 'className', $attributes ) ) {
			$classes[] = $attributes['className'];
		}
		$classes[] = 'column';
		remove_filter( 'the_content', 'wpautop' );
		$column_content = apply_filters( 'the_content', $content );
		add_filter( 'the_content', 'wpautop' );
		ob_start();
		?>
		<div class="<?php echo esc_attr( classNames( $classes ) ); ?>">
			<?php echo apply_filters( 'prc_column_block_content', $column_content ); ?>
		</div>
		<?php
		$markup = ob_get_clean();
		
		return $markup;
	}

	/**
	 * Register the prc-block/column block.
	 *
	 * @uses render_column()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

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
