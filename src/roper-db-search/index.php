<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/roper-db-search` block.
 *
 * @package gutenberg
 */

class Roper_DB_Search extends PRC_Block_Library {
	public static $version = '1.0.11';
	public static $api_key = 'eyJhbGciOiJBMjU2R0NNS1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiaXYiOiJfYnVIVWZrZmlGbEROTk5kIiwidGFnIjoiT0VMRjFjTFlmT1hjbzVhY1gtbGg0ZyJ9.OGuHHXieiJAgz6vy85SPRSD70f8P-TCQ0QqNZHaxX4njeXClZ9Yj6QJDc4ZhNWN4T1tRcFZvnVUTkeEcQ2ln5Q.AoGeoWv4AmKvGdKHdzODMg.r6SMKH_2uQiW09Ur6DwFKDt0jUT3nmd16TXCZfbU3avlN-gkEHBxBEPfvik-Yd0E3SWs2kYS_BM2t152OHXMDOw223Z7twj7kXVDEjvUTP9dMYpZMmQQThcgtfnxbZp7z299uilho5Y-KJ_AwCPyw7lcLRbcYWKGo5BPpWgeDh5lymoi2SXpXNfJio2PGzuEdDG_nCIl71iknfzDW4Dlui949a6itUXni1ZDgyVsCeBE7K6nx-U9X72nY0OKEP7_24WNKVHOKcagDUTDuArIbcWKhMlNo0faUk0WHCAyOKemV28rH0M9vR3H03mm_f-vVJqdcqeWQojKjIMS2fJk5MkNMuN5nJOCDAQSFITg79_FIgwraz4K7u036ejxXL7Agulm64pM8nVv4JC5C9Flr94BLtL1xvN66xaCXCfi0trDE_Xf9FCUrHPrhkZNjyHw5Q9jKBT9W1TyzqiOLjvrN7-aW7IqKMwqw-yKamiVOdPBXRdU7YdNkuwkFPxHCbnq-MXY78Boj6HTFdpvF7ZhOs7mdQWonkO5p-N6mnoV0Cm9XsR3qr0iL1n1VQtYUObmOPw-DgQ4K4M1lo3o5DacCkLiN5aAUB8EWNadZslVV_OxeWNcOoQvTFeJrheJnT3aKNl1wM-RjL-jIMMKKnM_FtVVJM9X-qr954WCbyxIkY-aLbc9a-sjkJoN79xmkzRCdqyEXBHNUZsNDoCXtYDNrIQNgQ1eRPBk1zVCHEtiw1VlnCN0vGbv0IcvV7g35TkwSn8iZa4-bsYbnvRnqMLngg9C3rg7NqivhJDW5Qsxbb5J2hJgFZCvLQUm2yGpBcFHbip66Ty-m7BqFu3xiqBFc6fv9Z7NEtmYpq4Aj5ac-jY_zsIYIFxVDxLTDcqtZS8mU_bCheJ8AV3JAg8XExyGeqZji4Cr3LhN-3zGORmrqPdBc5WgpUqBaDkv5-9BtzL183ZhKkfyUnrrnNzInK0kxWUZYEVGD_DPK98hxJG8ECFS0KPtRAyJF6Jiqag3LcUhpp5XChjC9QsW5ad7HThfCDp0FbWvqpanqiOJs5ceRGwDnceqnzSTr5GpPo3XhAYvG2NnEQGFVwZcbJuvHNTIgC5ZvqL9NNsOHx4czkZNTrVyJdMlfs9_wCp6Ch8QobYprgLHv8qfKFal1xjDvw43lkY8LVVPCRk7u6ZRkcW26UkKQe-vQX3haBae0Tfwc7JNHs3sQXJDWXyA5cTmrU3O1vMPXKfTd03vusKjhhimXP_qse6QoRecj5VQijhr30LoYl0xJGO8y6QAahFxhuEdTJeRzVbY1baOS3qKi-8ZjXrYOhzd2R10N5D_zNsMQ_9ids8iR2zUMCUBAUe8qTi-u3GGbmfNOkorZ0NaFrJEMt_Lg7ClCfaE5g8D6cuKiB_fBak9KlS3ElR-nUfZX4Bxo0K-HHiTta9H9OqhDOVhfcU.weh8wCTaXbJpjXwez4yHm_uR1Jr_Kdgg2hPV9UScOX8';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'wp_enqueue_scripts', array($this, 'register_scripts') );
			add_filter( 'query_vars', array( $this, 'register_roper_global_db_query_vars' ) );
		}
	}

	public function register_roper_global_db_query_vars($query_vars) {
		array_push($query_vars, 'qid', 'cntIDs', 'stdIDs', 'keyword', 'keywordtext', 'startdate', 'enddate');
		return $query_vars;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array());

		$type = $attributes['type'];

		ob_start();
		if ( 'global' === $type ) {
			$this->enqueue_frontend();

			$src = 'https://ropercenter.cornell.edu/pewglobal/';
			echo wp_kses(
				"<iframe src='{$src}'
				id='frameSec' width: '100%' ></iframe>",
				array( 'iframe' => array(
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
				window.addEventListener(
					"message",
					function (event) {
					if (
						event.origin === "https://www.pewresearch.org/" //iFrame host
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
					"https://www.pewresearch.org/" //iFrame Host
					);
				});

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
			<?php
		} else {
			wp_enqueue_script('roper-db-search');
			wp_enqueue_style('roper-db-search');

			$sub_text = $attributes['subText'];
			$per_page = $attributes['perPage'];
			?>
			<div id="partner">&nbsp;</div>
			<script>
			document.addEventListener("DOMContentLoaded", function(){
				Roper.mountPartnerSearch(document.querySelector('#partner'), {
					apiKey: "<?php echo self::$api_key;?>",
					subText: "<?php echo $sub_text;?>",
					perPage: <?php echo $per_page;?>,
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

	public function register_scripts() {
		wp_register_script('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$version.'/roper-ps.js', array(), self::$version, true);
		wp_register_style('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$version.'/roper-ps.css', array(), self::$version);
	}

	public function enqueue_frontend() {
		$registered = $this->register_frontend();
		wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
		return array_pop( $registered['js'] )['handle'];
	}
	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'roper-db-search',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'roper-db-search',
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
			plugin_dir_path( __DIR__ ) . '/roper-db-search',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Roper_DB_Search( true );
