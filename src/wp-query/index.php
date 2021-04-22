<?php
// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class WP_Query_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
		}
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/block/wp-query',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'restful_wp_query' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function parse_tax_query( $tax_query ) {
		$parsed             = array();
		$parsed['relation'] = array_key_exists( 'relation', $tax_query ) ? $tax_query['relation'] : 'OR';
		foreach ( $tax_query['data'] as $tax_arg ) {
			$parsed[] = array(
				'taxonomy' => $tax_arg['taxonomy'],
				'terms'    => $tax_arg['terms'],
				'field'    => 'term_id',
			);
		}
		return $parsed;
	}

	public function construct_query_from_attributes( $attributes ) {
		$args = array(
			'post_type'      => 'stub',
			'posts_per_page' => $attributes['postsPerPage'],
			'post_parent'    => 0, // Do Not Allow Children.
			'post_status'    => 'publish',
			'tax_query'      => $this->parse_tax_query( $attributes['taxQuery'] ),
		);
		return new WP_Query( $args );
	}

	public function restful_wp_query( \WP_REST_Request $request ) {
		$attributes = json_decode( $request->get_body(), true );
		$query      = $this->construct_query_from_attributes( $attributes );
		$return     = array();
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$return[] = array(
					'id'      => get_the_ID(),
					'title'   => get_the_title(),
					'excerpt' => apply_filters( 'the_content', get_the_excerpt() ),
					'date'    => get_the_date(),
					'link'    => get_the_permalink(),
					'label'   => 'Report',
				);
			}
		}
		return $return;
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

		$template = array(
			// 'core/heading'         => array(
			// 'level'      => 3,
			// 'content'    => 'post_title',
			// 'contentTag' => '<h3>',
			// ),
			// 'core/paragraph'       => array(
			// 'content'    => 'post_excerpt',
			// 'contentTag' => '<p>',
			// ),
			'prc-block/story-item' => array(
				'inLoop'    => true,
				'imageSize' => $attributes['storyItemImageSize'],
				'imageSlot' => $attributes['storyItemImageSlot'],
			),
			
		);
		$template = apply_filters( 'prc-block-wp-query-template', $template );

		$as_columns = array_key_exists( 'className', $attributes ) && 'is-style-columns' === $attributes['className'];

		$query = $this->construct_query_from_attributes( $attributes );
		ob_start();
		?>
		<?php
		if ( $query->have_posts() ) {
			if ( true === $as_columns ) {
				echo '<div class="ui equal width stackable grid">';
			}
			while ( $query->have_posts() ) {
				$query->the_post();

				foreach ( $template as $block_name => $block_attrs ) {
					// If this is a story item use the helper function to gather up the correct default attributes.

					$block = array(
						'blockName' => $block_name,
						'attrs'     => array(),
					);
					
					if ( 'prc-block/story-item' === $block_name ) {
						$block['attrs'] = prc_get_story_item(
							get_the_ID(),
							array_merge(
								$block_attrs,
								array(
									'postType' => get_post_type(),
								)
							),
							true
						);
						if ( $as_columns ) {
							$block['attrs']['imageSlot'] = 'top';
							$block['attrs']['className'] = 'is-style-top';
						}
					} else {
						if ( array_key_exists( 'level', $block_attrs ) ) {
							$block['attrs']['level'] = $block_attrs['level'];
						}
						if ( array_key_exists( 'content', $block_attrs ) ) {
							$block['attrs']['content'] = get_post_field( $block_attrs['content'], get_the_ID(), 'raw' );
							$block['innerBlocks']      = array();
							$block['innerHtml']        = $block_attrs['contentTag'] . $block['attrs']['content'] . str_replace( '<', '</', $block_attrs['contentTag'] );
							$block['innerContent']     = array(
								$block['innerHtml'],
							);
						}
					}

					if ( empty( $block['attrs'] ) ) {
						return; 
					}

					$block = render_block( $block );
					$block = true === $as_columns ? '<div class="column">' . $block . '</div>' : $block;
					echo wp_kses( $block, 'post' );                 
				}
			}
			if ( true === $as_columns ) {
				echo ' </div > ';
			}
		}
		wp_reset_postdata();
		?>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/wp-query block.
	 * This block is only usable on PRC prime.
	 *
	 * @uses render_wp_query()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		if ( 1 !== get_current_blog_id() ) {
			return;
		}
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

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
