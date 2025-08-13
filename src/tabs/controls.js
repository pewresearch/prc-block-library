/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl, PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function Controls( {
	attributes,
	setAttributes,
	clientId,
	tabInactiveColor,
	setTabInactiveColor,
	tabHoverColor,
	setTabHoverColor,
	tabActiveColor,
	setTabActiveColor,
	tabTextColor,
	setTabTextColor,
	tabActiveTextColor,
	setTabActiveTextColor,
	tabHoverTextColor,
	setTabHoverTextColor,
} ) {
	const {
		customTabInactiveColor,
		customTabActiveColor,
		customTabHoverColor,
		customTabTextColor,
		customTabActiveTextColor,
		customTabHoverTextColor,
		orientation,
	} = attributes;
	/**
	 * Get the color settings for the block.
	 */
	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Tabs Settings' ) }>
					<ToggleControl
						label="Vertical Tabs"
						checked={ 'vertical' === orientation }
						onChange={ () =>
							setAttributes( {
								orientation:
									'vertical' === orientation
										? 'horizontal'
										: 'vertical',
							} )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							label: __( 'Tab Active Background' ),
							colorValue:
								tabActiveColor?.color ?? customTabActiveColor,
							onColorChange: ( value ) => {
								setTabActiveColor( value );
								setAttributes( {
									customTabActiveColor: value,
								} );
							},
						},
						{
							label: __( 'Tab Active Text' ),
							colorValue:
								tabActiveTextColor?.color ??
								customTabActiveTextColor,
							onColorChange: ( value ) => {
								setTabActiveTextColor( value );
								setAttributes( {
									customTabActiveTextColor: value,
								} );
							},
						},
						{
							label: __( 'Tab Inactive Background' ),
							colorValue:
								tabInactiveColor?.color ??
								customTabInactiveColor,
							onColorChange: ( value ) => {
								setTabInactiveColor( value );
								setAttributes( {
									customTabInactiveColor: value,
								} );
							},
						},
						{
							label: __( 'Tab Inactive Text' ),
							colorValue:
								tabTextColor?.color ?? customTabTextColor,
							onColorChange: ( value ) => {
								setTabTextColor( value );
								setAttributes( {
									customTabTextColor: value,
								} );
							},
						},
						{
							label: __( 'Tab Hover Background' ),
							colorValue:
								tabHoverColor?.color ?? customTabHoverColor,
							onColorChange: ( value ) => {
								setTabHoverColor( value );
								setAttributes( {
									customTabHoverColor: value,
								} );
							},
						},
						{
							label: __( 'Tab Hover Text' ),
							colorValue:
								tabHoverTextColor?.color ??
								customTabHoverTextColor,
							onColorChange: ( value ) => {
								setTabHoverTextColor( value );
								setAttributes( {
									customTabHoverTextColor: value,
								} );
							},
						},
					] }
					panelId={ clientId }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorSettings }
				/>
			</InspectorControls>
		</Fragment>
	);
}
