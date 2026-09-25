<?php
/**
 * Optional mu-plugin: ensure library autoload is available in wp-env.
 *
 * @package PRC_Block_Utils
 */

$autoload = '/var/www/html/wp-content/plugins/prc-primitives/vendor/autoload.php';
if ( file_exists( $autoload ) ) {
	require_once $autoload;
}
