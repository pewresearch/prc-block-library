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

export default function ColorControls({
	attributes,
	setAttributes,
	clientId,
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
}) {
	const {
		customMenuItemBackgroundColor,
		customMenuItemTextColor,
		customMenuItemActiveBackgroundColor,
		customMenuItemActiveTextColor,
		customMenuOverlayBackgroundColor,
		customMenuOverlayTextColor,
		customMenuActiveBorderColor,
	} = attributes;

	const colorSettings = useMultipleOriginColorsAndGradients();

	const colorSettingsArray = useMemo(() => [
		{
			label: __('Menu Item Background', 'prc-block-library'),
			colorValue: menuItemBackgroundColor?.color ?? customMenuItemBackgroundColor,
			onColorChange: (value) => {
				setMenuItemBackgroundColor(value);
				setAttributes({
					customMenuItemBackgroundColor: value,
				});
			},
		},
		{
			label: __('Menu Item Text', 'prc-block-library'),
			colorValue: menuItemTextColor?.color ?? customMenuItemTextColor,
			onColorChange: (value) => {
				setMenuItemTextColor(value);
				setAttributes({
					customMenuItemTextColor: value,
				});
			},
		},
		{
			label: __('Menu Item Active Background', 'prc-block-library'),
			colorValue: menuItemActiveBackgroundColor?.color ?? customMenuItemActiveBackgroundColor,
			onColorChange: (value) => {
				setMenuItemActiveBackgroundColor(value);
				setAttributes({
					customMenuItemActiveBackgroundColor: value,
				});
			},
		},
		{
			label: __('Menu Item Active Text', 'prc-block-library'),
			colorValue: menuItemActiveTextColor?.color ?? customMenuItemActiveTextColor,
			onColorChange: (value) => {
				setMenuItemActiveTextColor(value);
				setAttributes({
					customMenuItemActiveTextColor: value,
				});
			},
		},
		{
			label: __('Menu Overlay Background', 'prc-block-library'),
			colorValue: menuOverlayBackgroundColor?.color ?? customMenuOverlayBackgroundColor,
			onColorChange: (value) => {
				setMenuOverlayBackgroundColor(value);
				setAttributes({
					customMenuOverlayBackgroundColor: value,
				});
			},
		},
		{
			label: __('Menu Overlay Text', 'prc-block-library'),
			colorValue: menuOverlayTextColor?.color ?? customMenuOverlayTextColor,
			onColorChange: (value) => {
				setMenuOverlayTextColor(value);
				setAttributes({
					customMenuOverlayTextColor: value,
				});
			},
		},
		{
			label: __('Menu Active Border', 'prc-block-library'),
			colorValue: menuActiveBorderColor?.color ?? customMenuActiveBorderColor,
			onColorChange: (value) => {
				setMenuActiveBorderColor(value);
				setAttributes({
					customMenuActiveBorderColor: value,
				});
			},
		},
	], [
		menuItemBackgroundColor,
		customMenuItemBackgroundColor,
		menuItemTextColor,
		customMenuItemTextColor,
		menuItemActiveBackgroundColor,
		customMenuItemActiveBackgroundColor,
		menuItemActiveTextColor,
		customMenuItemActiveTextColor,
		menuOverlayBackgroundColor,
		customMenuOverlayBackgroundColor,
		menuOverlayTextColor,
		customMenuOverlayTextColor,
		menuActiveBorderColor,
		customMenuActiveBorderColor,
		setMenuItemBackgroundColor,
		setMenuItemTextColor,
		setMenuItemActiveBackgroundColor,
		setMenuItemActiveTextColor,
		setMenuOverlayBackgroundColor,
		setMenuOverlayTextColor,
		setMenuActiveBorderColor,
		setAttributes,
	]);

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={colorSettingsArray}
				panelId={clientId}
				disableCustomColors={false}
				__experimentalIsRenderedInSidebar
				{...colorSettings}
			/>
		</InspectorControls>
	);
}
