<?php
/**
 * Plugin Name:       PRC Block Utils
 * Description:       Loads Composer autoload for the prc/block-utils library (test / wp-env entry).
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 * License:           GPL-2.0-or-later
 * Text Domain:       prc-block-utils
 *
 * @package PRC_Block_Utils
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$prc_block_utils_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $prc_block_utils_autoload ) ) {
	require_once $prc_block_utils_autoload;
}
