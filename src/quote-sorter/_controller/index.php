<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/quote-sorter` block.
 *
 * @package gutenberg
 */

class Quote_Sorter_Controller extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			require_once plugin_dir_path( __FILE__ ) . '/db/class-shape.php';
			require_once plugin_dir_path( __FILE__ ) . '/db/class-query.php';
			require_once plugin_dir_path( __FILE__ ) . '/db/class-schema.php';
			require_once plugin_dir_path( __FILE__ ) . '/db/class-table.php';

			// Instantiate the Archetypes Table class.
			$db = new Quote_Sorter_Table();

			// Uninstall the database. Uncomment this code to force the database to rebuild.
			// if($db->exists()){
			// $db->uninstall();
			// }

			// If the table does not exist, then create the table.
			if ( ! $db->exists() ) {
				$db->install();
			}
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoints' ) );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return null;
	}


	public function register_rest_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'block/quote-sorter/submit',
			array(
				'methods'  => 'POST',
				'callback' => array( $this, 'submit_quotes' ),
				'args'                => array(
					'hash'  => array(
						'required'          => true,
						'type'              => 'string',
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'quoteData'  => array(
							'required'          => true,
							'type'              => 'string',
							'validate_callback' => function( $param, $request, $key ) {
								return is_string( $param );
							},
						),
					),
				'permission_callback' => '__return_true',
			)
		);
		// retrieve 5 quotes for block render
		register_rest_route(
			'prc-api/v2',
			'block/quote-sorter/retrieve',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'retrieve_quotes' ),
				'args'                => array(
						'hash'  => array(
							'required'          => true,
							'type'              => 'string',
							'validate_callback' => function( $param, $request, $key ) {
								return is_string( $param );
							},
						),
						'limit'  => array(
							'required'          => false,
							'type'              => 'integer',
							'validate_callback' => function( $param, $request, $key ) {
								return is_int( $param );
							},
						),
					),
				'permission_callback' => '__return_true',
			)
		);
	}
	private function add_or_update_quote( $query, $existing_hash, $new_hash, $quoteData ) {
		if ( !empty($query->items)) {
			$row = array_pop($query->items);
			$row_id = $row->id;
			return $success = $query->update_item(
				$row_id,
				array(
					'hash'      => $existing_hash,
					'quotes'    => wp_json_encode( $quoteData ),
				)
			);
		} else {
			return $success = $query->add_item(
				array(
					'hash'      => $new_hash,
					'quotes'    => wp_json_encode( $quoteData ),
				)
			);
		}
	}
	public function submit_quotes( \WP_REST_Request $request ) {
		$data = $request->get_params();
		$quoteData = json_decode( $data['quoteData'], true );
		$existing_hash = $data['hash'];
		$new_hash = md5( wp_json_encode( $quoteData ) );
		// if hash is already set in data
		$query = new Quote_Sorter_Query(
			array(
				'hash'    => $existing_hash,
				'number'  => 1, // Only retrieve a single record.
				'fields'  => array( 'id' ),
				)
			);
		$success = $this->add_or_update_quote( $query, $existing_hash, $new_hash, $quoteData );

		if ( false === $success ) {
			return new \WP_Error( 'quote-sorter-error', 'An error occurred adding the following quotes to database: ' . $hash );
		}
		// return an object with the hash and quoteData
		$hash = !empty($existing_hash) ? $existing_hash : $new_hash;
		return array(
			'hash' => $hash,
			'data' => $quoteData,
		);
	}

	public function retrieve_quotes( \WP_REST_Request $request) {
		$data = $request->get_params();
		$hash = $data['hash'];
		$query = new Quote_Sorter_Query(
			array(
				'hash'    => $hash,
				'number'  => 1, // Only retrieve a single record.
				'fields'  => array( 'id' ),
				)
			);
		if ( !empty($query->items)) {
			$row = array_pop($query->items);
			$row_id = $row->id;
			$quoteData = $query->get_item( $row_id );
			$quoteData = json_decode( $quoteData->quotes, true );
			return array(
				'hash' => $hash,
				'data' => $quoteData,
			);
		} else {
			return new \WP_Error( 'quote-sorter-error', 'No quotes found for hash: ' . $hash );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array());
		//
		$this->enqueue_frontend_assets();
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	public function enqueue_frontend_assets() {
		if ( is_admin() ) {
			return;
		}
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', 2.0, 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'frontend',
			'quote-sorter-controller',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}



	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', 2.0, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-controller',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$script_handle = array_pop( $registered['js'] )['handle'];

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/controller',
			array(
				'editor_script'   => $script_handle,
				// 'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Controller( true );
