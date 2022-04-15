<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/story-item` block.
 *
 * @package gutenberg
 */

class Story_Item extends PRC_Block_Library {

	public static $css_handle         = false;
	public static $frontend_js_handle = false;
	public static $version            = '4.0.8a';
	public static $date_format        = 'M j, Y';
	public static $cache_invalidate   = 'axjasd71nasd-9pader1';
	public static $experiments        = array(
		'relative_date' => false,
	);

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'prc_column_block_content', array( $this, 'wrap_consecutive_story_items' ), 10, 2 );
			add_filter( 'prc_group_block_content', array( $this, 'wrap_consecutive_story_items' ), 10, 2 );
			add_filter( 'prc_return_story_item', array( $this, 'return_story_item' ), 10, 1 );
			add_action( 'prc_do_story_item', array( $this, 'do_story_item' ), 10, 1 );
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	//@TODO We need to look into a significantly more performant way to handle this.
	public function wrap_consecutive_story_items( $content, $block ) {
		$relaxed      = false;
		$very_relaxed = false;
		$block_name   = is_array( $block ) ? $block['blockName'] : $block->name;
		$inner_blocks = is_object($block) && property_exists($block, 'parsed_block') && array_key_exists('innerBlocks', $block->parsed_block) ? $block->parsed_block['innerBlocks'] : false;
		$inner_blocks = false === $inner_blocks && array_key_exists('innerBlocks', $block) ? $block['innerBlocks'] : $inner_blocks;

		if ( 'prc-block/column' === $block_name ) {
			$relaxed = true;
		}

		// Check for number of story item innerblocks, if 1 then just return and dont proceed any further.
		$story_items = array_map( function( $block ) {
			return 'prc-block/story-item' === $block['blockName'];
		}, $inner_blocks );
		if ( empty($story_items) || 1 === count( $story_items ) ) {
			return $content;
		}

		$classnames = classNames(
			'ui',
			array(
				'relaxed'             => $relaxed,
				'very relaxed'        => $very_relaxed,
				'divided story items' => true,
			)
		);
		//@TODO Come back in here and make this regex more performant.
		// regex search for adjacent .wp-block-prc-block-story-item divs and wrap in a div with class .ui.divided.very.relaxed.story.items
		$content = preg_replace(
			'/((?:\s*?<\!-- \.wp-block-prc-block-story-item -->.*?(?:(?!class=".*?(column|section-header).*?")\X)*?<\!-- \/\.wp-block-prc-block-story-item -->\s*?){2,})/i',
			'<section class="' . $classnames . '" aria-role="feed">${1}</section>',
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
		echo wp_kses( render_block( (array) $parsed ), 'post' );
	}

	/**
	 * Returns formatted html to match new $content method of storing the excerpt "excerpt" and "extras"
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
			<div class="description migrated">
				<?php echo wpautop( $excerpt ); ?>
			</div>
		<?php endif; ?>
		<?php if ( false !== $extra ) : ?>
			<ul class="extra migrated">
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
	private function get_label( int $post_id, $post_type = false, $reasearch_areas = false, $disabled = false ) {
		if ( $disabled ) {
			return '';
		}
		if ( false !== $post_type && 'dataset' === $post_type ) {
			return 'Dataset';
		}
		$terms = wp_get_object_terms( $post_id, $reasearch_areas ? 'research-teams' : 'formats', array( 'fields' => 'names' ) );
		if ( ! is_wp_error( $terms ) || ! empty( $terms ) ) {
			return array_shift( $terms );
		}
		return 'Report';
	}

	private function get_url( int $post_id, $post_type = 'post' ) {
		$permalink = false;
		if ( 'stub' === $post_type ) {
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
		} else {
			$permalink = get_permalink( $post_id );
		}
		return $permalink;
	}

	private function get_date( $date ) {
		return gmdate(
			self::$date_format,
			strtotime( $date )
		);
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

		do_action('qm/debug', "get_img -> internal args -> " . print_r(array('args' => $args), true) );

		// Start new art function here:
		$imgs = false;

		$is_stub  = 'stub' === $post_type;
		$art      = prc_get_art( $post_id, $image_size );
		$image_id = false !== $art ? $art['id'] : false;
		$chart_art = false !== $art ? $art['chartArt'] : false;

		if ( false !== $static_image ) {
			$img  = array(
				$static_image,
				null,
				null,
			);
			if ( function_exists('wpcom_vip_attachment_url_to_postid') ) {
				$image_id = wpcom_vip_attachment_url_to_postid( $static_image );
			} else {
				$image_id = attachment_url_to_postid($static_image);
			}
			do_action('qm/debug', "get_img -> static image -> " . print_r(array('imageid' => $image_id), true) );
			if ( false != $image_id ) {
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
				);
			}
		} elseif ( $is_stub && false !== $image_id ) {
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
				'bordered' => $chart_art,
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
				'bordered' => $chart_art,
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
		$is_mobile = jetpack_is_mobile();
		// Set post_id to the attribute value, however, if it is false then check block context for the post id.
		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : false;

		$cache_key = md5(
			wp_json_encode(
				array_merge(
					$attributes,
					array(
						'id'          => $post_id,
						'mobile'      => $is_mobile,
						'invalidate'  => self::$cache_invalidate,
						'experiments' => self::$experiments,
						'version'     => self::$version,
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
		// What should we do if no post can be found?

		$is_in_loop = array_key_exists( 'queryId', $context ) ? true : false;
		$is_in_loop = array_key_exists( 'inLoop', $attributes ) ? $attributes['inLoop'] : $is_in_loop;

		$post_type = array_key_exists( 'postType', $attributes ) ? $attributes['postType'] : $post->post_type;

		// Title, image, excerpt, url, label, date should all first default to the post value however if those values are set in the attributes array then use them.
		$title       = wptexturize( array_key_exists( 'title', $attributes ) ? $attributes['title'] : $post->post_title );
		$excerpt     = array_key_exists( 'excerpt', $attributes ) ? $attributes['excerpt'] : false;
		$excerpt     = false === $excerpt && is_object($post) && property_exists($post, 'excerpt') && !empty($post->excerpt) ? $post->excerpt : false;
		$label       = array_key_exists( 'label', $attributes ) ? $attributes['label'] : $this->get_label(
			$post_id,
			$post_type,
			array_key_exists( 'metaTaxonomy', $attributes ) ? 'research-areas' === $attributes['metaTaxonomy'] : false,
			array_key_exists( 'metaTaxonomy', $attributes ) && 'disabled' === $attributes['metaTaxonomy'] ? true : false
		);
		$date        = $this->get_date( array_key_exists( 'date', $attributes ) ? $attributes['date'] : $post->post_date );
		$url         = $this->get_url( $post_id, $post_type );
		$url         = array_key_exists( 'url', $attributes ) && !empty( $attributes['url'] ) ? $attributes['url'] : $url;

		$header_size = array_key_exists( 'headerSize', $attributes ) ? $attributes['headerSize'] : 2;
		$header_size = $is_mobile && 1 !== $header_size ? 2 : $header_size;

		$image_slot = array_key_exists( 'imageSlot', $attributes ) ? $attributes['imageSlot'] : false;
		$image_slot = 'default' === $image_slot ? 'top' : $image_slot;
		$image_slot = 'disabled' === $image_slot ? false : $image_slot;
		$image_slot = empty($image_slot) ? false : $image_slot;
		$image_slot = false !== $image_slot && $is_in_loop ? 'left' : $image_slot;
		if ( $is_mobile ) {
			// Default to top for mobile...
			$image_slot = false !== $image_slot ? 'top' : false;
			$image_slot = $is_in_loop && !in_array( $image_slot, array( 'disabled', false ) ) ? 'right' : $image_slot;
			do_action('qm/debug', 'mobile image... ' . print_r($image_slot, true));
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
		do_action('qm/debug', "get_img" . print_r(array('art' => $image, 'post_id' => $post_id), true) );
		// If we can not find an image set the image slot to false to disable it.
		$image_slot = false !== $image ? $image_slot : false;

		// Check if the fetched image has a border, otherwise look for the attribute.
		$image_is_bordered = false !== $image && array_key_exists( 'bordered', $image ) ? $image['bordered'] : false; // We need to get the art status here....
		$image_is_bordered = array_key_exists( 'isChartArt', $attributes ) ? $attributes['isChartArt'] : $image_is_bordered;

		$enable_breaking_news          = array_key_exists( 'enableBreakingNews', $attributes ) ? $attributes['enableBreakingNews'] : false;
		$enable_excerpt                = array_key_exists( 'enableExcerpt', $attributes ) ? $attributes['enableExcerpt'] : true;
		$enable_alt_excerpt_layout     = array_key_exists( 'enableExcerptBelow', $attributes ) ? $attributes['enableExcerptBelow'] : false;
		$enable_emphasis               = array_key_exists( 'enableEmphasis', $attributes ) ? $attributes['enableEmphasis'] : false;
		$enable_extra                  = array_key_exists( 'enableExtra', $attributes ) ? $attributes['enableExtra'] : false;
		$enable_header                 = array_key_exists( 'enableHeader', $attributes ) ? $attributes['enableHeader'] : true;
		$enable_alt_header_weight      = array_key_exists( 'enableAltHeaderWeight', $attributes ) ? $attributes['enableAltHeaderWeight'] : false;
		$disable_mobile_styles         = array_key_exists( 'disableMobileStyles', $attributes ) ? $attributes['disableMobileStyles'] : false;
		$enable_meta                   = array_key_exists( 'enableMeta', $attributes ) ? $attributes['enableMeta'] : true;

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
			'enable_breaking_news'          => $enable_breaking_news,
			'enable_excerpt'                => $enable_excerpt,
			'enable_alt_excerpt_layout'     => $enable_alt_excerpt_layout,
			'enable_emphasis'               => $enable_emphasis,
			'enable_extra'                  => $enable_extra,
			'enable_header'                 => $enable_header,
			'enable_alt_header_weight'      => $enable_alt_header_weight,
			'disable_mobile_styles'         => $disable_mobile_styles,
			'enable_meta'                   => $enable_meta,
		);

		wp_reset_postdata();

		if ( ! is_preview() ) {
			set_transient( $cache_key, $variables, 30 * MINUTE_IN_SECONDS );
		}

		return $variables;
	}

	public function render_image( $image, $image_size, $image_is_bordered, $link ) {
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

		$image_class = classNames(
			'image',
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
				<img srcset="<?php echo esc_url( $image['desktop']['default'][0] ); ?>" height="<?php echo esc_attr( $image['desktop']['default'][1] ); ?>" width="<?php echo esc_attr( $image['desktop']['default'][2] ); ?>">
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

		// Fallback for non gutenberg story items and older story items from gutenberg.
		if ( ( false === $content || empty( $content ) ) && ( array_key_exists( 'excerpt', $attributes ) || array_key_exists( 'extra', $attributes ) ) ) {
			$content = $this->legacy_content( $attributes );
		}

		// Regex remove div with class 'extra' from this string if $enable_extra is false.
		$content = ! $enable_extra ? preg_replace( '/<ul class="extra">(.*?)<\/ul>/s', '', $content ) : $content;
		// Regex remove div with class 'description' from this string if $enable_excerpt is false.
		$content = ! $enable_excerpt ? preg_replace( '/<div class="description">(.*?)<\/div>/s', '', $content ) : $content;

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
		/**
		 * These inline html comments are necessary for a filter to wrap consecutive story items, see 'wrap_consecutive_story_items'
		 */
		echo '<!-- .wp-block-prc-block-story-item -->';
		?>
		<article <?php echo $block_wrapper_attrs; ?>>
			<?php
			$markup = '';
			if ( $enable_meta ) {
				$markup .= '<div class="meta">';
				if ( !empty($label) ) {
					$markup .= "<span class='report label'>{$label}</span> | ";
				}
				$markup .= "<span class='date'>{$date}</span></div>";
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
				$markup .= '<div class="extra-content">' . $story_item_extras . '</div>';
			}
			echo wp_kses( $markup, 'post' );
			?>
		</article>
		<?php
		echo '<!-- /.wp-block-prc-block-story-item -->';
		return ob_get_clean();
	}

	// $return = array(
	// 	'id'        => $stub_post->ID,
	// 	'title'     => esc_attr( $stub_post->post_title ),
	// 	'excerpt'   => "<p>{$stub_post->post_excerpt}</p>",
	// 	'date'      => get_the_date( 'M d, Y', $stub_post->ID ),
	// 	'timestamp' => get_the_time( 'c', $stub_post->ID ),
	// 	'label'     => $format_term->name,
	// 	'link'      => get_post_meta( $stub_post->ID, '_redirect', true ),
	// 	'art'       => json_decode( $stub_info['_art'], true ),
	// );

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

new Story_Item( true );
