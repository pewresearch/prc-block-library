/**
 * External Dependencies
 */
import { MailchimpSegmentList } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { PanelBody, PanelRow } from '@wordpress/components';

const findMatchingCheckboxBlockField = (blocks, value) =>
	blocks.find((block) => {
		if (block.name !== 'prc-block/form-input-checkbox') {
			return false;
		}
		return block.attributes.value === value;
	});

export default function Controls({ attributes, setAttributes, clientId }) {
	const { interests } = attributes;

	const { insertBlock, removeBlock, updateBlockAttributes } =
		useDispatch(blockEditorStore);

	const innerBlocks = useSelect((select) => {
		const { getBlock } = select(blockEditorStore);
		const block = getBlock(clientId);
		return block.innerBlocks;
	});

	const onRemove = (item) => {
		const formInnerBlocks = innerBlocks.find(
			(block) => block.name === 'prc-block/form'
		)?.innerBlocks || [];
		const matchingBlock = findMatchingCheckboxBlockField(
			formInnerBlocks,
			item.value
		);
		if (matchingBlock) {
			// Unlock the block then remove it.
			updateBlockAttributes(matchingBlock.clientId, {
				lock: {
					remove: false,
				},
			}).then(() => removeBlock(matchingBlock.clientId, false));
		}
	};

	const onAdd = (item) => {
		const inputBlock = createBlock('prc-block/form-input-checkbox', {
			value: item.value,
			lock: {
				remove: true,
			},
			label: item.label,
			type: 'checkbox',
			metadata: {
				name: item.label
					.replace(/[^a-z0-9\s]/gi, '')
					.toLowerCase()
					.replace(/\s/g, '_'),
			},
		});
		const formBlockClientId = innerBlocks.find(
			(block) => block.name === 'prc-block/form'
		)?.clientId;
		insertBlock(inputBlock, false, formBlockClientId, false);
	};

	const onUpdate = (updatedSelected) => {
		setAttributes({ interests: [...updatedSelected] });
	};

	return (
		<InspectorControls>
			<PanelBody title={__('Mailchimp Interests')}>
				<PanelRow>
					<MailchimpSegmentList
						interests={interests}
						onAdd={onAdd}
						onRemove={onRemove}
						onUpdate={onUpdate}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
