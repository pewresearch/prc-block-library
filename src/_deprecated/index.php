<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Register blocks and editor scripts/styles. DO NOT use the `script` frontend attribute when registering a block type.
 * If your block has frontend script asset that needs to be localized load the function `enqueue_frontend_assets`.
 *
 * @return void
 */
function prc_block_library_register_deprecated_blocks() {
	$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', '1.0.1', 'plugin', PRC_BLOCK_LIBRARY_FILE );

	/** Chapter */
	$chapter = $enqueue->register(
		'deprecated',
		'chapter',
		array(
			'js'        => true,
			'css'       => false,
			'js_dep'    => array(),
			'css_dep'   => array(),
			'in_footer' => true,
			'media'     => 'all',
		)
	);

	/** Chapter */
	register_block_type(
		'prc-block/chapter',
		array(
			'editor_script' => array_pop( $chapter['js'] )['handle'],
		)
	);
}

add_action( 'init', 'prc_block_library_register_deprecated_blocks', 10 );
