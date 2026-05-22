/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	withColors,
} from '@wordpress/block-editor';

/**
 * Core Tabs Controls — for core/tab (individual tab button)
 *
 * Exposes the same four hover/active color pickers as the tab-list parent.
 * When the tab's own attr is unset, the colorValue falls back to the
 * inherited value coming from the parent tab-list via block context, so
 * the editor communicates which color will be used before a per-tab
 * override is set.
 *
 * @param {Object}   props                         Component props (injected by withColors + HOC)
 * @param {string}   props.clientId                Block client ID
 * @param {Object}   props.context                 Block context (carries parent tab-list values)
 * @param {Object}   props.hoverBackgroundColor    withColors resolved object for this tab's own attr
 * @param {Function} props.setHoverBackgroundColor
 * @param {Object}   props.hoverTextColor
 * @param {Function} props.setHoverTextColor
 * @param {Object}   props.activeBackgroundColor
 * @param {Function} props.setActiveBackgroundColor
 * @param {Object}   props.activeTextColor
 * @param {Function} props.setActiveTextColor
 */
function TabControls({
	clientId,
	context,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
}) {
	const colorSettings = useMultipleOriginColorsAndGradients();

	// Resolved inherited values from parent tab-list context.
	// These are preset color objects; withColors provides .color (hex) on own attrs.
	// For the fallback we only have the raw slug/hex from context so we pass it directly.
	const inheritedHoverBg =
		context?.['prc-block/tab-list-hoverBackgroundColor'];
	const inheritedHoverText = context?.['prc-block/tab-list-hoverTextColor'];
	const inheritedActiveBg =
		context?.['prc-block/tab-list-activeBackgroundColor'];
	const inheritedActiveText = context?.['prc-block/tab-list-activeTextColor'];

	const colorInspectorSettings = useMemo(
		() => [
			{
				// Own attr wins; fall back to inherited slug for display.
				colorValue: hoverBackgroundColor?.color ?? inheritedHoverBg,
				onColorChange: setHoverBackgroundColor,
				onReset: () => setHoverBackgroundColor(undefined),
				label: __('Hover Background', 'prc-block-library'),
			},
			{
				colorValue: hoverTextColor?.color ?? inheritedHoverText,
				onColorChange: setHoverTextColor,
				onReset: () => setHoverTextColor(undefined),
				label: __('Hover Text', 'prc-block-library'),
			},
			{
				colorValue: activeBackgroundColor?.color ?? inheritedActiveBg,
				onColorChange: setActiveBackgroundColor,
				onReset: () => setActiveBackgroundColor(undefined),
				label: __('Active Background', 'prc-block-library'),
			},
			{
				colorValue: activeTextColor?.color ?? inheritedActiveText,
				onColorChange: setActiveTextColor,
				onReset: () => setActiveTextColor(undefined),
				label: __('Active Text', 'prc-block-library'),
			},
		],
		[
			hoverBackgroundColor?.color,
			setHoverBackgroundColor,
			inheritedHoverBg,
			hoverTextColor?.color,
			setHoverTextColor,
			inheritedHoverText,
			activeBackgroundColor?.color,
			setActiveBackgroundColor,
			inheritedActiveBg,
			activeTextColor?.color,
			setActiveTextColor,
			inheritedActiveText,
		]
	);

	return (
		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				settings={colorInspectorSettings}
				panelId={clientId}
				hasColorsOrGradients={false}
				disableCustomColors={false}
				__experimentalIsRenderedInSidebar
				{...colorSettings}
			/>
		</InspectorControls>
	);
}

export default withColors({
	hoverBackgroundColor: 'color',
	hoverTextColor: 'color',
	activeBackgroundColor: 'color',
	activeTextColor: 'color',
})(TabControls);
