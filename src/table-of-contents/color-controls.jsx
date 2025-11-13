/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorControls({ attributes, colors, clientId, setAttributes }) {
	const { customHoverBackgroundColor, customHoverTextColor, customActiveBackgroundColor, customActiveTextColor } = attributes;

	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor,
		} = colors;

		return [
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
		];
	}, [colors, customHoverBackgroundColor, customHoverTextColor, customActiveBackgroundColor, customActiveTextColor, setAttributes]);

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={colorSettings}
				panelId={clientId}
				hasColorsOrGradients={false}
				disableCustomColors={true}
				__experimentalIsRenderedInSidebar
				{...colorProps}
			/>
		</InspectorControls>
	);
}
