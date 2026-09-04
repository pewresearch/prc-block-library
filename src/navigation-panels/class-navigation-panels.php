<?php
/**
 * Navigation Panels Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Navigation Panels
 * Description:       Navigation panels with InnerBlocks content controlled by the Interactivity API.
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Navigation_Panels {

	/**
	 * Constructor.
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render callback for the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		
		// Set Block ID 
		$block_id = wp_unique_id( 'prc-block-navigation-panels-' );
		// Get if parent, set blank nav-options, start panel count @ unselected
		$active = $attributes['activePanelIndex'] ?? -1; 
		$is_parent = 'parent' === $attributes['level']; 
		$is_child = 'child' === $attributes['level']; 
		$is_desktop_top = 'top' === $attributes['desktopLayout'];
		$is_mobile_top = 'top' === $attributes['mobileLayout'];
		$parent_navigation_list = array(); 
		$navigation_options = '';
		$navigation_return_options = '';
		$panel_count = 0; 
		$has_style_icon = 'none' !== ( $attributes['navigationStyle'] ?? 'none' );

		$style_icon  = ( $has_style_icon ) ? 
			\PRC\Platform\Icons\render( 'solid', $attributes['navigationStyle'], 0.5 ) :
				'';
		// Parse saved HTML 
		$tag = new \WP_HTML_Tag_Processor( $content );
		// Modify each panel
		while ( $tag->next_tag( array('class_name' => 'wp-block-prc-block-navigation-panel', 'tag-closers' => 'visit') ) ) {
			// If this is a sub panel (i.e. has already been parsed), skip
			if ( $tag->has_class('parsed') ) {
				continue;
			}
			// Attempt to get and parse panel labels 
			$extract_context = $tag->get_attribute( 'data-wp-context' ); 
			$panel_context = json_decode( $extract_context );
			// if we can parse panel context and the label exists 
			if ( ! is_null( $panel_context ) && isset( $panel_context->label ) ) {

				// Create panel ids 
				$navigation_id = $block_id . '___' . $panel_count;	
				$panel_context->id = $navigation_id . '___' . sanitize_title( $panel_context->label );

				$panel_icon = ( null !== $panel_context->icon  && $panel_context->icon > 0 ) ? 
					wp_get_attachment_image(
						$panel_context->icon,
						'thumbnail',
						false,
						array(
							'class' => 'panel-nav-icon',
						)
					) : 
					'';
				// create a navigation item
				$navigation_options .= wp_sprintf('
					<div class="wp-block-prc-block-form-input-checkbox is-style-label-only" data-wp-interactive="prc-block/navigation-panels" data-wp-context="%7$s" >
						<input id="%1$s" type="radio" name="%2$s" class="" value="%3$s"
							data-wp-on--click="actions.setNavigation"
							data-wp-bind--checked="state.isSelected"
							>
						<label for="%1$s">%4$s%5$s%6$s</label>
					</div>
					',
					$navigation_id, // Id
					$block_id,  // name
					$panel_count, // value,
					$panel_icon,
					$panel_context->label, // Label 
					$style_icon,
					esc_attr( wp_json_encode( array( 'id' => $navigation_id, 'returnLabel' => $panel_context->returnLabel ?? 'Back' ) ) ),
				);
				
				// If this is a parent, add hooks for subnav items 
				if ( $is_parent ) {
					$navigation_options .= wp_sprintf('
					<div class="option-column" data-wp-interactive="prc-block/navigation-panels" data-wp-context="%5$s" %6$s>
						<template data-wp-each--option="state.subNavList" data-wp-each-key="%1$s">
							<div class="wp-block-prc-block-form-input-checkbox is-style-label-only sub-navigation">
								<input data-wp-bind--id="%1$s" type="radio" data-wp-bind--name="%2$s" class="" data-wp-bind--value="%3$s"
									data-wp-interactive="prc-block/navigation-panels" 
									data-wp-on--click="actions.setNavigation"
									data-wp-bind--checked="state.isSelected"
									>
								<label data-wp-bind--for="%1$s" data-wp-text="%4$s"></label>
							</div>
						</template>
					</div>
					',
					'context.option.navigationId', // Id
					'context.option.blockId',  // name
					'context.option.index', // value
					'context.option.label', // Label 
					esc_attr( wp_json_encode( array( 'blockId' => $block_id, 'index' => $panel_count ) ) ),
					'data-wp-class--is-desktop-hidden="!state.hasSubNav" data-wp-class--is-mobile-hidden="!state.hasSubNav"',
					);
				}

				if ( $is_child ){
					array_push($parent_navigation_list, array(
						'navigationId' => $navigation_id . '___sub-nav', // Id
						'blockId' => $block_id . '___sub-nav',  // name
						'index' => $panel_count, // value
						'label' => $panel_context->label,
						'returnLabel' => $panel_context->returnLabel ?? 'Back'
					));
				}
		
				// Add attributes 
				$tag->set_attribute( 'id', $panel_context->id );
				$tag->set_attribute( 'data-wp-interactive', 'prc-block/navigation-panels' );
				$tag->set_attribute( 'data-wp-bind--hidden', '!state.isSelected' );
				$tag->set_attribute( 'data-wp-context', wp_json_encode( $panel_context ) ); 

				$panel_count ++;
			}
			$tag->add_class('parsed');
		}
		// Get the modified content 
		$updated_content = $tag->get_updated_html();

		// ON TO THE CONTAINER BLOCK 
		// The main block classes 
		$classes = array(
			$is_parent ? 'is-parent-nav' : '',
			'desktop-' . $attributes['desktopLayout'],
			'mobile-' . $attributes['mobileLayout']
		);
		// The main block attributes
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'                  => $block_id,
				'class'               => implode(' ', $classes ),
				'data-wp-interactive' => 'prc-block/navigation-panels',
				'data-wp-context'     => wp_json_encode( array( 'blockId' => $block_id )),
			)
		);
		// Default Interactivity State
		// Top layout: activeIndex = which panel; panelOpen = drill-down phase (options vs content).
		// panelOpen defaults false on purpose — do not seed true from activePanelIndex.
		wp_interactivity_state(
			'prc-block/navigation-panels',
			array(
				$block_id => array(
					'level' => $attributes['level'] ?? 'independent',
					'activeIndex' => $active,
					'parentNavigationList' => $is_child ? $parent_navigation_list : []
				)
			)
		);

		// Top layout navigation class set up,
		// is-*-hidden toggles options/content per breakpoint; closed-by-default is intentional for top layout.
		$navigation_options_attributes = [ // for the options
			( $is_desktop_top ) ? 'data-wp-class--is-desktop-hidden="state.panelOpen"' : '',
			( $is_mobile_top ) ? 'data-wp-class--is-mobile-hidden="state.panelOpen"' : ''
		]; 
		$navigation_content_attributes = [ // for the panels
			( $is_desktop_top ) ? 'data-wp-class--is-desktop-hidden="!state.panelOpen"' : '',
			( $is_mobile_top ) ? 'data-wp-class--is-mobile-hidden="!state.panelOpen"' : ''
		]; 
		// Return Button Construction
		if ( $is_desktop_top || $is_mobile_top ) {
			$return_to_panel = wp_sprintf('
				<div class="wp-block-prc-block-form-input-checkbox is-style-label-only" data-wp-interactive="prc-block/navigation-panels" data-wp-context="%2$s">
					<input id="%1$s" type="radio" name="%1$s" class="" value="%1$s"
						data-wp-on--click="actions.resetNavigation"
						checked
						>
					<label for="%1$s" data-wp-text="state.returnLabel"></label>
				</div>
				',
				$block_id . '___inner_nav', 
				esc_attr( wp_json_encode( array( 'id' => $block_id . '___inner_nav', ))),

			);

			$navigation_return_classes = [ // for the return button
				( $is_desktop_top ) ? '' : 'is-desktop-hidden',
				( $is_mobile_top ) ? '' : 'is-mobile-hidden'
			]; 
			$navigation_return_options = wp_sprintf(
				'<div class="wp-block-prc-block-navigation-panels__inner-options %1$s">%2$s</div>',
				implode(' ', $navigation_return_classes),
				$return_to_panel
			); 
		} else {
			$navigation_return_options = '';
		}

		$min_width = esc_attr( $attributes['optionsMinWidth'] ?? '25%');
		return wp_sprintf(
			'<div %1$s>
				<div class="wp-block-prc-block-navigation-panels__options option-column" style="min-width:%2$s" %3$s>%4$s</div>
				<div class="wp-block-prc-block-navigation-panels__content" %5$s>%6$s %7$s</div>
			</div>',
			$block_wrapper_attrs,
			$min_width,
			implode(' ', $navigation_options_attributes),
			$navigation_options,
			implode(' ', $navigation_content_attributes),
			$navigation_return_options,
			$updated_content,

		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/navigation-panels',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}