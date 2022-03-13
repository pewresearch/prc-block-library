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

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Social_Link extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			// Ensure new frontend script is running even on template functions.
			add_filter(
				'prc_social_link_icon',
				function( $markup, $attributes ) {
					$this->enqueue_frontend_script();
					return $markup;
				},
				10,
				2
			);
		}
	}

	public function enqueue_frontend_script() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', PRC_BLOCK_LIBRARY_FILE );
		return $enqueue->enqueue(
			'deprecated',
			'social-link-frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array( 'wp-dom-ready', 'wp-url' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	/**
	 * Renders the `prc-block/social-link` block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_social_link_block( $attributes, $content, $block ) {
		if ( ! is_object( $block ) ) {
			return '';
		}
		return apply_filters( 'prc_social_link_icon', false, $attributes );
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', PRC_BLOCK_LIBRARY_FILE );

		$block = $enqueue->register(
			'deprecated',
			'social-link',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/_deprecated/social-link',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'render_callback' => array( $this, 'render_social_link_block' ),
			)
		);
	}
}

new PRC_Social_Link( true );
