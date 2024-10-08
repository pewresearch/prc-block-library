/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	dividerColor,
	setDividerColor,
}) {
	const { responsiveContainerQuery } = attributes;

	const { hideOnDesktop, hideOnTablet, hideOnMobile } =
		responsiveContainerQuery || {};

	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Device Visibility')}>
					<ToggleControl
						label={__('Hide on Desktop')}
						checked={hideOnDesktop}
						onChange={() =>
							setAttributes({
								responsiveContainerQuery: {
									...attributes.responsiveContainerQuery,
									hideOnDesktop: !hideOnDesktop,
								},
							})
						}
					/>
					<ToggleControl
						label={__('Hide on Tablet')}
						checked={hideOnTablet}
						onChange={() =>
							setAttributes({
								responsiveContainerQuery: {
									...attributes.responsiveContainerQuery,
									hideOnTablet: !hideOnTablet,
								},
							})
						}
					/>
					<ToggleControl
						label={__('Hide on Mobile')}
						checked={hideOnMobile}
						onChange={() =>
							setAttributes({
								responsiveContainerQuery: {
									...attributes.responsiveContainerQuery,
									hideOnMobile: !hideOnMobile,
								},
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							colorValue: dividerColor?.color,
							onColorChange: setDividerColor,
							label: __('Interior Divider'),
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</Fragment>
	);
}
