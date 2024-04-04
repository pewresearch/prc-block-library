<?php
namespace PRC\Platform\Blocks;
use WP_Block;

/**
 * Block Name:        Staff Context Provider
 * Description:       Provides information about a Staff member via termId and passes that information via block context to its innerblocks.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Staff_Context_Provider {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/staff-context-provider/build/block.json';
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

	/**
	* Render the block
	* @param array $attributes Block attributes
	* @param string $content Block content
	* @param array $block WP_Block object
	* @return string
	*/
	public function render_block_callback( $attributes, $content, $block ) {
		$taxonomy = get_queried_object()->taxonomy;
		if ( 'bylines' !== $taxonomy ) {
			return '';
		}

		$term_id = get_queried_object_id();
		$staff = new \PRC\Platform\Staff( false, $term_id );

		if ( is_wp_error( $staff ) ) {
			return '';
		}

		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		if ( ! $staff->is_currently_employed ) {
			return '';
		}

		$block_content = (
			new WP_Block(
				$block_instance,
				array(
					'staffName'      => $staff->name,
					'staffJobTitle'  => $staff->job_title,
					'staffImage'     => $staff->photo,
					'staffTwitter'   => null,
					'staffExpertise' => $staff->expertise,
					'staffBio'       => $staff->bio,
					'staffMiniBio'   => $staff->job_title_extended,
					'staffLink'      => $staff->link,
					'staffId'        => $staff->ID,
				)
			)
		)->render( array( 'dynamic' => false ) );

		return $block_content;
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
