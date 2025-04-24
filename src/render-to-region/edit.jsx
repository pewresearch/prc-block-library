/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import {
	useBlockProps,
	Warning,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	BaseControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	const { regionName, activationConditions } = attributes;

	const warning = useMemo(() => {
		return (
			<Warning>
				<p>
					This block is used to render content to a specific region.
					Please ensure that the regionName is unique and not used by
					any other block. Current regionName: {regionName}
				</p>
			</Warning>
		);
	}, [regionName]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Render To Region', 'prc-block-library')}
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label={__('Region Name', 'prc-block-library')}
							value={regionName}
							onChange={(value) =>
								setAttributes({ regionName: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Is Desktop', 'prc-block-library')}
							checked={activationConditions.isDesktop}
							onChange={(value) =>
								setAttributes({
									activationConditions: {
										...activationConditions,
										isDesktop: value,
									},
								})
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Is Mobile', 'prc-block-library')}
							checked={activationConditions.isMobile}
							onChange={(value) =>
								setAttributes({
									activationConditions: {
										...activationConditions,
										isMobile: value,
									},
								})
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Is Tablet', 'prc-block-library')}
							checked={activationConditions.isTablet}
							onChange={(value) =>
								setAttributes({
									activationConditions: {
										...activationConditions,
										isTablet: value,
									},
								})
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Is Portrait', 'prc-block-library')}
							checked={activationConditions.isPortrait}
							onChange={(value) =>
								setAttributes({
									activationConditions: {
										...activationConditions,
										isPortrait: value,
									},
								})
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Is Landscape', 'prc-block-library')}
							checked={activationConditions.isLandscape}
							onChange={(value) =>
								setAttributes({
									activationConditions: {
										...activationConditions,
										isLandscape: value,
									},
								})
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{warning}</div>
		</Fragment>
	);
}
