<?php
/**
 * Core Image Block
 *
 * Extends `core/image` with platform-specific behaviour:
 * - Lazy-load control (disable lazy loading inside carousel/timeline slides,
 *   eager loading when `no-lazy-load` class is present, dominant-color bypass)
 * - Breakpoint-aligned `srcset` and `sizes` rewrite for rendered blocks,
 *   attachment-page hero images, and `wp_content_img_tag` pass-through
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
use WP_Post;

/**
 * Block Name:
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Image {
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/image';

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Marker data attribute used to flag `<img>` tags that the
	 * breakpoint-srcset filter has touched, so the `wp_content_img_tag`
	 * pass can re-apply our `sizes` value after WP core's image-tag
	 * pipeline would otherwise reset it from the `width` attribute.
	 *
	 * @var string
	 */
	const SRCSET_CONTEXT_ATTR = 'data-prc-srcset-context';

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-image' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		$loader->add_action( 'init', $this, 'register_assets' );
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		$loader->add_filter( 'render_block_data', $this, 'set_image_to_lazy_load_inside_blocks', 10, 3 );
		$loader->add_filter( 'render_block_core/image', $this, 'share_figure_no_lazy_load_classname_with_img', 10, 2 );
		$loader->add_filter( 'render_block_core/image', $this, 'filter_block_srcset', 11, 2 );
		$loader->add_filter(
			'wp_img_tag_add_loading_attr',
			$this,
			'eager_load',
			10,
			3
		);
		$loader->add_filter( 'dominant_color_img_tag_add_dominant_color', $this, 'disable_dominate_color_for_no_lazy_loading', 10, 5 );
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
		$loader->add_filter( 'wp_get_attachment_image_attributes', $this, 'filter_attachment_page_image_attributes', 10, 3 );
		$loader->add_filter( 'wp_content_img_tag', $this, 'reapply_breakpoint_sizes_in_content', 99, 3 );
	}

	/**
	 * Register additional attributes for the core-image block
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'disableLazyLoading', $metadata['attributes'] ) ) {
			$metadata['attributes']['disableLazyLoading'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Here we're hijacking the core/image block's style and providing our own.
	 *
	 * Bail before deregistering the core handle when the PRC style is missing
	 * (incomplete build / register_block_style_handle returned false) so core
	 * styles stay intact and we do not read ->src on null.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		global $wp_styles;

		if ( empty( $this->style_handle ) || empty( $wp_styles->registered[ $this->style_handle ] ) ) {
			return;
		}

		$style = $wp_styles->registered[ $this->style_handle ];
		if ( ! is_object( $style ) || empty( $style->src ) ) {
			return;
		}

		wp_deregister_style( 'wp-block-image' );
		wp_register_style( 'wp-block-image', $style->src, array(), PRC_BLOCK_LIBRARY_VERSION );
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * If a core/image block is inside a prc-block/carousel-slide or
	 * prc-block/timeline-slide block, this will set the attribute
	 * `disableLazyLoading` to true.
	 *
	 * @hook render_block_data
	 *
	 * @param array         $parsed_block Parsed block.
	 * @param array         $source_block Source block.
	 * @param WP_Block|null $parent_block Parent block.
	 * @return array
	 */
	public function set_image_to_lazy_load_inside_blocks( $parsed_block, $source_block, $parent_block ) {
		// Check if the image parent is a prc-block/carousel-slide or prc-block/timeline-slide to set the attribute disableLazyLoading to true.
		if ( $parent_block && ( in_array( $parent_block->name, array( 'prc-block/carousel-slide', 'prc-block/timeline-slide' ) ) ) ) {
			$parsed_block['attrs']['disableLazyLoading'] = true;
		}
		return $parsed_block;
	}

	/**
	 * Pass the 'no-lazy-load' classname when present on a figure element to the img element within.
	 *
	 * @hook render_block_core/image
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function share_figure_no_lazy_load_classname_with_img( $block_content, $block ) {
		$attributes           = $block['attrs'];
		$disable_lazy_loading = array_key_exists( 'disableLazyLoading', $attributes ) && $attributes['disableLazyLoading'];
		if ( ! $disable_lazy_loading ) {
			return $block_content;
		}
		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		if ( $tag_processor->next_tag(
			array(
				'tag_name' => 'figure',
			)
		) ) {
			$tag_processor->next_tag( 'img' );
			$tag_processor->add_class( 'no-lazy-load' );
			$tag_processor->set_attribute( 'decoding', 'sync' );
			$block_content = $tag_processor->get_updated_html();
		}
		return $block_content;
	}

	/**
	 * When 'no-lazy-load' is present on an image, set the loading attribute to 'eager'.
	 *
	 * @hook wp_img_tag_add_loading_attr
	 *
	 * @param string $value Value.
	 * @param string $image Image.
	 * @param string $context Context.
	 * @return string
	 */
	public function eager_load( $value, $image, $context ) {
		if ( strpos( $image, 'no-lazy-load' ) !== false ) {
			return 'eager';
		}

		return $value;
	}

	/**
	 * Disable the dominant color for no lazy loading
	 *
	 * @hook dominant_color_img_tag_add_dominant_color
	 *
	 * @param bool  $enabled Enabled.
	 * @param int   $attachment_id Attachment ID.
	 * @param array $image_meta Image meta.
	 */
	public function disable_dominate_color_for_no_lazy_loading( $enabled, $attachment_id, $image_meta, $filtered_image, $context ) {
		if ( strpos( $filtered_image, 'no-lazy-load' ) !== false ) {
			return false;
		}

		return $enabled;
	}

	/**
	 * Build a breakpoint-aligned `srcset` and `sizes` for a given attachment.
	 *
	 * Returns an associative array with `srcset` and `sizes` keys, or `null`
	 * if the attachment metadata is missing or malformed. The `$context`
	 * argument selects the candidate-width set and the `sizes` hint to use:
	 *
	 *   'default'         No alignment / left / right float.
	 *                     Candidates: 480, 782, 960, 1200, 1564, 1600 w.
	 *                     sizes: (max-width: 480px) 480px, (max-width: 782px) 782px, 640px
	 *
	 *   'wide'            align=wide.
	 *                     Candidates: 480, 782, 960, 1200, 1564, 1600 w.
	 *                     sizes: (max-width: 480px) 480px, (max-width: 782px) 782px, 1200px
	 *
	 *   'full'            align=full.
	 *                     Candidates: 480, 782, 960, 1200, 1564, 1600, 1920, 2400 w.
	 *                     sizes: 100vw
	 *
	 *   'attachment_page' Prepended image in the 8-of-12 grid column on attachment pages.
	 *                     Candidates: 480, 782, 960, 1200, 1564, 1600 w.
	 *                     sizes: (max-width: 480px) 480px, (max-width: 782px) 782px, 800px
	 *
	 * Candidates wider than the attachment's original width are dropped to
	 * avoid upscaling, and the original width is always retained as the
	 * largest candidate so retina targets at the rendered display size get
	 * an exact match. URLs use the VIP File System `?resize=w,h` transform
	 * parameter with the height calculated proportionally from the original
	 * aspect ratio.
	 *
	 * @param int    $attachment_id Attachment post ID.
	 * @param string $context       One of 'default', 'wide', 'full', 'attachment_page'.
	 * @return array{srcset:string,sizes:string}|null
	 */
	private function build_breakpoint_srcset_attrs( int $attachment_id, string $context = 'default' ): ?array {
		$meta = wp_get_attachment_metadata( $attachment_id );

		if ( ! is_array( $meta ) || empty( $meta['width'] ) || empty( $meta['height'] ) ) {
			return null;
		}

		$original_width  = (int) $meta['width'];
		$original_height = (int) $meta['height'];
		$base_url        = wp_get_attachment_url( $attachment_id );

		if ( ! $base_url ) {
			return null;
		}

		$context_map = array(
			'default'         => array(
				'widths' => array( 480, 960, 782, 1564, 1200, 1600 ),
				'sizes'  => '(max-width: 480px) 480px, (max-width: 782px) 782px, 640px',
			),
			'wide'            => array(
				'widths' => array( 480, 960, 782, 1564, 1200, 1600 ),
				'sizes'  => '(max-width: 480px) 480px, (max-width: 782px) 782px, 1200px',
			),
			'full'            => array(
				'widths' => array( 480, 960, 782, 1564, 1200, 1600, 1920, 2400 ),
				'sizes'  => '100vw',
			),
			'attachment_page' => array(
				'widths' => array( 480, 960, 782, 1564, 1200, 1600 ),
				'sizes'  => '(max-width: 480px) 480px, (max-width: 782px) 782px, 800px',
			),
		);

		$config           = $context_map[ $context ] ?? $context_map['default'];
		$candidate_widths = $config['widths'];
		$sizes_attr       = $config['sizes'];

		$candidates = array();
		$ratio      = $original_height / $original_width;

		foreach ( $candidate_widths as $w ) {
			if ( $w > $original_width ) {
				continue;
			}
			$h                = (int) round( $w * $ratio );
			$candidates[ $w ] = add_query_arg( array( 'resize' => $w . ',' . $h ), $base_url );
		}

		if ( ! isset( $candidates[ $original_width ] ) ) {
			$candidates[ $original_width ] = add_query_arg(
				array( 'resize' => $original_width . ',' . $original_height ),
				$base_url
			);
		}

		if ( empty( $candidates ) ) {
			return null;
		}

		ksort( $candidates );

		$srcset_parts = array();
		foreach ( $candidates as $w => $url ) {
			$srcset_parts[] = $url . ' ' . $w . 'w';
		}

		return array(
			'srcset' => implode( ', ', $srcset_parts ),
			'sizes'  => $sizes_attr,
		);
	}

	/**
	 * Rewrite the `srcset` and `sizes` attributes on rendered core/image
	 * blocks to a breakpoint-aligned candidate set.
	 *
	 * Replaces WP core's default "one URL per registered intermediate size"
	 * srcset with a small set of candidates targeting the platform's three
	 * layout breakpoints. The exact candidate widths and `sizes` hint depend
	 * on the block's `align` attribute:
	 *
	 *   - No align / left / right: 6 candidates (480–1600w) + original, sizes ends at 640px.
	 *   - align=wide: 6 candidates (480–1600w) + original, sizes ends at 1200px.
	 *   - align=full: 8 candidates (480–2400w) + original, sizes=100vw.
	 *
	 * Runs at priority 11 so the no-lazy-load class pass (priority 10)
	 * completes first.
	 *
	 * @hook render_block_core/image 11
	 *
	 * @param string               $block_content The rendered block HTML.
	 * @param array<string, mixed> $block         The parsed block data.
	 * @return string
	 */
	public function filter_block_srcset( string $block_content, array $block ): string {
		$processor = new WP_HTML_Tag_Processor( $block_content );

		if ( ! $processor->next_tag( 'img' ) ) {
			return $block_content;
		}

		$class = (string) ( $processor->get_attribute( 'class' ) ?? '' );

		if ( ! preg_match( '/\bwp-image-(\d+)\b/', $class, $matches ) ) {
			return $block_content;
		}

		$attachment_id = (int) $matches[1];

		$src = (string) ( $processor->get_attribute( 'src' ) ?? '' );

		if ( ! $this->src_matches_attachment( $src, $attachment_id ) ) {
			return $block_content;
		}

		$align   = isset( $block['attrs']['align'] ) ? (string) $block['attrs']['align'] : '';
		$context = match ( $align ) {
			'full'  => 'full',
			'wide'  => 'wide',
			default => 'default',
		};

		$attrs = $this->build_breakpoint_srcset_attrs( $attachment_id, $context );

		if ( null === $attrs ) {
			return $block_content;
		}

		$processor->set_attribute( 'srcset', $attrs['srcset'] );
		$processor->set_attribute( 'sizes', $attrs['sizes'] );
		$processor->set_attribute( self::SRCSET_CONTEXT_ATTR, $context );

		return $processor->get_updated_html();
	}

	/**
	 * Verify that an `<img>`'s `src` URL actually points to the file
	 * associated with the given attachment ID.
	 *
	 * Guards against stale `wp-image-{id}` classes (e.g. an editor swapped
	 * the `src` manually, or the attachment was replaced) so we don't
	 * rewrite `srcset`/`sizes` to candidates of a different file.
	 *
	 * The attachment URL (from wp_get_attachment_url) is the canonical
	 * original filename — it never carries a WP size suffix. The src URL
	 * may be either the original or a sized variant with a `-WxH` suffix
	 * appended by WordPress. We extract the attachment's base name
	 * unmodified, then check whether the src filename either matches it
	 * exactly or equals it with a single trailing `-\d+x\d+` suffix.
	 * This avoids false negatives for filenames that naturally contain
	 * dimension-like patterns (e.g. `banner-1920x1080.jpg`).
	 *
	 * @param string $src           The `<img>`'s `src` attribute value.
	 * @param int    $attachment_id Attachment post ID parsed from the `wp-image-{id}` class.
	 * @return bool
	 */
	private function src_matches_attachment( string $src, int $attachment_id ): bool {
		if ( '' === $src || $attachment_id <= 0 ) {
			return false;
		}

		$attachment_url = wp_get_attachment_url( $attachment_id );

		if ( ! is_string( $attachment_url ) || '' === $attachment_url ) {
			return false;
		}

		$get_filename = static function ( string $url ): string {
			$path = wp_parse_url( $url, PHP_URL_PATH );
			if ( ! is_string( $path ) || '' === $path ) {
				return '';
			}
			return (string) pathinfo( $path, PATHINFO_FILENAME );
		};

		$attachment_base = $get_filename( $attachment_url );
		if ( '' === $attachment_base ) {
			return false;
		}

		$src_filename = $get_filename( $src );
		if ( $src_filename === $attachment_base ) {
			return true;
		}

		$src_stripped = (string) preg_replace( '/-\d+x\d+$/', '', $src_filename );
		return $src_stripped === $attachment_base;
	}

	/**
	 * Apply breakpoint-aligned `srcset` and `sizes` to the prepended
	 * attachment image on attachment-page templates.
	 *
	 * Scoped to the attachment page's own queried attachment so that other
	 * `wp_get_attachment_image()` calls on the same page (sidebar thumbnails,
	 * theme card images, etc.) continue to use WP core's default srcset
	 * machinery with the full registered-size set.
	 *
	 * @hook wp_get_attachment_image_attributes
	 *
	 * @param array<string, string> $attr       Image HTML attributes.
	 * @param WP_Post               $attachment The attachment post object.
	 * @param string|int[]          $size       Requested size slug or [w, h] pair.
	 * @return array<string, string>
	 */
	public function filter_attachment_page_image_attributes( $attr, $attachment, $size ) {
		if ( ! is_attachment() ) {
			return $attr;
		}

		if ( ! ( $attachment instanceof WP_Post ) ) {
			return $attr;
		}

		if ( get_queried_object_id() !== (int) $attachment->ID ) {
			return $attr;
		}

		$attrs = $this->build_breakpoint_srcset_attrs( (int) $attachment->ID, 'attachment_page' );

		if ( null === $attrs ) {
			return $attr;
		}

		$attr['srcset']                    = $attrs['srcset'];
		$attr['sizes']                     = $attrs['sizes'];
		$attr[ self::SRCSET_CONTEXT_ATTR ] = 'attachment_page';

		return $attr;
	}

	/**
	 * Re-apply the breakpoint-aligned `sizes` value to images that were
	 * tagged with the srcset-context marker, then strip the marker.
	 *
	 * `wp_filter_content_tags()` runs at priority 12 on `the_content`, after
	 * `do_blocks()` (priority 9). Some passes inside that pipeline recalculate
	 * `sizes` from the `<img>`'s explicit `width` attribute, overwriting the
	 * value set by `filter_block_srcset()` / `filter_attachment_page_image_attributes()`.
	 * Re-applying at priority 99 ensures our breakpoint `sizes` reaches the browser.
	 *
	 * The marker attribute is removed so it doesn't leak into the rendered HTML.
	 *
	 * @hook wp_content_img_tag 99
	 *
	 * @param string    $filtered_image The img tag HTML.
	 * @param string    $context        Core's context string (e.g. 'the_content'). Unused.
	 * @param int|false $attachment_id  Attachment ID for the image, or false.
	 * @return string
	 */
	public function reapply_breakpoint_sizes_in_content( $filtered_image, $context, $attachment_id ) {
		if ( ! is_string( $filtered_image ) || '' === $filtered_image ) {
			return $filtered_image;
		}

		if ( false === strpos( $filtered_image, self::SRCSET_CONTEXT_ATTR ) ) {
			return $filtered_image;
		}

		$processor = new WP_HTML_Tag_Processor( $filtered_image );

		if ( ! $processor->next_tag( 'img' ) ) {
			return $filtered_image;
		}

		$marker = $processor->get_attribute( self::SRCSET_CONTEXT_ATTR );

		if ( ! is_string( $marker ) || '' === $marker ) {
			return $filtered_image;
		}

		$resolved_id = is_numeric( $attachment_id ) ? (int) $attachment_id : 0;

		if ( $resolved_id <= 0 ) {
			$class = (string) ( $processor->get_attribute( 'class' ) ?? '' );
			if ( preg_match( '/\bwp-image-(\d+)\b/', $class, $matches ) ) {
				$resolved_id = (int) $matches[1];
			}
		}

		if ( $resolved_id > 0 ) {
			$attrs = $this->build_breakpoint_srcset_attrs( $resolved_id, $marker );
			if ( null !== $attrs ) {
				$processor->set_attribute( 'sizes', $attrs['sizes'] );
			}
		}

		$processor->remove_attribute( self::SRCSET_CONTEXT_ATTR );

		return $processor->get_updated_html();
	}
}
