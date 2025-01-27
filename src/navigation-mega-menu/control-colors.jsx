/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from 'react';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function ColorControls({ colors, clientId }) {
	const colorProps = useMultipleOriginColorsAndGradients();

	const colorSettings = useMemo(() => {
		const {
			menuItemBackgroundColor,
			setMenuItemBackgroundColor,
			menuItemTextColor,
			setMenuItemTextColor,
			menuItemActiveBackgroundColor,
			setMenuItemActiveBackgroundColor,
			menuItemActiveTextColor,
			setMenuItemActiveTextColor,
			menuOverlayBackgroundColor,
			setMenuOverlayBackgroundColor,
			menuOverlayTextColor,
			setMenuOverlayTextColor,
			menuActiveBorderColor,
			setMenuActiveBorderColor,
		} = colors;

		const t = [
			{
				colorValue: menuItemBackgroundColor?.color,
				onColorChange: setMenuItemBackgroundColor,
				label: __('Menu Item Background Color', 'prc-block-library'),
			},
			{
				colorValue: menuItemTextColor?.color,
				onColorChange: setMenuItemTextColor,
				label: __('Menu Item Text Color', 'prc-block-library'),
			},
			{
				colorValue: menuItemActiveBackgroundColor?.color,
				onColorChange: setMenuItemActiveBackgroundColor,
				label: __(
					'Menu Item Active Background Color',
					'prc-block-library'
				),
			},
			{
				colorValue: menuItemActiveTextColor?.color,
				onColorChange: setMenuItemActiveTextColor,
				label: __('Menu Item Active Text Color', 'prc-block-library'),
			},
			{
				colorValue: menuOverlayBackgroundColor?.color,
				onColorChange: setMenuOverlayBackgroundColor,
				label: __('Menu Overlay Background Color', 'prc-block-library'),
			},
			{
				colorValue: menuOverlayTextColor?.color,
				onColorChange: setMenuOverlayTextColor,
				label: __('Menu Overlay Text Color', 'prc-block-library'),
			},
			{
				colorValue: menuActiveBorderColor?.color,
				onColorChange: setMenuActiveBorderColor,
				label: __('Menu Active Border Color', 'prc-block-library'),
			},
		];
		return t;
	}, [colors]);

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={colorSettings}
				panelId={clientId}
				hasColorsOrGradients={false}
				disableCustomColors={true}
				__experimentalIsRenderedInSidebar
				{...colorProps}
			/>
		</InspectorControls>
	);
}
