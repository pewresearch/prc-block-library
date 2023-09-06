<?php
/**
 *
 * @link              https://github.com/pewresearch/prc-block-library
 * @since             1.0.0
 * @package           PRC_Platform
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Block Library
 * Plugin URI:        https://github.com/pewresearch/prc-block-library
 * Description:       pewresearch.org block library
 * Version:           1.0.0
 * Author:            Seth Rubenstein, Ben Wormald
 * Author URI:        https://pewresearch.org
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       prc-block-library

 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'PRC_BLOCK_LIBRARY_VERSION', '0.0.3' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-prc-platform-activator.php
 */
function activate_prc_platform() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-prc-block-library-activator.php';
	PRC_Platform_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-prc-platform-deactivator.php
 */
function deactivate_prc_platform() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-prc-block-library-deactivator.php';
	PRC_Platform_Deactivator::deactivate();
}

// register_activation_hook( __FILE__, 'activate_prc_platform' );
// register_deactivation_hook( __FILE__, 'deactivate_prc_platform' );

/**
 * The core plugin class that is used to define the hooks that initialize the various platform components.
 */
require plugin_dir_path( __FILE__ ) . 'class-block-library.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_prc_block_library() {
	$plugin = new \PRC\Platform\Blocks\Library();
	$plugin->run();
}
run_prc_block_library();

