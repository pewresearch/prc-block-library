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
// $toggle_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false" fill="none"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg>';
// $mobile_menu_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
// $search_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M23.707 22.293l-5.656-5.656c1.125-1.5 1.8-3.375 1.8-5.437 0-5.925-4.8-10.725-10.725-10.725S0.094 5.275 0.094 11.2s4.8 10.725 10.725 10.725c2.063 0 3.938-0.675 5.437-1.8l5.656 5.656c0.375 0.375 1 0.375 1.375 0s0.375-1 0-1.375zM1.875 11.2c0-4.95 4.05-9 9-9s9 4.05 9 9-4.05 9-9 9-9-4.05-9-9z"></path></svg>';

$initial_state = [];
$initial_state[$id] = ['isActive' => false];
wp_interactivity_state('prc-block/navigation-mega-menu', $initial_state);

// use wp html tag process to look inside mega_menu_template_part and see if theres a group block that has-background, if so lets get its has-background, has-*-background-color, has-text-color, and has-*-color classnames as an array
$classname_directives = [];
// $tag_processor = new WP_HTML_Tag_Processor($mega_menu_template_part);
// if ( $tag_processor->next_tag() && $tag_processor->has_class('has-background') ) {
// 	error_log("YISS".print_r($mega_menu_template_part, true));
// 	$classnames = $tag_processor->get_attribute('class');
// 	$classnames = explode(' ', $classnames);
// 	$classnames = array_filter($classnames, function($classname) {
// 		return preg_match('/^has-(background|text|.*-background-color|.*-color)$/', $classname);
// 	});
// 	$classname_directives = array_map(function($classname) {
// 		return 'data-wp-class--' . $classname . '="state.isActive"';
// 	}, $classnames);
// }

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
		<?php echo implode(' ', $classname_directives); ?>
	>
		<?php echo esc_html($display_label);?>
		<span class="wp-block-prc-block-navigation-mega-menu__toggle-<?php echo $icon;?>-icon">
			<?php if ( 'dropdown' === $icon ) {
				echo '<i class="fa-solid fa-caret-down"></i>';
			} elseif( 'mobile' === $icon ) {
				echo '<i class="fa-light fa-bars"></i>';
			} elseif ( 'search' === $icon ) {
				echo '<i class="fa-solid fa-magnifying-glass"></i>';
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
			<?php echo $close_icon; ?>
		</button>
	</div>
</li>
