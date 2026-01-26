<?php
/**
 * Tab Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Tab Block
 *
 * @package PRC\Platform\Blocks
 */
class Core_Block_Tab {

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
			$loader->add_action( 'init', $this, 'register_block_core_tab' );
		}
	}

	/**
	 * Render callback for core/tab.
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content    Block content.
	 * @param \WP_Block $block      WP_Block instance.
	 *
	 * @return string Updated HTML.
	 */
	public function block_core_tab_render_callback( array $attributes, string $content, \WP_Block $block ): string {
		$tag_processor = new WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag( array( 'class_name' => 'wp-block-tab' ) );
		$tab_id = (string) $tag_processor->get_attribute( 'id' );
		// If no id, generate a unique one.
		if ( empty( $tab_id ) ) {
			$tab_id = sanitize_title( $attributes['label'] );
			$tag_processor->set_attribute( 'id', $tab_id );
		}

		/**
		 * Add interactivity to the tab element.
		 */
		$tag_processor->set_attribute(
			'data-wp-interactive',
			'core/tabs/private'
		);
		$tag_processor->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'tab' => array(
						'id' => $tab_id,
					),
				)
			)
		);

		/**
		 * Process accessibility and interactivity attributes.
		 */
		$tag_processor->set_attribute( 'role', 'tabpanel' );
		$tag_processor->set_attribute( 'aria-labelledby', 'tab__' . $tab_id );
		$tag_processor->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );
		$tag_processor->set_attribute( 'data-wp-bind--tabindex', 'state.tabIndexAttribute' );

		return (string) $tag_processor->get_updated_html();
	}

	/**
	 * Registers the `core/tab` block on the server.
	 *
	 * @since 6.9.0
	 */
	public function register_block_core_tab() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build/tab',
			array(
				'render_callback' => array( $this, 'block_core_tab_render_callback' ),
			)
		);
	}
}
