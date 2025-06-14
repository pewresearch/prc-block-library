// Add isInteractive toggle and interactiveContext text control to all blocks where supports.interactivity === true.

/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

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
	const { interactiveNamespace, interactiveSubsumption } = attributes;
	const targetNamespace = interactiveNamespace || context?.interactiveNamespace;
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
			const options = [
				{
					value: null,
					label: 'None',
				},
				...blockArray.map((blockName) => ({
					value: blockName,
					label: blockName,
				})),
			];

			return {
				interactiveNamespaceOptions: options,
				defaultNamespace: options[0]?.value,
			};
		},
		[clientId]
	);

	return (
		<InspectorControls>
			<PanelBody
				title={__('Interactivity API')}
				initialOpen={false}
				buttonProps={{
					isDestructive:
						(targetNamespace?.length > 0 || interactiveSubsumption),
					icon: (
						<div style={{ paddingLeft: '0.25em', color: 'inherit' }}>
							<Icon
								icon="plug-circle-bolt"
								size="1em"
							/>
						</div>
					),
				}}
			>
				<div>
					<ToggleControl
						label={__('Subsumption', 'prc-block-library')}
						checked={interactiveSubsumption}
						onChange={() =>
							setAttributes({
								interactiveSubsumption:
									!interactiveSubsumption,
								// interactiveNamespace: null,
							})
						}
						help={__(
							'When enabled, this block will inherit primitives like name, value, and type directly. This is useful for blocks that are used inside interactive templates (<template/>).',
							'prc-block-library'
						)}
					/>
					<SelectControl
						label={__('Target Namespace', 'prc-block-library')}
						value={targetNamespace}
						options={interactiveNamespaceOptions}
						onChange={(newNamespace) =>
							setAttributes({
								interactiveNamespace: newNamespace
							})
						}
						help={__(
							`The target namespace uniquely identifies this block's interactivity context, ensuring interactions remain within the block and its parent. You can see parent blocks that support interactivity, which this block can "hook" into. If you don't see the desired namespace, it means the parent block does not support interactivity.`,
							'prc-block-library'
						)}
					/>
					<ExternalLink href="https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/">
						API documentation
					</ExternalLink>
				</div>
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
