<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/popular-listing block.
 *
 * @package gutenberg
 */

class Popular_Listing extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_popular_listing( $attributes, $content, $block ) {
		$block_wrapper_attributes = get_block_wrapper_attributes();
		$post_id = $attributes['postId'];
		$title = $attributes['title'];
		$args = array(
			'postId'   => $post_id,
			'postType' => 'stub',
			'inLoop'   => false,
			'enableMeta' => false,
			'imageSlot' => false,
			'enableExcerpt' => false,
			'title' => $title
		);
		ob_start();
		?>
		<div <?php echo $block_wrapper_attributes;?>>
		<div class="main">
				<span class="big-number"><?php echo ($attributes['enableNumber'] == true ? $attributes['blockIndexAttr'] + 1 : $attributes['blockIndexAttr']);?></span>

				<h2 class="my-class">
					<a href="<?php echo esc_url($attributes['link']);?>"><?php echo esc_attr($attributes['title']);?></a>
				</h2>
				</div>
		</div>
		<?php
		return ob_get_clean();
	}
	

	public function register_block() {
		$js_deps       = array( 'react', 'react-dom', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'wp-components' ) );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'popular-listing',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/popular-listing',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'   => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_popular_listing' ),
			)
		);
	}
}

new Popular_Listing( true );
