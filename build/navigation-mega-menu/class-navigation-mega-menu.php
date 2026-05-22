<?php
/**
 * Navigation Mega Menu Block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

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

		$menu_active_border    = $attributes['customMenuActiveBorderColor'] ?? '';

		$styles = array(
			'--custom-menu-item-background-color'        => $menu_item_bg,
			'--custom-menu-item-text-color'              => $menu_item_text,
			'--custom-menu-item-active-background-color' => $menu_item_active_bg,
			'--custom-menu-item-active-text-color'       => $menu_item_active_text,

			'--custom-menu-active-brdr-color'            => $menu_active_border,
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
	 * The overlay is rendered as a native `<dialog>` element. The frontend
	 * Interactivity store calls `dialogEl.showModal()` / `dialogEl.close()`
	 * in response to `state[id].isActive` flips, so all stacking, focus,
	 * Escape, and `::backdrop` outside-click semantics are handled by the
	 * platform rather than by hand.
	 *
	 * Vertical position is driven by the CSS variable
	 * `--prc-mega-menu-anchor-top` on the `<dialog>` (distance from the
	 * viewport top to the bottom edge of the parent `core/navigation` block),
	 * updated at runtime by `view.js` via `ResizeObserver` + window resize —
	 * so the dialog sits flush under the nav bar even though `showModal()`
	 * moves it into the top layer. Each instance sets its own variable on the
	 * dialog element so multiple mega menus do not overwrite each other.
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
		$icon            = $attributes['icon'] ?? 'dropdown';
		$has_box_shadow  = $attributes['hasBoxShadow'] ?? false;
		$is_mobile       = $attributes['isMobile'] ?? false;

		$menu_uniq_id = wp_unique_id( 'mega-menu-' );
		$dialog_id    = $menu_uniq_id . '-dialog';

		// Per-instance interactivity state. The store keys all per-dialog
		// data by the wrapper id so multiple mega menus can coexist without
		// stomping on each other.
		wp_interactivity_state(
			'prc-block/navigation-mega-menu',
			array(
				$menu_uniq_id => array(
					'isActive' => false,
				),
			)
		);

		ob_start();
		?>
		<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo esc_attr( $icon ); ?>-icon">
			<?php
			if ( 'dropdown' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'solid', 'caret-down' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} elseif ( 'mobile' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'light', 'bars' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} elseif ( 'search' === $icon ) {
				echo \PRC\Platform\Icons\Render( 'solid', 'magnifying-glass' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
			<?php echo \PRC\Platform\Icons\Render( 'solid', 'close' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</button>
		<?php
		$close_button = ob_get_clean();

		// Keep the legacy `__container` class on the dialog for one release so
		// any site CSS targeting the old div-based selector keeps applying.
		$dialog_classnames = \PRC\BlockUtils\classNames(
			array(
				'wp-block-prc-block-navigation-mega-menu__container',
				'wp-block-prc-block-navigation-mega-menu__dialog',
				$animation ? 'is-animation-' . $animation : '',
			)
		);

		ob_start();
		?>
		<dialog
			id="<?php echo esc_attr( $dialog_id ); ?>"
			class="<?php echo esc_attr( $dialog_classnames ); ?>"
			data-wp-on--click="callbacks.onBackdropClick"
			data-wp-on--close="callbacks.onDialogClose"
		>
			<?php echo $close_button; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $mega_menu_template_part; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</dialog>
		<?php
		$mega_menu_dialog = ob_get_clean();

		$display_label = ( ! $icon || 'dropdown' === $icon ) ? $label : '';

		$wrapper_styles = $this->generate_color_styles( $attributes );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'                       => $menu_uniq_id,
				'class'                    => \PRC\BlockUtils\classNames(
					array(
						'wp-block-navigation-item',
						'has-label'      => 'dropdown' === $icon,
						'has-box-shadow' => $has_box_shadow,
						'is-mobile'      => $is_mobile,
					)
				),
				'style'                    => $wrapper_styles,
				'data-wp-interactive'      => 'prc-block/navigation-mega-menu',
				'data-wp-context'          => wp_json_encode(
					array(
						'id'        => $menu_uniq_id,
						'dialogId'  => $dialog_id,
						'animation' => $animation,
					)
				),
				'data-wp-class--is-active' => 'state.isActive',
				'data-wp-init'             => 'callbacks.onInit',
				'data-wp-watch'            => 'callbacks.syncDialogState',
			)
		);
		ob_start();
		?>

		<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<button
				class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
				data-wp-on--click="actions.toggleMenuOnClick"
				data-wp-bind--aria-expanded="state.isActive"
				title="<?php echo esc_attr( $url_title ); ?>"
				aria-description="<?php echo esc_attr( $url_description ); ?>"
				aria-controls="<?php echo esc_attr( $dialog_id ); ?>"
				type="button"
			>
				<?php echo esc_html( $display_label ); ?>
				<?php echo $toggle_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>

			<div class="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>

			<?php echo $mega_menu_dialog; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
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
