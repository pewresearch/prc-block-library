<?php
/**
 * Roper Database Search Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Roper Database
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein, Ben Wormald
 *
 * @package           prc-block
 */
class Roper_DB_Search {
	/**
	 * Vendor version
	 *
	 * @var string
	 */
	public static $vendor_version = '1.0.11';

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'wp_enqueue_scripts', $this, 'register_vendor_assets' );
			$loader->add_filter( 'query_vars', $this, 'register_global_db_vendor_query_vars' );
		}
	}

	/**
	 * Register vendor assets
	 *
	 * @hook wp_enqueue_scripts
	 */
	public function register_vendor_assets() {
		wp_register_script( 'roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/' . self::$vendor_version . '/roper-ps.js', array(), self::$vendor_version, true );
		wp_register_style( 'roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/' . self::$vendor_version . '/roper-ps.css', array(), self::$vendor_version );
	}

	/**
	 * Add Roper's query vars to the global query vars array
	 *
	 * @hook query_vars
	 *
	 * @param mixed $query_vars Query vars.
	 * @return array $query_vars
	 */
	public function register_global_db_vendor_query_vars( $query_vars ) {
		array_push( $query_vars, 'qid', 'cntIDs', 'stdIDs', 'keyword', 'keywordtext', 'startdate', 'enddate' );
		return $query_vars;
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes( array() );

		ob_start();
		if ( 'global' === $attributes['type'] ) {
			$src = 'https://ropercenter.cornell.edu/pewglobal/';
			echo wp_kses(
				"<iframe src='{$src}'
				id='frameSec' width: '100%' ></iframe>",
				array(
					'iframe' => array(
						'src'               => true,
						'height'            => true,
						'width'             => true,
						'min-width'         => true,
						'frameborder'       => true,
						'allowfullscreen'   => true,
						'hspace'            => true,
						'vspace'            => true,
						'scrolling'         => true,
						'marginwidth'       => true,
						'marginheight'      => true,
						'allowtransparency' => true,
						'name'              => true,
						'id'                => true,
					),
				)
			);
			?>
			<script>
					//Allows react iframe to "navigate" to new URL without reloading the page and iframe
					window.addEventListener(
						"message",
						function (event) {
							if (
							event.origin === "http://localhost:3000" //iFrame host
							) {
							//Handle back button press
							if ("backEvent" in event.data) {
								history.back();
							} else {
								//Handle bookmarkable
								let url =
								window.location.href.split("?")[0] +
								"?" +
								event.data.searchParams;
								if (
								url != window.location.href &&
								url != window.location.href + "?"
								) {
								history.pushState({ url: url }, "", url);
								}
							}
							}
						},
						false
					);
					//Allows browser back button to work without reloading page
					window.addEventListener("popstate", (event) => {
						let iframe = document.getElementById("frameSec");
						let iframeWindow = iframe.contentWindow || iframe.contentDocument;
						let newParams =
							location.href.split("?").length > 1
							? location.href.split("?")[1]
							: "";
						iframeWindow.postMessage(
							{
							searchParams: newParams,
							historyBack: true,
							},
							"http://localhost:3000" //iFrame Host
						);
					});
					// Passes URL params to iFrame
					let iFrame = document.getElementById("frameSec");
					let newSrc =
					iFrame.src +
					(window.location.href.split("?").length > 1
						? "?" + window.location.href.split("?")[1]
						: "");
					if (iFrame.src != newSrc) {
						iFrame.src = newSrc;
					}

			</script>
			<script src="https://s3.amazonaws.com/files.roper.center/iframeResizer.contentWindow.js"></script>
			<?php
		} else {
			wp_enqueue_script( 'roper-db-search' );
			wp_enqueue_style( 'roper-db-search' );
			?>
			<div id="partner">&nbsp;</div>
			<script>
			document.addEventListener("DOMContentLoaded", function(){
				Roper.mountPartnerSearch(document.querySelector('#partner'), {
					apiKey: "<?php echo PRC_PLATFORM_ROPER_API_KEY; ?>",
					subText: "<?php echo $attributes['subText']; ?>",
					perPage: <?php echo $attributes['perPage']; ?>,
					gridLines: false,
					yearOnly: true,
					primaryColor: '#D1A730',
					backgroundColor: '#ECECE3',
					linkColor: '#BC7B2B'
				});
			});
			</script>
			<?php
		}
		$content = ob_get_clean();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/roper-db-search',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
