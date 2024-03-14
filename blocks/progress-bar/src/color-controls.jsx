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
			barColor,
			setBarColor,
			backgroundColor,
			setBackgroundColor,
			categoryLabelColor,
			setCategoryLabelColor,
		} = colors;

		return [
			{
				colorValue: barColor?.color,
				onColorChange: setBarColor,
				label: __('Bar Color'),
			},
			{
				colorValue: backgroundColor?.color,
				onColorChange: setBackgroundColor,
				label: __('Bar Background'),
			},
			{
				colorValue: categoryLabelColor?.color,
				onColorChange: setCategoryLabelColor,
				label: __('Category Label'),
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
