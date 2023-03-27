/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

export default function Controls({
	activeColor,
	setActiveColor,
	activeBorderColor,
	setActiveBorderColor,
}) {
	const { color } = activeColor;
	return (
		<InspectorControls group="styles">
			<PanelColorSettings
				__experimentalHasMultipleOrigins
				__experimentalIsRenderedInSidebar
				title={__('Color')}
				disableCustomColors
				colorSettings={[
					{
						value: color,
						onChange: setActiveColor,
						label: __('Active Color'),
					},
					{
						value: activeBorderColor.color,
						onChange: setActiveBorderColor,
						label: __('Active Border Color'),
					},
				]}
			/>
		</InspectorControls>
	);
}
