<?php
namespace PRC\Platform\Blocks;
use WP_Error;
use WP_Post;
use WP_Term;

/**
 * Pass in attributes, a variation name, and a context array to get a Story Item's constituent markup and data.
 * @package PRC\Platform\Blocks
 */
class Story_Item_API {
	public static $block_json;
	public $is_mobile = false;
	public $in_query_loop = false;
	public static $date_format = 'M j, Y';
	public $post_id;
	public $attributes;
	public $context;
	public $inner_content;
	public $post_data = array(
		'post_title' => null,
		'post_excerpt' => null,
		'post_date' => null,
		'url' => null,
	);

	public $data;


	public function __construct($attributes = array(), $content = null, $context = array()) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/story-item/build/block.json';
		$variations_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/story-item/src/variations.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		// Setup data:
		$this->attributes = wp_parse_args($attributes, $this->construct_attribute_defaults());
		$this->context = is_array($context) ? $context : array();
		$this->inner_content = normalize_whitespace($content);
		// Setup variables:
		$this->is_mobile = function_exists('jetpack_is_mobile') && \jetpack_is_mobile();
		$this->in_query_loop = false !== $this->check_for_context('query');
		$this->post_id = $this->get_post_id();
		// Check if wp_post global is set, and if it is does it have the same post id as the one we're looking for, if so use that. This is to ensure we're getting the correct post data for the current post and so we don't have to make another query.
		if ( isset( $GLOBALS['post'] ) && $GLOBALS['post'] instanceof WP_Post && $GLOBALS['post']->ID === $this->post_id ) {
			$this->post_data = array(
				'post_title' => $GLOBALS['post']->post_title,
				'post_excerpt' => $GLOBALS['post']->post_excerpt,
				'post_date' => $GLOBALS['post']->post_date,
				'url' => get_permalink( $this->post_id ),
			);
		} elseif ( false !== $this->post_id ) {
			$temp_post_data = get_post( $this->post_id );
			if ( null === $temp_post_data ) {
				return new WP_Error(
					'404',
					'Can not find post for Story Item',
					array(
						'post_id' => $this->post_id,
						'attributes' => $this->attributes,
					)
				);
			}
			// We store what the "default" post data if available.
			$this->post_data = array(
				'post_title' => $temp_post_data->post_title,
				'post_excerpt' => $temp_post_data->post_excerpt,
				'post_date' => $temp_post_data->post_date,
				'url' => get_permalink( $this->post_id ),
			);
		}

		$cache_key = $this->get_cache_key();
	}

	private function construct_attribute_defaults() {
		$attributes = self::$block_json['attributes'];
		$defaults = array();
		foreach ($attributes as $key => $opts) {
			$defaults[$key] = array_key_exists('default', $opts) ? $opts['default'] : null;
		}
	}

	/**
	 * Constructs a md5 hashed using using post id, is_mobile, block version, and a cache invalidation string for use as a cache key for individual blocks.
	 * @param mixed $attributes
	 * @param mixed $context
	 * @return string
	 */
	public function get_cache_key() {
		$args = array(
			'query_id' => $this->check_for_context('queryId'),
			'post_id' => $this->post_id,
			'is_mobile' => $this->is_mobile,
		);
		return md5(wp_json_encode($args));
	}

	private function check_for_attr($key) {
		$attrs = $this->attributes;
		return array_key_exists( $key, $attrs ) && ! empty($attrs[$key]) ? $attrs[$key] : false;
	}

	private function check_for_context($key) {
		$context = $this->context;
		return array_key_exists( $key, $context ) && ! empty($context[$key]) ? $context[$key] : false;
	}

	public function get_post_id() {
		$post_id = $this->check_for_attr('postId');
		return $post_id ? $post_id : $this->check_for_context('postId');
	}

	/**
	 * Get the excerpt for the story item.
	 * @return mixed
	 */
	public function get_excerpt() {
		$allowed = $this->check_for_attr('enableExcerpt');
		if ( !$allowed ) {
			return false;
		}
		$excerpt = preg_match( '/<div class="description">(.*?)<\/div>/s', $this->inner_content, $matches );
		$excerpt = $excerpt ? $matches[1] : false;
		$excerpt = $excerpt ? $excerpt : $this->post_data['post_excerpt'];
		return $excerpt;
	}

	public function get_extras() {
		$allowed = $this->check_for_attr('enableExtra');
		if ( false === $allowed ) {
			return false;
		}
		$extras = preg_match( '/<div class="extra">(.*?)<\/div>/s', $this->inner_content, $matches );
		$extra = $extras ? $matches[1] : false;
		return $extra;
	}

	public function get_content_markup() {
		$excerpt = $this->get_excerpt();
		$extra = $this->get_extras();
		ob_start();
		?>
		<?php if ( false !== $excerpt ) : ?>
			<div class="description">
				<?php echo wpautop( $excerpt ); ?>
			</div>
		<?php endif; ?>
		<?php if ( false !== $extra ) : ?>
			<div class="extra">
				<?php echo $extra; ?>
			</div>
		<?php endif; ?>
		<?php
		return ob_get_clean();
	}

	private function enable_light_header_font_weight() {
		return $this->check_for_attr('enableAltHeaderWeight') || ! $this->get_excerpt();
	}

	public function get_title() {
		$allowed = $this->check_for_attr('enableHeader');
		if ( !$allowed ) {
			return false;
		}
		$title = $this->check_for_attr('title');
		$title = $title ? $title : $this->post_data['post_title'];
		return wptexturize( $title );
	}

	public function get_title_markup() {
		$title = $this->get_title();
		if ( false === $title ) {
			return;
		}
		$header_size = $this->check_for_attr('headerSize');
		$header_size = $header_size ? $header_size : 2;
		$url = $this->get_url();
		$url = is_wp_error($url) ? '#error' : $url;

		$enable_alt_header_weight = $this->enable_light_header_font_weight();

		$header_class = \PRC\Platform\Block_Utils\classNames(
			'header',
			array(
				'large'  => 1 === $header_size,
				'medium' => 2 === $header_size,
				'small'  => 3 === $header_size,
				'light'  => $enable_alt_header_weight,
			)
		);
		return wp_sprintf(
			'<h%1$s class="%2$s"><a href="%3$s">%4$s</a></h%1$s>',
			$header_size,
			$header_class,
			$url,
			$title,
		);
	}

	/**
	 * Get the url for the story item, run through a series of checks to ensure we have a valid url.
	 * @return mixed
	 */
	public function get_url() {
		$url = $this->check_for_attr('url');
		$url = $url ? $url : $this->post_data['url'];
		// If there is no url, assume theres an issue and check for a redirect, if none available ultimately fall back to the post permalink.
		if ( empty( $url ) && false !== $this->post_id ) {
			$url = get_post_meta( $this->post_id, '_redirect', true );
			if ( empty( $url ) ) {
				$url = get_permalink( $this->post_id );
			}
			if ( empty($url) ) {
				return new WP_Error(
					'401',
					'Can not find url for Story Item',
					array(
						'post_id' => $this->post_id,
						'attributes' => $this->attributes,
					)
				);
			}
		}
		return $url;
	}
	/**
	 * Get the date for the story item.
	 * @return mixed
	 */
	public function get_date() {
		$allowed = $this->check_for_attr('enableMeta');
		if ( false === $allowed ) {
			return false;
		}
		$date = $this->check_for_attr('date');
		$date = $date ? $date : $this->post_data['post_date'];
		return gmdate(
			self::$date_format,
			strtotime( $date )
		);
	}

	/**
	 * Get which taxonomy should be used to get the label for the story item.
	 * @return mixed
	 */
	private function get_taxonomy() {
		$taxonomy = $this->check_for_attr('metaTaxonomy');
		return $taxonomy ? $taxonomy : 'formats';
	}

	private function get_fallback_format_term() {
		$post_type = get_post_type( $this->post_id );
		if ( 'short-read' === $post_type ) {
			return 'short-read';
		}
		if ( 'interactive' === $post_type ) {
			return 'feature';
		}
	}

	/**
	 * Pluck the first term from the selected taxonomy.
	 * @param mixed $taxonomy
	 * @return WP_Term|false
	 */
	private function get_first_term($taxonomy) {
		$first_term = false;
		$terms = wp_get_object_terms( $this->post_id, $taxonomy, array( 'fields' => 'names' ) );
		if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
			// Get the first term.
			$first_term = array_shift( $terms );
		}
		if ( 'formats' === $taxonomy && empty($terms) ) {
			$first_term = $this->get_fallback_format_term();
		}
		return $first_term;
	}

	/**
	 * Get the label for the story item.
	 * @return false|string
	 */
	public function get_label() {
		$allowed = $this->check_for_attr('enableMeta');
		if ( false === $allowed ) {
			return false;
		}
		$taxonomy = $this->get_taxonomy();
		if ( 'disabled' === $taxonomy ) {
			return false;
		}
		$label = $this->check_for_attr('label');
		// We may want to check for if we're in a publication listing.
		// If there is no label then we'll just automatically look at the first term for the selected meta taxonomy (default to formats) and return that.
		if ( !$label ) {
			$label = $this->get_first_term($taxonomy);
		}

		do_action('qm/debug', 'get_label :: ' . print_r(array(
			'taxonomy' => $taxonomy,
			'post_id' => $this->post_id,
			'post_data' => $this->post_data,
			'label' => $label,
		), true));

		if ( empty( $label ) ) {
			$label = 'Report';
		}

		// Ensure label is returned as lowercase and has no dashes.
		return strtolower( str_replace( '-', ' ', $label ) );
	}

	/**
	 * Combine label and date into the meta markup.
	 * @return void|false|string
	 */
	public function get_meta_markup() {
		$allowed = $this->check_for_attr('enableMeta');
		if ( !$allowed ) {
			return;
		}
		$label = $this->get_label();
		$date = $this->get_date();
		if ( !$label && !$date ) {
			return false;
		}

		$label = false !== $label ? wp_sprintf(
			'<span class="label">%1$s</span>',
			$label
		) : '';
		$date = false !== $date ? wp_sprintf(
			'<time class="date" datetime="%1$s">%2$s</time>',
			esc_attr( gmdate(
				'c',
				strtotime( $date )
			) ),
			esc_html( $date )
		) : '';

		return wp_sprintf(
			'<div class="meta">%1$s%2$s</div>',
			$label,
			$date
		);
	}

	public function get_image_slot() {
		$image_slot = $this->check_for_attr('imageSlot');
		$image_slot = 'default' === $image_slot ? 'top' : $image_slot;
		$image_slot = 'disabled' === $image_slot ? false : $image_slot;
		$image_slot = empty($image_slot) ? false : $image_slot;
		// If we're in a query loop then we'll default to the 'left' image slot. If we're on mobile then we'll default to the 'top' image slot.
		$image_slot = false !== $image_slot && $this->in_query_loop ? 'left' : $image_slot;
		if ( $this->is_mobile && false !== $image_slot ) {
			// If we're on mobile then we'll default to the 'top' image slot.
			$image_slot = 'top';
			// Unless if we're in a query loop, then default right.
			$image_slot = $this->in_query_loop ? 'right' : $image_slot;
			do_action('qm/debug', 'get_image_slot :: ' . print_r($image_slot, true));
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
	public function get_image_size() {
		$image_slot = $this->get_image_slot();
		if (false === $image_slot) {
			return false;
		}
		$image_size = $this->check_for_attr('imageSize');
		// On mobile we always want to use A2 (unless if in a query loop)
		$image_size = false !== $image_size && $this->is_mobile ? 'A2' : $image_size;
		// In a query loop, regardless if its left or right, we want to use the A3 size.
		$image_size = false !== $image_size && $this->in_query_loop ? 'A3' : $image_size;
		return $image_size;
	}

	private function get_imgs($image_id, $image_size, $bordered = false) {
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
			'bordered' => $bordered,
			'caption' => $caption,
			'alt' => $alt,
		);
		return $imgs;
	}

	public function is_image_bordered() {
		return $this->check_for_attr('isChartArt');
	}

	/**
	 * Given an image_size, image_slot, return an array of desktop and mobile 1x and 2x image urls.
	 * @return false|array
	 */
	public function get_image() {
		$imgs = false;
		$image_size = $this->get_image_size();
		$image_slot = $this->get_image_slot();
		if ( false === $image_size || false === $image_slot ) {
			return $imgs;
		}
		$bordered = $this->is_image_bordered();

		// Check for manually set image
		$image = $this->check_for_attr('image');
		// Even if a static image is set we still want to ideally get an image_id for the image file and get the correct image assets.
		if ( false !== $image ) {
			if ( function_exists('wpcom_vip_attachment_url_to_postid') ) {
				$image_id = wpcom_vip_attachment_url_to_postid($image);
			} else {
				$image_id = attachment_url_to_postid($image);
			}

			if ( false != $image_id ) {
				$imgs = $this->get_imgs($image_id, $image_size, $bordered);
			} else {
				// If nothing can be found then gracefully fallback to the image url.
				$imgs = array(
					'desktop' => array(
						'default' => $image,
						'hidpi'   => $image,
					),
					'mobile'  => array(
						'default' => $image,
						'hidpi'   => $image,
					),
					'bordered' => null,
					'caption' => false,
					'alt' => false,
				);
			}

			return $imgs;
		}

		$art = function_exists('prc_get_art') ? prc_get_art( $this->post_id, $image_size ) : false;
		$image_id  = false !== $art ? $art['id'] : false;
		$bordered = false !== $art ? $art['chartArt'] : $bordered;
		if ( false !== $image_id ) {
			$imgs = $this->get_imgs($image_id, $image_size, $bordered);
		}

		return $imgs;
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
	public function get_image_markup() {
		$image = $this->get_image();
		if ( false === $image ) {
			return false;
		}
		if ( ! is_array($image['desktop']['default']) ) {
			return false;
		}
		if ( ! is_array($image['mobile']['default']) ) {
			return false;
		}

		$image_size = $this->get_image_size();
		$url = $this->get_url();

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

		$image_class = \PRC\Platform\Block_Utils\classNames(
			'image',
			'jetpack-lazy-image',
			array(
				$image_size => $image_size,
				'bordered'  => $image['bordered'],
			)
		);
		ob_start();
		?>
		<a href="<?php echo esc_url($url);?>" class="<?php echo esc_attr( $image_class ); ?>">
			<picture>
				<?php echo $sources['desktop']; ?>
				<?php echo $sources['mobile']; ?>
				<?php echo wp_sprintf(
					'<img srcset="%s" width="%s" height="%s" alt="%s">',
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

	public function get_block_wrapper_attributes() {
		$post_id = $this->post_id;
		$image_slot = $this->get_image_slot();
		$image_size = $this->get_image_size();
		$block_wrapper_attrs = array(
			'class' => \PRC\Platform\Block_Utils\classNames(
				array(
					$image_slot . ' aligned' => $image_slot,
					'in-query-loop' => $this->in_query_loop,
				)
			),
		);
		if ( ! empty( $image_size ) && false !== $image_slot ) {
			$block_wrapper_attrs['data-image-size'] = $image_size;
		}
		if ( ! empty( $post_id ) ) {
			$block_wrapper_attrs['id'] = 'post-' . $post_id;
		}
		// if ( true === $disable_mobile_styles ) {
		// 	$block_wrapper_attrs['data-disable-mobile-styles'] = true;
		// }
		return get_block_wrapper_attributes( $block_wrapper_attrs );
	}

	// public function set_data() {
	// 	$this->data = array();
	// 	$this->data['postType'] = $this->check_for_attr('postType') ? $this->check_for_attr('postType') : get_post_type( $this->post_id );
	// 	$this->data['title'] = $this->get_title();
	// 	$this->data['url'] = $this->get_url();
	// 	$this->data['date'] = $this->get_date();
	// 	$this->data['label'] = $this->get_label();
	// 	$this->data['image'] = $this->get_image();
	// 	$this->data['imageSlot'] = $this->get_image_slot();
	// 	$this->data['imageSize'] = $this->get_image_size();
	// 	$this->data['content'] = $this->get_content();
	// }
}
