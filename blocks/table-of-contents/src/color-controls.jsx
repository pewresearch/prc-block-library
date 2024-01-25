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
	attributes,
	colors,
	clientId,
}) {
	const { className } = attributes;

	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			dropdownBackgroundColor,
			setDropdownBackgroundColor,
			dropdownTextColor,
			setDropdownTextColor,
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

		const t = [
			{
				colorValue: dropdownTextColor?.color,
				onColorChange: setDropdownTextColor,
				label: __('(Mobile) Dropdown Text'),
			},
			{
				colorValue: dropdownBackgroundColor?.color,
				onColorChange: setDropdownBackgroundColor,
				label: __('(Mobile) Dropdown Background'),
			},
			{
				colorValue: headingTextColor?.color,
				onColorChange: setHeadingTextColor,
				label: __('(Desktop) Heading Text'),
			},
			{
				colorValue: headingBackgroundColor?.color,
				onColorChange: setHeadingBackgroundColor,
				label: __('(Desktop) Heading Background'),
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
		if ( 'is-style-dropdown' === className ) {
			// change the label of the first item to just be "Dropdown Text" and the second to just be "Dropdown Background", remove the 3rd and 4th items.
			t[0].label = __('Dropdown Text');
			t[1].label = __('Dropdown Background');
			t.splice(2, 2);
		}
		return t;
	}, [colors, className]);

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
