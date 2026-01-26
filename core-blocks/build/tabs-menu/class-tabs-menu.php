<?php
/**
 * Tabs Menu Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Tabs Menu Block
 *
 * @package PRC\Platform\Blocks
 */
class Core_Block_Tabs_Menu {

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param mixed $loader Loader.
	 * @return void
	 */
	public function init( $loader = null ): void {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_block_core_tabs_menu' );
		}
	}

	/**
	 * Render callback for core/tabs-menu.
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content    Block content (contains the tabs-menu-item template).
	 * @param \WP_Block $block      WP_Block instance.
	 *
	 * @return string Updated HTML.
	 */
	public function block_core_tabs_menu_render_callback( array $attributes, string $content, \WP_Block $block ): string {
		$tabs_list = $block->context['core/tabs-list'] ?? array();

		if ( empty( $tabs_list ) ) {
			return '';
		}

		// Get the first inner block as template (tabs-menu-item).
		$inner_blocks = $block->parsed_block['innerBlocks'] ?? array();
		if ( empty( $inner_blocks ) ) {
			return '';
		}
		$template_block = $inner_blocks[0];

		// Build rendered tab items.
		$tabs_markup = '';
		foreach ( $tabs_list as $index => $tab ) {
			// Create context for this specific tab.
			$tab_context = array_merge(
				$block->context,
				array(
					'core/tabs-menu-item-index' => $index,
					'core/tabs-menu-item-id'    => $tab['id'] ?? '',
					'core/tabs-menu-item-label' => $tab['label'] ?? '',
				)
			);

			// Create new WP_Block instance with template and context.
			$tab_block = new \WP_Block( $template_block, $tab_context );

			// Render the block.
			$tabs_markup .= $tab_block->render();
		}

		// Find the template block and replace it in $content with $tabs_markup.
		$content = preg_replace(
			'/<a\b[^>]*\bwp-block-tabs-menu-item__template\b[^>]*>.*?<\/a>/si',
			$tabs_markup,
			$content
		);

		return $content;
	}

	/**
	 * Registers the `core/tabs-menu` block on the server.
	 *
	 * @since 6.9.0
	 */
	public function register_block_core_tabs_menu() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build/tabs-menu',
			array(
				'render_callback' => array( $this, 'block_core_tabs_menu_render_callback' ),
			)
		);
	}
}
