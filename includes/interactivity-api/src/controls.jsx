// Add isInteractive toggle and interactiveContext text control to all blocks where supports.interactivity === true.

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	ExternalLink,
	TextControl,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes, clientId, context }) {
	const { isInteractive, interactiveNamespace, interactiveSubsumption } =
		attributes;
	const namespace = interactiveNamespace || context?.interactiveNamespace;
	return (
		<InspectorControls>
			<PanelBody title={__('Interactivity API')}>
				<ToggleControl
					label={__('Interactive', 'prc-block-library')}
					checked={isInteractive}
					onChange={() =>
						setAttributes({ isInteractive: !isInteractive })
					}
					help={__(
						'When enabled, this block leverages the @wordpress/interactivity API.',
						'prc-block-library'
					)}
				/>
				{isInteractive && (
					<Fragment>
						<ToggleControl
							label={__('Subsumption', 'prc-block-library')}
							checked={interactiveSubsumption}
							onChange={() =>
								setAttributes({
									interactiveSubsumption:
										!interactiveSubsumption,
								})
							}
							help={__(
								'When enabled, this block will inherit interactivity directly from its parent rather than any given namespace.',
								'prc-block-library'
							)}
						/>
						{!interactiveSubsumption && (
							<TextControl
								label={__('Namespace', 'prc-block-library')}
								value={namespace}
								onChange={(newNamespace) =>
									setAttributes({
										interactiveNamespace: newNamespace,
									})
								}
								help={__(
									'The namespace serves as a unique identifier for this blocks interactivity context, ensuring that interactions are confined within the scope of this block to its parent.',
									'prc-block-library'
								)}
							/>
						)}
					</Fragment>
				)}
				<ExternalLink href="https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/">
					API documentation
				</ExternalLink>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	context,
}) {
	return (
		<InspectorPanel {...{ attributes, setAttributes, clientId, context }} />
	);
}
