<?php

require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;
use function PRC_Core\get_stub_info;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {

	public static $css_handle         = false;
	public static $frontend_js_handle = false;
	public static $version            = '4.0.2';
	public static $date_format        = 'M d, Y';
	public static $cache_invalidate   = '123123a';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'prc_column_block_content', array( $this, 'wrap_consecutive_story_items' ), 10, 1 );
			add_filter( 'prc_related_story_item', array( $this, 'return_story_item' ), 10, 1 );
			add_action( 'prc_loop_story_item', array( $this, 'do_story_item' ), 10, 1 );            
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
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

	public function return_story_item( $args = array() ) {
		$parsed = new WP_Block_Parser_Block( 
			'prc-block/story-item',
			$args,
			array(),
			'',
			'',
		);
		return render_block( (array) $parsed );
	}

	public function do_story_item( $args = array() ) {
		$parsed = new WP_Block_Parser_Block( 
			'prc-block/story-item',
			$args,
			array(),
			'',
			'',
		);
		echo render_block( (array) $parsed );
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
				<?php echo wpautop( $excerpt ); ?>
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

	private function get_url( int $post_id, $post_type = 'post' ) {
		if ( 'post' === $post_type ) {
			return get_permalink( $post_id );
		} elseif ( 'stub' === $post_type ) {
			return get_post_meta( $post_id, '_redirect', true );
		} elseif ( 'news-item' === $post_type ) {
			$url = get_post_meta( $post_id, 'news-item-options', true );
			if ( is_array( $url ) && array_key_exists( 'url', $url ) ) {
				$url = $url['url'];
			}
			if ( ! empty( get_post_meta( $post_id, '_news_item_url', true ) ) ) {
				$url = get_post_meta( $post_id, '_news_item_url', true );
			}
			return $url;
		}
		return false;
	}

	/**
	 * Given an image_size, image_slot, post_id, and post_type return an array of desktop and mobile 1x and 2x image urls.
	 *
	 * @param bool  $image_size 
	 * @param bool  $image_slot 
	 * @param array $args 
	 * @return false|array 
	 */
	private function get_img( $image_size = false, $image_slot = false, $args = array() ) {
		if ( false === $image_size || false === $image_slot ) {
			return false;
		}

		$args = wp_parse_args(
			$args,
			array(
				'post_id'      => false,
				'post_type'    => false,
				'static_image' => false,
			)
		);
		extract( $args );

		// Start new art function here:
		$imgs = false;
		
		$is_stub  = 'stub' === $post_type;
		$art      = prc_get_art( $post_id, $image_size );
		$image_id = false !== $art ? $art['id'] : false;
		
		if ( $is_stub && false !== $image_id ) {
			$stub_info      = get_post_meta( $post_id, '_stub_info', true );
			$origin_site_id = (int) $stub_info['site_id'];
			switch_to_blog( $origin_site_id );
			$imgs = array(
				'desktop' => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
				),
				'mobile'  => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
				),
			);
			restore_current_blog();
		} elseif ( false !== $image_id ) {
			$imgs = array(
				'desktop' => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
				),
				'mobile'  => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
				),
			);
		} elseif ( false === $image_id && false !== $static_image ) {
			$img  = array(
				$static_image,
				null,
				null,
			);
			$imgs = array(
				'desktop' => array(
					'default' => $img,
					'hidpi'   => $img,
				),
				'mobile'  => array(
					'default' => $img,
					'hidpi'   => $img,
				),
			);
		}

		return $imgs;
	}

	/**
	 * Apply business logic to attributes and return as an array ready for extracting into variables.
	 * 
	 * @param mixed $attributes 
	 * @param array $context 
	 * @return mixed 
	 */
	public function get_attributes( $attributes, $context = array() ) {
		error_log( 'context...' . print_r( $attributes, true ) );
		
		$is_mobile = jetpack_is_mobile();
		// Set post_id to the attribute value, however, if it is false then check block context for the post id.
		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : false;
		$post_id = false === $post_id && array_key_exists( 'postId', $context ) ? $context['postId'] : $post_id;

		$cache_key = md5(
			wp_json_encode(
				array_merge(
					$attributes,
					array(
						'id'         => $post_id,
						'mobile'     => $is_mobile,
						'invalidate' => self::$cache_invalidate,
					) 
				) 
			) 
		);

		$cache = get_transient( $cache_key );
		if ( $cache && ! is_preview() ) {
			$cache['cached'] = true;
			return $cache;
		}

		$column_width = array_key_exists( 'prc-block/column/width', $context ) ? $context['prc-block/column/width'] : false;

		$post = get_post( $post_id );

		$is_in_loop = array_key_exists( 'queryId', $context ) ? true : false;
		$is_in_loop = array_key_exists( 'inLoop', $attributes ) ? $attributes['inLoop'] : $is_in_loop;

		$post_type = array_key_exists( 'postType', $context ) ? $context['postType'] : false;
		$post_type = false === $post_type ? $post_type : $post->post_type;

		// Title, image, description, url, label, date should all first default to the post value however if those values are set in the attributes array then use them.
		$title       = array_key_exists( 'title', $attributes ) ? $attributes['title'] : $post->post_title;
		$description = array_key_exists( 'description', $attributes ) ? $attributes['description'] : $post->post_excerpt;
		$label       = array_key_exists( 'label', $attributes ) ? $attributes['label'] : $this->get_label( 
			$post_id,
			array_key_exists( 'metaTaxonomy', $attributes ) ? $attributes['metaTaxonomy'] : false,
		);
		$date        = gmdate( 
			self::$date_format,
			strtotime( array_key_exists( 'date', $attributes ) ? $attributes['date'] : $post->post_date ) 
		);
		$url         = $this->get_url( $post_id, $post_type );
		$url         = array_key_exists( 'link', $attributes ) ? $attributes['link'] : $url;

		$header_size = array_key_exists( 'headerSize', $attributes ) ? $attributes['headerSize'] : 2;
		$header_size = $is_mobile && 1 !== $header_size ? 2 : $header_size;
		
		$image_slot = array_key_exists( 'imageSlot', $attributes ) ? $attributes['imageSlot'] : false;
		$image_slot = 'default' === $image_slot ? 'top' : $image_slot;
		$image_slot = 'disabled' === $image_slot ? false : $image_slot;
		$image_slot = false !== $image_slot && $is_in_loop ? 'left' : $image_slot;
		if ( $is_mobile ) {
			$image_slot = $is_in_loop && in_array( $image_slot, array( 'left', 'right' ) ) ? 'right' : 'top';
		}
		// Set the image size to A1 on mobile, if its in a loop then set it to A3, otherwise deliver whats set in the attributes.
		$image_size = array_key_exists( 'imageSize', $attributes ) ? $attributes['imageSize'] : false;
		$image_size = false === $image_slot ? false : $image_size;
		$image_size = false !== $image_size && $is_mobile ? 'A2' : $image_size;
		$image_size = false !== $image_size && $is_in_loop ? 'A3' : $image_size;

		$image = $this->get_img(
			$image_size,
			$image_slot,
			array(
				'post_id'      => $post_id,
				'post_type'    => $post_type,
				'static_image' => array_key_exists( 'image', $attributes ) ? $attributes['image'] : false,
			)
		);
		// If we can not find an image set the image slot to false to disable it.
		$image_slot = false !== $image ? $image_slot : false;
		
		$image_is_bordered = array_key_exists( 'isChartArt', $attributes ) ? $attributes['isChartArt'] : false;
		$image_is_bordered = false !== $image && array_key_exists( 'bordered', $image ) ? $image['bordered'] : $image_is_bordered;
		
		$enable_breaking_news          = array_key_exists( 'enableBreakingNews', $attributes ) ? $attributes['enableBreakingNews'] : false;
		$enable_description            = array_key_exists( 'enableExcerpt', $attributes ) ? $attributes['enableExcerpt'] : true;
		$enable_alt_description_layout = array_key_exists( 'enableExcerptBelow', $attributes ) ? $attributes['enableExcerptBelow'] : false;
		$enable_emphasis               = array_key_exists( 'enableEmphasis', $attributes ) ? $attributes['enableEmphasis'] : false;
		$enable_extra                  = array_key_exists( 'enableExtra', $attributes ) ? $attributes['enableExtra'] : false;
		$enable_header                 = array_key_exists( 'enableHeader', $attributes ) ? $attributes['enableHeader'] : true;
		$enable_alt_header_weight      = array_key_exists( 'enableAltHeaderWeight', $attributes ) ? $attributes['enableAltHeaderWeight'] : false;
		$enable_meta                   = array_key_exists( 'enableMeta', $attributes ) ? $attributes['enableMeta'] : true;

		$variables = array(
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

		if ( ! is_preview() ) {
			set_transient( $cache_key, $variables, 30 * MINUTE_IN_SECONDS );
		}

		return $variables;
	}

	public function render_image( $image, $image_size, $image_is_bordered ) {
		if ( false === $image ) {
			return false;
		}

		// @TODO, i would like to re-model the art-direction data model to include hidpi and small sizes for image slots.
		$sources = array(
			'desktop' => wp_sprintf( 
				'<source srcset="%s 1x, %s 2x" media="(min-width: 768px)">',
				$image['desktop']['default'][0],
				$image['desktop']['hidpi'][0]
			),
			'mobile'  => wp_sprintf( 
				'<source srcset="%s 1x, %s 2x" media="(max-width: 767px)">',
				$image['mobile']['default'][0],
				$image['mobile']['hidpi'][0]
			),
		);

		// Get art?
		$image_class = classNames(
			'image',
			array(
				$image_size => $image_size,
				'bordered'  => $image_is_bordered,
			)
		);
		ob_start();
		?>
		<div class="<?php echo esc_attr( $image_class ); ?>">
			<picture>
				<?php echo $sources['desktop']; ?>
				<?php echo $sources['mobile']; ?>
				<img srcset="<?php echo esc_url( $image['desktop']['default'][0] ); ?>" height="<?php echo esc_attr( $image['desktop']['default'][1] ); ?>" width="<?php echo esc_attr( $image['desktop']['default'][2] ); ?>">
			</picture>
		</div>
		<?php
		return ob_get_clean();
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

		error_log(
			'checking attrs...' .
			print_r(
				array(
					'attrs'         => $attrs,
					'attributesRaw' => $attributes,
				),
				true 
			) 
		);

		$image_markup = $this->render_image( $image, $image_size, $image_is_bordered );
		$image_slot   = false === $image_markup ? false : $image_slot; // If no image then don't show the image slot.

		$block_wrapper_attrs = array(
			'class' => classNames(
				'story item',
				array(
					$image_slot . ' aligned' => $image_slot,
					'bordered'               => $enable_emphasis,
				)
			),
		);
		if ( ! empty( $image_size ) ) {
			$block_wrapper_attrs['data-image-size'] = $image_size;
		}
		if ( array_key_exists( 'cached', $attrs ) ) {
			$block_wrapper_attrs['data-cached'] = true;
		}
		if ( ! empty( $post_id ) ) {
			$block_wrapper_attrs['id'] = 'post-' . $post_id;
		}
		$block_wrapper_attrs = get_block_wrapper_attributes( $block_wrapper_attrs );

		$header_class = classNames(
			'header',
			array(
				'large'  => 1 === $header_size,
				'medium' => 2 === $header_size,
				'small'  => 3 === $header_size,
				'light'  => $enable_alt_header_weight || ! $enable_description,
			)
		);

		// Fallback for non gutenberg story items and older story items from gutenberg.
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
			$markup = '';
			if ( $enable_meta ) {
				$markup .= "<div class='meta'><span class='report label'>{$label}</span> | <span class='date'>{$date}</span></div>";
			}
			if ( false !== $image_slot ) {
				$markup .= $image_markup;
			}
			if ( $enable_header ) {
				$markup .= "<header class='{$header_class}'><a href='{$url}'>{$title}</a></header>";
			}
			if ( ! empty( $content ) ) {
				$markup .= $content;
			}
			if ( $enable_breaking_news ) {
				$markup .= '<ul class="extra-breaking-news"><li><a href="https://www.pewresearch.org/topics/coronavirus-disease-2019-covid-19/" class="kicker-breaking-news">SEE ALL CORONAVIRUS RESEARCH ></a></li></ul>';
			} 
			if ( ! empty( $story_item_extras ) ) {
				$markup .= $story_item_extras;
			}
			echo wp_kses( $markup, 'post' );
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
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

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

		$frontend_assets = $enqueue->register(
			'frontend',
			'story-item',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		if ( false === self::$frontend_js_handle ) {
			self::$frontend_js_handle = array_pop( $frontend_assets['js'] )['handle'];
		}
		
		$registered_block = register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/story-item',
			array(
				'render_callback' => array( $this, 'render_story_item' ),
				'editor_script'   => array_pop( $block_assets['js'] )['handle'],
				'style'           => self::$css_handle,
				'script'          => self::$frontend_js_handle,
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
