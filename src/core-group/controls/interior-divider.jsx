/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	withColors,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

function InteriorDividerColorControls({
	attributes,
	setAttributes,
	clientId,
	dividerColor,
	setDividerColor,
}) {
	const colorSettings = useMultipleOriginColorsAndGradients();

	const innerBlocksCount = useSelect(
		(select) => {
			const { getBlock } = select('core/block-editor');
			return getBlock(clientId)?.innerBlocks?.length;
		},
		[clientId]
	);

	const colorInspectorSettings = useMemo(() => {
		const settings = [];

		// Only show Interior Divider if block has more than 1 inner block
		if (innerBlocksCount > 1) {
			settings.push({
				colorValue: dividerColor?.color,
				onColorChange: setDividerColor,
				label: __('Interior Divider'),
			});
		}

		return settings;
	}, [dividerColor?.color, innerBlocksCount, setDividerColor]);

	// Only render if there are settings to show
	if (colorInspectorSettings.length === 0) {
		return null;
	}

	return (
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
	);
}

export default withColors({
	dividerColor: 'color',
})(InteriorDividerColorControls);
