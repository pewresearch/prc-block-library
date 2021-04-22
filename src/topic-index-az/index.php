<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/topic-index-az` block.
 *
 * @package gutenberg
 */

class Topic_Index_AZ extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_endpoint' ) );
		}
	}

	public function register_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/helpers/get-topic-by-letter',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_topics_by_letter_restfully' ),
				'args'                => array(
					'letter' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
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

	public function term_query_by_letter( $letter, $excludes = array() ) {
		if ( empty( $letter ) ) {
			return false;
		}

		$terms = get_terms(
			array(
				'taxonomy'   => 'topic',
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

		return $return;
	}

	public function get_topics_by_letter_restfully( \WP_REST_Request $request ) {
		$letter = $request->get_param( 'letter' );
		return $this->term_query_by_letter( $letter );
	}

	public function render_topic_index_az( $attributes ) {
		$term_query = $this->term_query_by_letter( $attributes['letter'], explode( ',', $attributes['exclude'] ) );
		ob_start();
		?>
		<div id="<?php echo esc_attr( $attributes['letter'] ); ?>" data-letter="<?php echo esc_attr( $attributes['letter'] ); ?>">
			<h2 class="sans-serif"><?php echo filter_block_kses_value( $attributes['letter'], 'post' ); ?></h2>
			<div class="ui list">
			<?php
			foreach ( $term_query as $term ) {
				$term_link = get_term_link( $term, 'topic' );
				echo '<a href="' . esc_url( $term_link ) . '" class="item">' . esc_html( $term->name ) . '</a>';
			}
			?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-az',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/topic-index-az',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_topic_index_az' ),
			)
		);
	}
}

new Topic_Index_AZ( true );
