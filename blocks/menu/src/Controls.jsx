/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

function ColorsInspectorPanel({ attributes, colors }) {
	const { layout: { orientation = 'horizontal' } = {} } = attributes;

	const {
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		borderColor,
		setBorderColor,
	} = colors;

	const colorSettings = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __('Menu Item Text'),
		},
		{
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __('Menu Item Background'),
		},
		{
			value: borderColor.color,
			onChange: setBorderColor,
			label: __('Menu Item Border'),
		},
	];

	return (
		<InspectorControls group="styles">
			<PanelColorSettings
				__experimentalHasMultipleOrigins
				__experimentalIsRenderedInSidebar
				title={__('Color')}
				disableCustomColors
				colorSettings={colorSettings}
			/>
		</InspectorControls>
	);
}

export default function Controls({ attributes, colors }) {
	return <ColorsInspectorPanel {...{ attributes, colors }} />;
}
