<?php
namespace PRC\Platform\Blocks;
use WP_Error;

class Apple_News {
	public function __construct() {

	}

	/**
	 * @hook apple_news_initialize_components
	 * @param mixed $components
	 * @return mixed
	 */
	public function load_block_components($components) {
		$block_library_components = apply_filters( 'prc_block_library_apple_news_components', array() );
		$components = array_merge( $components, $block_library_components );
		return $components;
	}


}
