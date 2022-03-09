/**
 * WordPress Dependencies
 */
import { Fragment, useEffect } from '@wordpress/element';
import {
	useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */

import { ModalControls } from '../_shared';

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
			<ModalControls
				controllerClientId={clientId}
			>
				<div {...innerBlocksProps} />
			</ModalControls>
		</Fragment>
	);
};

export default edit;
