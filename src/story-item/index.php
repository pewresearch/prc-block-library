<?php

require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {

	public static $css_handle  = false;
	public static $version     = '4.0.0';
	public static $date_format = 'M d, Y';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
			add_action( 'prc_loop_story_item', array( $this, 'loop_story_item' ), 10, 1 );
			add_filter( 'prc_column_block_content', array( $this, 'wrap_consecutive_story_items' ), 10, 1 );
			add_filter( 'prc_related_story_item', array( $this, 'related_story_item' ), 10, 1 );
		}
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
			'postId'                => $post_id,
			'postType'              => 'stub',
			'imageSize'             => 'A3',
			'imageSlot'             => 'disabled',
			'isChartArt'            => false,
			'headerSize'            => 2,
			'enableAltHeaderWeight' => false,
			'enableEmphasis'        => false,
			'enableHeader'          => true,
			'enableExcerpt'         => true,
			'enableExcerptBelow'    => false,
			'enableExtra'           => false,
			'enableBreakingNews'    => false,
			'enableAltTaxonomy'     => false,
			'enableMeta'            => true,
			'inLoop'                => false,
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

		$attrs['title']       = $post->post_title;
		$attrs['description'] = $post->post_excerpt;
		$attrs['date']        = $post->post_date;
		$attrs['label']       = $this->get_label( $post_id, $attrs['enableAltTaxonomy'] );

		if ( 'stub' === $attrs['postType'] ) {
			$attrs['link'] = get_post_meta( $post_id, '_redirect', true );
		} elseif ( 'news-item' === $attrs['postType'] ) {
			$url = get_post_meta( $post_id, 'news-item-options', true );
			if ( is_array( $url ) && array_key_exists( 'url', $url ) ) {
				$url = $url['url'];
			}
			if ( ! empty( get_post_meta( $post_id, '_news_item_url', true ) ) ) {
				$url = get_post_meta( $post_id, '_news_item_url', true );
			}
			$attrs['link'] = $url;
		} else {
			$attrs['link'] = get_permalink( $post_id );
		}

		$art = prc_get_art( $post_id, $attrs['imageSize'] );
		if ( false !== $attrs['imageSlot'] && false !== $art ) {
			$attrs['image']      = $art['rawUrl'];
			$attrs['imageSlot']  = 'left';
			$attrs['className']  = 'is-style-left';
			$attrs['isChartArt'] = $art['chartArt'];
		}

		$attrs = wp_parse_args( $args, $attrs );
		if ( 'stub' === $attrs['postType'] ) {
			restore_current_blog();
		}

		return $attrs;
	}

	public function wrap_consecutive_story_items( $content ) {
		// regex search for adjacent .wp-block-prc-block-story-item divs and wrap in a div with class .ui.divided.very.relaxed.story.items
		$content = preg_replace(
			'/((?:\s*?<\!-- \.wp-block-prc-block-story-item -->.*?(?:(?!class=".*?(column|section-header).*?")\X)*?<\!-- \/\.wp-block-prc-block-story-item -->\s*?){2,})/i',
			'<section class="ui divided relaxed story items" aria-role="feed">${1}</section>',
			$content
		);
		return $content;
	}

	public function related_story_item( $args ) {
		wp_enqueue_style( self::$css_handle );
		$post_id = $args['postId'];

		$attributes = $this->get_attributes_by_object_id( $post_id, $args );
		$story_item = $this->render_story_item( $attributes );
		echo wp_kses( $story_item, 'post' );
	}

	public function loop_story_item( $args ) {
		wp_enqueue_style( self::$css_handle );
		$post_id = $args['postId'];

		$attributes = $this->get_attributes_by_object_id( $post_id, $args );
		$story_item = $this->render_story_item( $attributes, '<div class="description">' . $attributes['description'] . '</div>' );
		echo wp_kses( $story_item, 'post' );
	}

	/**
	 * Get first term in either formats or research-areas (as determined by $reasearch_areas flag)
	 *
	 * @param int  $post_id of post you want to fetch.
	 * @param bool $reasearch_areas flag to enable fetching research-areas taxonomy instead of formats, defaults to false.
	 * @return string
	 */
	private function get_label( int $post_id, $reasearch_areas = false ) {
		$terms = wp_get_object_terms( $post_id, $reasearch_areas ? 'research-teams' : 'formats', array( 'fields' => 'names' ) );
		if ( ! is_wp_error( $terms ) || ! empty( $terms ) ) {
			return array_shift( $terms );
		}
		return 'Report';
	}

	public function get_image( int $post_id, $default_image, $image_size ) {
		// Get art from the post id, use the default image if it differs from the art['imageSize]. 
		$art = prc_get_art( $post_id, $image_size );
		return $default_image;
	}

	/**
	 * Returns formatted html to match new $content method of storing the description "excerpt" and "extras"
	 *
	 * @param mixed $attributes 
	 * @return void 
	 */
	public function legacy_content( $attributes ) {
		$excerpt = array_key_exists( 'excerpt', $attributes ) ? $attributes['excerpt'] : false;
		$extra   = array_key_exists( 'extra', $attributes ) ? $attributes['extra'] : false;
		
		ob_start();
		?>
		<?php if ( false !== $excerpt ) : ?>
			<div class="description">
				<?php echo $excerpt; ?>
			</div>
		<?php endif; ?>
		<?php if ( false !== $extra ) : ?>
			<ul class="extra">
				<?php echo $extra; ?>
			</ul>
		<?php endif; ?>
		<?php
		return ob_get_clean();
	}

	public function get_attributes( $attributes, $context = array() ) {
		// Set post_id to the attribute value, however, if it is false then check block context for the post id.
		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : false;
		$post_id = false === $post_id && array_key_exists( 'postId', $context ) ? $context['postId'] : false;
		
		$post = get_post( $post_id );

		$post_type = array_key_exists( 'postType', $context ) ? $context['postType'] : false;

		// Title, image, description, url, label, date should all first default to the post value however if those values are set in the attributes array then use them.
		$title       = array_key_exists( 'title', $attributes ) ? $attributes['title'] : $post->post_title;
		$description = array_key_exists( 'description', $attributes ) ? $attributes['description'] : $post->post_excerpt;
		$label       = array_key_exists( 'label', $attributes ) ? $attributes['label'] : $this->get_label( 
			$post_id,
			array_key_exists( 'metaTaxonomy', $attributes ) ? $attributes['metaTaxonomy'] : false,
		);
		$date        = gmdate( self::$date_format, strtotime( array_key_exists( 'date', $attributes ) ? $attributes['date'] : $post->post_date ) );
		$url         = array_key_exists( 'link', $attributes ) ? $attributes['link'] : $post->permalink;
		$image       = $this->get_image( $post_id, array_key_exists( 'image', $attributes ) ? $attributes['image'] : '', $attributes['imageSize'] );
		
		$image_slot        = array_key_exists( 'imageSlot', $attributes ) ? $attributes['imageSlot'] : false;
		$image_slot        = 'default' === $image_slot ? 'top' : $image_slot;
		$image_slot        = 'disabled' === $image_slot ? false : $image_slot;
		$image_size        = array_key_exists( 'imageSize', $attributes ) ? $attributes['imageSize'] : false;
		$image_size        = false === $image_slot ? false : $image_size;
		$image_is_bordered = array_key_exists( 'isChartArt', $attributes ) ? $attributes['isChartArt'] : false;
		
		$is_in_loop = array_key_exists( 'queryId', $context ) ? true : false;
		$is_in_loop = false === $is_in_loop && array_key_exists( 'inLoop', $attributes ) ? $attributes['inLoop'] : false;
		
		$enable_breaking_news          = array_key_exists( 'enableBreakingNews', $attributes ) ? $attributes['enableBreakingNews'] : false;
		$enable_description            = array_key_exists( 'enableExcerpt', $attributes ) ? $attributes['enableExcerpt'] : false;
		$enable_alt_description_layout = array_key_exists( 'enableExcerptBelow', $attributes ) ? $attributes['enableExcerptBelow'] : false;
		$enable_emphasis               = array_key_exists( 'enableEmphasis', $attributes ) ? $attributes['enableEmphasis'] : false;
		$enable_extra                  = array_key_exists( 'enableExtra', $attributes ) ? $attributes['enableExtra'] : false;
		$enable_header                 = array_key_exists( 'enableHeader', $attributes ) ? $attributes['enableHeader'] : false;
		$enable_alt_header_weight      = array_key_exists( 'enableAltHeaderWeight', $attributes ) ? $attributes['enableAltHeaderWeight'] : false;
		$enable_meta                   = array_key_exists( 'enableMeta', $attributes ) ? $attributes['enableMeta'] : false;

		$header_size = array_key_exists( 'headerSize', $attributes ) ? $attributes['headerSize'] : 2;

		return array(
			'post_id'                       => $post_id,
			'post_type'                     => $post_type,
			'title'                         => $title,
			'description'                   => $description,
			'label'                         => $label,
			'date'                          => $date,
			'url'                           => $url,
			'image'                         => $image,
			'image_size'                    => $image_size,
			'image_is_bordered'             => $image_is_bordered,
			'image_slot'                    => $image_slot,
			'is_in_loop'                    => $is_in_loop,
			'header_size'                   => $header_size,
			'enable_breaking_news'          => $enable_breaking_news,
			'enable_description'            => $enable_description,
			'enable_alt_description_layout' => $enable_alt_description_layout,
			'enable_emphasis'               => $enable_emphasis,
			'enable_extra'                  => $enable_extra,
			'enable_header'                 => $enable_header,
			'enable_alt_header_weight'      => $enable_alt_header_weight,
			'enable_meta'                   => $enable_meta,
		);
	}

	/**
	 * Renders the `prc-block/story-item` block.
	 * 
	 * Classname: .wp-block-prc-block-story-item
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns story item markup.
	 */
	public function render_story_item( $attributes, $content = false, $block = false ) {
		// Format and extract the attributes into variables.
		$attrs = $this->get_attributes( $attributes, false !== $block ? $block->context : array() );
		extract( $attrs );

		$block_wrapper_attrs = array(
			'class'           => classNames(
				'story item',
				array(
					$image_slot . ' aligned' => $image_slot,
					'bordered'               => $enable_emphasis,
				)
			),
			'data-image-size' => $image_size,
		);
		if ( ! empty( $post_id ) ) {
			$block_wrapper_attrs['id'] = 'post-' . $post_id;
		}
		$block_wrapper_attrs = get_block_wrapper_attributes( $block_wrapper_attrs );

		$image_class = classNames(
			'image',
			array(
				$image_size => $image_size,
				'bordered'  => $image_is_bordered,
			)
		);

		$header_class = classNames(
			'header',
			array(
				'large'  => 1 === $header_size,
				'medium' => 2 === $header_size,
				'small'  => 3 === $header_size,
				'light'  => $enable_alt_header_weight || ! $enable_description,
			)
		);

		// Check for legacy excerpt and reformat to description.
		if ( ( false === $content || empty( $content ) ) && ( array_key_exists( 'excerpt', $attributes ) || array_key_exists( 'extra', $attributes ) ) ) {
			$content = $this->legacy_content( $attributes );
		}
		// Regex remove div with class 'extra' from this string if $enable_extra is false.
		$content = ! $enable_extra ? preg_replace( '/<ul class="extra">(.*?)<\/ul>/s', '', $content ) : $content;
		// Regex remove div with class 'description' from this string if $enable_description is false.
		$content = ! $enable_description ? preg_replace( '/<div class="description">(.*?)<\/div>/s', '', $content ) : $content;

		$story_item_extras = apply_filters(
			'prc_story_item_extra',
			false,
			array(
				'post_type' => $post_type,
				'id'        => $post_id,
			)
		);
		
		ob_start();
		?>
		<?php
		/**
		 * These inline html comments are necessary for a filter to wrap consecutive story items, see 'wrap_consecutive_story_items'
		 */
		?>
		<!-- .wp-block-prc-block-story-item -->
		<article <?php echo $block_wrapper_attrs; ?>>
			<?php
			if ( false !== $image_slot && ! empty( $image ) ) {
				$caption = '';
				// If we can get image id then we can actually grab the caption... for now we'll use the description
				$caption = $description;
				echo "<div class='{$image_class}'><img src='{$image}' alt='{$caption}'/></div>";
			}
			if ( $enable_meta ) {
				echo "<div class='meta'><span class='report label'>{$label}</span> | <span class='date'>{$date}</span></div>";
			}
			if ( $enable_header ) {
				echo "<header class='{$header_class}'><a href='{$url}'>{$title}</a></header>";
			}
			if ( ! empty( $content ) ) {
				echo wp_kses( $content, 'post' );
			}
			if ( $enable_breaking_news ) {
				echo '<ul class="extra-breaking-news"><li><a href="https://www.pewresearch.org/topics/coronavirus-disease-2019-covid-19/" class="kicker-breaking-news">SEE ALL CORONAVIRUS RESEARCH ></a></li></ul>';
			} 
			if ( ! empty( $story_item_extras ) ) {
				echo $story_item_extras;
			}
			?>
		</article>
		<!-- /.wp-block-prc-block-story-item -->
		<?php
		return ob_get_clean();
	}

	/**
	 * Get stub post information by url and return story item attributes.
	 *
	 * @return void 
	 */
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
			'art'       => json_decode( $stub_info['_art'], true ),
		);

		if ( 1 !== $current_site_id ) {
			restore_current_blog();
		}

		return $return;
	}

	/**
	 * Register the story item block.
	 *
	 * @uses render_story_item()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$block_assets = $enqueue->register(
			'blocks',
			'story-item',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		if ( false === self::$css_handle ) {
			self::$css_handle = array_pop( $block_assets['css'] )['handle'];
		}
		
		$registered_block = register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/story-item',
			array(
				'editor_script'   => array_pop( $block_assets['js'] )['handle'],
				'style'           => self::$css_handle,
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);

		if ( false === $registered_block ) {
			new WP_Error(
				'block_registration_failed',
				'Block registration failed',
				array(
					'block_name' => 'story-item',
				)
			);
		}
	}
}

new PRC_Story_Item( true );
