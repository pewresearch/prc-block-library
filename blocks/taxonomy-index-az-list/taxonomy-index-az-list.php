<?php
/**
 * Block Name:        Taxonomy Index A-Z Listing
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TaxonomyIndexAzList extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'rest_api_init', array( $this, 'register_endpoint' ) );
			add_action( 'init', array($this, 'block_init') );
		}
	}

	public function register_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/taxonomy-index-az-list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'restfully_get_terms_by_letter' ),
				'args'                => array(
					'taxonomy' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'letter' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
				'permission_callback' => function () {
					return current_user_can('read');
				},
			)
		);
	}

	public function restfully_get_terms_by_letter( \WP_REST_Request $request ) {
		$taxonomy = $request->get_param( 'taxonomy' );
		$taxonomy = explode( ',', $taxonomy );
		$letter = $request->get_param( 'letter' );
		return $this->get_terms_by_letter( $taxonomy, $letter );
	}

	/**
	 * Check if string starts with a letter.
	 *
	 * @param mixed $subject
	 * @param mixed $search
	 * @return bool
	 */
	public function starts_with( $subject, $search ) {
		$len = strlen( $search );
		return ( substr( $subject, 0, $len ) === $search );
	}

	public function get_cache_key( $taxonomy, $letter, $excludes ) {
		return md5( wp_json_encode( array_merge( $taxonomy, $excludes, array( 'letter' => $letter ) ) ) );
	}

	public function get_terms_by_letter( $taxonomy = array(), $letter = '', $excludes = array(), ) {
		if ( empty( $letter ) || empty( $taxonomy ) ) {
			return false;
		}

		$cache_key = $this->get_cache_key( $taxonomy, $letter, $excludes );
		$cache     = wp_cache_get( $cache_key, 'prc-block-library' );
		if ( false !== $cache ) {
			return $cache;
		}

		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
				'name__like' => $letter,
				'orderby'    => 'slug',
				'exclude'    => $excludes,
			)
		);

		if ( empty( $terms ) ) {
			return false;
		}

		$return = array();

		foreach ( $terms as $term ) {
			if ( true === $this->starts_with( $term->name, $letter ) ) {
				$return[] = $term;
			}
		}

		wp_cache_set( $cache_key, $return, 'prc-block-library' );

		return $return;
	}

	public function render_block_callback( $attributes, $content ) {
		if ( is_admin() ) {
			return $content;
		}
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'          => $attributes['letter'],
				'data-letter' => $attributes['letter'],
			)
		);
		$terms = $this->get_terms_by_letter( $attributes['taxonomy'], $attributes['letter'], $attributes['exclude'] );
		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<?php if ( array_key_exists( 'disableHeading', $attributes ) && true !== $attributes['disableHeading'] ) {
				echo '<h2>' . filter_block_kses_value( $attributes['letter'], 'post' ) . '</h2>';
			} ?>
			<ul>
			<?php
			foreach ( $terms as $term ) {
				$term_link = get_term_link( $term, $term->taxonomy );
				if ( is_wp_error( $term_link ) ) {
					continue;
				}
				echo '<li><a href="' . esc_url( $term_link ) . '">' . esc_html( $term->name ) . '</a></li>';
			}
			?>
			</ul>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

new TaxonomyIndexAzList(true);
