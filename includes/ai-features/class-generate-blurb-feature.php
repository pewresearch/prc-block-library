<?php
/**
 * Generate Blurb AI Feature.
 *
 * Registers the Story Item blurb generator with the WordPress AI plugin. When enabled,
 * this feature registers the generate-blurb ability and enqueues editor script that
 * uses the `editor.BlockEdit` filter to inject an AI control on the Story Item block.
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
			'label'       => __( 'Blurb Generation', 'prc-block-library' ),
			'description' => __( 'Uses AI to generate a short blurb for a story item based on the linked post.', 'prc-block-library' ),
			'category'    => Experiment_Category::EDITOR,
		);
	}

	/**
	 * Registers the feature's hooks and functionality.
	 *
	 * This method is only called when the feature is enabled.
	 */
	public function register(): void {
		$ability = new Generate_Blurb();
		add_action( 'wp_abilities_api_init', array( $ability, 'register_ability' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_feature_assets' ) );
	}

	/**
	 * Enqueues the feature's editor script and localizes configuration.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_feature_assets(): void {
		$asset_file = PRC_BLOCK_LIBRARY_DIR . '/includes/ai-features/build/generate-blurb/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}
		$asset = require $asset_file;

		wp_enqueue_script(
			'prc-block-story-item-ai-blurb',
			plugins_url( 'includes/ai-features/build/generate-blurb/index.js', PRC_BLOCK_LIBRARY_DIR . '/prc-block-library.php' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_localize_script(
			'prc-block-story-item-ai-blurb',
			'PRCBlurbAI',
			array(
				'enabled'     => true,
				'abilityName' => Generate_Blurb::$ability_name,
			)
		);
	}
}
