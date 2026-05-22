<?php
/**
 * AI Features class.
 *
 * @package PRC\Platform\Blocks\AI_Features
 */

namespace PRC\Platform\Blocks;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * AI Features class.
 */
class AI_Features {

	/**
	 * Constructor.
	 *
	 * @param Loader $loader The loader that's responsible for maintaining and registering all hooks that power the plugin.
	 */
	public function __construct( $loader ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found -- reserved for parity with other library modules
		// After WP AI plugins_loaded bootstrap (priority 10); Abstract_Feature is not autoloadable before that.
		add_action( 'plugins_loaded', array( $this, 'register_wp_ai_features' ), 11 );
	}

	/**
	 * Load block library AI feature classes and register features with the WP AI plugin.
	 *
	 * @return void
	 */
	public function register_wp_ai_features() {
		if ( ! class_exists( '\WordPress\AI\Abstracts\Abstract_Feature' ) ) {
			return;
		}

		require_once plugin_dir_path( __FILE__ ) . '/class-ai-prompt-permalink.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-generate-tabular-data.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-generate-tabular-data-feature.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-generate-blurb.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-generate-title.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-generate-blurb-feature.php';

		add_action(
			'wpai_register_features',
			function ( $registry ) {
				$registry->register_feature( new \PRC\Platform\Blocks\AI_Features\Generate_Tabular_Data_Feature() );
				$registry->register_feature( new \PRC\Platform\Blocks\AI_Features\Generate_Blurb_Feature() );
			}
		);
	}
}
