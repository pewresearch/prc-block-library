<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Table
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Table {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/table';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-table/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_filter('upload_mimes', $this, 'allow_csv_mime_type', 10, 1);
			$loader->add_filter('render_block', $this, 'enqueue_view_style', 10, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
		self::$view_script_handle = register_block_script_handle( self::$block_json, 'viewScript' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Register additional attributes for the "core/table" block.
	* @hook block_type_metadata
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'allowSorting', $metadata['attributes'] ) ) {
			$metadata['attributes']['allowSorting'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		if ( ! array_key_exists( 'sortingOptions', $metadata['attributes'] ) ) {
			$metadata['attributes']['sortingOptions'] = array(
				'type'    => 'array',
			);
		}

		return $metadata;
	}

	/**
	 * @hook upload_mimes
	 * @param mixed $mimes
	 * @return mixed
	 */
	public function allow_csv_mime_type( $mimes ) {
		$mimes['csv'] = 'text/csv';
		return $mimes;
	}

	/**
	 * Logic that determines if a block is a core/table block or a legacy html table and which style should be enqueued and which classes should be applied.
	 * @hook render_block
	 */
	public function enqueue_view_style($block_content, $block) {
		if (self::$block_name === $block['blockName']) {
			wp_enqueue_style( self::$style_handle );
		} else if ( 'core/html' === $block['blockName'] ) {
			// check if the block contains a table and that is has a class of prc-table
			if ( strpos( $block_content, '<table' ) !== false && strpos( $block_content, 'prc-table' ) !== false ) {
				// Check if the table has a class of prc-table and if so change it to be wp-block-table
				$block_content = str_replace( 'prc-table', 'wp-block-table has-sans-serif-font-family html-fallback-table', $block_content );
				// Check if the table has data-ordering="true" and if so add a class sortable-table
				if ( strpos( $block_content, 'data-ordering="true"' ) !== false ) {
					$block_content = str_replace( 'data-ordering="true"', '', $block_content );
					$block_content = str_replace( 'wp-block-table', 'wp-block-table sortable-table', $block_content );
					// Check if the table has an id and if not add one
					if ( strpos( $block_content, 'id=' ) === false ) {
						$block_content = str_replace( '<table', wp_sprintf('<table id="%s"', wp_unique_id('prc-sortable-table-')), $block_content );
					}
					wp_enqueue_script(self::$view_script_handle);
					wp_enqueue_style('datatables');
				}
				// enqueue the block style
				wp_enqueue_style( self::$style_handle );
			}
		}
		return $block_content;
	}

	/**
	 * Update the markup for the core/table block to include the sortable-table class and enqueue the sortable-table scripts and styles if the allowSorting attribute is set to true.
	 * @hook render_block
	 */
	public function update_markup_for_sorting($block_content, $block) {
		if (self::$block_name !== $block['blockName']) {
			return $block_content;
		}

		// check if the block has an attribute of allowSorting and if its set to true set the class to sortable-table
		if ( isset( $block['attrs']['allowSorting'] ) && $block['attrs']['allowSorting'] ) {
			$block_content = str_replace( 'wp-block-table', 'wp-block-table sortable-table', $block_content );
			// enqueue the sortable-table scripts and styles...
			wp_enqueue_script(self::$view_script_handle);
		}

		return $block_content;
	}
}
