<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/form-input-field` block.
 *
 * @package gutenberg
 */

class Form_Input_Checkbox extends PRC_Block_Library {
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$label = array_key_exists( 'label', $attributes ) ? $attributes['label'] : 'Label';
		$type  = array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'checkbox'; 
		
		// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
		// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L131 for how to use `$this->_get_block_wrapper_attributes()`
		$block_attrs = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s><input type="%1$s"></input><label>%3$s</label></div>',
			$block_attrs,
			$type,
			$label
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'form-input-checkbox',
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
			plugin_dir_path( __DIR__ ) . '/form-input-checkbox',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Form_Input_Checkbox( true );
