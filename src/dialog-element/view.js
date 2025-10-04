/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
	withSyncEvent,
} from '@wordpress/interactivity';

function addDialogIdToUrl( id ) {
	const url = new URL( window.location.href );
	url.searchParams.set( 'dialogId', id );
	// Update the URL without adding to history
	window.history.replaceState( {}, '', url );
}

function removeDialogIdFromUrl() {
	const url = new URL( window.location.href );
	console.log('removeDialogIdFromUrl fired, current URL:', url.toString());
	url.searchParams.delete( 'dialogId' );
	console.log('Updated URL after removing dialogId:', url.toString());
	// Update the URL without adding to history
	window.history.replaceState( {}, '', url );
}

const { actions, state } = store( 'prc-block/dialog', {
	state: {
		get id() {
			const context = getContext();
			return context?.id;
		},
		get dialog() {
			return state.dialogs[ state.id ];
		},
		get dialogElement() {
			const context = getContext();
			if ( ! context?.id ) {
				return null;
			}
			const { id } = context;
			return document.getElementById( id );
		},
	},
	actions: {
		/**
		 * Helper function to close all open dialogs.
		 */
		closeAll: () => {
			const { dialogs } = state;
			const ids = Object.keys( dialogs );
			ids.forEach( ( id ) => {
				// Check that state[key] is an object and has an isOpen property.
				if (
					typeof dialogs[ id ] !== 'object' ||
					! dialogs[ id ].hasOwnProperty( 'isOpen' )
				) {
					return;
				}
				state.dialogs[ id ].isOpen = false;
			} );
		},
		/**
		 * This function is used by dialog-trigger to open the dialog when clicked.
		 * @param event
		 */
		onClickOpen: withSyncEvent( ( event ) => {
			// We are hijacking all clicks on the trigger and any children to prevent the default click behavior.
			console.log('onClickOpen fired');
			event.preventDefault();
			const { id } = state;
			actions.open( id );
		} ),
		/**
		 * This function is used by the close button in the dialog element, when clicked it closes the dialog.
		 * @param event
		 */
		onClickClose: withSyncEvent( ( event ) => {
			event.preventDefault();
			const { id } = state;
			actions.close( id );
		} ),
		/**
		 * This function allows you to directly open a dialog by passing an id from another store, like so:
		 * store('core/dialog').actions.open('xyz123');
		 * @param {*} passthroughId
		 */
		open: ( passthroughId = false ) => {
			// Most interactions will pass an id through, but if not then fallback to state for id.
			let id = passthroughId;
			if ( ! id ) {
				id = state.id;
			}
			// Finally, if there is no id then we can't proceed and should exit early.
			if ( ! id ) {
				return;
			}
			state.dialogs[ id ].isOpen = true;
			state.dialogs[ id ].closingModal = false;
		},
		/**
		 * This function allows you to directly close a dialog by passing an id from another store, like so:
		 * store('core/dialog').actions.close('xyz123');
		 * @param {*} passthroughId
		 */
		close: ( passthroughId = false ) => {
			let id = passthroughId;
			if ( ! id ) {
				id = state.id;
			}
			if ( ! id ) {
				return;
			}
			state.dialogs[ id ].isOpen = false;
		},
	},
	callbacks: {
		/**
		 * Handles the escape key event to close the dialog if it's open.
		 *
		 * @param event The keyboard event.
		 */
		onESCKey: withSyncEvent( ( event ) => {
			const { id, dialog } = state;
			if ( id && event.key === 'Escape' ) {
				if ( true === dialog.isOpen ) {
					event.preventDefault();
					actions.close( id );
				}
			}
		} ),
		/**
		 * Handles the dialog open event, this is triggered by the user clicking the open button or via an auto activation timer.
		 */
		onOpen: () => {
			const { dialogElement, dialog, id } = state;
			// Sanity check, if we don't have an id or dialogElement then we can't proceed.
			if ( ! id || ! dialogElement ) {
				return;
			}
			// If the dialog is meant to not be open, don't proceed.
			if ( ! dialog.isOpen ) {
				return;
			}
			console.log('onOpen fired');
			if ( dialog.enableDeepLink ) {
				console.log('Adding dialogId to URL:', id);
				addDialogIdToUrl( id );
			}
			console.log("Showing dialog element:", dialogElement);
			dialogElement?.showModal();
		},
		/**
		 * Handles the dialog close event, this is triggered by the user clicking the close button, pressing the escape key or clicking outside the dialog when it's a non-modal dialog.
		 */
		onClose: () => {
			const { dialogElement, dialog, id } = state;
			// Sanity check, if we don't have an id or dialogElement then we can't proceed.
			if ( ! id || ! dialogElement ) {
				return;
			}
			// If the dialog is meant to be open, don't proceed.
			if ( dialog.isOpen ) {
				return;
			}
			// If already closing, don't start another close animation
			if ( dialog.isClosing ) {
				return;
			}
			// CRITICAL FIX: Only proceed if the dialog element is actually open in the DOM
			// This prevents the watcher from triggering close animations when the dialog
			// was never opened in the first place (e.g., on page load when isOpen initializes to false)
			if ( ! dialogElement.open ) {
				return;
			}
			console.log('onClose fired');
			// Start isClosing animation...
			state.dialogs[ id ].isClosing = true;
			// Allow for animation to complete...
			setTimeout(
				withScope( () => {
					console.log("Closing dialog element:", dialogElement);
					dialogElement?.close();
					console.log('Removing dialogId from URL', id);
					removeDialogIdFromUrl( id ); // We always clean the dialog id regardless of whether deep linking is enabled or not.
					state.dialogs[ id ].isClosing = false;
					state.dialogs[ id ].isOpen = false;
				} ),
				dialog.animationDuration
			);
		},
		/**
		 * Closes the dialog if the backdrop is clicked.
		 *
		 * @param event
		 */
		onBackdropClick: withSyncEvent( ( event ) => {
			const { ref } = getElement();
			const boundingRects = ref.getBoundingClientRect();
			// make sure the event x and y are within the dialog element, if they are continue...
			if (
				event.clientX >= boundingRects.left &&
				event.clientX <= boundingRects.right &&
				event.clientY >= boundingRects.top &&
				event.clientY <= boundingRects.bottom
			) {
				return;
			}
			const { dialog, id } = state;
			if ( true !== dialog.isOpen || dialog.isClosing ) {
				return;
			}
			actions.close( id );
		} ),
		/**
		 * Activates the current dialog element if there is an auto activation timer set.
		 */
		onAutoActivation: () => {
			const { id, dialog, dialogs } = state;
			console.log('Dialog: init', id);
			if (
				! id &&
				! dialog.activationTimerDuration &&
				-1 !== dialog.activationTimerDuration
			) {
				return;
			}
			// Check if any of the dialogs are already open,
			// if so we don't want to close or auto activate another dialog.
			const dialogIds = Object.keys( dialogs );
			for ( let i = 0; i < dialogIds.length; i++ ) {
				const dialogId = dialogIds[ i ];
				if ( dialogs[ dialogId ].isOpen ) {
					return;
				}
			}
			if ( 1 <= dialog.activationTimerDuration ) {
				setTimeout(
					withScope( () => {
						actions.closeAll();
						actions.open( id );
					} ),
					dialog.activationTimerDuration
				);
			}
		},
	},
} );
