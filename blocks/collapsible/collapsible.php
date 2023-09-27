<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Collapsible
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Collapsible {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_filter('query_vars', function($qvars){
				$qvars[] = 'collapsibleId';
				return $qvars;
			});
			add_filter( 'apple_news_initialize_components', array( $this, 'register_apple_news_callout_component' ), 10, 1 );
		}
	}

	/**
	 * @hook apple_news_initialize_components
	 * @param mixed $components
	 * @return void
	 */
	public function register_apple_news_callout_component($components) {
		// Register Callout
		if ( !array_key_exists('callout', $components) ) {
			$components['callout'] = '\\Apple_Exporter\\Components\\Collapsible';
		}
		// @TODO: Register a "Alt Card" variation.
		return $components;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}

new Collapsible(true);
