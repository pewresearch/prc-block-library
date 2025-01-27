/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import { ToggleControl, PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	tabBackgroundColor,
	setTabBackgroundColor,
	tabHoverColor,
	setTabHoverColor,
	tabActiveColor,
	setTabActiveColor,
	tabTextColor,
	setTabTextColor,
	tabActiveTextColor,
	setTabActiveTextColor,
	tabHoverTextColor,
	setTabHoverTextColor,
}) {
	const {
		customTabBackgroundColor,
		customTabActiveColor,
		customTabHoverColor,
		customTabTextColor,
		customTabActiveTextColor,
		customTabHoverTextColor,
		orientation,
	} = attributes;
	/**
	 * Get the current block's color settings.
	 */
	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Tabs Settings')}>
					<ToggleControl
						label="Vertical Tabs"
						checked={'vertical' === orientation}
						onChange={() =>
							setAttributes({
								orientation:
									'vertical' === orientation
										? 'horizontal'
										: 'vertical',
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							label: __('Tab Background'),
							colorValue:
								tabBackgroundColor?.color ??
								customTabBackgroundColor,
							onColorChange: (value) => {
								setTabBackgroundColor(value);
								setAttributes({
									customTabBackgroundColor: value,
								});
							},
						},
						{
							label: __('Tab Hover State'),
							colorValue:
								tabHoverColor?.color ?? customTabHoverColor,
							onColorChange: (value) => {
								setTabHoverColor(value);
								setAttributes({
									customTabHoverColor: value,
								});
							},
						},
						{
							label: __('Tab Active State'),
							colorValue:
								tabActiveColor?.color ?? customTabActiveColor,
							onColorChange: (value) => {
								setTabActiveColor(value);
								setAttributes({
									customTabActiveColor: value,
								});
							},
						},
						{
							label: __('Tab Text'),
							colorValue:
								tabTextColor?.color ?? customTabTextColor,
							onColorChange: (value) => {
								setTabTextColor(value);
								setAttributes({
									customTabTextColor: value,
								});
							},
						},
						{
							label: __('Tab Hover Text'),
							colorValue:
								tabHoverTextColor?.color ?? customTabHoverTextColor,
							onColorChange: (value) => {
								setTabHoverTextColor(value);
								setAttributes({
									customTabHoverTextColor: value,
								});
							},
						},
						{
							label: __('Tab Active Text'),
							colorValue:
								tabActiveTextColor?.color ??
								customTabActiveTextColor,
							onColorChange: (value) => {
								setTabActiveTextColor(value);
								setAttributes({
									customTabActiveTextColor: value,
								});
							},
						},
					]}
					panelId={clientId}
					disableCustomColors={false}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</Fragment>
	);
}
