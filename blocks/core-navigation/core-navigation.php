<?php
/**
 * Block Name:        Core Navigation
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreNavigation extends PRC_Block_Library {

	public static $block_name = "core/navigation";
	public static $block_json = null;
	public static $style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-navigation/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'init', array($this, 'register_styles') );
		}
	}

	public function init_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	/**
	* Register the "core/navigation" block styles
	* @return mixed
	*/
	public function register_styles() {
		// These styles are for the backend...
		ob_start();
		?>
		.wp-block-navigation.is-style-pills .wp-block-navigation-item {
			border: 1px solid #EAEAEA;
			border-radius: 3px;
			padding: .7857142857em 1.5em;
			text-align: center;
			text-decoration: none;
			transition: opacity .1s ease, background-color .1s ease,color .1s ease, box-shadow .1s ease,background .1s ease;
		}
		.wp-block-navigation.is-style-pills .wp-block-navigation-item:hover {
			background-color: #EAEAEA;
		}
		<?php $style = ob_get_clean();
		register_block_style(
			'core/navigation',
			array(
				'name'   => 'pills',
				'label'  => __( 'Pills', 'prc-block-library' ),
				'inline_style' => $style,
				'style_handle'  => self::$style_handle
			)
		);
	}

}

new CoreNavigation(true);
