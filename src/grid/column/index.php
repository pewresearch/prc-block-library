<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/grid-column` block.
 *
 * @package gutenberg
 */

class Grid_Column extends PRC_Block_Library {
	public static $block_name = 'prc-block/grid-column';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Build an array with CSS classes defining the column's layout
	 * which will be applied to the column markup in the front-end.
	 *
	 * @param array $attributes Grid Column block attributes.
	 *
	 * @return array Grid CSS classes.
	 */
	public function build_column_layout( $attributes ) {
		$grid_defaults = array(
			"index"        => 0,
			"desktopSpan"  => 4,
			"tabletSpan"   => 4,
			"mobileSpan"   => 4,
			"desktopStart" => 1,
			"tabletStart"  => 1,
			"mobileStart"  => 1,
			"desktopRow"   => 1,
			"tabletRow"    => 1,
			"mobileRow"    => 1
		);
		$attrs = wp_parse_args( $attributes['gridLayout'], $grid_defaults );
		$index = $attrs['index'];

		$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

		// Build the CSS classes.
		return array(
			'are-vertically-aligned-' . $vertical_alignment,
			'column'.$index.'-desktop-grid__span-'.$attrs['desktopSpan'],
			// 'column'.$index.'-desktop-grid__start-'.$attrs['desktopStart'],
			// 'column'.$index.'-desktop-grid__row-'.$attrs['desktopRow'],
			'column'.$index.'-tablet-grid__span-'.$attrs['tabletSpan'],
			// 'column'.$index.'-tablet-grid__start-'.$attrs['tabletStart'],
			// 'column'.$index.'-tablet-grid__row-'.$attrs['tabletRow'],
			'column'.$index.'-mobile-grid__span-'.$attrs['mobileSpan'],
			// 'column'.$index.'-mobile-grid__start-'.$attrs['mobileStart'],
			// 'column'.$index.'-mobile-grid__row-'.$attrs['mobileRow'],
		);
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array(
			'class' => classNames($this->build_column_layout($attributes)),
		));

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'grid-column',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/column',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'editor_style'    => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Grid_Column( true );
