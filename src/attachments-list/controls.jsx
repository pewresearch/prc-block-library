/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
 } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes, colors, clientId }) {
	const { customHoverBackgroundColor, customHoverTextColor, customActiveBackgroundColor, customActiveTextColor } = attributes;

	const colorSettings = useMultipleOriginColorsAndGradients();

	const {
		headingTextColor,
		setHeadingTextColor,
		headingBackgroundColor,
		setHeadingBackgroundColor,
		hoverTextColor,
		setHoverTextColor,
		hoverBackgroundColor,
		setHoverBackgroundColor,
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
	} = colors;

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={ [
					{
						colorValue: headingTextColor?.color,
						onColorChange: setHeadingTextColor,
						label: __('Heading Text'),
					},
					{
						colorValue: headingBackgroundColor?.color,
						onColorChange: setHeadingBackgroundColor,
						label: __('Heading Background'),
					},
					{
						colorValue: hoverTextColor?.color ?? customHoverTextColor,
						onColorChange: (value) => {
							setHoverTextColor(value);
							setAttributes({ customHoverTextColor: value });
						},
						label: __('Hover Text'),
					},
					{
						colorValue: hoverBackgroundColor?.color ?? customHoverBackgroundColor,
						onColorChange: (value) => {
							setHoverBackgroundColor(value);
							setAttributes({ customHoverBackgroundColor: value });
						},
						label: __('Hover Background'),
					},
					{
						colorValue: activeTextColor?.color ?? customActiveTextColor,
						onColorChange: (value) => {
							setActiveTextColor(value);
							setAttributes({ customActiveTextColor: value });
						},
						label: __('Active Text'),
					},
					{
						colorValue: activeBackgroundColor?.color ?? customActiveBackgroundColor,
						onColorChange: (value) => {
							setActiveBackgroundColor(value);
							setAttributes({ customActiveBackgroundColor: value });
						},
						label: __('Active Background'),
					},
				] }
				panelId={ clientId }
				hasColorsOrGradients={ false }
				disableCustomColors={ true }
				__experimentalIsRenderedInSidebar
				{ ...colorSettings }
			/>
		</InspectorControls>
	);
}
