<?php
/**
 * Social Share Sheet Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use function PRC\Platform\Block_Utils\classNames;

/**
 * Block Name:        Social Native Share
 * Description:       A share button to invoke the native share sheet in a visitors browser. When a browser does not support navigator.share this will fallback to a row of core&#x2F;social-links.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Social_Share_Sheet {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$is_mobile = 'mobile' === \PRC\Platform\get_current_device();

		$context = $block->context;

		$icon_color = array_key_exists( 'iconColor', $context ) ? $context['iconColor'] : '';
		$icon_background_color = array_key_exists( 'iconBackgroundColor', $context ) ? $context['iconBackgroundColor'] : '';
		$link_title       = array_key_exists( 'core/socialLinksTitle', $context ) ? $context['core/socialLinksTitle'] : '';
		$link_description = array_key_exists( 'core/socialLinksDescription', $context ) ? $context['core/socialLinksDescription'] : '';
		$link_url         = array_key_exists( 'core/socialLinksUrl', $context ) ? $context['core/socialLinksUrl'] : '';

		$hashtags = array_key_exists( 'core/socialLinksHashtags', $context ) ? $context['core/socialLinksHashtags'] : array();
		// Prepend every hashtag with a # and then return a comma separated string.
		$hashtags = implode(
			',',
			array_map(
				function ( $hashtag ) {
					return '#' . $hashtag;
				},
				$hashtags
			)
		);
		$image_id = array_key_exists( 'core/socialLinksImageId', $context ) ? $context['core/socialLinksImageId'] : '';

		wp_interactivity_state(
			'prc-block/social-share-sheet',
			array(
				'enabled' => $is_mobile,
			)
		);

		$label               = array_key_exists( 'label', $attributes ) ? $attributes['label'] : 'Share';

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'                => wp_json_encode(
					array(
						'namespace' => 'prc-block/social-share-sheet',
					)
				),
				'data-wp-context'                    => wp_json_encode(
					array(
						'title'    => $link_title,
						'text'     => $link_description,
						'url'      => $link_url,
						'hashtags' => $hashtags,
						'image'    => $image_id ? wp_get_attachment_image_url( $image_id, 'full' ) : false,
					)
				),
				'data-wp-on--click'                  => 'actions.onClick',
				'data-wp-class--web-share-supported' => 'state.enabled',
				'data-wp-init'                       => 'callbacks.detectWebShareSupport',
				'style'                              => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes, 'horizontal' ) . ';',
			)
		);

		$icon = \PRC\Platform\Icons\render( 'solid', 'share' );

		$native_template = wp_sprintf(
			'<a href="%s" class="%s">%s</a>',
			$link_url,
			classNames(
				array(
					'has-'.$icon_color.'-color'            => $icon_color,
					'has-'.$icon_background_color.'-background-color' => $icon_background_color,
				)
			),
			$icon,
		);

		return wp_sprintf(
			'<div %s>%s</div>',
			$block_wrapper_attrs,
			$native_template . $content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/social-share-sheet',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
