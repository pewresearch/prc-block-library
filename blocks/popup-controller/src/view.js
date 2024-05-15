/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

// VideoPress API Docs: https://github.com/Automattic/videopress-player-api-doc/blob/trunk/public-js-api.md

const { actions, state } = store('prc-block/popup-controller', {
	state: {
		videos: {},
	},
	actions: {
		play: (id) => {
			if (!id) {
				return;
			}
			if (false === state[id].api) {
				return;
			}
			state[id].api.controls.play();
		},
		pause: (id) => {
			if (!id) {
				return;
			}
			if (false === state[id].api) {
				return;
			}
			state[id].api.controls.pause();
		},
		/**
		 * Great for when you need to close all modals from outside the modal.
		 */
		closeAll: () => {
			Object.keys(state).forEach((key) => {
				state[key].isActive = false;
				actions.pause(key);
			});
		},
		open: (event, passthroughId = false) => {
			const context = getContext();
			const id = context?.id;
			console.log('open...', passthroughId);
			if (passthroughId) {
				state[passthroughId].isActive = true;
				actions.play(passthroughId);
				return;
			}
			if (!id) {
				console.log('no id', id, state);
				return;
			}
			state[id].isActive = true;
			actions.play(id);
			console.log('open', id, state[id].isActive, state);
		},
		close: (event, passthroughId = false) => {
			const context = getContext();
			const id = context?.id;
			if (passthroughId) {
				state[passthroughId].isActive = false;
				actions.pause(passthroughId);
				return;
			}
			if (!id) {
				return;
			}
			state[id].isActive = false;
			console.log('stop...', state[id].api);
			actions.pause(id);
			console.log('close', id, state[id].isActive, state);
		},
		openAndThen: (andThen) => {
			const context = getContext();
			const { id } = context;
			state[id].isActive = true;
			andThen();
		},
		closeAndThen: (andThen) => {
			const context = getContext();
			const { id } = context;
			state[id].isActive = false;
			andThen();
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { id } = context;

			// check if window.prcPopupVideoPlayer exists if not create an empty object
			if (!window.prcPopupVideoPlayer) {
				window.prcPopupVideoPlayer = {};
			}

			// Move the outer container to outside wp-site-blocks, to escape the css container query.
			const prcBlock = document.querySelector(
				'.wp-block-prc-block-popup-modal__outer'
			);
			const siteBlocks = document.querySelector('.wp-site-blocks');
			siteBlocks.parentNode.insertBefore(prcBlock, siteBlocks);

			if (!id) {
				return;
			}
			console.log('watchForVideoPress', state, context);
			// Check if this is a videopress modal, does it have an iframe with aria videopress in it?
			const modal = document.querySelector(
				`.wp-block-prc-block-popup-modal[data-controller-id="${id}"]`
			);
			console.log('modal', modal);
			if (!modal) {
				return;
			}
			const isVideo = modal.classList.contains('is-video');
			if (!isVideo) {
				return;
			}

			const isVideoPress = modal.querySelector(
				'.jetpack-videopress-player'
			);
			if (!isVideoPress) {
				return;
			}
			const iframe = isVideoPress.querySelector('iframe');
			console.log('iframe', iframe);
			if (!iframe) {
				return;
			}

			const { VideoPressIframeApi } = window;
			const api = VideoPressIframeApi(iframe, () => {
				console.log('iframe api loaded!');
				api.customize.set({ shareButton: false });
			});

			state[id].api = api;
			window.prcPopupVideoPlayer[id] = api;
		},
		outerWatch: () => {
			console.log('outerWatch', state);
		},
		onWindowClickCloseModal: (event) => {
			const context = getContext();
			const { id } = context;
			if (!id) {
				return;
			}
			if (!state[id]?.isActive) {
				return;
			}
			const elm = getElement();
			const { ref } = elm;
			console.log('onWindowClickCloseModal', elm, event.target);

			// check elm for any of the event.target
			// if present then return early
			if (
				ref.contains(event.target) &&
				!event.target.classList.contains(
					'wp-block-prc-block-popup-modal__outer'
				)
			) {
				return;
			}

			const modal = document.querySelector(
				'.wp-block-prc-block-popup-modal.is-active'
			);
			if (
				!modal.innerHTML.includes(event.target.innerHTML) &&
				true === state[id].isActive
			) {
				actions.close(null, id);
			}
		},
		onESCKey: (event) => {
			const context = getContext();
			const { id } = context;
			if (!id) {
				return;
			}
			if (event.key === 'Escape') {
				if (true === state[id].isActive) {
					event.preventDefault();
					actions.close(null, id);
				}
			}
		},
		isModalActive: () => {
			const context = getContext();
			const elm = getElement();
			const { id } = context;
			console.log('isModalActive', state, id, elm);
			return state[id]?.isActive;
		},
		isAModalActive: () => {
			const elm = getElement();
			const s = state;
			console.log('isAModalActive', s, elm);
			return Object.keys(s).some((key) => state[key].isActive);
		},
		soundOff: () => {
			const context = getContext();
			const elm = getElement();
			console.log('soundOff', context, elm, state);
		},
	},
});
