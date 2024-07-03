<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Post Sub-Title
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Sub_Title {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/sub-title/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter( 'vip_block_data_api__sourced_block_result', $this, 'add_data_to_vip_blocks_api', 10, 4 );
		}
	}

	/**
	 * @hook vip_block_data_api__sourced_block_result
	 * @param array $sourced_block
	 * @param string $block_name
	 * @param int $post_id
	 * @param array $block
	 * @return array
	 */
	public function add_data_to_vip_blocks_api( $sourced_block, $block_name, $post_id, $block ) {
		if ( self::$block_name !== $block_name ) {
			return $sourced_block;
		}

		// check for new value if it exists use it for $value otherwise check for legacy...
		$new_value = get_post_meta( $post_id, 'sub_title', true );
		$legacy_value = get_post_meta( $post_id, 'sub_headline', true );

		// Add custom attribute to REST API result
		$sourced_block['attributes']['content'] = $new_value ? $new_value : $legacy_value;

		return $sourced_block;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		// Legacy
		register_post_meta(
			'',
			'sub_headline',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title that appears under the post title.',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// New
		// @TODO: switch block over to this when we start the ui/update
		register_post_meta(
			'',
			'sub_title',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title that appears under the post title.',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_block_type( self::$dir . '/build' );
	}
}
