/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Object}   props.context       Block context.
 * @param {string}   props.clientId     Block client ID.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ context, clientId }) {
	const dialogId = context['dialog/id'] ?? '';
	const isDialogOpen = context['dialog/isOpen'] ?? false;

	const { dialogClientId } = useSelect(
		(select) => ({
			dialogClientId:
				select(blockEditorStore).getBlockRootClientId(clientId),
		}),
		[clientId]
	);

	const { updateBlockAttributes, __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	const toggleDialog = () => {
		if (dialogClientId) {
			__unstableMarkNextChangeAsNotPersistent();
			updateBlockAttributes(dialogClientId, {
				editorIsDialogOpen: !isDialogOpen,
			});
		}
	};

	const blockProps = useBlockProps({
		'aria-haspopup': 'dialog',
		'aria-controls': dialogId,
		'aria-expanded': isDialogOpen ? 'true' : 'false',
		type: 'button',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
	});

	const buttonLabel = useMemo(
		() => (isDialogOpen ? __('Close Dialog') : __('Edit Dialog')),
		[isDialogOpen]
	);

	return (
		<>
			<BlockControls __experimentalShareWithChildBlocks>
				<ToolbarGroup>
					<ToolbarButton
						label={buttonLabel}
						aria-controls={dialogId}
						onClick={toggleDialog}
					>
						{buttonLabel}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<button {...innerBlocksProps} />
		</>
	);
}
