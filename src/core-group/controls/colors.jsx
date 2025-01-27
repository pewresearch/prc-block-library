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
	setAttributes,
	clientId,
	dividerColor,
	setDividerColor,
	isStuckBackground,
	setIsStuckBackground,
	isStuckText,
	setIsStuckText,
}) {
	const { style } = attributes;

	const colorSettings = useMultipleOriginColorsAndGradients();

	const colorInspectorSettings = useMemo(() => {
		const toReturn = [
			{
				colorValue: dividerColor?.color,
				onColorChange: setDividerColor,
				label: __('Interior Divider'),
			},
		];
		if ('sticky' === style?.position?.type) {
			const hasStuckPosition = [
				{
					colorValue: isStuckBackground?.color,
					onColorChange: setIsStuckBackground,
					label: __('Stuck Background'),
				},
				{
					colorValue: isStuckText?.color,
					onColorChange: setIsStuckText,
					label: __('Stuck Text'),
				},
			];
			toReturn.push(...hasStuckPosition);
		}

		return toReturn;
	}, [dividerColor, isStuckBackground, isStuckText, style]);

	return (
		<Fragment>
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
		</Fragment>
	);
}
