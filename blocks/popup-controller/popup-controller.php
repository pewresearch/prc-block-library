<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Processor;

/**
 * Block Name:        Popup Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Popup_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;
	public $found_modals = array();

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/popup-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			// $loader->add_filter('render_block_context', $this, 'extend_block_id_to_modal_through_context', 10, 3);
		}
	}

	public function extend_block_id_to_modal_through_context($context, $parsed_block, $parent_block) {
		if ( $parsed_block['blockName'] !== 'prc-block/popup-modal' ) {
			$block_id = md5($parent_block->inner_html);
			$context['prc-block/popup-controller/id'] = $block_id;
		}
		return $context;
	}

	/**
	 * @hook wp_footer
	 */
	public function move_popup_modals_to_end_of_page($post_content) {
		// get the $found_modals and add them to the end of the page.
	}

	public function render_block_callback($attributes, $content, $block) {
		$block_namespace = 'prc-block/popup-controller';

		$block_id = md5($content);

		// Why not use context here? Because I want to be able to easily close and open this modal from other namespaces. By using state this is as easy as store('prc-block/popup-controller').state[blockId].isActive = true; would open the modal by the id. This is a very powerful feature when used in conjunction with other store's and the store's ability to listen to changes in state.
		wp_interactivity_state($block_namespace, array(
			$block_id => array(
				'isActive' => false,
			),
		));

		$block_wrapper_attrs = get_block_wrapper_attributes(array(
			'data-wp-interactive' => wp_json_encode(array(
				'namespace' => $block_namespace,
			)),
			'data-wp-context' => wp_json_encode(array(
				'id' => $block_id,
			)),
			'id' => $block_id,
			'data-wp-key' => wp_unique_id('popup-controller-'),
			'data-wp-class--is-active' => 'state.'.$block_id.'.isActive',
			'data-wp-on-document--keydown' => 'callbacks.onESCKey',
			'data-wp-on-window--click' => 'callbacks.onWindowClickCloseModal',
		));

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			$content,
		);

	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build', [
			'render_callback' => [ $this, 'render_block_callback' ],
		] );
	}

}
