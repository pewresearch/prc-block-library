<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Staff Info
 * Description:       Display staff info from a byline; supports name, job title, twitter, and expertise.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Staff_Info {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;
	public static $editor_script_handle;
	public $block_bound_staff = false;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/staff-info/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	public function get_staff_info_for_block_binding($source_args, $block, $attribute_name) {
		$block_context = $block->context;
		$staff_post_id = array_key_exists('staffId', $block_context) ? $block_context['staffId'] : false;
		do_action('qm/debug', 'get_staff_info_for_block_binding() context: ' .print_r($block_context, true));
		if ( false === $staff_post_id ) {
			return null;
		}
		// first instance lets set the $this->block_bound_staff to the staff object so its available for later blocks:
		if ( false === $this->block_bound_staff || $this->block_bound_staff['ID'] !== $staff_post_id ) {
			$staff = new \PRC\Platform\Staff($staff_post_id);
			$this->block_bound_staff = get_object_vars($staff);
		}

		$block_name = $block->name;
		$value_to_replace = null;
		if ( in_array($block_name, ['core/image', 'core/paragraph', 'core/heading']) ) {
			$value_to_fetch = array_key_exists('valueToFetch', $source_args) ? $source_args['valueToFetch'] : null;
			if ( null === $value_to_fetch ) {
				return null;
			}
			$output_link = array_key_exists('outputLink', $source_args);

			if ( 'photo' === $value_to_fetch && isset($this->block_bound_staff['photo']['thumbnail'][0])) {
				if ( 'url' === $attribute_name ) {
					$value_to_replace = $this->block_bound_staff['photo']['thumbnail'][0];
				}
				if ( 'title' === $attribute_name ) {
					$value_to_replace = wp_sprintf(
						'Photo of %1$s',
						$this->block_bound_staff['name']
					);
				}
				if ( 'alt' === $attribute_name ) {
					$value_to_replace = wp_sprintf(
						'%1$s\'s photo',
						$this->block_bound_staff['name']
					);
				}
			}
			if ( 'bio' === $value_to_fetch && isset($this->block_bound_staff['bio']) ) {
				$value_to_replace = $this->block_bound_staff['bio'];
			}
			if ( 'mini_bio' === $value_to_fetch && isset($this->block_bound_staff['mini_bio']) ) {
				$value_to_replace = $this->block_bound_staff['mini_bio'];
			}
			if ( 'name' === $value_to_fetch && isset($this->block_bound_staff['name']) ) {
				$value_to_replace = $this->block_bound_staff['name'];
			}
			if ( 'job_title' === $value_to_fetch && isset($this->block_bound_staff['job_title']) ) {
				$value_to_replace = $this->block_bound_staff['job_title'];
			}
			if ( 'job_title_extended' === $value_to_fetch && isset($this->block_bound_staff['job_title_extended']) ) {
				$value_to_replace = $this->block_bound_staff['job_title'];
			}
			if (true === $output_link && isset($this->block_bound_staff['link']) && false !== $this->block_bound_staff['link']) {
				$value_to_replace = wp_sprintf(
					'<a href="%1$s">%2$s</a>',
					$this->block_bound_staff['link'],
					$value_to_replace
				);
			}
			if ( 'expertise' === $value_to_fetch && isset($this->block_bound_staff['expertise']) ) {
				$expertise = $this->block_bound_staff['expertise'];
				$tmp = '';
				foreach ($expertise as $term) {
					$tmp .= wp_sprintf(
						'<a href="%1$s">%2$s</a>',
						$term['url'],
						$term['label']
					);
				}
				$value_to_replace = wp_sprintf(
					'<p>%1$s</p>',
					$tmp
				);
			}
		}
		return $value_to_replace;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_bindings_source(
			'prc-platform/staff-info',
			[
				'label'              => __( 'Staff Photo', 'prc-platform/staff-info' ),
				'get_value_callback' => [$this,'get_staff_info_for_block_binding'],
				'uses_context'       => ['staffId'],
			]
		);
	}

}

