<?php
/**
 * Settings class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */

namespace PRC\Platform\Blocks\Table;

/**
 * Settings class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */
class Settings {

	// Default options.
	const OPTIONS = array(

		// Show section labels on table in the editor.
		'show_label_on_section' => array(
			'type'    => 'boolean',
			'default' => true,
		),
		// Show insert row/column buttons.
		'show_control_button'   => array(
			'type'    => 'boolean',
			'default' => true,
		),
		// Focus insert/select buttons, select row/column buttons, section label from being focused when moving with the crosshairs.
		'focus_control_button'  => array(
			'type'    => 'boolean',
			'default' => false,
		),
		// Show dot on th tag in the editor.
		'show_dot_on_th'        => array(
			'type'    => 'boolean',
			'default' => true,
		),
		// Use the TAB key to move cells.
		'tab_move'              => array(
			'type'    => 'boolean',
			'default' => false,
		),
		// Keep the contents of all cells when merging cells.
		'merge_content'         => array(
			'type'    => 'boolean',
			'default' => false,
		),
		// Show Global setting button to non-administrative users.
		'show_global_setting'   => array(
			'type'    => 'boolean',
			'default' => false,
		),
		// Set the screen width (breakpoint) as the basis for switching between desktop and mobile devices.
		'breakpoint'            => array(
			'type'    => 'number',
			'default' => 768,
			'range'   => array(
				'min' => 200,
				'max' => 1200,
			),
		),
		// Default table styles.
		'block_style'           => array(
			'type'    => 'array',
			'default' => array(
				'table_width'              => '100%',
				'table_max_width'          => '100%',
				'table_border_collapse'    => 'collapse',
				'row_odd_color'            => '#f0f0f1',
				'row_even_color'           => '#ffffff',
				'cell_text_color_th'       => null,
				'cell_text_color_td'       => null,
				'cell_background_color_th' => '#f0f0f1',
				'cell_background_color_td' => '#ffffff',
				'cell_padding'             => array(
					'top'    => '0.5em',
					'right'  => '0.5em',
					'bottom' => '0.5em',
					'left'   => '0.5em',
				),
				'cell_border_width'        => '1px',
				'cell_border_style'        => 'solid',
				'cell_border_color'        => '#000000',
				'cell_text_align'          => 'left',
				'cell_vertical_align'      => 'middle',
			),
		),
	);

	/**
	 * Constructor
	 */
	public function __construct() {
	}

	/**
	 * Get options
	 *
	 * @return array
	 */
	public static function get_options() {
		$options = array();

		foreach ( self::OPTIONS as $key => $value ) {
			$options[ $key ] = get_option( FTB_OPTION_PREFIX . '_' . $key, self::OPTIONS[ $key ]['default'] );

			if ( 'boolean' === self::OPTIONS[ $key ]['type'] ) {
				$options[ $key ] = $options[ $key ] ? true : false;
			}
		}

		// Convert cell padding of string values to array.
		if ( 'string' === gettype( $options['block_style']['cell_padding'] ) ) {
			$padding_value = $options['block_style']['cell_padding'];

			$options['block_style']['cell_padding'] = array(
				'top'    => $padding_value,
				'right'  => $padding_value,
				'bottom' => $padding_value,
				'left'   => $padding_value,
			);
		}

		return $options;
	}
}
