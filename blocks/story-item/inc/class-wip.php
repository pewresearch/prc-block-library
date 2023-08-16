<?php
/**
 * Story Item
 *
 * @package PRC_Block_Library
 */
namespace PRC_Block_Library;

class StoryItem {
	public static $block_name = 'prc-block/story-item';
	protected $cache_key = null;
	public $attributes = array();
	public $is_published = false;
	public $is_preview = false;
	public $is_mobile = false;
	public $post_type = null;
	public $title = '';

	public function __construct($post_id, $attributes = array(), $block_context = array()) {
		// Quickly check if this is a mobile device.
		$this->is_mobile = function_exists('jetpack_is_mobile') ? jetpack_is_mobile() : false;

		$this->attributes = $this->init($post_id, $attributes, $block_context);
	}

	// Go through the attributes, determine if we need to fetch any data from the database, and if so fetch it.
	public function reducer($attributes) {

	}

	/**
	 * Apply business logic to attributes and return as an array ready for extracting into variables.
	 *
	 * @param mixed $attributes
	 * @param array $context
	 * @return mixed
	 */
	public function init( $post_id, $attributes, $block_context = array() ) {
		$this->cache_key = md5( json_encode( $attributes ) . json_encode( $block_context ) );
		$post_status = get_post_status( $post_id );
		$this->is_published = 'publish' === $post_status;
		$this->is_preview = is_preview();
		$this->post_type = array_key_exists( 'postType', $attributes ) ? $attributes['postType'] : get_post_type( $post_id );

		// Title, image, excerpt, url, label, date should all first default to the post value however if those values are set in the attributes array then use them.
		$this->title = wptexturize( array_key_exists( 'title', $attributes ) ? $attributes['title'] : get_the_title($post_id) );

		$this->excerpt     = '';
		$this->label       = '';
		$this->date        = '';
		$this->url         = '';

		$header_size = array_key_exists( 'headerSize', $attributes ) ? $attributes['headerSize'] : 2;
		$this->header_size = $this->is_mobile && 1 !== $header_size ? 2 : $header_size;

		// Image:
		$this->image_slot = '';
		$this->image_size = '';
		$this->image = '';
		// If we can not find an image set the image slot to false to disable it.
		$this->image_slot = false !== $this->image ? $this->image_slot : false;
		// Check if the fetched image has a border, otherwise look for the attribute.
		$this->image_is_bordered = false !== $this->image && array_key_exists( 'bordered', $this->image ) ? $this->image['bordered'] : false; // We need to get the art status here....
		$this->image_is_bordered = array_key_exists( 'isChartArt', $attributes ) ? $attributes['isChartArt'] : $this->image_is_bordered;
		$this->enable_breaking_news = array_key_exists( 'enableBreakingNews', $attributes ) ? $attributes['enableBreakingNews'] : false;

		$this->enable_excerpt = array_key_exists( 'enableExcerpt', $attributes ) ? $attributes['enableExcerpt'] : true;
		$this->enable_alt_excerpt_layout = array_key_exists( 'enableExcerptBelow', $attributes ) ? $attributes['enableExcerptBelow'] : false;
		$this->enable_emphasis = array_key_exists( 'enableEmphasis', $attributes ) ? $attributes['enableEmphasis'] : false;
		$this->enable_extra = array_key_exists( 'enableExtra', $attributes ) ? $attributes['enableExtra'] : false;
		$this->enable_header = array_key_exists( 'enableHeader', $attributes ) ? $attributes['enableHeader'] : true;
		$this->enable_alt_header_weight = array_key_exists( 'enableAltHeaderWeight', $attributes ) ? $attributes['enableAltHeaderWeight'] : false;
		$this->disable_mobile_styles = array_key_exists( 'disableMobileStyles', $attributes ) ? $attributes['disableMobileStyles'] : false;
		$this->enable_meta = array_key_exists( 'enableMeta', $attributes ) ? $attributes['enableMeta'] : true;

		wp_reset_postdata();

		if ( ! is_preview() && $this->is_published ) {
			wp_cache_add( $this->cache_key, $variables, self::$block_name, self::$cache_ttl );
		}

		return $variables;
	}
}
