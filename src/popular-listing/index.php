<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/popular-listing block.
 *
 * @package gutenberg
 */

class Popular_Listing extends PRC_Block_Library {
	public $service;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_popular_listing( $attributes, $content, $block ) {
		$block_wrapper_attributes = get_block_wrapper_attributes();
		$post_id                  = $attributes['postId'];
		$title                    = $attributes['title'];
		$url                      = $attributes['url'];
		ob_start();
		?>
		<aside <?php echo $block_wrapper_attributes; ?>>
			<div class="big-number"><?php echo ( $attributes['enableNumber'] == true ? $attributes['blockIndexAttr'] + 1 : $attributes['blockIndexAttr'] ); ?></div>
			<a href="<?php echo esc_url($url);?>" class="title"><?php echo $title;?></a>
		</aside>
		<?php
		return ob_get_clean();
	}


	public function register_block() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'popular-listing',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/popular-listing',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_popular_listing' ),
			)
		);
	}
}

new Popular_Listing( true );
