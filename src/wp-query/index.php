<?php
// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class WP_Query_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/block/wp-query',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restful_wp_query' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function construct_query_from_attributes( $attributes ) {
		$defaults = array(
			'post_type'      => 'stub',
			'posts_per_page' => 10,
			'post_parent'    => 0, // Do Not Allow Children.
			'post_status'    => 'publish',
			'tax_query'      => array(
				'relation' => 'OR',
			),
		);
		$args     = wp_parse_args( $attributes['queryArgs'], $defaults );

		// Sus out the tax query and anything else you need.

		return new WP_Query( $args );
	}

	public function restful_wp_query( \WP_REST_Request $request ) {
		$attributes = json_decode( $request->get_body(), true );
		$query      = $this->construct_query_from_attributes( $attributes );
		return false;
	}

	/**
	 * Render callback for prc-block/wp-query
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_wp_query( $attributes, $content, $block ) {
		$context = $block->context;
		ob_start();
		print_r( $context, true );
		// We should get innerblocks from $block and treat
		?>
		<h1>Hello World</h1>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/wp-query block.
	 * This block is only usable on PRC prime.
	 *
	 * @uses render_wp_query()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		if ( 1 !== get_current_blog_id() ) {
			return;
		}
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'wp-query',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/wp-query',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_wp_query' ),
			)
		);
	}
}

new WP_Query_Block( true );
