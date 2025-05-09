<?php
/**
 * PRC Block Library
 *
 * @package           PRC_Block_Library
 * @author            Seth Rubenstein, Ben Wormald
 * @copyright         2023 Pew Research Center
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Block Library
 * Plugin URI:        https://github.com/pewresearch/prc-block-library
 * Description:       The core block library for the PRC Platform.
 * Version:           3.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein, Ben Wormald
 * Author URI:        https://pewresearch.org
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       prc-block-library
 * Requires Plugins:  prc-platform-core
 */

namespace PRC\Platform\Blocks;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PRC_BLOCK_LIBRARY_FILE', __FILE__ );
define( 'PRC_BLOCK_LIBRARY_DIR', __DIR__ );
define( 'PRC_BLOCK_LIBRARY_VERSION', '3.0.0' );
define( 'PRC_BLOCK_LIBRARY_MANIFEST_FILE', __DIR__ . '/build/block-manifest.php' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-prc-block-library-activator.php
 */
function activate_prc_block_library() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-prc-block-library-activator.php';
	PRC_Block_Library_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-prc-block-library-deactivator.php
 */
function deactivate_prc_block_library() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-prc-block-library-deactivator.php';
	PRC_Block_Library_Deactivator::deactivate();
}

register_activation_hook( __FILE__, '\PRC\Platform\Blocks\activate_prc_block_library' );
register_deactivation_hook( __FILE__, '\PRC\Platform\Blocks\deactivate_prc_block_library' );

/**
 * Helper utilities
 */
require plugin_dir_path( __FILE__ ) . 'includes/utils.php';

/**
 * The core plugin class that is used to define the hooks that initialize the various platform components.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-plugin.php';

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
	$plugin = new Plugin();
	$plugin->run();
}
run_prc_block_library();
