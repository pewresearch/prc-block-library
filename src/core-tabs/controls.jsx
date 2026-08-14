/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	ToggleControl,
	PanelBody,
	RangeControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	withColors,
} from '@wordpress/block-editor';

/**
 * Vertical orientation controls for core/tabs.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 */
export function TabsOrientationControls({ attributes, setAttributes }) {
	const { orientation = 'horizontal', tabListPlacement = 'start' } =
		attributes;
	const isVertical = 'vertical' === orientation;

	return (
		<InspectorControls>
			<PanelBody title={__('Tabs Settings', 'prc-block-library')}>
				<ToggleControl
					label={__('Vertical Tabs', 'prc-block-library')}
					checked={isVertical}
					onChange={(value) =>
						setAttributes({
							orientation: value ? 'vertical' : 'horizontal',
							...(value ? {} : { tabListPlacement: 'start' }),
						})
					}
					__nextHasNoMarginBottom
				/>
				{isVertical && (
					<ToggleGroupControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						isBlock
						label={__('Tab list placement', 'prc-block-library')}
						help={__(
							'Start places the tab list on the left in LTR. End places it on the right.',
							'prc-block-library'
						)}
						value={tabListPlacement}
						onChange={(value) =>
							setAttributes({ tabListPlacement: value })
						}
					>
						<ToggleGroupControlOption
							value="start"
							label={__('Start', 'prc-block-library')}
						/>
						<ToggleGroupControlOption
							value="end"
							label={__('End', 'prc-block-library')}
						/>
					</ToggleGroupControl>
				)}
			</PanelBody>
		</InspectorControls>
	);
}

/**
 * Mobile dropdown + hover/active color controls for core/tab-list.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {string}   props.clientId
 * @param {Object}   props.hoverBackgroundColor
 * @param {Function} props.setHoverBackgroundColor
 * @param {Object}   props.hoverTextColor
 * @param {Function} props.setHoverTextColor
 * @param {Object}   props.activeBackgroundColor
 * @param {Function} props.setActiveBackgroundColor
 * @param {Object}   props.activeTextColor
 * @param {Function} props.setActiveTextColor
 */
function TabListControls({
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
})(TabListControls);
