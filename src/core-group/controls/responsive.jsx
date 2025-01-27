/**
 * External Dependencies
 */
import { seen, desktop, tablet, mobile } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function ResponsiveControls({
	attributes,
	setAttributes,
}) {
	const { responsiveContainerQuery } = attributes;

	const { hideOnDesktop, hideOnTablet, hideOnMobile } =
		responsiveContainerQuery || {};

	const toggleHideOn = (device) => {
		console.log('toggleHideOn', device);
		if (device === 'desktop') {
			setAttributes({
				responsiveContainerQuery: {
					...attributes.responsiveContainerQuery,
					hideOnDesktop: !hideOnDesktop,
				},
			});
		}
		if (device === 'tablet') {
			setAttributes({
				responsiveContainerQuery: {
					...attributes.responsiveContainerQuery,
					hideOnTablet: !hideOnTablet,
				},
			});
		}
		if (device === 'mobile') {
			setAttributes({
				responsiveContainerQuery: {
					...attributes.responsiveContainerQuery,
					hideOnMobile: !hideOnMobile,
				},
			});
		}
	};

	const { deviceType } = useSelect((select) => {
		return select('core/editor').getDeviceType().toLowerCase();
	}, []);

	const responsiveLabels = useMemo(() => {
		return {
			desktop: hideOnDesktop ? 'Hidden on Desktop' : 'Visible on Desktop',
			tablet: hideOnTablet ? 'Hidden on Tablet' : 'Visible on Tablet',
			mobile: hideOnMobile ? 'Hidden on Mobile' : 'Visible on Mobile',
		};
	}, [hideOnDesktop, hideOnTablet, hideOnMobile]);

	const blockVisibilityControls = useMemo(() => [
		{
			title: responsiveLabels.desktop,
			icon: desktop,
			isActive: hideOnDesktop,
			isDisabled: deviceType === 'desktop',
			onClick: () => toggleHideOn('desktop'),
		},
		{
			title: responsiveLabels.tablet,
			icon: tablet,
			isActive: hideOnTablet,
			isDisabled: deviceType === 'tablet',
			onClick: () => toggleHideOn('tablet'),
		},
		{
			title: responsiveLabels.mobile,
			icon: mobile,
			isActive: hideOnMobile,
			isDisabled: deviceType === 'mobile',
			onClick: () => toggleHideOn('mobile'),
		}
	] , [deviceType, hideOnDesktop, hideOnTablet, hideOnMobile, responsiveLabels]);

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ seen }
						label="Toggle Device Visibility"
						controls={blockVisibilityControls}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Device Visibility')}>
					<ToggleControl
						label={responsiveLabels.desktop}
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
						label={responsiveLabels.tablet}
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
						label={responsiveLabels.mobile}
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
		</Fragment>
	);
}
