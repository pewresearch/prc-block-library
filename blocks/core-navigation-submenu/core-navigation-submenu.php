<?php
/**
 * Block Name:        Core Navigation-Submenu
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreNavigationSubmenu extends PRC_Block_Library {

	public static $block_name = "core/navigation-submenu";
	public static $block_json = null;
	public static $style_handle = null;
	public static $editor_script_handle = null;
	public static $editor_style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-navigation-submenu/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets'), 10 );
			add_action( 'init', array( $this, 'register_block_styles'), 11);
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 3 );
		}
	}

	public function init_assets() {
		self::$style_handle         = register_block_style_handle( self::$block_json, 'style' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$editor_style_handle  = register_block_style_handle( self::$block_json, 'editorStyle' );
	}

	public function register_block_styles() {
		register_block_style(
			self::$block_name,
			array(
				'name'  => 'sub-tree',
				'label' => __( 'Sub Tree', 'prc-block-library-core-blocks' ),
				'style' => self::$style_handle,
			)
		);

		register_block_style(
			self::$block_name,
			array(
				'name'  => 'sub-expand',
				'label' => __( 'Sub Expand', 'prc-block-library-core-blocks' ),
				'style' => self::$style_handle,
			)
		);
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$editor_style_handle );
	}

	/**
	* Register additional attributes for the "core/navigation-submenu" block.
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'subExpandOpenedLabel', $metadata['attributes'] ) ) {
			$metadata['attributes']['subExpandOpenedLabel'] = array(
				'type'    => 'string'
			);
		}

		return $metadata;
	}

	public function modify_button_label_open_close($block_content, $block, $context) {
		$label_closed = is_array($block['attrs']) && array_key_exists('label', $block['attrs']) ? $block['attrs']['label'] : false;
		$label_opened = is_array($block['attrs']) && array_key_exists('subExpandOpenedLabel', $block['attrs']) ? $block['attrs']['subExpandOpenedLabel'] : false;

		if ( false === $label_opened ) {
			return $block_content;
		}

		if ( array_key_exists('openSubmenusOnClick', $context) && true !== $context['openSubmenusOnClick'] ) {
			$pattern = '/<a class="wp-block-navigation-item__content" href="([^"]+)">'.$label_closed.'<\/a>/';
			$replacement = '<a class="wp-block-navigation-item__content" href="$1"><span class="wp-block-navigation-submenu__label__closed">'.$label_closed.'</span><span class="wp-block-navigation-submenu__label__opened">'.$label_opened.'</span></a>';
		} else {
			$pattern = '/<button aria-label="(.*)" class="wp-block-navigation-item__content wp-block-navigation-submenu__toggle" aria-expanded="false"><span class="wp-block-navigation-item__label">'.$label_closed.'<\/span><\/button>/';
			$replacement = '<button aria-label="Expandable submenu" class="wp-block-navigation-item__content wp-block-navigation-submenu__toggle" aria-expanded="false"><span class="wp-block-navigation-item__label"><span class="wp-block-navigation-submenu__label__closed">'.$label_closed.'</span><span class="wp-block-navigation-submenu__label__opened">'.$label_opened.'</span></span></button>';
		}

		return preg_replace($pattern, $replacement, $block_content);
	}

	/**
	* Render the "core/navigation-submenu" block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block, $block_instance ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$classname = is_array($block['attrs']) && array_key_exists('className', $block['attrs']) ? $block['attrs']['className'] : false;

		// The sub-expand style should modify its button to have an open and close state.
		if ( false !== $classname && false !== strpos($classname, 'is-style-sub-expand') ) {
			$block_content = $this->modify_button_label_open_close($block_content, $block, $block_instance->context);
		}

		return $block_content;
	}

}

new CoreNavigationSubmenu(true);
