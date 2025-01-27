<?php
namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Tab {
	/**
	 * A store of the tab block's attributes.
	 *
	 * @var array
	 */
	public $tab_attrs = array();

	/**
	 * Constructor.
	 *
	 * @param  object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param  object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'init', $this, 'register_tab_block_bindings', 11 );
		}
	}

	/**
	 * Get the tab label binding.
	 *
	 * @param array    $source_args Source arguments.
	 * @param WP_Block $block The block.
	 * @param string   $attribute_name The attribute name.
	 * @return string The tab label binding.
	 */
	public function get_tab_binding( $source_args, $block, $attribute_name ) {
		$value_to_get = array_key_exists( 'contextValueToGet', $source_args ) ? $source_args['contextValueToGet'] : 'tab/label';
		$parsed_block = $block->parsed_block;
		$context      = $block->context;
		return $context[ $value_to_get ] ?? 'Tab Title...';
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes
	 * @param string $content Block content
	 * @param array  $block WP_Block object
	 * @return string
	 */
	public function render_block_callback( $attributes, $content ) {
		// Modify markup to include interactivity API attributes.
		$p = new WP_HTML_Tag_Processor( $content );

		while ( $p->next_tag( array( 'class_name' => 'wp-block-prc-block-tab' ) ) ) {
			// Add role="tabpanel" to each tab panel.
			$p->set_attribute( 'data-wp-bind--role', 'state.roleAttribute' );

			// Hide all tab panels that are not currently selected.
			$p->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );

			// Add tabindex="0" to the selected tab panel, so it can be focused.
			$p->set_attribute( 'data-wp-bind--tabindex', 'state.tabindexPanelAttribute' );

			// Store the index of each tab panel for tracking the selected tab.
			$p->set_attribute( 'data-tab-index', $attributes['tabIndex'] );

			// Add a hidden attribute by default.
			$p->set_attribute( 'hidden', 'true' );
		}

		return $p->get_updated_html();
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/tab',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

	/**
	 * Register the tab block bindings.
	 */
	public function register_tab_block_bindings() {
		register_block_bindings_source(
			'prc-block/tab',
			array(
				'label'              => __( 'Tab Info', 'prc-block/tab' ),
				'get_value_callback' => array( $this, 'get_tab_binding' ),
				'uses_context'       => array( 'tab/label', 'tab/index', 'tab/slug' ),
			)
		);
	}
}
