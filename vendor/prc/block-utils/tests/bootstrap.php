<?php
/**
 * PHPUnit bootstrap for prc/block-utils.
 *
 * @package PRC\BlockUtils\Tests
 */

require_once dirname( __DIR__ ) . '/vendor/autoload.php';

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

$_phpunit_polyfills_path = getenv( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH' );
if ( false !== $_phpunit_polyfills_path ) {
	define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', $_phpunit_polyfills_path );
}

if ( ! file_exists( "{$_tests_dir}/includes/functions.php" ) ) {
	echo "Could not find {$_tests_dir}/includes/functions.php\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

require_once "{$_tests_dir}/includes/functions.php";

/**
 * Load the stub plugin so WordPress activates the package directory like a normal plugin.
 */
function prc_block_utils_tests_load_plugin() {
	require dirname( __DIR__ ) . '/prc-block-utils.php';
}

tests_add_filter( 'muplugins_loaded', 'prc_block_utils_tests_load_plugin' );

require "{$_tests_dir}/includes/bootstrap.php";
