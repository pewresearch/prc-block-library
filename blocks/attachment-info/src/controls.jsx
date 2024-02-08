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

export default function Controls({ colors, clientId }) {
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
						colorValue: hoverTextColor?.color,
						onColorChange: setHoverTextColor,
						label: __('Hover Text'),
					},
					{
						colorValue: hoverBackgroundColor?.color,
						onColorChange: setHoverBackgroundColor,
						label: __('Hover Background'),
					},
					{
						colorValue: activeTextColor?.color,
						onColorChange: setActiveTextColor,
						label: __('Active Text'),
					},
					{
						colorValue: activeBackgroundColor?.color,
						onColorChange: setActiveBackgroundColor,
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
