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

export default function ColorControls({
	colors,
	clientId,
}) {
	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			headingBackgroundColor,
			setHeadingBackgroundColor,
			headingTextColor,
			setHeadingTextColor,
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor
		} = colors;

		return [
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
				colorValue: activeTextColor?.color,
				onColorChange: setActiveTextColor,
				label: __('Active Text'),
			},
			{
				colorValue: activeBackgroundColor?.color,
				onColorChange: setActiveBackgroundColor,
				label: __('Active Background'),
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
		];
	}, [colors]);

	return (
		<Fragment>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ colorSettings }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ true }
					__experimentalIsRenderedInSidebar
					{ ...colorProps }
				/>
			</InspectorControls>
		</Fragment>
	);
}
