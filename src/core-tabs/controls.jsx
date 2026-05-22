/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { ToggleControl, PanelBody, RangeControl } from '@wordpress/components';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	withColors,
} from '@wordpress/block-editor';

/**
 * Core Tabs Controls Extension — for core/tab-list
 *
 * Provides mobile-dropdown settings and hover/active color pickers.
 * Wrapped in withColors so preset slugs round-trip correctly.
 *
 * @param {Object}   props                       Component props
 * @param {Object}   props.attributes            Block attributes
 * @param {Function} props.setAttributes         Function to update attributes
 * @param {string}   props.clientId              Block client ID
 * @param {Object}   props.hoverBackgroundColor  withColors resolved object
 * @param {Function} props.setHoverBackgroundColor
 * @param {Object}   props.hoverTextColor
 * @param {Function} props.setHoverTextColor
 * @param {Object}   props.activeBackgroundColor
 * @param {Function} props.setActiveBackgroundColor
 * @param {Object}   props.activeTextColor
 * @param {Function} props.setActiveTextColor
 */
function Controls({
	attributes,
	setAttributes,
	clientId,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
}) {
	const { mobileDropdown, mobileDropdownWidth } = attributes;
	const colorSettings = useMultipleOriginColorsAndGradients();

	const colorInspectorSettings = useMemo(
		() => [
			{
				colorValue: hoverBackgroundColor?.color,
				onColorChange: setHoverBackgroundColor,
				onReset: () => setHoverBackgroundColor(undefined),
				label: __('Hover Background', 'prc-block-library'),
			},
			{
				colorValue: hoverTextColor?.color,
				onColorChange: setHoverTextColor,
				onReset: () => setHoverTextColor(undefined),
				label: __('Hover Text', 'prc-block-library'),
			},
			{
				colorValue: activeBackgroundColor?.color,
				onColorChange: setActiveBackgroundColor,
				onReset: () => setActiveBackgroundColor(undefined),
				label: __('Active Background', 'prc-block-library'),
			},
			{
				colorValue: activeTextColor?.color,
				onColorChange: setActiveTextColor,
				onReset: () => setActiveTextColor(undefined),
				label: __('Active Text', 'prc-block-library'),
			},
		],
		[
			hoverBackgroundColor?.color,
			setHoverBackgroundColor,
			hoverTextColor?.color,
			setHoverTextColor,
			activeBackgroundColor?.color,
			setActiveBackgroundColor,
			activeTextColor?.color,
			setActiveTextColor,
		]
	);

	return (
		<>
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
			<InspectorControls>
				{/* Mobile Dropdown Settings */}
				<PanelBody title={__('Settings', 'prc-block-library')}>
					<ToggleControl
						label={__('Mobile Dropdown', 'prc-block-library')}
						help={__(
							'Convert tabs to a dropdown on mobile devices',
							'prc-block-library'
						)}
						checked={mobileDropdown}
						onChange={(value) =>
							setAttributes({
								mobileDropdown: value,
							})
						}
						__nextHasNoMarginBottom
					/>
					{mobileDropdown && (
						<RangeControl
							label={__(
								'Mobile Breakpoint (px)',
								'prc-block-library'
							)}
							help={__(
								'Convert to dropdown when the screen width is less than this value',
								'prc-block-library'
							)}
							value={mobileDropdownWidth}
							onChange={(value) =>
								setAttributes({
									mobileDropdownWidth: value,
								})
							}
							min={320}
							max={1024}
							step={1}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default withColors({
	hoverBackgroundColor: 'color',
	hoverTextColor: 'color',
	activeBackgroundColor: 'color',
	activeTextColor: 'color',
})(Controls);
