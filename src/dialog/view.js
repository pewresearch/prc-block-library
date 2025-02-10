/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
} from '@wordpress/interactivity';

// VideoPress API Docs: https://github.com/Automattic/videopress-player-api-doc/blob/trunk/public-js-api.md
const { VideoPressIframeApi } = window;

function addDialogIdToUrl(id) {
	const url = new URL(window.location.href);
	url.searchParams.set('dialogId', id);
	// Update the URL without adding to history
	window.history.replaceState({}, '', url);
}

function removeDialogIdFromUrl() {
	const url = new URL(window.location.href);
	url.searchParams.delete('dialogId');
	// Update the URL without adding to history
	window.history.replaceState({}, '', url);
}


const { actions, state } = store('prc-block/dialog', {
	state: {
		get id() {
			const context = getContext();
			return context?.id;
		},
		get type() {
			const { id } = getContext();
			return state[id].type;
		},
		get activationTimerDuration() {
			const { id } = getContext();
			return state[id].activationTimerDuration;
		},
		get animationDuration() {
			const { id } = getContext();
			return state[id].animationDuration;
		},
		get dialogElement() {
			const { id } = getContext();
			return document.getElementById(state[id].dialogElemId);
		},
		get widths() {
			const { id } = getContext();
			return state[id].widths;
		},
		get isOpen() {
			const { id } = getContext();
			return state[id].isOpen;
		},
		get isClosing() {
			const { id } = getContext();
			return state[id].isClosing;
		},
		get isMobile() {
			return 'mobile' === state.currentDevice;
		},
		get enableDeepLink() {
			const { id } = getContext();
			return state[id].enableDeepLink;
		},
		// VideoPress Functionality (non-core)
		get isVideo() {
			const { id } = getContext();
			return !!state[id].videoPressAPI;
		},
		get videoPressAPI() {
			const { id } = getContext();
			return state[id].videoPressAPI;
		},
	},
	actions: {
		/**
		 * Helper function to close all open dialogs.
		 * @param dialogType
		 */
		closeAll: (dialogType = null) => {
			Object.keys(state).forEach((key) => {
				// Check that state[key] is an object and has an isOpen property.
				if (
					typeof state[key] !== 'object' ||
					!state[key].hasOwnProperty('isOpen') ||
					!state[key].hasOwnProperty('type')
				) {
					return;
				}
				const id = key;
				if (dialogType && dialogType !== state[id].type) {
					return;
				}
				state[id].isOpen = false;
				actions.pause(id);
			});
		},
		/**
		 * This function is used entirely by dialog-trigger to open the dialog.
		 * @param event
		 */
		onClickOpen: (event) => {
			// We are hijacking all clicks on the trigger and any children to prevent the default click behavior.
			event.preventDefault();
			const { id } = state;
			actions.open(id);
		},
		/**
		 * This function is used entirely by the close button in the dialog element.
		 * @param event
		 */
		onClickClose: (event) => {
			event.preventDefault();
			const { id } = state;
			actions.close(id);
		},
		/**
		 * This function allows you to directly open a dialog by passing an id from another store, like so:
		 * store('prc-block/dialog').actions.open('xyz123');
		 * @param {*} passthroughId
		 */
		open: (passthroughId = false) => {
			// Most interactions will pass an id through, but if not then fallback to state for id.
			let id = passthroughId;
			if (!id) {
				id = state.id;
			}
			// Finally, if there is no id then we can't proceed and should exit early.
			if (!id) {
				console.error('No id found to open dialog.');
				return;
			}
			state[id].isOpen = true;
			state[id].closingModal = false;
			if (!!state.videoPressAPI) {
				setTimeout(
					withScope(() => {
						actions.play(id);
					}),
					state[id].animationDuration
				);
			}
		},
		/**
		 * This function allows you to directly close a dialog by passing an id from another store, like so:
		 * store('prc-block/dialog').actions.close('xyz123');
		 * @param {*} passthroughId
		 */
		close: (passthroughId = false) => {
			let id = passthroughId;
			if (!id) {
				id = state.id;
			}
			if (!id) {
				console.error('No id found to close dialog.');
				return;
			}
			state[id].isOpen = false;
			if (!!state[id].videoPressAPI) {
				actions.pause(id);
			}
		},
		// VideoPress Functionality (non-core)
		play: (id) => {
			// These are direct id state calls instead of derived state because when calling play directly we want to be explicit about which video dialog we're targeting.
			// Sanity Checks:
			if (!id || !state[id].videoPressAPI) {
				return;
			}
			state[id].videoPressAPI.controls.play();
		},
		pause: (id) => {
			// Sanity Checks:
			if (!id || !state[id].videoPressAPI) {
				return;
			}
			state[id].videoPressAPI.controls.pause();
		},
	},
	callbacks: {
		getStyle: () => {
			const { widths, currentDevice, animationDuration } = state;
			if (!widths[currentDevice]) {
				return '';
			}
			const width = widths[currentDevice];
			return `--min-width: ${width}px; --animation-duration: ${animationDuration}ms;`;
		},
		/**
		 * When the block initializes we need to capture the id of the dialog element and store it in state, this is later used by derived state.dialogElement. This is better than querying the dom every single time state.dialogElm is accessed.
		 */
		onInitIdentifyDialogElem: () => {
			const { id } = state;
			const { ref } = getElement();
			const dialog = ref.querySelector(
				'.wp-block-prc-block-dialog-element'
			);
			const dialogId = dialog?.getAttribute('id');
			state[id].dialogElemId = dialogId;
			console.log('onInitIdentifyDialogElem', state);
		},
		onESCKey: (event) => {
			const { id, isOpen } = state;
			if (id && event.key === 'Escape') {
				if (true === isOpen) {
					event.preventDefault();
					actions.close(id);
				}
			}
		},
		onOpen: () => {
			const { dialogElement, isOpen, id, type, enableDeepLink } = state;
			// Sanity check, if we don't have an id or dialogElement then we can't proceed.
			if (!id || !dialogElement) {
				return;
			}
			// If the dialog is meant to not be open, don't proceed.
			if (!isOpen) {
				return;
			}
			if (enableDeepLink) {
				addDialogIdToUrl(id);
			}
			state[id].isOpen = true;
			if ('modal' === type) {
				dialogElement.showModal();
			} else {
				dialogElement.show();
			}
		},
		/**
		 * This callback is used to close the dialog element, it runs when the isOpen state changes and is set to false.
		 */
		onClose: () => {
			console.log('running dialog onClose');
			const { dialogElement, isOpen, id, animationDuration } = state;
			// Sanity check, if we don't have an id or dialogElement then we can't proceed.
			if (!id || !dialogElement) {
				console.log('onClose -> no id or dialogElement');
				return;
			}
			// If the dialog is meant to be open, don't proceed.
			if (isOpen) {
				console.log('onClose -> isOpen');
				return;
			}
			// Start isClosing animation...
			state[id].isClosing = true;
			// Allow for animation to complete...
			setTimeout(
				withScope(() => {
					dialogElement.close();
					removeDialogIdFromUrl(id); // We always clean the dialog id regardless of whether deep linking is enabled or not.
					// Fire off a custom event to let other blocks know the dialog has closed, it's explicit and only runs when a user closes the dialog.
					const event = new CustomEvent('prc-block-dialog-closed', {
						detail: { id },
					});
					document.dispatchEvent(event);
					state[id].isClosing = false;
					state[id].isOpen = false;
				}),
				animationDuration
			);
		},
		/**
		 * This function is used to determine the current device size and set the state accordingly, it runs against all block instances globally.
		 */
		onResize: () => {
			const width = document.documentElement.clientWidth;
			if (width <= 600) {
				state.currentDevice = 'mobile';
			} else if (width > 600 && width <= 782) {
				state.currentDevice = 'tablet';
			} else {
				state.currentDevice = 'desktop';
			}
		},
		onBackdropClick: (event) => {
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
			if (true !== state.isOpen) {
				return;
			}
			const { id } = state;
			console.log('onBackdropClick -> close', event, ref, state, id);
			actions.close(id);
		},
		onAutoActivation: () => {
			const { id, activationTimerDuration } = state;
			if (
				!id &&
				!activationTimerDuration &&
				-1 !== activationTimerDuration
			) {
				return;
			}
			console.log('onAutoActivation', id, activationTimerDuration, state);
			if (1 <= activationTimerDuration) {
				setTimeout(
					withScope(() => {
						console.log('onAutoActivation -> closeAll', id);
						actions.closeAll('modal');
						actions.open(id);
					}),
					activationTimerDuration
				);
			}
		},
		// VideoPress Functionality (non-core)
		/**
		 * This functions sets up a VideoPress API instance for each VideoPress block in a modal.
		 * This will allow for the VideoPress API to be used to control the video playback.
		 * This is called whenever a dialog block is initialized, but quickly checks for the existence of a VideoPress block and corresponding iframe before proceeding.
		 */
		onVideoPressInit: () => {
			const { ref } = getElement();
			const hasVideoPress = ref.querySelector(
				'.jetpack-videopress-player'
			);
			if (!hasVideoPress) {
				return;
			}
			const iframe = hasVideoPress.querySelector('iframe');
			if (!iframe) {
				return;
			}
			// Because the VideoPress block is on the page the VideoPressIframeApi should be available, access it from window global, we import this (if available) at the top of the file. If(when) a VideoPress JS module becomes available, we'll use that.
			if (!VideoPressIframeApi) {
				return;
			}
			const { id } = state;
			// Set up the VideoPress API object and also set it to turn off shareButton's by default.
			state[id].videoPressAPI = VideoPressIframeApi(iframe, () => {
				api.customize.set({ shareButton: false });
			});
		},
	},
});
