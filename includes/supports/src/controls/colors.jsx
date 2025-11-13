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
import { useSelect } from '@wordpress/data';

export default function ColorControls({
	attributes,
	setAttributes,
	clientId,
	isStuckBackground,
	setIsStuckBackground,
	isStuckText,
	setIsStuckText,
}) {
	const colorSettings = useMultipleOriginColorsAndGradients();

	const colorInspectorSettings = useMemo(() => {
		const settings = [];

		// Add stuck position settings if position type is sticky
		if ('sticky' === attributes?.style?.position?.type) {
			settings.push(
				{
					colorValue: isStuckBackground?.color,
					onColorChange: setIsStuckBackground,
					label: __('Stuck Background'),
				},
				{
					colorValue: isStuckText?.color,
					onColorChange: setIsStuckText,
					label: __('Stuck Text'),
				}
			);
		}

		return settings;
	}, [
		isStuckBackground.color,
		isStuckText.color,
		attributes?.style?.position?.type,
	]);

	// If colorInspectorSettings is empty, return null to avoid rendering the dropdown
	if (colorInspectorSettings.length === 0) {
		return null;
	}

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={colorInspectorSettings}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</>
	);
}
