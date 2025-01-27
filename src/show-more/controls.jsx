/**
 * External Dependencies
 */
import { resizeCornerNE } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

export default function Controls({
	attributes,
	setAttributes,
	isResizing,
	isExpanded,
	toggleResizing,
	clientId,
	buttonBackground,
	setButtonBackground,
	buttonColor,
	setButtonColor,
}) {
	const { customButtonBackground, customButtonColor, splitAtViewportWidth } = attributes;
	/**
	 * Get the current block's color settings.
	 */
	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={resizeCornerNE}
						isActive={isResizing}
						disabled={true === isExpanded}
						accessibleWhenDisabled={false}
						title={__('Allow Resizing')}
						onClick={() => {
							toggleResizing(!isResizing);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							label: __('Button Background', 'prc-rls'),
							colorValue:
								buttonBackground?.color ??
								customButtonBackground,
							onColorChange: (value) => {
								setButtonBackground(value);
								setAttributes({
									customButtonBackground: value,
								});
							},
						},
						{
							label: __('Button Text', 'prc-rls'),
							colorValue: buttonColor?.color ?? customButtonColor,
							onColorChange: (value) => {
								setButtonColor(value);
								setAttributes({
									customButtonColor: value,
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
