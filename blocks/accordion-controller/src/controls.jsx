/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	InspectorControls, 
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
 } from '@wordpress/block-editor';

export default function Controls({ colors, clientId }) {
	const colorSettings = useMultipleOriginColorsAndGradients();

	const {
		titleBackgroundColor,
		setTitleBackgroundColor,
		titleTextColor,
		setTitleTextColor,
		contentBackgroundColor,
		setContentBackgroundColor,
		contentTextColor,
		setContentTextColor,
	} = colors;

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={ [
					{
						colorValue: titleTextColor?.color,
						onColorChange: setTitleTextColor,
						label: __('Title Text'),
					},
					{
						colorValue: titleBackgroundColor?.color,
						onColorChange: setTitleBackgroundColor,
						label: __('Title Background'),
					},
					{
						colorValue: contentTextColor?.color,
						onColorChange: setContentTextColor,
						label: __('Content Text'),
					},
					{
						colorValue: contentBackgroundColor?.color,
						onColorChange: setContentBackgroundColor,
						label: __('Content Background'),
					},
				] }
				panelId={ clientId }
				hasColorsOrGradients={ false }
				disableCustomColors={ true }
				__experimentalIsRenderedInSidebar
				{ ...colorSettings }
			/>
		</InspectorControls>
	);
}
