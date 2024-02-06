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
import {
	PanelBody,
	PanelRow,
} from '@wordpress/components';

const findMatchingCheckboxBlockField = (blocks, value) =>
	blocks.find((block) => {
		if (block.name !== 'prc-block/form-input-checkbox') {
			return false;
		}
		return block.attributes.value === value;
	}
);

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
		const matchingBlock = findMatchingCheckboxBlockField(innerBlocks, item.value);
		if (matchingBlock) {
			// Unlock the block then remove it.
			updateBlockAttributes(matchingBlock.clientId, {
				lock: {
					remove: false,
				},
			}).then(() => removeBlock(matchingBlock.clientId, false));
		}
	}

	const onAdd = (item) => {
		const inputBlock = createBlock('prc-block/form-input-checkbox', {
			value: item.value,
			lock: {
				remove: true,
			},
			label: item.label,
			type: 'checkbox',
			isInteractive: true,
			interactiveNamespace: 'prc-block/mailchimp-select'
		});
		insertBlock(inputBlock, false, clientId, false);
	}

	const onUpdate = (updatedSelected) => {
		setAttributes({ interests: [...updatedSelected] });
	}

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
