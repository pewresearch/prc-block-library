/**
 * External Dependencies
 */
import { mailChimpInterests } from '@prc/functions';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	HorizontalRule,
} from '@wordpress/components';

const findMatchingBlock = (blocks, value) =>
	blocks.find((block) => block.attributes.value === value);

const BLOCKNAME = 'prc-block/form-input-checkbox';

export default function Controls({ attributes, setAttributes, clientId }) {
	const { interests } = attributes;
	const [selected, setSelected] = useState(interests);

	const { insertBlock, removeBlock, updateBlockAttributes } =
		useDispatch(blockEditorStore);

	const innerBlocks = useSelect((select) => {
		const { getBlock } = select(blockEditorStore);
		const block = getBlock(clientId);
		return block.innerBlocks;
	});

	const updateSelection = (s) => {
		const tmp = selected;
		if (tmp.includes(s.value)) {
			const index = tmp.indexOf(s.value);
			if (-1 !== index) {
				tmp.splice(index, 1);
			}
			const matchingBlock = findMatchingBlock(innerBlocks, s.value);
			if (matchingBlock) {
				// Unlock the block then remove it.
				updateBlockAttributes(matchingBlock.clientId, {
					lock: {
						remove: false,
					},
				}).then(() => removeBlock(matchingBlock.clientId, false));
			}
		} else {
			tmp.push(s.value);
			const newBlock = createBlock(BLOCKNAME, {
				value: s.value,
				label: s.label,
				lock: {
					remove: true,
				},
			});
			insertBlock(newBlock, false, clientId, false);
		}

		setAttributes({ interests: tmp });
		setSelected([...tmp]);
	};

	return (
		<InspectorControls>
			<PanelBody title={__('MailChimp Interests')}>
				<PanelRow>
					<div>
						{mailChimpInterests.map((i) =>
							false !== i.value ? (
								<ToggleControl
									label={i.label}
									checked={selected.includes(i.value)}
									onChange={() => updateSelection(i)}
								/>
							) : (
								<HorizontalRule />
							))}
					</div>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}
