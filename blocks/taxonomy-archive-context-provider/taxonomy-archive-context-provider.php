<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy Archive Context Provider
 * Description:       Provides information about a taxonomy archive page like the current queried taxonomy and the term id via block context to nested blocks
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class taxonomy_archive_context_provider {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/taxonomy-archive-context-provider/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function get_taxonomy_info() {
		if ( !is_tax() ) {
			return false;
		}
		$taxonomy = get_queried_object()->taxonomy;
		$term_id = get_queried_object_id();
		return array(
			'taxonomy' => $taxonomy,
			'term_id' => $term_id,
		);
	}

	/**
	* Render the block
	* @param array $attributes Block attributes
	* @param string $content Block content
	* @param array $block WP_Block object
	* @return string
	*/
	public function render_block_callback( $attributes, $content, $block ) {
		$taxonomy_info = $this->get_taxonomy_info();
		if ( !$taxonomy_info ) {
			return '';
		}

		$taxonomy = $taxonomy_info['taxonomy'];
		$term_id = $taxonomy_info['term_id'];

		$wrapper_attributes = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}
