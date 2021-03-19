<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {

	public static $version      = '3.0.0';
	public static $block_assets = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
		}
	}

	private function cherry_pick_attr( $needle, $haystack ) {
		if ( array_key_exists( $needle, $haystack ) ) {
			return $haystack[ $needle ];
		}
		return null;
	}

	/**
	 * Get first term in either formats or programs (as determined by $programs flag)
	 *
	 * @param int  $post_id of post you want to fetch.
	 * @param bool $programs flag to enable fetching programs taxonomy instead of formats, defaults to false.
	 * @return string
	 */
	private function get_label( int $post_id, $programs = false ) {
		$terms = wp_get_object_terms( $post_id, $programs ? 'programs' : 'formats', array( 'fields' => 'names' ) );
		if ( ! is_wp_error( $terms ) || ! empty( $terms ) ) {
			return array_shift( $terms );
		}
		return 'Report';
	}

	/**
	 * Given a post id construct a post's story item attributes.
	 * Defaults to pub listing options (stub, image slot left, A3 image size) but these can be overriden by passing in $args (array).
	 *
	 * @param int   $post_id of post you want to fetch.
	 * @param array $args option arguments to override defaults.
	 * @return array
	 */
	public function get_attributes_by_object_id( int $post_id, $args = array() ) {
		$defaults = array(
			'postID'                 => $post_id,
			'postType'               => 'stub',
			'imageSize'              => 'A3',
			'imageSlot'              => 'disabled',
			'isChartArt'             => false,
			'headerSize'             => 2,
			'enableAltHeaderWeight'  => false,
			'enableEmphasis'         => false,
			'enableHeader'           => true,
			'enableExcerpt'          => true,
			'enableExcerptBelow'     => false,
			'enableExtra'            => false,
			'enableBreakingNews'     => false,
			'enableProgramsTaxonomy' => false,
			'inLoop'                 => false,
		);
		$attrs    = wp_parse_args( $args, $defaults );

		if ( 'stub' === $attrs['postType'] ) {
			switch_to_blog( 1 );
		}

		$post = get_post( $post_id );

		if ( is_wp_error( $post ) ) {
			restore_current_blog();
			return $post;
		}

		$attrs['title']   = $post->post_title;
		$attrs['excerpt'] = $post->post_excerpt;
		$attrs['date']    = $post->post_date;

		$attrs['label'] = $this->get_label( $post_id, $attrs['enableProgramsTaxonomy'] );

		$art = prc_get_art( $post_id, $attrs['imageSize'] );
		if ( false !== $attrs['imageSlot'] && false !== $art ) {
			$attrs['image']     = $art['rawUrl'];
			$attrs['imageSlot'] = 'left';
			$attrs['className'] = 'is-style-left';
		}

		if ( 'stub' === $attrs['postType'] ) {
			$attrs['link'] = get_post_meta( $post_id, '_redirect', true );
		} else {
			$attrs['link'] = get_permalink( $post_id );
		}

		$attrs = wp_parse_args( $args, $attrs );
		if ( 'stub' === $attrs['postType'] ) {
			restore_current_blog();
		}

		return $attrs;
	}

	/**
	 * Renders the `prc-block/story-item` placeholder block.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns story item placeholder markup.
	 */
	public function render_story_item( $attributes, $content = '' ) {
		$image_size = $this->cherry_pick_attr( 'imageSize', $attributes );
		$image_slot = $this->cherry_pick_attr( 'imageSlot', $attributes );
		$stacked    = ( 'top' === $image_slot || 'bottom' === $image_slot );
		$post_id    = $this->cherry_pick_attr( 'postID', $attributes );
		$label      = $this->cherry_pick_attr( 'label', $attributes );
		$date       = $this->cherry_pick_attr( 'date', $attributes );
		$title      = $this->cherry_pick_attr( 'title', $attributes );
		// Check for legacy excerpt
		preg_match( '/<p>(.*)<\/p>/', $content, $matches );
		if ( $matches && substr( $matches[0], 0, 3 ) === '<p>' ) {
			$excerpt = $matches[0];
		} else {
			$excerpt = $this->cherry_pick_attr( 'excerpt', $attributes );
		}
		$extra = $this->cherry_pick_attr( 'extra', $attributes );

		$story_item_class = 'ui item story is-style-' . $image_slot;
		if ( $stacked ) {
			$story_item_class .= ' stacked';
		}

		$this->enqueue_frontend();

		ob_start();
		?>
		<div
			class="<?php echo esc_attr( classNames( 'react-story-item', $this->cherry_pick_attr( 'className', $attributes ) ) ); ?>"
			data-label="<?php echo esc_attr( $label ); ?>"
			data-date="<?php echo esc_attr( $date ); ?>"
			data-link="<?php echo esc_attr( $this->cherry_pick_attr( 'link', $attributes ) ); ?>"
			data-image="<?php echo esc_attr( $this->cherry_pick_attr( 'image', $attributes ) ); ?>"
			data-imageSlot="<?php echo esc_attr( $image_slot ); ?>"
			data-imageSize="<?php echo esc_attr( $image_size ); ?>"
			data-headerSize="<?php echo esc_attr( $this->cherry_pick_attr( 'headerSize', $attributes ) ); ?>"
			data-classname="<?php echo esc_attr( $this->cherry_pick_attr( 'className', $attributes ) ); ?>"
			data-emphasis="<?php echo esc_attr( $this->cherry_pick_attr( 'enableEmphasis', $attributes ) ); ?>"
			data-breakingNews="<?php echo esc_attr( $this->cherry_pick_attr( 'enableBreakingNews', $attributes ) ); ?>"
			data-excerptbelow="<?php echo esc_attr( $this->cherry_pick_attr( 'enableExcerptBelow', $attributes ) ); ?>"
			data-chartArt="<?php echo esc_attr( $this->cherry_pick_attr( 'isChartArt', $attributes ) ); ?>"
			data-inLoop="<?php echo esc_attr( $this->cherry_pick_attr( 'inLoop', $attributes ) ); ?>"
		>
			<div
				id="<?php echo esc_attr( 'post-' . $post_id ); ?>"
				class="<?php echo esc_attr( $story_item_class ); ?>"
			>
				<?php
				if ( in_array( $image_slot, array( 'left', 'top' ) ) ) {
					echo "<div class='{$image_size} image'><div class='ui fluid placeholder'><div class='image'></div></div></div>";
				}
				?>
				<div class="content">
					<div class="ui fluid placeholder">
						<div class="header">
							<div class="line"></div>
							<div class="line"></div>
						</div>
						<div class="paragraph">
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
							<div class="line"></div>
						</div>
					</div>
				</div>
				<?php
				if ( in_array( $image_slot, array( 'right', 'bottom' ) ) ) {
					echo "<div class='{$image_size} image'><div class='ui fluid placeholder'><div class='image'></div></div></div>";
				}
				?>
				<div class="hidden">
					<?php
					if ( true === $this->cherry_pick_attr( 'enableHeader', $attributes ) ) {
						echo "<div class='title'>{$title}</div>";
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExcerpt', $attributes ) ) {
						echo "<div class='description'>{$excerpt}</div>";
					}
					?>
					<?php
					if ( true === $this->cherry_pick_attr( 'enableExtra', $attributes ) ) {
						echo "<ul class='extra'>{$extra}</ul>";
					}
					?>
					<?php
					do_action(
						'prc_story_item_extra',
						array(
							'post_type' => get_post_type( $post_id ),
							'id'        => $post_id,
						),
					);
					?>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/helpers/get-post-by-url',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_stub_post_by_post_url_restfully' ),
				'args'                => array(),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	private function get_fact_tank_post_by_slug( $slug ) {
		if ( ! is_string( $slug ) ) {
			return false;
		}
		$args  = array(
			'name'        => $slug,
			'post_type'   => 'fact-tank',
			'post_status' => 'publish',
			'numberposts' => 1,
		);
		$posts = get_posts( $args );
		if ( $posts ) {
			return $posts[0]->ID;
		} else {
			return false;
		}
	}

	public function get_stub_post_by_post_url_restfully( \WP_REST_Request $request ) {
		$url = json_decode( $request->get_body(), true );
		if ( ! array_key_exists( 'url', $url ) ) {
			return new WP_Error(
				404,
				'No url given',
				array(
					'url' => false,
				)
			);
		}

		$url = $url['url'];

		$current_site_id = get_current_blog_id();

		$site_id = prc_get_site_id_from_url( $url );
		if ( false == $site_id ) {
			return new WP_Error(
				404,
				'No site ID found for url',
				array(
					'url' => $url,
				)
			);
		}

		switch_to_blog( $site_id );
		// If url contains fact-tank right after the url then go get the slug and fetch post that way.
		if ( false !== strpos( $url, '/fact-tank/' ) ) {
			$slug    = basename( $url );
			$post_id = $this->get_fact_tank_post_by_slug( $slug );
		} else {
			$post_id = prc_get_post_id_from_url( $url );
		}
		if ( 0 === $post_id ) {
			return new WP_Error(
				404,
				'Could not find object from given url',
				array(
					'url' => $url,
				)
			);
		}

		$stub_id = get_post_meta( $post_id, '_stub_post', true );
		if ( ! $stub_id ) {
			return new WP_Error(
				404,
				'Given object does not have a stub post',
				array(
					'id'  => $post_id,
					'url' => $url,
				)
			);
		}
		restore_current_blog();

		if ( 1 !== $current_site_id ) {
			switch_to_blog( 1 );
		}

		$stub_post = get_post( $stub_id );
		if ( false === $stub_post ) {
			return new WP_Error(
				404,
				'Stub object could not be fetched',
				array(
					'id'      => $post_id,
					'stub_id' => $stub_id,
					'site_id' => $site_id,
					'url'     => $url,
				)
			);
		}

		$stub_info = get_post_meta( $stub_post->ID, '_stub_info', true );

		$format_term = get_term_by( 'slug', $stub_info['_taxonomies']['formats'][0], 'formats' );

		$return = array(
			'id'        => $stub_post->ID,
			'title'     => esc_attr( $stub_post->post_title ),
			'excerpt'   => "<p>{$stub_post->post_excerpt}</p>",
			'date'      => get_the_date( 'M d, Y', $stub_post->ID ),
			'timestamp' => get_the_time( 'c', $stub_post->ID ),
			'label'     => $format_term->name,
			'link'      => get_post_meta( $stub_post->ID, '_redirect', true ),
			'art'       => $stub_info['_art'],
		);

		if ( 1 !== $current_site_id ) {
			restore_current_blog();
		}

		return $return;
	}

	public function register_frontend() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'moment', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->register(
			'story-item',
			'frontend',
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

	public function enqueue_frontend() {
		$registered = $this->register_frontend();
		wp_enqueue_script( array_pop( $registered['js'] )['handle'] );
	}

	/**
	 * Register the story item block.
	 *
	 * @uses render_story_item()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill', 'lodash', 'wp-components' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$block_assets = $enqueue->register(
			'story-item',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/story-item',
			array(
				'editor_script'   => array_pop( $block_assets['js'] )['handle'],
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}
}

new PRC_Story_Item( true );

/**
 * By default should only load A3 left aligned stubs, can be modified through args.
 */
function prc_get_story_item( $stub_post_id, $args = array() ) {
	$story_item = new PRC_Story_Item( false );
	$attributes = $story_item->get_attributes_by_object_id( $stub_post_id, $args );
	return $story_item->render_story_item( $attributes );
}
