/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

export default function Controls({ colors }) {
	const {
		titleBackgroundColor,
		setTitleBackgroundColor,
		titleTextColor,
		setTitleTextColor,
		contentBackgroundColor,
		setContentBackgroundColor,
		contentTextColor,
		setContentTextColor,
		borderColor,
		setBorderColor,
	} = colors;

	return (
		<InspectorControls>
			<PanelColorSettings
				__experimentalHasMultipleOrigins
				__experimentalIsRenderedInSidebar
				title={__('Colors')}
				disableCustomColors
				colorSettings={[
					{
						value: titleBackgroundColor.color,
						onChange: setTitleBackgroundColor,
						label: __('Title Background'),
					},
					{
						value: titleTextColor.color,
						onChange: setTitleTextColor,
						label: __('Title Text'),
					},
					{
						value: contentBackgroundColor.color,
						onChange: setContentBackgroundColor,
						label: __('Content Background'),
					},
					{
						value: contentTextColor.color,
						onChange: setContentTextColor,
						label: __('Content Text'),
					},
					{
						value: borderColor.color,
						onChange: setBorderColor,
						label: __('Border'),
					},
				]}
			/>
		</InspectorControls>
	);
}
