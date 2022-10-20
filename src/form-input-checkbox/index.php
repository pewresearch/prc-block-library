<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/form-input-checkbox` block.
 *
 * @package gutenberg
 */

class Form_Input_Checkbox extends PRC_Block_Library {
	public static $block_name = 'prc-block/form-input-checkbox';
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function array_as_attr_string($array) {
		$attr_string = '';
		foreach ($array as $key => $value) {
			$attr_string .= $key . '="' . $value . '" ';
		}
		return $attr_string;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$label   = array_key_exists( 'label', $attributes ) ? $attributes['label'] : false;
		$name    = sanitize_title( $label );
		$type    = array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'checkbox';
		$value   = array_key_exists( 'value', $attributes ) ? $attributes['value'] : '';
		$checked = array_key_exists( 'defaultChecked', $attributes ) ? $attributes['defaultChecked'] : false;
		// $id      = md5( json_encode( $attributes ) );

		$block_attrs = get_block_wrapper_attributes();
		$input_attrs = array(
			'type' => $type,
			// 'id'   => $id,
			'name' => $name,
			'value' => $value,
		);
		if ( $checked ) {
			$input_attrs['checked'] = true;
		}
		$input_attrs = $this->array_as_attr_string($input_attrs);

		return wp_sprintf(
			'<div %1$s><input %2$s/><label for="%3$s">%4$s</label></div>',
			$block_attrs,
			$input_attrs,
			$name,
			$label,
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
