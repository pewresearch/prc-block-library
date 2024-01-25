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
	isList,
	clientId,
}) {
	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		if ( !isList ) {
			return [];
		}

		const {
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
		return t;
	}, [colors, isList]);

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
