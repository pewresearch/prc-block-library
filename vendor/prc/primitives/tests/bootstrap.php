<?php
/**
 * PHPUnit bootstrap for prc/primitives.
 *
 * @package PRC\Primitives
 */

require_once dirname( __DIR__ ) . '/vendor/autoload.php';

putenv( 'WP_ENVIRONMENT_TYPE=local' );
if ( ! defined( 'WP_ENVIRONMENT_TYPE' ) ) {
	define( 'WP_ENVIRONMENT_TYPE', 'local' );
}

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
	echo "Run: bash bin/install-wp-tests.sh wordpress_test root <password> 127.0.0.1 latest true\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

require_once "{$_tests_dir}/includes/functions.php";

/**
 * Register the design-system fixture as a theme so integration tests can switch_theme().
 */
function prc_primitives_tests_register_fixture_theme() {
	register_theme_directory( __DIR__ . '/block-utils/fixtures' );
}

tests_add_filter( 'muplugins_loaded', 'prc_primitives_tests_register_fixture_theme' );

require "{$_tests_dir}/includes/bootstrap.php";
