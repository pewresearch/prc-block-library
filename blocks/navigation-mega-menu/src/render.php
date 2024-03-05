<?php
// Required
$label                  = $attributes['label'] ?? '';
$menu_slug              = $attributes['menuSlug'] ?? '';
$animation              = $attributes['animation'] ?? '';
// Optional
$url_description        = $attributes['description'] ?? false;
$url_title				= $attributes['title'] ?? false;
$url                    = $attributes['url'] ?? false;

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

$wrapper_attributes = get_block_wrapper_attributes([
	'id' => $id,
	'class' => 'wp-block-navigation-item',
	'data-wp-interactive' => wp_json_encode([
		'namespace' => 'prc-block/navigation-mega-menu'
	]),
	'data-wp-context' => wp_json_encode([
		'id' => $id,
		'animation' => $animation,
		'url' => $url,
	]),
	'data-wp-on--focusout' => 'actions.handleMenuFocusout',
	'data-wp-on--keydown' => 'actions.handleMenuKeydown',
	'data-wp-watch' => 'callbacks.onInit',
	'data-wp-on-window--resize' => 'callbacks.onResize',
]);

// Icons.
$close_icon  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>';
$toggle_icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false" fill="none"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg>';

$initial_state = [];
$initial_state[$id] = ['isOpen' => false];
wp_interactivity_state('prc-block/navigation-mega-menu', $initial_state);
?>

<li <?php echo $wrapper_attributes; ?>>
	<button
		class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
		data-wp-on--click="actions.toggleMenuOnClick"
		data-wp-bind--aria-expanded="state.isOpen"
		title="<?php echo esc_attr($url_title); ?>"
		aria-description="<?php echo esc_attr($url_description); ?>"
	>
		<?php echo esc_html($label); ?>
		<span class="wp-block-prc-block-navigation-mega-menu__toggle-icon">
			<?php echo $toggle_icon; ?>
		</span>
	</button>

	<div
		class="wp-block-prc-block-navigation-mega-menu__container"
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
