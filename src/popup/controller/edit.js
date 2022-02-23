/**
 * WordPress Dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	BlockControls,
	useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
    ToolbarGroup,
} from '@wordpress/components';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';

const TEMPLATE = [
	[ 'prc-block/popup-content', {} ],
	[ 'prc-block/popup-modal', {} ],
];

const setupModalBackground = () => {
	const attach = document.querySelector('.edit-post-visual-editor__content-area');
	// If this already isn't attached then set it up...
	if ( null === document.getElementById('prc-block-modal-background') ) {
		const modalBackground = document.createElement('div');
		modalBackground.setAttribute('id', 'prc-block-modal-background');
		// Watch for clicks on the background and close the modal and then refresh the block.
		modalBackground.addEventListener('click', () => {
			console.log(window.prcBlocks.modal);
			const clientId = window.prcBlocks.modal.clientId;
			window.prcBlocks.modal.isOpen = false;
			window.prcBlocks.modal.clientId = false;
			dispatch('core/block-editor').selectBlock(clientId);
		} );
		console.log('modalBackground', modalBackground);
		// Add the modal background to the DOM
		attach.appendChild(modalBackground);
	}
}

const edit = ({ attributes, className, setAttributes, clientId }) => {

    const blockProps = useBlockProps();

	const {modalClientId} = useSelect(select => {
		const modalBlock = select('core/block-editor').getBlock(clientId).innerBlocks.filter(block => block.name === 'prc-block/popup-modal');
		return {
			modalClientId: modalBlock.pop().clientId,
		}
	});

	const {selectBlock} = useDispatch('core/block-editor');

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        orientation: 'vertical',
		template: TEMPLATE,
        templateLock: 'all',
    });

	// Handle setting up the modal background, if needed.
	useEffect(()=>{
		setupModalBackground();
	}, [clientId]);

	// If the modal for this controller is open then select the modal block to refresh its state.
	useEffect(()=>{
		selectBlock(modalClientId);
	}, [window.prcBlocks.modal.isOpen]);

    return(
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={sprintf( 'editor-%s', clientId === window.prcBlocks.modal.isOpen ? 'contract' : 'expand' )}
						label={sprintf( '%s Modal', clientId === window.prcBlocks.modal.isOpen ? 'Close' : 'Open' )}
						onClick={() => {
							if ( clientId === window.prcBlocks.modal.isOpen ) {
								window.prcBlocks.modal.isOpen = false;
								window.prcBlocks.modal.clientId = false;
							} else {
								window.prcBlocks.modal.isOpen = clientId;
								window.prcBlocks.modal.clientId = modalClientId;
								selectBlock(modalClientId);
							}
						}}
						isActive={clientId === window.prcBlocks.modal.isOpen}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
