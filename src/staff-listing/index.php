<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Staff_Listing extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/staff-listing',
			array(
				array(
					'methods'  => 'GET',
					'callback'            => array( $this, 'get_staff_restfully' ),
					'args'                => array(
						'staff_types'     => array(
							'default'           => 'staff',
							'validate_callback' => function( $param, $request, $key ) {
								return is_string( $param );
							},
						),
					),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);
	}

	public function get_staff_by_type($type = 'staff') {
		error_log('get_staff_by_type');
		// Order by last name.
		add_filter(
			'posts_orderby',
			function( $orderby_statement, $wp_query ) {
				$orderby_statement = "RIGHT(post_title, LOCATE(' ', REVERSE(post_title)) - 1) ASC";
				return $orderby_statement;
			},
			10,
			2
		);

		$staff_posts = array();

		$args = array(
			'posts_per_page' => 200,
			'post_type'      => 'staff',
			'orderby'        => 'title',
			'tax_query'      => array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'staff-type',
					'field'    => 'slug',
					'terms'    => array( 'former-staff' ),
					'operator' => 'NOT IN',
				),
				array(
					'taxonomy' => 'staff-type',
					'field'    => 'slug',
					'terms'    => $type,
				),
			),
		);

		$staff_query = new WP_Query( $args );

		if ( $staff_query->have_posts() ) {
			// Michael Dimock should always come first in this list.
			if ( 'executive-team' === $type ) {
				$president = $staff_query->posts[2];
				unset( $staff_query->posts[2] );
				array_unshift( $staff_query->posts, $president );
			}

			while ( $staff_query->have_posts() ) {
				$staff_query->the_post();
				$byline             = get_post_meta( get_the_ID(), 'linked_byline_term', true );
				$enable_byline_link = get_post_meta( get_the_ID(), 'promote_to_byline', true );
				if ( true == $enable_byline_link && ! empty( $byline )) {
					$term = get_term( $byline, 'bylines' );
					$link = get_bloginfo( 'url' ) . '/staff/' . $term->slug;
				}
				array_push( $staff_posts, array(
					'name' => get_the_title(),
					'id'   => get_the_ID(),
					'job_title' => get_post_meta( get_the_ID(), 'job_title', true ),
					'byline' => $byline,
					'link' => $link,
				) );
			}
			/* Restore original Post Data */
			wp_reset_postdata();
		}

		return $staff_posts;
	}

	public function get_staff_restfully( \WP_REST_Request $request ) {
		$staff_types = explode(',', $request->get_param( 'staff_types' ));
		$to_return = array();
		foreach( $staff_types as $type ) {
			$to_return[ $type ] = $this->get_staff_by_type( $type );
		}
		return $to_return;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$staff_types = explode(',', $attributes['staffTypes']);
		// Order $staff_types so that 'executive-team' is always first.
		if ( in_array( 'executive-team', $staff_types ) ) {
			$key = array_search( 'executive-team', $staff_types );
			unset( $staff_types[ $key ] );
			array_unshift( $staff_types, 'executive-team' );
		}
		// Order $staff_types so that 'staff' is always last.
		if ( in_array( 'staff', $staff_types ) ) {
			$key = array_search( 'staff', $staff_types );
			unset( $staff_types[ $key ] );
			array_push( $staff_types, 'staff' );
		}

		ob_start();
		foreach ($staff_types as $staff_type_slug) {
			$label = str_replace('-', ' ', $staff_type_slug);
			$label = ucwords($label);
			$staff_posts = $this->get_staff_by_type($staff_type_slug);
			echo '<h2>' . esc_html( $label ) . '</h2>';
			echo '<div class="ui list">';
			foreach ( $staff_posts as $staff_post ) {
				$staff_name = !empty($staff_post['link']) ? '<a href="' . esc_url( $staff_post['link'] ) . '">' . esc_html( $staff_post['name'] ) . '</a>' : esc_html( $staff_post['name'] );
				?>
					<div class="item">
						<p><strong><?php echo $staff_name;?></strong>, <?php echo $staff_post['job_title']; ?></p>
					</div>
				<?php
			}
			echo '</div>';
		}
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'staff-listing',
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
			plugin_dir_path( __DIR__ ) . '/staff-listing',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Staff_Listing( true );
