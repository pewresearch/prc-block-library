<?php
/**
 * PHPUnit bootstrap file for PRC Block Library plugin.
 *
 * @package PRC\Platform\Blocks
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

$_phpunit_polyfills_path = getenv( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH' );
if ( false !== $_phpunit_polyfills_path ) {
	define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', $_phpunit_polyfills_path );
}

if ( ! file_exists( "{$_tests_dir}/includes/functions.php" ) ) {
	echo "Could not find {$_tests_dir}/includes/functions.php\n";
	exit( 1 );
}

require_once "{$_tests_dir}/includes/functions.php";

/**
 * Load sub-title related classes under test.
 */
function _manually_load_sub_title_block() {
	require_once dirname( __DIR__ ) . '/deprecated/src/sub-title/class-sub-title.php';
	require_once dirname( __DIR__ ) . '/src/core-heading/class-core-heading.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_sub_title_block' );

require "{$_tests_dir}/includes/bootstrap.php";
