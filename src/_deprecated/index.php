<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Register blocks and editor scripts/styles. DO NOT use the `script` frontend attribute when registering a block type.
 * If your block has frontend script asset that needs to be localized load the function `enqueue_frontend_assets`.
 *
 * @return void
 */
function render_prc_depreceated_block_post_publish_date( $attributes, $content, $block ) {
	$post_id             = get_the_ID();
	$date                = get_the_date( 'F j, Y', $post_id );
	$block_wrapper_attrs = get_block_wrapper_attributes(
		array(
			'class' => classNames( 'meta', array( 'item' => $attributes['asItem'] ) ),
		)
	);
	ob_start();
	?>
	<div <?php echo $block_wrapper_attrs; ?>><?php echo wp_kses( $date, 'post' ); ?></div>
	<?php
	return ob_get_clean();
}

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

	$post_publish_date = $enqueue->register(
		'deprecated',
		'post-publish-date',
		array(
			'js'        => true,
			'css'       => false,
			'js_dep'    => array(),
			'css_dep'   => array(),
			'in_footer' => true,
			'media'     => 'all',
		)
	);

	$post_title = $enqueue->register(
		'deprecated',
		'post-title',
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

	register_block_type_from_metadata(
		plugin_dir_path( __DIR__ ) . '/_deprecated/post-publish-date',
		array(
			'editor_script'   => array_pop( $post_publish_date['js'] )['handle'],
			'render_callback' => 'render_prc_depreceated_block_post_publish_date',
		)
	);

	register_block_type_from_metadata(
		plugin_dir_path( __DIR__ ) . '/_deprecated/post-title',
		array(
			'editor_script'   => array_pop( $post_title['js'] )['handle'],
			'render_callback' => function ( $attributes ) {
				if ( array_key_exists( 'title', $attributes ) ) {
					return '<h1>' . $attributes['title'] . '</h1>';
				}
			},
		)
	);
}
