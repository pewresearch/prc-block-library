<?php
/**
 * Render the navigation mega menu block.
 *
 * @since 1.0.0
 *
 * @package PRC\Platform
 */

namespace PRC\Platform;

$label     = $attributes['label'] ?? '';
$menu_slug = $attributes['menuSlug'] ?? '';
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

$colors = array(
	'menu-item-background'        => $attributes['menuItemBackgroundColor'] ?? false,
	'menu-item-color'             => $attributes['menuItemTextColor'] ?? false,
	'menu-item-active-background' => $attributes['menuItemActiveBackgroundColor'] ?? false,
	'menu-item-active-color'      => $attributes['menuItemActiveTextColor'] ?? false,
	'overlay-background'          => $attributes['menuOverlayBackgroundColor'] ?? false,
	'overlay-color'               => $attributes['menuOverlayTextColor'] ?? false,
	'active-border-color'         => $attributes['menuActiveBorderColor'] ?? false,
);

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

ob_start();?>
<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo $icon; ?>-icon">
	<?php
	if ( 'dropdown' === $icon ) {
		echo Icons\Render( 'solid', 'caret-down' );
	} elseif ( 'mobile' === $icon ) {
		echo Icons\Render( 'light', 'bars' );
	} elseif ( 'search' === $icon ) {
		echo Icons\Render( 'solid', 'magnifying-glass' );
	}
	?>
</span>
<?php
$toggle_icon = ob_get_clean();

ob_start();
?>
<button
	aria-label="<?php echo __( 'Close Menu', 'mega-menu' ); ?>"
	class="wp-block-prc-block-navigation-mega-menu__container__close-button"
	data-wp-on--click="actions.closeMenuOnClick"
	type="button"
>
	<?php echo Icons\Render( 'solid', 'close' ); ?>
</button>
<?php
$close_button = ob_get_clean();

$overlay_classnames = Block_Utils\classNames(
	array(
		'wp-block-prc-block-navigation-mega-menu__container',
		'has-overlay-background' => (bool) $colors['overlay-background'],
		sprintf( 'has-%s-overlay-background', $colors['overlay-background'] ) => (bool) $colors['overlay-background'],
		'has-overlay-color'      => (bool) $colors['overlay-color'],
		sprintf( 'has-%s-overlay-color', $colors['overlay-color'] ) => (bool) $colors['overlay-color'],
	)
);
ob_start();
?>
<div
	class="<?php echo $overlay_classnames; ?>"
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

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'                           => $menu_uniq_id,
		'class'                        => Block_Utils\classNames(
			array(
				'wp-block-navigation-item',
				'has-label'                       => 'dropdown' === $icon,
				'has-active-menu-item-background' => (bool) $colors['menu-item-active-background'],
				sprintf( 'has-%s-active-menu-item-background', $colors['menu-item-active-background'] ) => (bool) $colors['menu-item-active-background'],
				'has-active-menu-item-color'      => (bool) $colors['menu-item-active-color'],
				sprintf( 'has-%s-active-menu-item-color', $colors['menu-item-active-color'] ) => (bool) $colors['menu-item-active-color'],
				'has-menu-item-background'        => (bool) $colors['menu-item-background'],
				sprintf( 'has-%s-menu-item-background', $colors['menu-item-background'] ) => (bool) $colors['menu-item-background'],
				'has-menu-item-color'             => (bool) $colors['menu-item-color'],
				sprintf( 'has-%s-menu-item-color', $colors['menu-item-color'] ) => (bool) $colors['menu-item-color'],
				'has-active-border-color'         => (bool) $colors['active-border-color'],
				sprintf( 'has-%s-active-border-color', $colors['active-border-color'] ) => (bool) $colors['active-border-color'],
				'has-box-shadow'                  => $has_box_shadow,
				'is-mobile'                       => $is_mobile,
			)
		),
		'data-wp-interactive'          => 'prc-block/navigation-mega-menu',
		'data-wp-context'              => wp_json_encode(
			array(
				'id'        => $menu_uniq_id,
				'animation' => $animation,
				'url'       => $url,
			)
		),
		'data-wp-class--is-active'     => 'state.isActive',
		'data-wp-watch'                => 'callbacks.onInit',
		'data-wp-on-window--resize'    => 'callbacks.onResize',
		'data-wp-on-document--keydown' => 'callbacks.onESCKey',
		'data-wp-on-window--click'     => 'callbacks.onWindowClickCloseMegaMenu',
	)
);

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
