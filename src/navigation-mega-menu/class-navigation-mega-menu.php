<?php
/**
 * Navigation Mega Menu Block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use MatthiasMullie\Minify;

/**
 * Block Name:        Navigation Mega Menu
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Navigation_Mega_Menu {
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
	 * @param array $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'default_wp_template_part_areas', $this, 'mega_menu_template_part_areas', 10, 1 );
			$loader->add_filter( 'block_core_navigation_listable_blocks', $this, 'enable_mega_menu_list_wrapper', 10, 1 );
		}
	}

	/**
	 * Enables the mega menu block to be auto-wrapped in an <li> element by the navigation block on the frontend.
	 *
	 * @hook block_core_navigation_listable_blocks
	 * @param array $blocks The blocks to enable.
	 * @return array The modified blocks.
	 */
	public function enable_mega_menu_list_wrapper( $blocks ) {
		$blocks[] = 'prc-block/navigation-mega-menu';
		return $blocks;
	}

	/**
	 * Adds a custom template part area for mega menus to the list of template part areas.
	 *
	 * This function introduces a new area specifically for menu templates, allowing
	 * the creation of sections within a mega menu. The new area is appended to the
	 * existing list of template part areas.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/default_wp_template_part_areas/
	 *
	 * @param array $areas Existing array of template part areas.
	 * @return array Modified array of template part areas including the new mega menu area.
	 */
	public function mega_menu_template_part_areas( array $areas ) {
		$areas[] = array(
			'area'        => 'menu',
			'label'       => __( 'Menu', 'navigation-mega-menu' ),
			'description' => __( 'Menu templates are used to create sections of a mega menu.', 'navigation-mega-menu' ),
			'icon'        => 'layout',
			'area_tag'    => 'div',
		);
		return $areas;
	}

	/**
	 * Build inline CSS custom properties for color settings.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return string Inline CSS string.
	 */
	private function generate_color_styles( array $attributes ): string {
		$menu_item_bg          = $attributes['customMenuItemBackgroundColor'] ?? '';
		$menu_item_text        = $attributes['customMenuItemTextColor'] ?? '';
		$menu_item_active_bg   = $attributes['customMenuItemActiveBackgroundColor'] ?? '';
		$menu_item_active_text = $attributes['customMenuItemActiveTextColor'] ?? '';
		$menu_overlay_bg       = $attributes['customMenuOverlayBackgroundColor'] ?? '';
		$menu_overlay_text     = $attributes['customMenuOverlayTextColor'] ?? '';
		$menu_active_border    = $attributes['customMenuActiveBorderColor'] ?? '';

		$styles = array(
			'--custom-menu-item-background-color'        => $menu_item_bg,
			'--custom-menu-item-text-color'              => $menu_item_text,
			'--custom-menu-item-active-background-color' => $menu_item_active_bg,
			'--custom-menu-item-active-text-color'       => $menu_item_active_text,
			'--custom-menu-overlay-background-color'     => $menu_overlay_bg,
			'--custom-menu-overlay-text-color'           => $menu_overlay_text,
			'--custom-menu-active-brdr-color'           => $menu_active_border,
		);

		$style_string = array_map(
			static function ( string $key, string $value ): string {
				return ! empty( $value ) ? $key . ': ' . $value . ';' : '';
			},
			array_keys( $styles ),
			$styles
		);

		return implode( ' ', array_filter( $style_string ) );
	}

	/**
	 * Render callback for the navigation mega menu block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block content.
	 * @param WP_Block $block      Block instance.
	 *
	 * @return string|null Rendered block markup or null if conditions not met.
	 */
	public function block_render_callback( $attributes, $content, $block ) {
		$label     = $attributes['label'] ?? '';
		$menu_slug = $attributes['menuSlug'] ?? false;
		if ( ! $label || ! $menu_slug ) {
			return;
		}

		ob_start();
		block_template_part( $menu_slug );
		$mega_menu_template_part = ob_get_clean();
		if ( empty( $mega_menu_template_part ) ) {
			return;
		}

		$animation       = $attributes['animation'] ?? '';
		$url_description = $attributes['description'] ?? false;
		$url_title       = $attributes['title'] ?? false;
		$url             = $attributes['url'] ?? false;
		$icon            = $attributes['icon'] ?? 'dropdown';
		$has_box_shadow  = $attributes['hasBoxShadow'] ?? false;
		$is_mobile       = $attributes['isMobile'] ?? false;

		$menu_uniq_id = wp_unique_id( 'mega-menu-' );

		$initial_state                  = array(
			$menu_uniq_id => array(
				'isActive' => false,
				'top'      => 0,
				'left'     => 0,
				'width'    => 0,
			),
		);
		$initial_state[ $menu_uniq_id ] = array( 'isActive' => false );
		wp_interactivity_state( 'prc-block/navigation-mega-menu', $initial_state );

		ob_start();
		?>
		<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo $icon; ?>-icon">
			<?php
			if ( 'dropdown' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'solid', 'caret-down' );
			} elseif ( 'mobile' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'light', 'bars' );
			} elseif ( 'search' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'solid', 'magnifying-glass' );
			}
			?>
		</span>
		<?php
		$toggle_icon = ob_get_clean();

		ob_start();
		?>
		<button
			aria-label="<?php echo esc_attr__( 'Close Menu', 'prc-block-library' ); ?>"
			class="wp-block-prc-block-navigation-mega-menu__container__close-button"
			data-wp-on--click="actions.closeMenuOnClick"
			type="button"
		>
			<?php echo \PRC\Platform\Icons\Render( 'solid', 'close' ); ?>
		</button>
		<?php
		$close_button = ob_get_clean();

		$overlay_classnames = 'wp-block-prc-block-navigation-mega-menu__container';

		ob_start();
		?>
		<div
			class="<?php echo esc_attr( $overlay_classnames ); ?>"
			tabindex="-1"
			data-wp-style--top="state.top"
			data-wp-style--left="state.left"
			data-wp-style--width="state.width"
		>
			<?php echo $close_button; ?>
			<?php echo $mega_menu_template_part; ?>
		</div>

		<?php
		$mega_menu_container__and__content = ob_get_clean();

		$display_label = ( ! $icon || 'dropdown' === $icon ) ? $label : '';

		// Generate inline color styles.
		$color_styles = $this->generate_color_styles( $attributes );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'                           => $menu_uniq_id,
				'class'                        => \PRC\Platform\Block_Utils\classNames(
					array(
						'wp-block-navigation-item',
						'has-label'      => 'dropdown' === $icon,
						'has-box-shadow' => $has_box_shadow,
						'is-mobile'      => $is_mobile,
					)
				),
				'style'                        => $color_styles,
				'data-wp-interactive'          => 'prc-block/navigation-mega-menu',
				'data-wp-context'              => wp_json_encode(
					array(
						'id'        => $menu_uniq_id,
						'animation' => $animation,
						'url'       => $url,
					)
				),
				'data-wp-class--is-active'     => 'state.isActive',
				'data-wp-init'                 => 'callbacks.onInit',
				'data-wp-on-window--resize'    => 'callbacks.onResize',
				'data-wp-on-document--keydown' => 'callbacks.onESCKey',
				'data-wp-on-window--click'     => 'callbacks.onWindowClickCloseMegaMenu',
			)
		);
		ob_start();
		?>

		<div <?php echo $wrapper_attributes; ?>>
			<button
				class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
				data-wp-on--click="actions.toggleMenuOnClick"
				data-wp-bind--aria-expanded="state.isActive"
				title="<?php echo esc_attr( $url_title ); ?>"
				aria-description="<?php echo esc_attr( $url_description ); ?>"
				aria-controls="<?php echo esc_attr( $menu_uniq_id ); ?>"
			>
				<?php echo esc_html( $display_label ); ?>
				<?php echo $toggle_icon; ?>
			</button>

			<div class="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>

			<?php echo $mega_menu_container__and__content; ?>
		</div>
		<?php
		return ob_get_clean();
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
			PRC_BLOCK_LIBRARY_DIR . '/build/navigation-mega-menu',
			array(
				'render_callback' => array( $this, 'block_render_callback' ),
			)
		);
	}
}
