<?php
namespace PRC\Platform\Blocks;
use PRC\Platform\Related_Posts_API;
use WP_Block;

/**
 * Block Name:        Related Posts Query
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Related_Posts_Query {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/related-posts-query/build/block.json';
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

	public function render_related_posts($attributes, $content, $block) {
		$api = new Related_Posts_API(get_the_ID(), array());
		$related_posts = $api->query();

		if ( empty( $related_posts ) ) {
			return; // Exit Early No Related Posts.
		}

		$block_content = '';

		$block_instance = $block->parsed_block;

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Related Posts block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		foreach( $related_posts as $related_post ) {
			// Render the inner blocks of the Related Posts block with `dynamic` set to `false` to prevent calling
			// `render_callback` and ensure that no wrapper markup is included.
			$block_content .= (
				new WP_Block(
					$block_instance,
					array(
						'queryId' => 0,
						'postId'  => $related_post['postId'],
						'postType' => $related_post['postType'],
					)
				)
			)->render( array( 'dynamic' => false ) );
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes(array(
				'style' => 'gap: ' . $block_gap . ';',
			)),
			$block_content
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
		register_block_type( self::$dir . '/build', array(
			'render_callback' => array($this, 'render_related_posts')
		) );
	}

}
