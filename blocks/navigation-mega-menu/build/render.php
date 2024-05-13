<?php
namespace PRC\Platform;
// Required
$label                  = $attributes['label'] ?? '';
$menu_slug              = $attributes['menuSlug'] ?? '';
// If no label or no menu slug return early.
if ( ! $label || ! $menu_slug ) {
	return;
}

ob_start();
block_template_part( $menu_slug );
$mega_menu_template_part = ob_get_clean();
if ( empty($mega_menu_template_part) ) {
	return;
}

// Optional Attributes
$animation              = $attributes['animation'] ?? '';
$url_description        = $attributes['description'] ?? false;
$url_title				= $attributes['title'] ?? false;
$url                    = $attributes['url'] ?? false;
$icon 				    = $attributes['icon'] ?? 'dropdown';
$has_box_shadow	        = $attributes['hasBoxShadow'] ?? false;
$is_mobile              = $attributes['isMobile'] ?? false;

$menu_uniq_id = wp_unique_id('mega-menu-');

$colors = [
	'menu-item-background' => $attributes['menuItemBackgroundColor'] ?? false,
	'menu-item-color' => $attributes['menuItemTextColor'] ?? false,
	'menu-item-active-background' => $attributes['menuItemActiveBackgroundColor'] ?? false,
	'menu-item-active-color' => $attributes['menuItemActiveTextColor'] ?? false,
	'overlay-background' => $attributes['menuOverlayBackgroundColor'] ?? false,
	'overlay-color' => $attributes['menuOverlayTextColor'] ?? false,
	'active-border-color' => $attributes['menuActiveBorderColor'] ?? false,
];

$initial_state = [
	$menu_uniq_id => [
		'isActive' => false,
		'top' => 0,
		'left' => 0,
		'width' => 0,
	],
];
$initial_state[$menu_uniq_id] = ['isActive' => false];
wp_interactivity_state('prc-block/navigation-mega-menu', $initial_state);

ob_start();?>
<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo $icon;?>-icon">
	<?php if ( 'dropdown' === $icon ) {
		echo Icons\Render('solid', 'caret-down');
	} elseif( 'mobile' === $icon ) {
		echo Icons\Render('light', 'bars');
	} elseif ( 'search' === $icon ) {
		echo Icons\Render('solid', 'magnifying-glass');
	}?>
</span>
<?php
$toggle_icon = ob_get_clean();

$overlay_classnames = Block_Utils\classNames([
	'wp-block-prc-block-navigation-mega-menu__container',
	'has-overlay-background' => !!$colors['overlay-background'],
	sprintf( 'has-%s-overlay-background', $colors['overlay-background'] ) => !!$colors['overlay-background'],
	'has-overlay-color' => !!$colors['overlay-color'],
	sprintf( 'has-%s-overlay-color', $colors['overlay-color'] ) => !!$colors['overlay-color'],
]);
ob_start();
?>
<div
	class="<?php echo $overlay_classnames;?>"
	tabindex="-1"
	data-wp-style--top="state.top"
	data-wp-style--left="state.left"
	data-wp-style--width="state.width"
>
	<?php echo $mega_menu_template_part; ?>
	<button
		aria-label="<?php echo __( 'Close menu', 'mega-menu' ); ?>"
		class="wp-block-prc-block-navigation-mega-menu__container__close-button"
		data-wp-on--click="actions.closeMenuOnClick"
		type="button"
	>
		<?php echo Icons\Render('solid', 'close');?>
	</button>
</div>
<?php
$mega_menu_container__and__content = ob_get_clean();

$display_label = (!$icon || 'dropdown' === $icon) ? $label : '';

$wrapper_attributes = get_block_wrapper_attributes([
	'id' => $menu_uniq_id,
	'class' => Block_Utils\classNames([
		'wp-block-navigation-item',
		'has-label' => 'dropdown' === $icon,
		'has-active-menu-item-background' => !!$colors['menu-item-active-background'],
		sprintf( 'has-%s-active-menu-item-background', $colors['menu-item-active-background'] ) => !!$colors['menu-item-active-background'],
		'has-active-menu-item-color' => !!$colors['menu-item-active-color'],
		sprintf( 'has-%s-active-menu-item-color', $colors['menu-item-active-color'] ) => !!$colors['menu-item-active-color'],
		'has-menu-item-background' => !!$colors['menu-item-background'],
		sprintf( 'has-%s-menu-item-background', $colors['menu-item-background'] ) => !!$colors['menu-item-background'],
		'has-menu-item-color' => !!$colors['menu-item-color'],
		sprintf( 'has-%s-menu-item-color', $colors['menu-item-color'] ) => !!$colors['menu-item-color'],
		'has-active-border-color' => !!$colors['active-border-color'],
		sprintf( 'has-%s-active-border-color', $colors['active-border-color'] ) => !!$colors['active-border-color'],
		'has-box-shadow' => $has_box_shadow,
		'is-mobile' => $is_mobile,
	]),
	'data-wp-interactive' => wp_json_encode([
		'namespace' => 'prc-block/navigation-mega-menu'
	]),
	'data-wp-context' => wp_json_encode([
		'id' => $menu_uniq_id,
		'animation' => $animation,
		'url' => $url,
	]),
	'data-wp-class--is-active' => 'state.isActive',
	'data-wp-watch' => 'callbacks.onInit',
	'data-wp-on-window--resize' => 'callbacks.onResize',
	'data-wp-on-document--keydown' => 'callbacks.onESCKey',
	'data-wp-on-window--click' => 'callbacks.onWindowClickCloseMegaMenu',
]);

?>

<div <?php echo $wrapper_attributes; ?>>
	<button
		class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
		data-wp-on--click="actions.toggleMenuOnClick"
		data-wp-bind--aria-expanded="state.isActive"
		title="<?php echo esc_attr($url_title); ?>"
		aria-description="<?php echo esc_attr($url_description); ?>"
		aria-controls="<?php echo esc_attr($menu_uniq_id); ?>"
	>
		<?php echo esc_html($display_label);?>
		<?php echo $toggle_icon;?>
	</button>

	<div class="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>

	<?php echo $mega_menu_container__and__content; ?>
</div>
