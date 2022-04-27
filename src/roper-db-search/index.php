<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/roper-db-search` block.
 *
 * @package gutenberg
 */

class Roper_DB_Search extends PRC_Block_Library {
	public static $version = '1.0.6';
	public static $api_key = 'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0.KsrSaRyz-tJha0LRp8Q2ExgYd7N4VtbFpJYDBNhCTFIJHLLZeb9numvCSKAmVcfDMifMNJOxQVIJqRVK-k-4PqGGM4X4GSHZ.NPS7eCI_AGeoouYNVTsXQw.v0-gXWrHl813QW_fjUunRaNXo5lQ1c36srZ_0WgVFG2x6AneDam4iamJnRzE1h5tKQQU8GLSSBOMNNSs6HoUSggnJFcmjkgfEwIVyHclxldG3hKnlwZZX9lBla9fZoy158i0LSDbPhIVC3_soJzFuGrYtmoZquDoAa35cclc9Z21J4rOEgkGSQ6Gf2PHcjliyo4XcITVil0YT4AU1pgqewoUAvbriZpyzd96qJ2peTnoDaoxnj6krtyA_oEijVlCkOW9-uCNKvL1rCMTwEP6mewzQ3oG7SO0DHMyZ0IiBhMXjJ5BDt3GkCushYjUfK65nMueaDExFrVcRkC81jIMAgQpvFp6O9ZCJrBITNIrZv89bw57h-clMC0peygmpqPkNe_gqEXXhVUEa_HMD0cQVTbk85tjnCL6SXLgWSIcNQXb0OLJVaMRDXQt58t3Zkxv3lPc2mmam-AvBcShLoJHLwjbVODiWEDadW6cNl17eKHXbjOcca_VIYVTJzCScvhUQWpsqMVzG9LSvLDRpWwlzs1USL5fVL0lHwz2BeaFlGwS1eqy1R0TO9Wjcs5SkRhcv3tWEPkT1c_8WgLx1R_CEh-00DWctOwWdCs760MS4Dcadb_GSBwU8gwyOe9MKMIIcvxnuaJ59xxrb4VnDdVyEsxy803usrL5us7uXZbhTFoi0YMVEyGazF4NH0pyvYqlr5UPYcuvArP82NkfdQ-1anqzKrtdTioSQLHaYttmJeoQjY5tgr-_-tURW5zy-tiVyEQ4boPbj5I3PuNCwAfKpcSVTYsPxQpqgzUq8h3n_-lc5numnQtQ-XstRyAQCf_c7nn0j8zUgCxobLD_ypWF291Req5U2QX_DAi46fnD8AwY07T5uw5JRGUXocDxrfkYUKFG_-DtHaYnxj3MC62ZCXQDdQ0U1uGo5Q-YgGO3XFLGNmz-KosKj-eA3zDeSPC0xYUHbCT0YjN8nMmJIQq8elMVP_82BNzMNpanUhSNscZQ7egYPjxawaVsu1jYWbtVnSWDlwo2WtFsMz1E_G-H2O8cXeLRMLU2dJsiycjAzym8yQ8DG9fr3xVJXVcqD4zgZsjy_z4NeCN4fJeq7tBCZhLH6VyKFdGb1tXR1KA0mBbUyIS0Vb76PebK-tYMM2RuJ_WJGxLMrj90lcy8Jhe_AXAL-5-U0DY1fV6qTvRyC_Zli4iFA4Yu9bLD3ur3ZnZgsSE2PUAgwEl8sJI9tdeszvMu5g4g8lZlkUUtHCcobbuKxVx88PNcl0qvq20hm6aUNG6C8J7NcRlhsI6tTFNgJHZuNE6EUNRvnuPl4bkETAb8Xn2TQjPzpDQBDD4PxpGoMV-77fB3GT0ZQB_rKZygFpipY1TDmHkhr2S9StRvyVb1-U4njMbq_0d-A02IKlX5nnXiJXEJ5lfjhwsEhUmnEl4kerlVA9vfFJvLm_7C63w.GvInjd5Cm9BokfBVuSmTP-zCmntQdNYBtlRiA-7nM8E';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'wp_enqueue_scripts', array($this, 'register_scripts') );
			add_filter( 'query_vars', array( $this, 'register_roper_global_db_query_vars' ) );
		}
	}

	public function register_roper_global_db_query_vars($query_vars) {
		array_push($query_vars, 'qid', 'cntIDs', 'stdIDs');
		return $query_vars;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array());

		$type = $attributes['type'];

		ob_start();
		if ( 'global' === $type ) {
			$iframe_url = 'https://ropercenter.cornell.edu/CFIDE/pewglobal/index.cfm';

			$q_id = get_query_var('qid', false);
			$cnt_ids = get_query_var('cntIDs', false);
			$std_ids = get_query_var('stdIDs', false);
			if ( false !== $q_id ) {
				$q_id = urlencode($q_id);
				$cnt_ids = urlencode($cnt_ids);
				$std_ids = urlencode($std_ids);
				$iframe_url = "https://ropercenter.cornell.edu/CFIDE/pewglobal/question_view.cfm?qid={$q_id}&cntIDs={$cnt_ids}&stdIDs={$std_ids}";
			}

			echo wp_kses(
				"<iframe src='{$iframe_url}' width='100%' height='1300' frameborder='0' hspace='0' vspace='0' scrolling='no' marginwidth='0' marginheight='0' allowtransparency='true' name='post' id='frameSec'></iframe>",
				array( 'iframe' => array(
						'src'               => true,
						'height'            => true,
						'width'             => true,
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
		} else {
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
				'style' => 'roper-db-search',
				'script' => 'roper-db-search',
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Roper_DB_Search( true );
