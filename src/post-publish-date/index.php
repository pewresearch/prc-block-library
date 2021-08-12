<?php
use \WPackio;

/**
 * Server-side rendering of the `prc-block/post-publish-date` block.
 *
 * @package gutenberg
 */

class Post_Publish_Date_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
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

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
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

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/post-publish-date',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Post_Publish_Date_Block( true );
