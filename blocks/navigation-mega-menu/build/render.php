<?php
// Required
$label                  = $attributes['label'] ?? '';
$menu_slug              = $attributes['menuSlug'] ?? '';
$animation              = $attributes['animation'] ?? '';
// Optional
$url_description        = $attributes['description'] ?? false;
$url_title				= $attributes['title'] ?? false;
$url                    = $attributes['url'] ?? false;
$icon 				    = $attributes['icon'] ?? 'dropdown';

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

$id = wp_unique_id('mega-menu-');

$colors = [
	'menu-item-background' => $attributes['menuItemBackgroundColor'] ?? false,
	'menu-item-color' => $attributes['menuItemTextColor'] ?? false,
	'menu-item-active-background' => $attributes['menuItemActiveBackgroundColor'] ?? false,
	'menu-item-active-color' => $attributes['menuItemActiveTextColor'] ?? false,
	'overlay-background' => $attributes['menuOverlayBackgroundColor'] ?? false,
	'overlay-color' => $attributes['menuOverlayTextColor'] ?? false,
];

$wrapper_attributes = get_block_wrapper_attributes([
	'id' => $id,
	'class' => \PRC\Platform\Block_Utils\classNames([
		'wp-block-navigation-item',
		'has-active-menu-item-background' => !!$colors['menu-item-active-background'],
		sprintf( 'has-%s-active-menu-item-background', $colors['menu-item-active-background'] ) => !!$colors['menu-item-active-background'],
		'has-active-menu-item-color' => !!$colors['menu-item-active-color'],
		sprintf( 'has-%s-active-menu-item-color', $colors['menu-item-active-color'] ) => !!$colors['menu-item-active-color'],
		'has-menu-item-background' => !!$colors['menu-item-background'],
		sprintf( 'has-%s-menu-item-background', $colors['menu-item-background'] ) => !!$colors['menu-item-background'],
		'has-menu-item-color' => !!$colors['menu-item-color'],
		sprintf( 'has-%s-menu-item-color', $colors['menu-item-color'] ) => !!$colors['menu-item-color'],
	]),
	'data-wp-interactive' => wp_json_encode([
		'namespace' => 'prc-block/navigation-mega-menu'
	]),
	'data-wp-context' => wp_json_encode([
		'id' => $id,
		'animation' => $animation,
		'url' => $url,
	]),
	'data-wp-class--is-active' => 'state.isActive',
	'data-wp-watch' => 'callbacks.onInit',
	'data-wp-on-window--resize' => 'callbacks.onResize',
	'data-wp-on-document--keydown' => 'callbacks.onESCKey',
	'data-wp-on-window--click' => 'callbacks.onWindowClickCloseMegaMenu',
]);

// Icons.
$close_icon  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>';

$initial_state = [];
$initial_state[$id] = ['isActive' => false];
wp_interactivity_state('prc-block/navigation-mega-menu', $initial_state);

$overlay_classnames = \PRC\Platform\Block_Utils\classNames([
	'wp-block-prc-block-navigation-mega-menu__container',
	'has-overlay-background' => !!$colors['overlay-background'],
	sprintf( 'has-%s-overlay-background', $colors['overlay-background'] ) => !!$colors['overlay-background'],
	'has-overlay-color' => !!$colors['overlay-color'],
	sprintf( 'has-%s-overlay-color', $colors['overlay-color'] ) => !!$colors['overlay-color'],
]);

$display_label = !$icon || 'dropdown' === $icon ? $label : '';
?>

<li <?php echo $wrapper_attributes; ?>>
	<button
		class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
		data-wp-on--click="actions.toggleMenuOnClick"
		data-wp-bind--aria-expanded="state.isActive"
		title="<?php echo esc_attr($url_title); ?>"
		aria-description="<?php echo esc_attr($url_description); ?>"
		aria-controls="<?php echo $id; ?>"
	>
		<?php echo esc_html($display_label);?>
		<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo $icon;?>-icon">
			<?php if ( 'dropdown' === $icon ) {
				echo PRC\Platform\Icons\Render('solid', 'caret-down');
			} elseif( 'mobile' === $icon ) {
				echo PRC\Platform\Icons\Render('light', 'bars');
			} elseif ( 'search' === $icon ) {
				echo PRC\Platform\Icons\Render('solid', 'magnifying-glass');
			}?>
		</span>
	</button>

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
			<i class="fa-light fa-circle-minus"></i>
		</button>
	</div>
</li>
