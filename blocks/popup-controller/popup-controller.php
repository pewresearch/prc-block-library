<?php
namespace PRC\Platform\Blocks;

use WP_Block;
use WP_Block_Parser_Block;
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
	public $current_controller_index = 0;
	public $controller_ids = array();
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
			$loader->add_filter('render_block_data', $this, 'capture_modals', 10, 3);
			$loader->add_filter('render_block', $this, 'add_modals_to_end_of_footer_template_part', 10, 3);
		}
	}

	/**
	 * @TODO Systemtize this capture and release method so that other blocks that need to be rendered at the end of the page (and outside the css container query) can do so.
	 */

	/**
	 * Capture popup-modals before they are rendered and store in them in $this->found_modals. We will then render them at the end of the page.
	 * @TODO systemize this
	 * @hook render_block_data
	 */
	public function capture_modals($parsed_block, $source_block, $parent_block) {
		if ( $parsed_block['blockName'] !== 'prc-block/popup-controller' ) {
			return $parsed_block;
		}
		$this->controller_ids[] = wp_unique_id('popup-controller-');
		// remove the prc-block/popup-modal block from $parsed_block['innerBlocks'] and store it in $this->found_modals
		$found_modals = array_filter($parsed_block['innerBlocks'], function($block) {
			if ( $block['blockName'] === 'prc-block/popup-modal' ) {
				$this->found_modals[] = $block;
				return false;
			}
			return true;
		});
		$parsed_block['innerBlocks'] = $found_modals;
		return $parsed_block;
	}

	/**
	 * Renders the modal blocks at the end of the page after the <footer/> template part.
	 * @TODO systemize this
	 * @hook get_block_template
	 */
	public function add_modals_to_end_of_footer_template_part( $block_content, $block, $parent_block ){
		if ( 'core/template-part' === $block['blockName'] && 'footer' === $block['attrs']['slug'] ) {
			$outer_class = \PRC\Platform\Block_Utils\classNames('wp-block-prc-block-popup-modal__outer', 'is-position-center-center');

			$index = 0;
			$modals = array_map(function($modal) use (&$index) {
				$controller_id = $this->controller_ids[$index];
				$modal['attrs']['controllerId'] = $controller_id;
				$block = new WP_Block_Parser_Block($modal['blockName'], $modal['attrs'], $modal['innerBlocks'], $modal['innerHTML'], $modal['innerContent']);
				$block = new WP_Block((array)$block);
				$index++;
				return $block->render();
			}, $this->found_modals);

			if ( empty($modals) ) {
				return $block_content;
			}

			$block_content .= wp_sprintf(
				'<div class="%1$s">%2$s</div>',
				$outer_class,
				implode('', $modals),
			);
		}
		return $block_content;
	}

	public function render_block_callback($attributes, $content, $block) {
		$block_namespace = 'prc-block/popup-controller';

		$index = $this->current_controller_index;
		$block_id = $this->controller_ids[$index];
		$this->current_controller_index++;

		// Why not use context here? Because I want to be able to easily close and open this modal from other namespaces. By using state this is as easy as store('prc-block/popup-controller').state[blockId].isActive = true; would open the modal by the id. This is a very powerful feature when used in conjunction with other store's and the store's ability to listen to changes in state.
		wp_interactivity_state($block_namespace, array(
			$block_id => array(
				'isActive' => false,
			),
		));

		// remove the first div that's class contains wp-block-prc-block-popup-modal AND it's direct contents from $content
		// @TODO systemize this
		$content = preg_replace('/<div[^>]*class="[^"]*wp-block-prc-block-popup-modal[^"]*"[^>]*>.*<\/div>/s', '', $content, 1);

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
			'data-wp-init' => 'callbacks.onInit',
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
