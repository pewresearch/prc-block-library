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

export default function ColorControls({ colors, clientId }) {
	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			barColor,
			setBarColor,
			valueColor,
			setValueColor,
		} = colors;

		return [
			{
				colorValue: barColor?.color,
				onColorChange: setBarColor,
				label: __('Bar Color'),
			},
			{
				colorValue: valueColor?.color,
				onColorChange: setValueColor,
				label: __('Value Color'),
			},
		];
	}, [colors]);

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={colorSettings}
				panelId={clientId}
				hasColorsOrGradients={false}
				disableCustomColors={false}
				__experimentalIsRenderedInSidebar
				{...colorProps}
			/>
		</InspectorControls>
	);
}
