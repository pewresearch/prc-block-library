<?php
/**
 * Block Name:        Story Item
 * Version:           4.0.10
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class StoryItem extends PRC_Block_Library {

	public static $block_name          = 'prc-block/story-item';
	public static $version             = '4.0.11';
	public static $dir                 = __DIR__;
	public static $date_format         = 'M j, Y';
	public static $cache_invalidate    = '01-22-2023';
	public static $cache_ttl           = 10 * MINUTE_IN_SECONDS;
	public static $stub_disabled_sites = array(
		17,
		19
	);

	public function __construct( $init = false ) {
		if ( true === $init ) {
			if ( defined('PRC_PLATFORM') && true === PRC_PLATFORM ) {
				add_filter( 'prc_return_story_item', array( $this, 'return_story_item' ), 10, 1 );
				add_action( 'prc_do_story_item', array( $this, 'do_story_item' ), 10, 1 );
				add_action( 'prc_core_on_stub_update', array( $this, 'clear_index_cache_on_stub_update' ), 10, 1 );
			}
			add_action( 'init', array($this, 'block_init') );
			// require_once plugin_dir_path(self::$dir) . '/inc/newsletter-glue.php';
		}
	}

	public function allow_debug_output() {
		return false;
	}

	public function return_story_item( $args = array() ) {
		$parsed = new WP_Block_Parser_Block(
			'prc-block/story-item',
			$args,
			array(),
			'',
			array(),
		);
		return render_block( (array) $parsed );
	}

	public function do_story_item( $args = array() ) {
		$story_item = $this->return_story_item( $args );
		echo wp_kses( $story_item, 'post' );
	}

	private function get_excerpt( int $post_id, $attributes = array() ) {
		if ( array_key_exists('postType', $attributes) && 'news-item' === $attributes['postType'] ) {
			return false;
		}
		$excerpt = array_key_exists( 'excerpt', $attributes ) ? $attributes['excerpt'] : false;
		$post_excerpt = get_the_excerpt($post_id);
		return (false === $excerpt && !empty($post_excerpt)) ? $post_excerpt : $excerpt;
	}

	/**
	 * Returns formatted html to match new $content method of storing the excerpt "excerpt" and "extras"
	 *
	 * @param mixed $attributes
	 * @return void
	 */
	private function get_content( $attributes ) {
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

	private function get_taxonomy( $attributes = array() ) {
		$taxonomy = array_key_exists( 'metaTaxonomy', $attributes ) ? $attributes['metaTaxonomy'] : false;
		$taxonomy = in_array( get_current_blog_id(), self::$stub_disabled_sites ) ? 'category' : $taxonomy;
		return $taxonomy;
	}

	/**
	 * Get the label for the story item.
	 * @param int $post_id - the post id of the post
	 * @param bool $post_type - the post type of the post
	 * @param array $attributes - the attributes of the block, used to get the label and the taxonomy.
	 * @return string
	 */
	private function get_label( int $post_id, $post_type = false, $attributes = array() ) {
		if ( array_key_exists( 'label', $attributes ) ) {
			$label = $attributes['label'];
		}

		$taxonomy = $this->get_taxonomy( $attributes );

		if ( empty( $label ) ) {
			if ('dataset' === $post_type ) {
				$label = 'Dataset';
			}

			$terms = wp_get_object_terms( $post_id, $taxonomy, array( 'fields' => 'names' ) );
			if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
				// Get the first term.
				$label = array_shift( $terms );
			}
		}

		if ( empty( $label ) ) {
			$label = 'report';
		}

		// @TODO: pewresearch/pewresearch-org#2890 - in progress as of 4.0.10, remove this when done.
		$label = 'fact-tank' === $label ? 'short-read' : $label;

		if ( 'disabled' === $taxonomy || 'news-item' === $post_type ) {
			$label =  '';
		}

		// Ensure label is lowercase and has no dashes.
		return strtolower( str_replace( '-', ' ', $label ) );
	}

	/**
	 * Get the url for the story item, run through a series of checks to ensure we have a valid url depending on post type and attributes.
	 * @param int $post_id
	 * @param string $post_type
	 * @param array $attributes
	 * @return mixed
	 */
	private function get_url( int $post_id, $post_type = 'post', $attributes = array() ) {
		$url = array_key_exists( 'url', $attributes ) ? $attributes['url'] : false;

		if ( empty( $url ) ) {
			if ( 'stub' === $post_type ) {
				$url = get_post_meta( $post_id, '_redirect', true );
			} elseif ( 'news-item' === $post_type ) {
				$url = get_post_meta( $post_id, 'news-item-options', true );
				if ( is_array( $url ) && array_key_exists( 'url', $url ) ) {
					$url = $url['url'];
				}
				if ( ! empty( get_post_meta( $post_id, '_news_item_url', true ) ) ) {
					$url = get_post_meta( $post_id, '_news_item_url', true );
				}
			} else {
				// First, assume this is a stub post thats slightly malformed.
				// If that's not the case, then we'll just use the permalink.
				$url = get_post_meta( $post_id, '_redirect', true );
				if ( empty( $url ) ) {
					$url = get_permalink( $post_id );
				}
				if ( false === $url ) {
					//@TODO: change this to just return a wp_error, and let the caller handle it.
					do_action('qm/debug', new WP_Error(
						'401',
						'Story item malformed, can not find a url for post id: ' . $post_id,
						$attributes,
					));
				}
			}
		}

		return $url;
	}

	/**
	 * Get the date for the story item.
	 * @param int $post_id
	 * @param array $attributes - the attributes of the block, used to get the date.
	 * @return false|string
	 */
	private function get_date( int $post_id, $attributes = array() ) {
		$date = array_key_exists( 'date', $attributes ) ? $attributes['date'] : false;
		if ( false === $date ) {
			return get_the_date(self::$date_format, $post_id);
		}
		return gmdate(
			self::$date_format,
			strtotime( $date )
		);
	}

	/**
	 * Get the image slot for the story item.
	 * @param array $attributes - the attributes of the block, used to get the image slot - left, right, top, bottom, default "top", and disabled.
	 * @param bool $in_loop - whether or not the story item is in a loop, changes image slot on desktop and on mobile.
	 * @param bool $is_mobile - whether or not the story item is viewed on a mobile device.
	 * @return bool|string
	 */
	private function get_image_slot( $attributes = array(), $in_loop = false, $is_mobile = false ) {
		$image_slot = array_key_exists( 'imageSlot', $attributes ) ? $attributes['imageSlot'] : false;
		$image_slot = 'default' === $image_slot ? 'top' : $image_slot;
		$image_slot = 'disabled' === $image_slot ? false : $image_slot;
		$image_slot = empty($image_slot) ? false : $image_slot;
		$image_slot = false !== $image_slot && $in_loop ? 'left' : $image_slot;
		if ( $is_mobile ) {
			// Set the image size to A1 on mobile, if its in a loop then set it to A3, otherwise deliver whats set in the attributes.
			// Default to top for mobile...
			$image_slot = false !== $image_slot ? 'top' : false;
			$image_slot = $in_loop && !in_array( $image_slot, array( 'disabled', false ) ) ? 'right' : $image_slot;
		}
		return $image_slot;
	}

	/**
	 * Get the image size for the story item.
	 * @param mixed $attributes - used to pass the image slot through and determinze image size.
	 * @param bool $in_loop
	 * @param bool $is_mobile
	 * @return mixed
	 */
	private function get_image_size( $attributes, $in_loop = false, $is_mobile = false ) {
		$image_slot = $this->get_image_slot( $attributes, $in_loop, $is_mobile );
		$image_size = array_key_exists( 'imageSize', $attributes ) ? $attributes['imageSize'] : false;
		$image_size = false === $image_slot ? false : $image_size;
		$image_size = false !== $image_size && $is_mobile ? 'A2' : $image_size;
		$image_size = false !== $image_size && $in_loop ? 'A3' : $image_size;
		return $image_size;
	}

	/**
	 * Given an image_size, image_slot, post_id, and post_type return an array of desktop and mobile 1x and 2x image urls.
	 * @TODO: migrate all of this to use args.
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

		if ( $this->allow_debug_output() ) {
			do_action('qm/debug', "get_img -> internal args -> " . print_r(array('args' => $args), true) );
		}

		// Start new art function here:
		$imgs = false;

		$is_stub   = 'stub' === $post_type;
		$art       = function_exists('prc_get_art') ? prc_get_art( $post_id, $image_size ) : false;
		$image_id  = false !== $art ? $art['id'] : false;
		$chart_art = false !== $art ? $art['chartArt'] : false;

		// Even if a static image is set we still want to ideally get an image_id for the image file and get the correct image assets.
		if ( false !== $static_image ) {
			$img  = array(
				$static_image,
				null,
				null,
			);
			if ( function_exists('wpcom_vip_attachment_url_to_postid') ) {
				$image_id = wpcom_vip_attachment_url_to_postid($static_image);
			} else {
				$image_id = attachment_url_to_postid($static_image);
			}


			if ( $this->allow_debug_output() ) {
				do_action('qm/debug', "get_img -> static image -> " . print_r(array('imageid' => $image_id), true) );
			}
			if ( false != $image_id ) {
				// get the caption and alt text from the image
				$caption = get_post_field( 'post_excerpt', $image_id );
				$alt     = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				$imgs = array(
					'desktop' => array(
						'default' => wp_get_attachment_image_src( $image_id, $image_size ),
						'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
					),
					'mobile'  => array(
						'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
						'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
					),
					'bordered' => false,
					'caption' => $caption,
					'alt' => $alt,
				);
			} else {
				$imgs = array(
					'desktop' => array(
						'default' => $img,
						'hidpi'   => $img,
					),
					'mobile'  => array(
						'default' => $img,
						'hidpi'   => $img,
					),
					'bordered' => false,
					'caption' => false,
					'alt' => false,
				);
			}
		} elseif ( $is_stub && false !== $image_id ) {
			$stub_info      = get_post_meta( $post_id, '_stub_info', true );
			$origin_site_id = (int) $stub_info['site_id'];
			switch_to_blog( $origin_site_id );
			// get the caption and alt text from the image
			$caption = get_post_field( 'post_excerpt', $image_id );
			$alt     = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
			$imgs = array(
				'desktop' => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
				),
				'mobile'  => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
				),
				'bordered' => $chart_art,
				'caption' => $caption,
				'alt' => $alt,
			);
			restore_current_blog();
		} elseif ( false !== $image_id ) {
			// get the caption and alt text from the image
			$caption = get_post_field( 'post_excerpt', $image_id );
			$alt     = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
			$imgs = array(
				'desktop' => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
				),
				'mobile'  => array(
					'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
					'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
				),
				'bordered' => $chart_art,
				'caption' => $caption,
				'alt' => $alt,
			);
		}

		return $imgs;
	}

	/**
	 * Constructs a md5 hashed using using post id, is_mobile, block version, and a cache invalidation string for use as a cache key for individual blocks.
	 * @param mixed $attributes
	 * @param mixed $context
	 * @return string
	 */
	public function get_cache_key( $attributes, $context ) {
		if ( array_key_exists('inIndex', $attributes) && $attributes['inIndex'] ) {
			$cache_key = array('index');
		} else {
			$cache_key = $attributes;
		}

		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : false;
		$post_id = array_key_exists( 'postId', $context ) ? $context['postId'] : $post_id;

		$is_mobile = jetpack_is_mobile();

		return md5(
			wp_json_encode(
				array_merge(
					$cache_key,
					array(
						'id'          => $post_id,
						'mobile'      => $is_mobile,
						'invalidate'  => self::$cache_invalidate,
						'version'     => self::$version,
					)
				)
			)
		);
	}

	/**
	 * Clear the index cache when a stub is updated.
	 * @param mixed $stub_post_id
	 * @return void
	 */
	public function clear_index_cache_on_stub_update( $stub_post_id ) {
		$cache_key = $this->get_cache_key( array( 'inIndex' => true, 'postId' => $stub_post_id ), array() );
		wp_cache_delete( $cache_key, self::$block_name );
	}

	/**
	 * Apply business logic to attributes and return as an array ready for extracting into variables.
	 *
	 * @param mixed $attributes
	 * @param array $context
	 * @return mixed
	 */
	public function get_attributes( $attributes, $context = array() ) {
		$is_mobile = jetpack_is_mobile();

		// Set post_id to the attribute value, however, if it is false then check block context for the post id.
		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : false;
		$post_id = array_key_exists( 'postId', $context ) ? $context['postId'] : $post_id;

		$cache_key = $this->get_cache_key( $attributes, $context );
		$cache = wp_cache_get( $cache_key, self::$block_name );
		if ( $cache && ! is_preview() && false !== self::$cache_invalidate ) {
			$cache['cached'] = true;
			return $cache;
		}

		$post_type = array_key_exists( 'postType', $attributes ) ? $attributes['postType'] : get_post_type( $post_id );

		// @TODO: when we fully move over PRC to FSE we can remove inLoop attribute.
		$is_in_loop = array_key_exists( 'queryId', $context ) ? true : false;
		$is_in_loop = array_key_exists( 'inLoop', $attributes ) ? $attributes['inLoop'] : $is_in_loop;
		// Title, image, excerpt, url, label, date should all first default to the post value however if those values are set in the attributes array then use them.
		$title       = wptexturize( array_key_exists( 'title', $attributes ) ? $attributes['title'] : get_the_title($post_id) );

		$excerpt     = $this->get_excerpt( $post_id, $attributes );
		$label       = $this->get_label( $post_id, $post_type, $attributes );
		$date        = $this->get_date( $post_id, $attributes );
		$url         = $this->get_url( $post_id, $post_type, $attributes );

		$header_size = array_key_exists( 'headerSize', $attributes ) ? $attributes['headerSize'] : 2;
		$header_size = $is_mobile && 1 !== $header_size ? 2 : $header_size;

		// Image:
		$image_slot = $this->get_image_slot( $attributes, $is_in_loop, $is_mobile );
		$image_size = $this->get_image_size( $attributes, $is_in_loop, $is_mobile );
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
		// Check if the fetched image has a border, otherwise look for the attribute.
		$image_is_bordered = false !== $image && array_key_exists( 'bordered', $image ) ? $image['bordered'] : false; // We need to get the art status here....
		$image_is_bordered = array_key_exists( 'isChartArt', $attributes ) ? $attributes['isChartArt'] : $image_is_bordered;

		$variables = array(
			'post_id'                       => $post_id,
			'post_type'                     => $post_type,
			'title'                         => $title,
			'excerpt'                       => $excerpt,
			'label'                         => $label,
			'date'                          => $date,
			'url'                           => $url,
			'image'                         => $image,
			'image_size'                    => $image_size,
			'image_is_bordered'             => $image_is_bordered,
			'image_slot'                    => $image_slot,
			'is_in_loop'                    => $is_in_loop,
			'header_size'                   => $header_size,
			'enable_breaking_news'          => array_key_exists( 'enableBreakingNews', $attributes ) ? $attributes['enableBreakingNews'] : false,
			'enable_excerpt'                => array_key_exists( 'enableExcerpt', $attributes ) ? $attributes['enableExcerpt'] : true,
			'enable_alt_excerpt_layout'     => array_key_exists( 'enableExcerptBelow', $attributes ) ? $attributes['enableExcerptBelow'] : false,
			'enable_emphasis'               => array_key_exists( 'enableEmphasis', $attributes ) ? $attributes['enableEmphasis'] : false,
			'enable_extra'                  => array_key_exists( 'enableExtra', $attributes ) ? $attributes['enableExtra'] : false,
			'enable_header'                 => array_key_exists( 'enableHeader', $attributes ) ? $attributes['enableHeader'] : true,
			'enable_alt_header_weight'      => array_key_exists( 'enableAltHeaderWeight', $attributes ) ? $attributes['enableAltHeaderWeight'] : false,
			'disable_mobile_styles'         => array_key_exists( 'disableMobileStyles', $attributes ) ? $attributes['disableMobileStyles'] : false,
			'enable_meta'                   => array_key_exists( 'enableMeta', $attributes ) ? $attributes['enableMeta'] : true,
		);

		wp_reset_postdata();

		if ( ! is_preview() && false !== self::$cache_invalidate ) {
			wp_cache_add( $cache_key, $variables, self::$block_name, self::$cache_ttl );
		}

		return $variables;
	}

	/**
	 * Return the responsive <picture> markup for the image.
	 *
	 * @param array $attributes The block attributes.
	 * @param bool  $is_in_loop Is the block in a loop.
	 * @param bool  $is_mobile Is the block on a mobile device.
	 *
	 * @return string
	 */
	public function render_image( $image, $image_size, $image_is_bordered, $link ) {
		if ( false === $image ) {
			return false;
		}

		if ( ! is_array($image['desktop']['default']) ) {
			return false;
		}

		if ( ! is_array($image['mobile']['default']) ) {
			return false;
		}

		$sources = array(
			'desktop' => wp_sprintf(
				'<source srcset="%s 1x, %s 2x" media="(min-width: 768px)" width="%s" height="%s">',
				array_key_exists( 0, $image['desktop']['default'] ) ? $image['desktop']['default'][0] : null,
				array_key_exists( 0, $image['desktop']['hidpi'] ) ? $image['desktop']['hidpi'][0] : null,
				array_key_exists( 1, $image['desktop']['default'] ) ? $image['desktop']['default'][1] : null,
				array_key_exists( 2, $image['desktop']['default'] ) ? $image['desktop']['default'][2] : null,
			),
			'mobile'  => wp_sprintf(
				'<source srcset="%s 1x, %s 2x" media="(max-width: 767px)" width="%s" height="%s">',
				array_key_exists( 0, $image['mobile']['default'] ) ? $image['mobile']['default'][0] : null,
				array_key_exists( 0, $image['mobile']['hidpi'] ) ? $image['mobile']['hidpi'][0] : null,
				array_key_exists( 1, $image['mobile']['default'] ) ? $image['mobile']['default'][1] : null,
				array_key_exists( 2, $image['mobile']['default'] ) ? $image['mobile']['default'][2] : null,
			),
		);

		$image_class = classNames(
			'image',
			'jetpack-lazy-image',
			array(
				$image_size => $image_size,
				'bordered'  => $image_is_bordered,
			)
		);
		ob_start();
		?>
		<a href="<?php echo esc_url($link);?>" class="<?php echo esc_attr( $image_class ); ?>">
			<picture>
				<?php echo $sources['desktop']; ?>
				<?php echo $sources['mobile']; ?>
				<?php echo wp_sprintf(
					'<img srcset="%s" width="%s" height="%s" alt="%s>',
					esc_url($image['desktop']['default'][0]),
					esc_attr($image['desktop']['default'][1]),
					esc_attr($image['desktop']['default'][2]),
					esc_attr($image['alt'])
				);?>
			</picture>
		</a>
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

		$image_markup = $this->render_image( $image, $image_size, $image_is_bordered, $url );
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
		if ( ! empty( $image_size ) && false !== $image_slot ) {
			$block_wrapper_attrs['data-image-size'] = $image_size;
		}
		if ( array_key_exists( 'cached', $attrs ) ) {
			$block_wrapper_attrs['data-cached'] = true;
		}
		if ( ! empty( $post_id ) ) {
			$block_wrapper_attrs['id'] = 'post-' . $post_id;
		}
		if ( true === $disable_mobile_styles ) {
			$block_wrapper_attrs['data-disable-mobile-styles'] = true;
		}
		$block_wrapper_attrs = get_block_wrapper_attributes( $block_wrapper_attrs );

		$header_class = classNames(
			'header',
			array(
				'large'  => 1 === $header_size,
				'medium' => 2 === $header_size,
				'small'  => 3 === $header_size,
				'light'  => $enable_alt_header_weight || ! $enable_excerpt,
			)
		);

		// Content fallback for Story Items generated dynamically.
		if ( empty( $content ) && ( array_key_exists( 'excerpt', $attrs ) || array_key_exists( 'extra', $attrs ) ) ) {
			$content = $this->get_content( $attrs );
		}
		// Regex remove div with class 'extra' from this string if $enable_extra is false.
		$content = ! $enable_extra ? preg_replace( '/<ul class="extra">(.*?)<\/ul>/s', '', $content ) : $content;
		// Regex remove div with class 'description' from this string if $enable_excerpt is false.
		$content = ! $enable_excerpt ? preg_replace( '/<div class="description">(.*?)<\/div>/s', '', $content ) : $content;

		// @TODO: Right now this is only used by datasets, but we should probably make this more generic or a better use of block api's to achieve this result.
		$story_item_extras = ! array_key_exists( 'extraContent', $attributes ) ? apply_filters(
			'prc_story_item_extra',
			false,
			array(
				'post_type' => $post_type,
				'id'        => $post_id,
			)
		) : $attributes['extraContent'];

		ob_start();
		?>
		<?php
		?>
		<article <?php echo $block_wrapper_attrs; ?>>
			<?php
			$markup = '';
			if ( $enable_meta ) {
				$markup .= '<div class="meta">';
				if ( !empty($label) ) {
					// Ensure there are no dashes in labels.
					$markup .= "<span class='report label'>{$label}</span> | ";
				}
				$markup .= "<span class='date'>{$date}</span></div>";
			}
			if ( false !== $image_slot ) {
				$markup .= $image_markup;
			}
			if ( $enable_header ) {
				$markup .= "<h{$header_size} class='{$header_class}'><a href='{$url}'>{$title}</a></h{$header_size}>";
			}
			if ( ! empty( $content ) ) {
				$markup .= $content;
			}
			if ( $enable_breaking_news ) {
				$markup .= '<ul class="extra-breaking-news"><li><a href="https://www.pewresearch.org/topics/coronavirus-disease-2019-covid-19/" class="kicker-breaking-news">SEE ALL CORONAVIRUS RESEARCH ></a></li></ul>';
			}
			if ( ! empty( $story_item_extras ) ) {
				$markup .= '<div class="extra-content">' . $story_item_extras . '</div>';
			}
			echo wp_kses( $markup, 'post' );
			?>
		</article>
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
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}

}

new StoryItem(true);
