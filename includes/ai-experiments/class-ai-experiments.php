<?php
/**
 * AI Experiments class.
 *
 * @package PRC\Platform\Blocks\AI_Experiments
 */

namespace PRC\Platform\Blocks;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * AI Experiments class.
 */
class AI_Experiments {

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader that's responsible for maintaining and registering all hooks that power the plugin.
	 */
	public function __construct( $loader ) {
		$this->register_tabular_data_experiment();
	}

	/**
	 * Register the Tabular Data AI Experiment.
	 */
	public function register_tabular_data_experiment() {
		// Load AI experiment classes if the WP AI plugin is available.
		if ( class_exists( '\WordPress\AI\Abstracts\Abstract_Experiment' ) ) {
			require_once plugin_dir_path( __FILE__ ) . '/class-generate-tabular-data.php';
			require_once plugin_dir_path( __FILE__ ) . '/class-generate-tabular-data-experiment.php';

			add_action(
				'ai_experiments_register_experiments',
				function ( $registry ) {
					$registry->register_experiment( new \PRC\Platform\Blocks\AI_Experiments\Generate_Tabular_Data_Experiment() );
				}
			);
		}
	}
}
