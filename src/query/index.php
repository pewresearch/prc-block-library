<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Query_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'block_type_metadata', array( $this, 'filter_block_metadata' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
		}
	}

	public function filter_block_metadata( $metadata ) {
		if ( 'core/query' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'taxQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['taxQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'relation' => 'OR',
					'data'     => array(),
				),
			);
		}
		return $metadata;
	}

	/**
	 * Enqueue a filter plugin for the core/table block. Add's CSV drag and drop support.
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'query',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
}

new Query_Block( true );
