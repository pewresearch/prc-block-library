<?php
/**
 * Block Name:        Details (Collapsible)
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Class that modifies the core/details block.
 */
class Core_Details {
	/**
	 * Pew-Knight Initiative collection URL. Opens in new tab when logo is clicked on Knight Co-Branded style.
	 *
	 * @var string
	 */
	const PEW_KNIGHT_COLLECTION_URL = 'https://www.pewresearch.org/collections/pew-knight-initiative/';

	/**
	 * The block name.
	 *
	 * @var string
	 */
	public $block_name = 'core/details';
	/**
	 * The block manifest.
	 *
	 * @var array
	 */
	public $block_json;
	/**
	 * The editor script handle.
	 *
	 * @var string
	 */
	public $editor_style_handle;
	/**
	 * The editor script handle.
	 *
	 * @var string
	 */
	public $editor_script_handle;
	/**
	 * The view script handle.
	 *
	 * @var string
	 */
	public $view_script_handle;

	/**
	 * Constructor
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-details' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'register_styles' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_frontend_icon_styles', 10 );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 3 );
		}
	}

	/**
	 * Register the block's assets.
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->editor_style_handle  = register_block_style_handle( $this->block_json, 'editorStyle' );
		$this->view_script_handle   = register_block_script_module_id( $this->block_json, 'viewScriptModule' );
	}

	/**
	 * Register additional attributes for the "core/details" block.
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( 'core/details' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'closeWhenFocusLost', $metadata['attributes'] ) ) {
			$metadata['attributes']['closeWhenFocusLost'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	/**
	 * Returns the base CSS that replaces the native disclosure marker with our icons.
	 * Applied globally to all core/details blocks to prevent iOS emoji glyph fallback.
	 *
	 * @return string The CSS styles.
	 */
	public static function get_base_icon_styles() {
		$open_icon  = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'caret-down', 'black' );
		$close_icon = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'caret-up', 'black' );
		return wp_sprintf(
			'.wp-block-details > summary { list-style: none; } .wp-block-details > summary::-webkit-details-marker { display: none; } .wp-block-details > summary { display: flex; align-items: center; font-size: 1rem; gap: 0.25em; } .wp-block-details > summary::after { content: ""; display: block; margin-left: 0.3em; width: 0.875em; height: 0.875em; background-image: url(%1$s); background-size: contain; background-repeat: no-repeat; flex-shrink: 0; } .wp-block-details[open] > summary::after { background-image: url(%2$s); }',
			$open_icon,
			$close_icon
		);
	}

	/**
	 * Returns the CSS styles for adding the plus/minus icon to any defined style of the details block.
	 *
	 * @param string $style_name The style name.
	 * @return string The CSS styles.
	 */
	public static function get_new_icon_styles( $style_name ) {
		$open_icon  = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-plus', 'black' );
		$close_icon = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-minus', 'black' );
		return wp_sprintf( '.wp-block-details.is-style-%1$s > summary::-webkit-details-marker { display: none } .wp-block-details.is-style-%1$s > summary { font-weight: bold; display: flex; align-items: center; font-size: 1rem; gap: 0.25em; } .wp-block-details.is-style-%1$s > summary:after { content: ""; display: block; margin-left: 0.3em; width: 0.875em; height: 0.875em; background-image: url(%2$s); background-size: contain; background-repeat: no-repeat; } .wp-block-details.is-style-%1$s[open] > summary:after { background-image: url(%3$s); }', $style_name, $open_icon, $close_icon );
	}

	/**
	 * Enqueue frontend styles that apply our icons to all core/details blocks.
	 * Prevents iOS Safari from falling back to emoji glyphs for the disclosure marker.
	 *
	 * @hook enqueue_block_assets
	 */
	public function enqueue_frontend_icon_styles() {
		$handle = 'prc-core-details-icons';
		wp_register_style( $handle, false, array(), PRC_BLOCK_LIBRARY_VERSION );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, self::get_base_icon_styles() );
	}

	/**
	 * Register the block's style assets.
	 * This is for the front end.
	 *
	 * @hook init
	 */
	public function register_styles() {
		register_block_style(
			$this->block_name,
			array(
				'name'         => 'plus-icon',
				'label'        => 'Plus/Minus Icon',
				'inline_style' => '.wp-block-details.is-style-plus-icon > summary { font-weight: bold; } ' . self::get_new_icon_styles( 'plus-icon' ),
			)
		);

		$logo_url_light = plugins_url( 'assets/pew-knight-logo.svg', PRC_BLOCK_LIBRARY_FILE );
		$logo_url_dark  = plugins_url( 'assets/pew-knight-logo-dark.svg', PRC_BLOCK_LIBRARY_FILE );
		$logo_light_css = wp_sprintf(
			'.wp-block-details.is-style-pew-knight-co-branded > summary:before { display: flex; background-image: url(%s); width: 183px; height: 35px; content: ""; background-repeat: no-repeat; background-size: contain; background-position: center;} .wp-block-details.is-style-pew-knight-co-branded > summary:after { background-position: right; width: 100%% !important; flex-shrink: 1; } .wp-block-details.is-style-pew-knight-co-branded > summary { text-indent: -9999px; }',
			esc_url( $logo_url_light )
		);
		$logo_dark_css  = wp_sprintf(
			'@media (prefers-color-scheme: dark) { .wp-block-details.is-style-pew-knight-co-branded > summary:before { background-image: url(%s); } }',
			esc_url( $logo_url_dark )
		);

		register_block_style(
			$this->block_name,
			array(
				'name'         => 'pew-knight-co-branded',
				'label'        => 'Knight Co-Branded',
				'inline_style' => $logo_light_css . $logo_dark_css . self::get_new_icon_styles( 'pew-knight-co-branded' ),
			)
		);
	}

	/**
	 * Render the block with Interactivity API directives.
	 *
	 * @hook render_block
	 * @param string   $block_content The block content.
	 * @param array    $block         The block.
	 * @param WP_Block $block_obj     The block object.
	 * @return string The filtered block content.
	 */
	public function render( $block_content, $block, $block_obj ) {
		if ( 'core/details' !== $block['blockName'] ) {
			return $block_content;
		}

		$close_when_focus_lost = $block['attrs']['closeWhenFocusLost'] ?? false;
		$className             = $block['attrs']['className'] ?? '';
		$is_knight_style       = str_contains( $className, 'is-style-pew-knight-co-branded' );

		if ( ! $close_when_focus_lost && ! $is_knight_style ) {
			return $block_content;
		}

		wp_enqueue_script_module( $this->view_script_handle );

		$processor = new WP_HTML_Tag_Processor( $block_content );

		if ( $processor->next_tag( array( 'tag_name' => 'details' ) ) ) {
			$processor->set_attribute( 'data-wp-interactive', 'core/details' );

			$context = array(
				'closeWhenFocusLost' => $close_when_focus_lost,
			);
			if ( $is_knight_style ) {
				$context['knightCollectionUrl'] = self::PEW_KNIGHT_COLLECTION_URL;
			}
			$processor->set_attribute( 'data-wp-context', wp_json_encode( $context ) );

			if ( $close_when_focus_lost ) {
				$processor->set_attribute( 'data-wp-on-document--click', 'actions.handleOutsideClick' );
			}

			if ( $is_knight_style && $processor->next_tag( array( 'tag_name' => 'summary' ) ) ) {
				$processor->set_attribute( 'data-wp-on--click', 'actions.handleSummaryClick' );
			}
		}

		return $processor->get_updated_html();
	}

	/**
	 * Filters the core/details block output to remove errant <a/> tags that may be
	 * added when copy/pasting from Word doc.
	 *
	 * @hook render_block
	 * @param string   $block_content The block content.
	 * @param array    $block         The block.
	 * @param WP_Block $block_obj   The block object.
	 * @return string The filtered block content.
	 */
	public function filter_details_output( $block_content, $block, $block_obj ) {
		if ( $this->block_name === $block['name'] ) {
			// If there are <a>...</a> tags like this with no properties whatsoever we need to remove the a tags but keep the text.
			$block_content = preg_replace( '/<a\s*>([^<]*)<\/a>/', '$1', $block_content );
		}
		return $block_content;
	}

	/**
	 * Register the block's editor assets.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_assets() {
		wp_enqueue_style( $this->editor_style_handle );
		wp_enqueue_script( $this->editor_script_handle );
	}
}
