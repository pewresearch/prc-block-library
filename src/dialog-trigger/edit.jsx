/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useMemo } from '@wordpress/element';
import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { STORE_NAME } from '../dialog/store';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	context,
	clientId,
}) {
	const dialogId = context['dialog/id'] ?? null;

	// Get the dialog-element block from the parent dialog block
	const { dialogElementClientId, isDialogOpen } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId } = select( blockEditorStore );
			const parentClientId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( parentClientId );

			// Find the dialog-element block in the parent's inner blocks
			const dialogElementBlock = parentBlock?.innerBlocks?.find(
				( innerBlock ) => innerBlock.name === 'prc-block/dialog-element'
			);
			const dialogElementId = dialogElementBlock?.clientId;

			return {
				dialogElementClientId: dialogElementId,
				isDialogOpen: dialogElementId
					? select( STORE_NAME ).isOpen( dialogElementId )
					: false,
			};
		},
		[ clientId ]
	);

	// Get store actions
	const { open, close } = useDispatch( STORE_NAME );

	const blockProps = useBlockProps({
		'aria-haspopup': 'dialog',
		'aria-controls': dialogId,
		'aria-expanded': isDialogOpen ? 'true' : 'false',
		'type': 'button',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
	});

	const buttonLabel = useMemo(
		() => ( isDialogOpen ? __( 'Close Dialog' ) : __( 'Edit Dialog' ) ),
		[ isDialogOpen ]
	);

	return (
		<>
			<BlockControls __experimentalShareWithChildBlocks>
				<ToolbarGroup>
					<ToolbarButton
						label={ buttonLabel }
						onClick={ () => {
							if ( ! dialogElementClientId ) {
								console.warn(
									'No dialog-element block found. Please add a dialog-element block to the parent dialog.'
								);
								return;
							}
							if ( isDialogOpen ) {
								close( dialogElementClientId );
							} else {
								open( dialogElementClientId );
							}
						} }
					>
						{ buttonLabel }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<button {...innerBlocksProps} />
		</>
	);
}
