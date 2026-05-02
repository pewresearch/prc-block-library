<?php
/**
 * Taxonomy List Link Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy Menu Link
 * Description:       Display a link to a taxonomy term with the option to display a sub menu of taxonomy navigation links.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Taxonomy_List_Link {
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
			$loader->add_filter( 'query_vars', $this, 'register_query_var' );
		}
	}

	/**
	 * Register the query var
	 *
	 * @param array $vars Query vars.
	 * @return array
	 */
	public function register_query_var( $vars ) {
		$vars[] = 'taxonomyLink';
		return $vars;
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
		if ( is_admin() ) {
			return $content;
		}

		wp_enqueue_script( 'wp-url' );

		// Default Plus and Minus Icons.
		$chevron_right_icon = \PRC\Platform\Icons\render( 'solid', 'chevron-right' );
		$plus_icon          = \PRC\Platform\Icons\render( 'light', 'circle-plus' );
		$minus_icon         = \PRC\Platform\Icons\render( 'light', 'circle-minus' );
		if ( array_key_exists( 'className', $attributes ) && 'is-style-sub-expand' === $attributes['className'] ) {
			// Sub Menu Icons.
			$plus_icon  = \PRC\Platform\Icons\render( 'light', 'plus' );
			$minus_icon = \PRC\Platform\Icons\render( 'light', 'minus' );
		}

		$is_sub_heading  = array_key_exists( 'className', $attributes ) && false !== strpos( $attributes['className'], 'is-style-sub-heading' );
		$enable_sub_menu = $attributes['enableSubMenu'] && ! empty( $content ) ?? false;
		$block_template  = $enable_sub_menu ? '<div %1$s>%2$s<div class="wp-block-prc-block-taxonomy-list-link__sub-menu">%3$s</div></div>' : '<div %1$s>%2$s</div>';

		$label_template = ! empty( $attributes['url'] ) ? '<a href="%1$s" class="wp-block-prc-block-taxonomy-list-link__label">%2$s</a>' : '<span class="wp-block-prc-block-taxonomy-list-link__label">%2$s</span>';
		$label_template = $is_sub_heading ? $label_template . $chevron_right_icon : $label_template;
		$label_template = $enable_sub_menu && ! empty( $content ) ? ( empty( $attributes['url'] ) ? '<span class="wp-block-prc-block-taxonomy-list-link__label wp-block-prc-block-taxonomy-list-link__toggle" data-wp-text="callbacks.getExpandedMenuLabel" data-wp-on--click="actions.onClick"></span>%3$s' : '<a href="%1$s" class="wp-block-prc-block-taxonomy-list-link__label">%2$s</a>%3$s' ) : $label_template;

		$button = wp_sprintf(
			'<button class="wp-block-prc-block-taxonomy-list-link__icon wp-block-prc-block-taxonomy-list-link__toggle" data-wp-on--click="actions.onClick"><span data-wp-bind--hidden="context.isActive">%s</span><span data-wp-bind--hidden="!context.isActive" hidden>%s</span></button>',
			$plus_icon,
			$minus_icon
		);

		/**
		 * Build an array with CSS classes defining the colors
		 * which will be applied to the list markup in the front-end.
		 */
		$context     = $block->context;
		$css_classes = array();
		$text_color  = array_key_exists( 'taxonomy-menu/textColor', $context ) ? $context['taxonomy-menu/textColor'] : null;
		// If has text color.
		if ( ! is_null( $text_color ) ) {
			// Add the color class.
			array_push( $css_classes, 'has-text-color', sprintf( 'has-%s-color', $text_color ) );
		}

		$block_id = 'item-' . md5( wp_json_encode( $attributes ) );

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'                       => $block_id,
				'class'                    => \PRC\BlockUtils\classNames( $css_classes ),
				'data-wp-interactive'      => wp_json_encode(
					array(
						'namespace' => 'prc-block/taxonomy-list-link',
					)
				),
				'data-wp-context'          => wp_json_encode(
					array(
						'id'             => $block_id,
						'label'          => $attributes['label'] ?? '',
						'isActive'       => get_query_var( 'taxonomyLink', false ) === $block_id,
						'hasSubMenu'     => $enable_sub_menu && ! empty( $content ),
						'subExpandLabel' => 'More',
					)
				),
				'data-wp-class--is-active' => 'context.isActive',
				'data-wp-init'             => 'callbacks.onInit',
			)
		);

		return wp_sprintf(
			$block_template,
			$block_wrapper_attrs,
			wp_sprintf(
				$label_template,
				$attributes['url'] ?? '',
				$attributes['label'] ?? '',
				$enable_sub_menu && ! empty( $content ) ? $button : ''
			),
			$content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-list-link',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
