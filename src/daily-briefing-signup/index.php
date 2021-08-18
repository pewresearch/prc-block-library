<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/daily-briefing-signup` block.
 *
 * @package gutenberg
 */

class Daily_Briefing_Signup extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
		}
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/daily-briefing-signup',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_latest_daily_briefing_restfully' ),
				'args'                => array(),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function get_latest_daily_briefing_restfully( \WP_REST_Request $request ) {
		$site_id = get_current_blog_id();
		
		if ( 8 !== $site_id ) {
			switch_to_blog( 8 );
		}

		$response = false;

		// New wp_query to get the latest 1 daily-briefing post
		$query = new WP_Query(
			array(
				'post_type'      => 'daily-briefings',
				'posts_per_page' => 1,
				'orderby'        => 'date',
				'order'          => 'DESC',
			)
		);
		
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				global $post;
				$response = $post;
			}
		}
		
		if ( 8 !== $site_id ) {
			restore_current_blog();
		}
		
		return $response;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		ob_start();
		?>
		<?php echo wp_kses( $content, 'post' ); ?>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'daily-briefing-signup',
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
			plugin_dir_path( __DIR__ ) . '/daily-briefing-signup',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Daily_Briefing_Signup( true );
