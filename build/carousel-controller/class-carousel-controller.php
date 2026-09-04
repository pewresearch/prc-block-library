<?php
/**
 * Carousel Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Carousel Controller
 * Version:           1.5.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Carousel_Controller {
	/**
	 * Constructor.
	 *
	 * @param array $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param object $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Resolves a stored color attribute value to a CSS color string without
	 * double-wrapping preset slugs.
	 *
	 * Only strict color literals are accepted (hex, theme preset `var()`, and
	 * a small set of color functions). Invalid or injection-shaped input is
	 * dropped. Unrecognized values are treated as preset slugs and wrapped in
	 * `var(--wp--preset--color--{slug})` after slug sanitization.
	 *
	 * @param string $value Stored color attribute value.
	 * @return string CSS color value safe to emit inside a custom property.
	 */
	private function resolve_color_value( string $value ): string {
		$value = trim( $value );
		if ( '' === $value ) {
			return '';
		}

		if ( preg_match( '/[;{}\\\\]|url\s*\(|expression\s*\(|@import/i', $value ) ) {
			return '';
		}

		$literal = $this->sanitize_css_color_literal( $value );
		if ( '' !== $literal ) {
			return $literal;
		}

		// Reject malformed literals instead of coercing them into preset slugs.
		if (
			str_starts_with( $value, '#' )
			|| str_starts_with( $value, 'var(' )
			|| preg_match( '/^[a-zA-Z-]+\s*\(/', $value )
		) {
			return '';
		}

		$slug = sanitize_html_class( $value );
		if ( '' === $slug ) {
			return '';
		}

		return 'var(--wp--preset--color--' . $slug . ')';
	}

	/**
	 * Resolves arrow and dot colors to a CSS value.
	 *
	 * The historical default slug `black` maps to WordPress core's static
	 * `#000000` token, which disappears on dark `ui-white` surfaces. Treat that
	 * slug (and an empty value) as adaptive `ui-black`. Explicit hex and other
	 * slugs, including `ui-stable-black`, pass through unchanged.
	 *
	 * @param string $value Stored color attribute value.
	 * @return string CSS color value safe to emit inside a custom property.
	 */
	private function resolve_navigation_color_value( string $value ): string {
		$value = trim( $value );
		if ( '' === $value || 'black' === $value ) {
			$value = 'ui-black';
		}

		return $this->resolve_color_value( $value );
	}

	/**
	 * Validates a CSS color literal for safe use as a custom-property value.
	 *
	 * Rejects delimiter injection (`;`, `{}`), `url()`, and other non-color syntax.
	 *
	 * @param string $value Trimmed color string from block attributes.
	 * @return string Sanitized color literal, or empty string when invalid.
	 */
	private function sanitize_css_color_literal( string $value ): string {
		if ( preg_match( '/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $value ) ) {
			return $value;
		}

		if ( preg_match( '/^var\(--wp--preset--color--([a-z0-9-]+)\)$/', $value, $matches ) ) {
			return 'var(--wp--preset--color--' . $matches[1] . ')';
		}

		if ( preg_match(
			'/^(rgb|rgba|hsl|hsla|hwb|oklch|oklab|lab|lch|color)\(([^()]*)\)$/i',
			$value,
			$matches
		) ) {
			$inner = $matches[2];
			if ( '' === $inner || preg_match( '/[;{}\\\\]|url\s*\(|expression\s*\(/i', $inner ) ) {
				return '';
			}
			if ( ! preg_match( '/^[0-9a-zA-Z%,.\s\/+\-*degturnrad]+$/', $inner ) ) {
				return '';
			}

			return $value;
		}

		return '';
	}

	/**
	 * Adds iAPI directives to the Carousel Controller block.
	 *
	 * @param array    $attributes The attributes.
	 * @param string   $content The content.
	 * @param WP_Block $block The block.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( 'prc-block/carousel-controller' !== $block->parsed_block['blockName'] ) {
			return $content;
		}
		// Back-compat: legacy content stored the view as `orientation` (not in block.json).
		$legacy_orientation = $attributes['orientation'] ?? null;
		$has_view_type      = array_key_exists( 'viewType', $attributes );

		$attributes = \PRC\BlockUtils\get_block_attributes(
			'prc-block/carousel-controller',
			$attributes
		);

		$view_type = $has_view_type ? $attributes['viewType'] : ( $legacy_orientation ?? 'horizontal' );
		$is_vertical           = 'vertical' === $view_type;
		$is_coverflow          = 'coverflow' === $view_type;
		$is_slideshow          = 'slideshow' === $view_type;
		$show_counter          = $is_coverflow || $is_slideshow;
		$arrows_eanbled        = $attributes['enableArrows'];
		$dots_enabled          = $attributes['enableDots'];
		$use_slide_bg_for_dots = ! empty( $attributes['useSlideBgForDots'] );
		$count                 = count( $block->parsed_block['innerBlocks'] );

		$block_id = wp_unique_id( 'prc-block-carousel-controller-' );

		// Mirror the JS isActive getter so data-wp-class--is-active can keep
		// the current slide in flow on first paint (coverflow track height).
		wp_interactivity_state(
			'prc-block/carousel-controller',
			array(
				'isActive' => static function () {
					$context = wp_interactivity_get_context();
					if ( ! isset( $context['index'], $context['slideIndex'] ) ) {
						return false;
					}

					return (int) $context['index'] === (int) $context['slideIndex'];
				},
			)
		);

		$tag_processor = new WP_HTML_Tag_Processor( $content );

		while ( $tag_processor->next_tag(
			array(
				'tag_name'   => 'div',
				'class_name' => 'wp-block-prc-block-carousel-controller',
			)
		) ) {
			$tag_processor->set_attribute( 'id', $block_id );
			// Set up and add iAPI directives to the Carousel Controller block.
			$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/carousel-controller' );
			$tag_processor->set_bookmark( 'start' );
			$tag_processor->set_attribute( 'data-wp-init', 'callbacks.onInit' );
			$tag_processor->set_attribute( 'data-wp-class--is-enabled', 'context.enabled' );
			$tag_processor->set_attribute( 'data-wp-class--is-selected', 'context.isSelected' );
			$tag_processor->set_attribute( 'data-wp-on--mouseenter', 'callbacks.onMouseEnter' );
			$tag_processor->set_attribute( 'data-wp-on--mouseleave', 'callbacks.onMouseLeave' );
			$tag_processor->set_attribute( 'data-wp-on-document--scroll', 'callbacks.onCoverScroll' );
			$tag_processor->set_attribute(
				'data-wp-watch--cover-final-side-disable',
				'callbacks.onCoverFinalSideDisable'
			);

			$style  = '';
			$style .= '--prc-carousel-controller-dot-color: ' . $this->resolve_navigation_color_value( $attributes['dotColor'] ) . ';';
			$style .= '--prc-carousel-controller-arrow-color: ' . $this->resolve_navigation_color_value( $attributes['arrowColor'] ) . ';';
			$tag_processor->set_attribute( 'style', $style );

			$slides = array();
			$i      = 0;
			while ( $tag_processor->next_tag(
				array(
					'tag_name'   => 'div',
					'class_name' => 'wp-block-prc-block-carousel-slide',
				)
			) ) {
				$slide_id    = wp_unique_id( 'wp-block-prc-block-carousel-slide-' );
				$slide_attrs = $block->parsed_block['innerBlocks'][ $i ]['attrs'] ?? array();
				$slide_bg    = '';
				if ( ! empty( $slide_attrs['backgroundColor'] ) ) {
					$slide_bg = $this->resolve_color_value( $slide_attrs['backgroundColor'] );
				} elseif ( ! empty( $slide_attrs['style']['color']['background'] ) ) {
					$slide_bg = $this->resolve_color_value( $slide_attrs['style']['color']['background'] );
				}
				$tag_processor->set_attribute( 'id', $slide_id );
				$tag_processor->set_attribute( 'data-wp-class--is-active', 'state.isActive' );
				if ( $is_coverflow && 0 === $i ) {
					$tag_processor->add_class( 'is-active' );
				}
				$tag_processor->set_attribute(
					'data-wp-context',
					wp_json_encode(
						array(
							'isActive' => false,
							'id'       => $slide_id,
							'index'    => $i,
							'color'    => $slide_bg,
						)
					)
				);
				$slides[] = array(
					'label' => 'Go to slide ' . ( $i + 1 ),
					'index' => $i,
					'id'    => $slide_id,
					'color' => $slide_bg,
				);
				++$i;
			}

			$tag_processor->seek( 'start' );

			$context = array(
				'id'           => $block_id,
				'enabled'      => false,
				'slideIndex'   => 0,
				'count'        => $count,
				'viewType'     => $view_type,
				// Back-compat alias for the renamed attribute.
				'orientation'  => $view_type,
				'enableRewind' => (bool) $attributes['enableRewind'],
				'slides'       => $slides,
			);
			if ( $is_slideshow ) {
				$context['isPlaying'] = true;
				$context['playLabel'] = 'Pause slideshow';
			}
			$tag_processor->set_attribute(
				'data-wp-context',
				wp_json_encode( $context )
			);

			$tag_processor->release_bookmark( 'start' );

			$content = $tag_processor->get_updated_html();

			// Inject the arrows to the markup if enabled.
			if ( $arrows_eanbled ) {
				$arrows  = wp_sprintf(
					'<button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__prev" data-wp-on--click="actions.goToPreviousSlide" aria-label="Previous slide">%s</button><button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__next" data-wp-on--click="actions.goToNextSlide" aria-label="Next slide">%s</button>',
					\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-up' : 'chevron-left' ),
					\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-down' : 'chevron-right' )
				);
				$content = str_replace( '<div class="prc-block-carousel-controller__arrows"></div>', $arrows, $content );
			}

			// Inject the dots to the markup if enabled.
			if ( $dots_enabled ) {
				// When using slide background colors, bind each dot's color from its slide context.
				$dot_style_binding = $use_slide_bg_for_dots ? ' data-wp-bind--style="callbacks.dotStyle"' : '';
				$dots              = wp_sprintf(
					'<div class="prc-block-carousel-controller__dots"><template data-wp-each--dot="context.slides"><button class="prc-block-carousel-controller__dot" data-wp-on--click="actions.goToDot" data-wp-bind--data-slide-index="context.dot.index" data-wp-bind--aria-label="context.dot.label" data-wp-bind--data-active="callbacks.isDotActive"%s>%s</button></template></div>',
					$dot_style_binding,
					\PRC\Platform\Icons\render( 'solid', 'circle' )
				);
				$content           = str_replace( '<div class="prc-block-carousel-controller__dots"></div>', $dots, $content );
			}

			// Inject the slide counter for coverflow and slideshow views.
			if ( $show_counter ) {
				$counter = '<div class="prc-block-carousel-controller__counter"><span data-wp-text="state.currentSlideLabel"></span> / <span data-wp-text="context.count"></span></div>';
				$content = str_replace( '<div class="prc-block-carousel-controller__counter"></div>', $counter, $content );
			}

			// Inject the play/pause control for slideshow view.
			if ( $is_slideshow ) {
				$play    = wp_sprintf(
					'<button class="prc-block-carousel-controller__play is-playing" type="button" aria-label="Pause slideshow" aria-pressed="true" data-wp-on--click="actions.togglePlay" data-wp-bind--aria-label="context.playLabel" data-wp-bind--aria-pressed="context.isPlaying" data-wp-class--is-playing="context.isPlaying"><span class="prc-block-carousel-controller__play-icon prc-block-carousel-controller__play-icon--pause">%1$s</span><span class="prc-block-carousel-controller__play-icon prc-block-carousel-controller__play-icon--play">%2$s</span></button>',
					\PRC\Platform\Icons\render( 'solid', 'pause' ),
					\PRC\Platform\Icons\render( 'solid', 'play' )
				);
				$content = str_replace(
					'<div class="prc-block-carousel-controller__play"></div>',
					$play,
					$content
				);
			}
		}

		return $content;
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
			PRC_BLOCK_LIBRARY_DIR . '/build/carousel-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
