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
			'/fetch-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'restful_wp_query' ),
				'args'                => array(
					'postType'      => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'formatTermId'  => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'programTermId' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'perPage'       => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'labelTaxonomy' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'expertsOnly'   => array(
						'validate_callback' => function( $param, $request, $key ) {
							error_log( 'expertsOnly' );
							error_log( print_r( $param, true ) );
							return rest_is_boolean( $param );
						},
					),
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
	}

	public function restful_wp_query( \WP_REST_Request $request ) {
		$post_type      = $request->get_param( 'postType' );
		$per_page       = $request->get_param( 'perPage' );
		$label_taxonomy = $request->get_param( 'labelTaxonomy' );

		$fomat_term_id    = $request->get_param( 'formatTermId' );
		$program_term_id  = $request->get_param( 'programTermId' );
		$limit_to_experts = $request->get_param( 'expertsOnly' );

		// If the current site is not 1 then for the format and the program we should get their parent term ids
		if ( 1 !== get_current_blog_id() ) {
			$fomat_term_id   = get_term_meta( $fomat_term_id, '_origin_term_id', true );
			$program_term_id = get_term_meta( $program_term_id, '_origin_term_id', true );
		}

		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => (int) $per_page,
			'post_parent'    => 0, // No Children.
			'tax_query'      => array(
				'relation' => 'AND',
			),
		);

		if ( is_numeric( $program_term_id ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'programs',
				'terms'    => $program_term_id,
				'field'    => 'term_id',
			);
		}

		// Stub Specific:
		if ( is_numeric( $fomat_term_id ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'formats',
				'terms'    => $fomat_term_id,
				'field'    => 'term_id',
			);
		}
		if ( 'stub' === $post_type ) {
			$args['meta_key']         = 'hide_on_index';
			$args['meta_compare_key'] = 'NOT EXISTS';
		}

		// Staff Specific:
		if ( 'true' === $limit_to_experts ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'areas-of-expertise',
				'operator' => 'EXISTS',
			);
		}
		if ( 'staff' === $post_type ) {
			$args['orderby']     = 'title';
			$args['order']       = 'ASC';
			$args['tax_query'][] = array(
				'taxonomy' => 'staff-type',
				'terms'    => 'former-staff',
				'field'    => 'slug',
				'operator' => 'NOT IN',
			);
		}

		$return = array();

		// The Query.
		switch_to_blog( 1 );
		$the_query = new WP_Query( $args );

		// The Loop.
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();

				$post_data = array(
					'id'        => get_the_ID(),
					'title'     => get_the_title(),
					'date'      => get_the_date(),
					'timestamp' => get_the_time( 'c' ),
					'link'      => get_the_permalink(),
					'image'     => get_the_post_thumbnail_url( get_the_ID(), 'large' ),
				);

				if ( 'stub' === $post_type ) {
					$stub_info = get_post_meta( get_the_ID(), '_stub_info', true );
					$term      = get_term_by( 'slug', $stub_info['_taxonomies'][ $label_taxonomy ][0], $label_taxonomy );

					$post_data['label'] = $term->name;
					$post_data['link']  = get_post_meta( get_the_ID(), '_redirect', true );
				}

				$return[] = $post_data;
			}
		}
		/* Restore original Post Data */
		wp_reset_postdata();
		restore_current_blog();

		return $return;
	}

	public function attributes_to_query_args( $attributes ) {

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
		ob_start();
		// We should get innerblocks from $block and treat
		?>
		<h1>Hello World</h1>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/wp-query block.
	 *
	 * @uses render_wp_query()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
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
