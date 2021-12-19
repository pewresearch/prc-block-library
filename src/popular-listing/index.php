<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;
use \Google_Client as Google_Client;
use \Google_Service_AnalyticsReporting as Google_Service_AnalyticsReporting;

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
			// add_action( 'rest_api_init', array( $this, 'register_google_analytics_endpoint' ) );
		}
	}

	public function register_google_analytics_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/analytics/get-popular-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_top_posts_restfully' ),
				'args'                => array(),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}


	public function init_ga() {
		// Creates and returns the Analytics Reporting service object.

		// Use the developers console and download your service account
		// credentials in JSON format. Place them in this directory or
		// change the key file location if necessary.
		$KEY_FILE_LOCATION = WPCOM_VIP_PRIVATE_DIR . '/prc-google-analytics-keys.json';

		// Create and configure a new client object.
		$client = new Google_Client();
		$client->setApplicationName( 'prc-block-library/popular-listing' );
		$client->setAuthConfig( $KEY_FILE_LOCATION );
		$client->setScopes( array( 'https://www.googleapis.com/auth/analytics.readonly' ) );
		$analytics = new Google_Service_AnalyticsReporting( $client );

		$this->service = $analytics;
	}

	/**
	 * Queries the Analytics Reporting API V4.
	 *
	 * @param service An authorized Analytics Reporting API V4 service object.
	 * @return The Analytics Reporting API V4 response.
	 */
	public function get_ga_report() {
		// Replace with your view ID, for example XXXX.
		$VIEW_ID = '53098246';
	
		// Create the DateRange object.
		$dateRange = new \Google_Service_AnalyticsReporting_DateRange();
		$dateRange->setStartDate( '7daysAgo' );
		$dateRange->setEndDate( 'today' );
	
		// Create the Metrics object.
		$sessions = new \Google_Service_AnalyticsReporting_Metric();
		$sessions->setExpression( 'ga:sessions' );
		$sessions->setAlias( 'sessions' );
	
		// Create the ReportRequest object.
		$request = new \Google_Service_AnalyticsReporting_ReportRequest();
		$request->setViewId( $VIEW_ID );
		$request->setDateRanges( $dateRange );
		$request->setMetrics( array( $sessions ) );
	
		$body = new \Google_Service_AnalyticsReporting_GetReportsRequest();
		$body->setReportRequests( array( $request ) );
		return $this->service->reports->batchGet( $body );
	}

	public function get_top_posts_restfully( \WP_REST_Request $request ) {
		error_log( 'Get Top Posts Restfully, step1:' );
		$this->init_ga();

		error_log( 'Step2:' );
		$results = $this->get_ga_report();
		error_log( print_r( $results, true ) );
	}

	public function render_popular_listing( $attributes, $content, $block ) {
		$block_wrapper_attributes = get_block_wrapper_attributes();
		$post_id                  = $attributes['postId'];
		$title                    = $attributes['title'];
		$url                      = $attributes['url'];

		$args = array(
			'postId'            => $post_id,
			'postType'          => 'stub',
			'inLoop'            => false,
			'enableMeta'        => false,
			'imageSlot'         => false,
			'enableDescription' => false,
			'title'             => $title,
			'title'             => $title,
			'url'               => $url,
		);

		ob_start();
		?>
		<aside <?php echo $block_wrapper_attributes; ?>>
			<div class="big-number"><?php echo ( $attributes['enableNumber'] == true ? $attributes['blockIndexAttr'] + 1 : $attributes['blockIndexAttr'] ); ?></div>
			<?php echo do_action( 'prc_loop_story_item', $args ); ?>
		</aside>
		<?php
		return ob_get_clean();
	}
	

	public function register_block() {
		$js_deps       = array( 'react', 'react-dom', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'wp-components' ) );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

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
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_popular_listing' ),
			)
		);
	}
}

new Popular_Listing( true );
