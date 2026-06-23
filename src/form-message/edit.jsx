/**
 * WordPress Dependencies
 */
import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * When this block (or any of its descendants) is selected, it automatically
 * activates the parent `prc-block/form`'s `displayMessageEditing` attribute so
 * the form reveals the message preview and hides the fields. Deselecting reverts
 * the form to field-editing mode.
 *
 * @param {Object}  props            Block props.
 * @param {string}  props.clientId   Unique block client ID.
 * @param {boolean} props.isSelected Whether this block is directly selected.
 */
export default function Edit({ clientId, isSelected }) {
	const { hasSelectedDescendant, parentFormClientId } = useSelect(
		(select) => {
			const store = select(blockEditorStore);
			const parentIds = store.getBlockParentsByBlockName(
				clientId,
				'prc-block/form',
				true
			);
			return {
				hasSelectedDescendant: store.hasSelectedInnerBlock(
					clientId,
					true
				),
				parentFormClientId: parentIds[0],
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const isBranchActive = isSelected || hasSelectedDescendant;

	useEffect(() => {
		if (!parentFormClientId) {
			return;
		}
		updateBlockAttributes(parentFormClientId, {
			displayMessageEditing: isBranchActive,
		});
	}, [isBranchActive, parentFormClientId, updateBlockAttributes]);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{
					metadata: {
						bindings: {
							content: {
								source: 'prc-block/form-message',
							},
						},
					},
				},
			],
		],
	});
	return <div {...innerBlocksProps} />;
}
