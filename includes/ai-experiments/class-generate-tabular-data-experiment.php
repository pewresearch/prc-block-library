<?php
/**
 * Generate Tabular Data AI Experiment.
 *
 * Registers the AI Table Generator experiment with the WordPress AI Experiments
 * plugin. When enabled, this experiment registers the generate-tabular-data
 * ability and enqueues a separate editor script that uses the `editor.BlockEdit`
 * filter to inject an AI generation panel into the Power Table block inspector.
 *
 * @package PRC\Platform\Blocks\AI_Experiments
 */

namespace PRC\Platform\Blocks\AI_Experiments;

use WordPress\AI\Abstracts\Abstract_Experiment;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate Tabular Data AI Experiment class.
 */
class Generate_Tabular_Data_Experiment extends Abstract_Experiment {

	/**
	 * Loads experiment metadata.
	 *
	 * @return array{id: string, label: string, description: string} Experiment metadata.
	 */
	protected function load_experiment_metadata(): array {
		return array(
			'id'          => 'generate-tabular-data',
			'label'       => __( 'Table Generation', 'prc-block-library' ),
			'description' => __( 'Uses AI to generate tabular data based on Pew Research Center content. Adds an "Suggest with AI" panel to the Power Table block inspector in the editor.', 'prc-block-library' ),
		);
	}

	/**
	 * Registers the experiment's hooks and functionality.
	 *
	 * This method is only called when the experiment is enabled.
	 */
	public function register(): void {
		// Register the AI ability when the experiment is enabled.
		$ability = new Generate_Tabular_Data();
		add_action( 'wp_abilities_api_init', array( $ability, 'register_ability' ) );

		// Enqueue the experiment's editor script (the BlockEdit filter + panel).
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_experiment_assets' ) );
	}

	/**
	 * Enqueues the experiment's editor script and localizes configuration.
	 *
	 * The script registers an `editor.BlockEdit` filter that wraps the
	 * prc-block/table edit component to inject an AI generation panel
	 * into the inspector sidebar. This keeps the table block's own code
	 * completely unaware of the AI experiment.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_experiment_assets(): void {
		$asset_file = PRC_BLOCK_LIBRARY_DIR . '/includes/ai-experiments/build/generate-tabular-data/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}
		$asset = require $asset_file;

		wp_enqueue_script(
			'prc-block-table-ai-experiment',
			plugins_url( 'includes/ai-experiments/build/generate-tabular-data/index.js', PRC_BLOCK_LIBRARY_DIR . '/prc-block-library.php' ),
			array_merge( $asset['dependencies'], array( 'wp-ai-client' ) ),
			$asset['version'],
			true
		);

		wp_localize_script(
			'prc-block-table-ai-experiment',
			'PRCTableAI',
			array(
				'enabled'     => true,
				'abilityName' => Generate_Tabular_Data::$ability_name,
			)
		);
	}
}
