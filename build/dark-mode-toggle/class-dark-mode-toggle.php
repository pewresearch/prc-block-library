<?php
/**
 * Dark Mode Toggle Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Dark Mode Toggle
 * Description:       A button that lets visitors override their OS color-scheme preference for the current site, switching between light and dark mode.
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Dark_Mode_Toggle {
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
		}
	}

	/**
	 * Render callback for the block.
	 *
	 * Emits the wrapper element with Interactivity API directives plus inline
	 * sun/moon icons. Both icons are rendered up-front and the inactive one is
	 * hidden via `data-wp-bind--hidden` so the toggle reflects the action it
	 * will perform when clicked (moon when site is light, sun when site is
	 * dark).
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public function render_callback( $attributes ) {
		$show_label  = isset( $attributes['showLabel'] ) ? (bool) $attributes['showLabel'] : true;
		$light_label = isset( $attributes['lightLabel'] ) ? (string) $attributes['lightLabel'] : __( 'Light mode', 'dark-mode-toggle' );
		$dark_label  = isset( $attributes['darkLabel'] ) ? (string) $attributes['darkLabel'] : __( 'Dark mode', 'dark-mode-toggle' );

		$context = wp_json_encode(
			array(
				'showLabel'  => $show_label,
				'lightLabel' => $light_label,
				'darkLabel'  => $dark_label,
			)
		);

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'data-wp-interactive' => wp_json_encode(
					array(
						'namespace' => 'prc-block/dark-mode-toggle',
					)
				),
				'data-wp-init--init'  => 'callbacks.onInit',
				'data-wp-context'     => $context,
				'type'                => 'button',
				'data-wp-on--click'   => 'actions.toggle',
				'data-wp-bind--aria-label' => 'state.ariaLabel',
				'aria-pressed' => 'false',
				'data-wp-bind--aria-pressed' => 'state.isDark',
				)
		);

		$moon_icon = \PRC\Platform\Icons\render( 'light', 'moon' );
		$sun_icon  = \PRC\Platform\Icons\render( 'light', 'sun' );

		$label_markup = '';
		if ( $show_label ) {
			$label_markup = '<span class="prc-dark-mode-toggle__label" data-wp-text="state.label"></span>';
		}

		$button_contents = sprintf(
			'<span class="prc-dark-mode-toggle__icon prc-dark-mode-toggle__icon--moon" aria-hidden="true" data-wp-bind--hidden="state.isDark">%1$s</span><span class="prc-dark-mode-toggle__icon prc-dark-mode-toggle__icon--sun" aria-hidden="true" data-wp-bind--hidden="!state.isDark">%2$s</span>%3$s',
			$moon_icon,
			$sun_icon,
			$label_markup
		);

		return sprintf(
			'<button %1$s>%2$s</button>',
			$wrapper_attributes,
			$button_contents
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/dark-mode-toggle',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
