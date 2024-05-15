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

/**
 * Internal Dependencies
 */

export default function Controls({ colors, clientId, }) {
	const colorSettings = useMultipleOriginColorsAndGradients();

	const {
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		itemBackgroundColor,
		setItemBackgroundColor,
		itemTextColor,
		setItemTextColor,
		itemBorderColor,
		setItemBorderColor,
		itemHoverBackgroundColor,
		setItemHoverBackgroundColor,
		itemActiveBackgroundColor,
		setItemActiveBackgroundColor,
		nextButtonBackgroundColor,
		setNextButtonBackgroundColor,
		nextButtonTextColor,
		setNextButtonTextColor,
		nextButtonBoxShadowColor,
		setNextButtonBoxShadowColor,
	} = colors;

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={ [
					{
						colorValue: textColor?.color,
						onColorChange: setTextColor,
						label: __('Text'),
					},
					{
						colorValue: backgroundColor?.color,
						onColorChange: setBackgroundColor,
						label: __('Background'),
					},
					{
						colorValue: itemBackgroundColor?.color,
						onColorChange: setItemBackgroundColor,
						label: __('Item Background'),
					},
					{
						colorValue: itemTextColor?.color,
						onColorChange: setItemTextColor,
						label: __('Item Text'),
					},
					{
						colorValue: itemBorderColor?.color,
						onColorChange: setItemBorderColor,
						label: __('Item Border'),
					},
					{
						colorValue: itemHoverBackgroundColor?.color,
						onColorChange: setItemHoverBackgroundColor,
						label: __('Item Hover Background'),
					},
					{
						colorValue: itemActiveBackgroundColor?.color,
						onColorChange: setItemActiveBackgroundColor,
						label: __('Item Active Background'),
					},
					{
						colorValue: nextButtonBackgroundColor?.color,
						onColorChange: setNextButtonBackgroundColor,
						label: __('Next Button Background'),
					},
					{
						colorValue: nextButtonTextColor?.color,
						onColorChange: setNextButtonTextColor,
						label: __('Next Button Text'),
					},
					{
						colorValue: nextButtonBoxShadowColor?.color,
						onColorChange: setNextButtonBoxShadowColor,
						label: __('Next Button Box Shadow'),
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
