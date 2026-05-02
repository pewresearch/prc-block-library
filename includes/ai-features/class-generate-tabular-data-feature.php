<?php
/**
 * Generate Tabular Data AI Feature.
 *
 * Registers the AI Table Generator feature with the WordPress AI plugin. When enabled,
 * this feature registers the generate-tabular-data ability and enqueues a separate
 * editor script that uses the `editor.BlockEdit` filter to inject an AI generation
 * panel into the Power Table block.
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
 * Generate Tabular Data AI Feature class.
 */
class Generate_Tabular_Data_Feature extends Abstract_Feature {

	/**
	 * Feature identifier.
	 */
	public static function get_id(): string {
		return 'generate-tabular-data';
	}

	/**
	 * Loads feature metadata.
	 *
	 * @return array{label: string, description: string, category: string} Feature metadata.
	 */
	protected function load_metadata(): array {
		return array(
			'label'       => __( 'Table Generation', 'prc-block-library' ),
			'description' => __( 'Uses AI to generate tabular data based on Pew Research Center content. Adds a "Suggest with AI" control to the Power Table block in the editor.', 'prc-block-library' ),
			'category'    => Experiment_Category::EDITOR,
		);
	}

	/**
	 * Registers the feature's hooks and functionality.
	 *
	 * This method is only called when the feature is enabled.
	 */
	public function register(): void {
		$ability = new Generate_Tabular_Data();
		add_action( 'wp_abilities_api_init', array( $ability, 'register_ability' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_feature_assets' ) );
	}

	/**
	 * Enqueues the feature's editor script and localizes configuration.
	 *
	 * The script registers an `editor.BlockEdit` filter that wraps the
	 * prc-block/table edit component. This keeps the table block's own code
	 * unaware of the AI feature.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_feature_assets(): void {
		$asset_file = PRC_BLOCK_LIBRARY_DIR . '/includes/ai-features/build/generate-tabular-data/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}
		$asset = require $asset_file;

		wp_enqueue_script(
			'prc-block-table-ai-feature',
			plugins_url( 'includes/ai-features/build/generate-tabular-data/index.js', PRC_BLOCK_LIBRARY_DIR . '/prc-block-library.php' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_localize_script(
			'prc-block-table-ai-feature',
			'PRCTableAI',
			array(
				'enabled'     => true,
				'abilityName' => Generate_Tabular_Data::$ability_name,
			)
		);
	}
}
