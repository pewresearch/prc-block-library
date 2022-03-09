/**
 * WordPress Dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	BlockControls,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

if ( !window.hasOwnProperty('prcBlocks') ) {
	window.prcBlocks = {};
}
window.prcBlocks.modal = {
	isOpen: false,
	clientId: false,
};

const ModalControls = ({ controllerClientId, children }) => {
	const {modalClientId} = useSelect(select => {
		const modalBlock = select('core/block-editor').getBlock(controllerClientId).innerBlocks.filter(block => block.name === 'prc-block/popup-modal');
		return {
			modalClientId: modalBlock.pop().clientId,
		}
	});

	const {selectBlock} = useDispatch('core/block-editor');

	return(
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={sprintf( 'editor-%s', modalClientId === window.prcBlocks.modal.isOpen ? 'contract' : 'expand' )}
						label={sprintf( '%s Modal', modalClientId === window.prcBlocks.modal.isOpen ? 'Close' : 'Open' )}
						onClick={() => {
							if ( modalClientId === window.prcBlocks.modal.isOpen ) {
								window.prcBlocks.modal.isOpen = false;
								window.prcBlocks.modal.clientId = false;
							} else {
								window.prcBlocks.modal.isOpen = controllerClientId;
								window.prcBlocks.modal.clientId = controllerClientId;
								selectBlock(modalClientId);
							}
						}}
						isActive={controllerClientId === window.prcBlocks.modal.isOpen}
					/>
				</ToolbarGroup>
			</BlockControls>
			{children}
		</Fragment>
	);
};

export {
	ModalControls,
}
