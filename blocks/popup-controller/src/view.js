/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state } = store('prc-block/popup-controller', {
	actions: {
		open: () => {
			const context = getContext();
			const { id } = context;
			state[id].isActive = true;
		},
		close: () => {
			const context = getContext();
			const { id } = context;
			state[id].isActive = true;
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { id } = context;
			const { ref } = getElement();
			if (!id) {
				return;
			}
		},
		onWindowClickCloseModal: (event) => {
			const context = getContext();
			const { id } = context;
			if (!id) {
				return;
			}
			const { ref } = getElement();
			const modal = ref.querySelector('.wp-block-prc-block-popup-modal');
			if (
				!modal.innerHTML.includes(event.target.innerHTML) &&
				true === state[id].isActive
			) {
				state[id].isActive = false;
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
					state[id].isActive = false;
				}
			}
		},
	},
});
