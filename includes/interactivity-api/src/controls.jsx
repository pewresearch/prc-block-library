// Add isInteractive toggle and interactiveContext text control to all blocks where supports.interactivity === true.

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	SelectControl,
	ExternalLink,
	TextControl,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';
import { useSelect, select } from '@wordpress/data';

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes, clientId, context }) {
	const { isInteractive, interactiveNamespace, interactiveSubsumption } =
		attributes;
	const namespace = interactiveNamespace || context?.interactiveNamespace;
	const { interactiveNamespaceOptions, defaultNamespace } = useSelect(
		(select) => {
			const { getBlockParents, getBlock } = select('core/block-editor');
			const { getBlockSupport } = select('core/blocks');
			const _blockNames = getBlockParents(clientId);
			const blockArray = [];
			_blockNames.forEach((block) => {
				const _block = getBlock(block);
				const blockName = _block.name;
				const supportsInteractivity = getBlockSupport(
					blockName,
					'interactivity'
				);
				if (supportsInteractivity) {
					if (!blockArray.includes(blockName)) {
						blockArray.push(blockName);
					}
				}
			});

			// Construct new options array for a select control with the names.
			const options = blockArray.map((blockName) => ({
				value: blockName,
				label: blockName,
			}));

			return {
				interactiveNamespaceOptions: options,
				defaultNamespace: options[0]?.value,
			};
		}
	);

	/**
	 * Handles setting the default namespace when the block is first made interactive.
	 * And also unsetting the namespace when the block is no longer interactive.
	 */
	useEffect(() => {
		if (isInteractive && !namespace && defaultNamespace) {
			setAttributes({
				interactiveNamespace: defaultNamespace,
			});
		} else if (!isInteractive && namespace) {
			setAttributes({
				interactiveNamespace: null,
			});
		}
	}, [isInteractive, namespace, defaultNamespace, setAttributes]);

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
							<SelectControl
								label={__('Namespace', 'prc-block-library')}
								value={namespace}
								options={interactiveNamespaceOptions}
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
