<?php
/**
 * Generate Blurb AI Feature.
 *
 * Registers the Story Item title and blurb generators with the WordPress AI plugin. When
 * enabled, this feature registers both the generate-title and generate-blurb abilities and
 * enqueues the editor script that uses the `editor.BlockEdit` filter to inject an AI
 * dropdown control on the Story Item block.
 *
 * @package PRC\Platform\Blocks\AI_Features
 */

namespace PRC\Platform\Blocks\AI_Features;

use WordPress\AI\Abstracts\Abstract_Feature;
use WordPress\AI\Experiments\Experiment_Category;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate Blurb AI Feature class.
 */
class Generate_Blurb_Feature extends Abstract_Feature {

	/**
	 * Feature identifier.
	 */
	public static function get_id(): string {
		return 'generate-blurb';
	}

	/**
	 * Loads feature metadata.
	 *
	 * @return array{label: string, description: string, category: string} Feature metadata.
	 */
	protected function load_metadata(): array {
		return array(
			'label'       => __( 'Story Item AI Generation', 'prc-block-library' ),
			'description' => __( 'Uses AI to generate a title or short blurb for a story item based on the linked post.', 'prc-block-library' ),
			'category'    => Experiment_Category::EDITOR,
		);
	}

	/**
	 * Registers the feature's hooks and functionality.
	 *
	 * This method is only called when the feature is enabled.
	 */
	public function register(): void {
		$blurb_ability = new Generate_Blurb();
		add_action( 'wp_abilities_api_init', array( $blurb_ability, 'register_ability' ) );

		$title_ability = new Generate_Title();
		add_action( 'wp_abilities_api_init', array( $title_ability, 'register_ability' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_feature_assets' ), 20 );
	}

	/**
	 * Enqueues the feature's editor script and localizes configuration.
	 *
	 * @hook enqueue_block_editor_assets 20
	 */
	public function enqueue_feature_assets(): void {
		$asset_file = PRC_BLOCK_LIBRARY_DIR . '/includes/ai-features/build/generate-blurb/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}
		$asset = require $asset_file;

		$handle = 'prc-block-story-item-ai-blurb';

		wp_enqueue_script(
			$handle,
			plugins_url( 'includes/ai-features/build/generate-blurb/index.js', PRC_BLOCK_LIBRARY_DIR . '/prc-block-library.php' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if ( wp_script_is( $handle, 'enqueued' ) ) {
			wp_localize_script(
				$handle,
				'PRCStoryItemAI',
				array(
					'enabled'              => true,
					'abilityGenerateBlurb' => Generate_Blurb::$ability_name,
					'abilityGenerateTitle' => Generate_Title::$ability_name,
				)
			);
		}
	}
}
