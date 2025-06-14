/**
 * WordPress Dependencies
 */
import { store, getElement } from '@wordpress/interactivity';

const { state, actions } = store('prc-block/social-share-url-field', {
	state: {
		get inputType() {
			return 'text';
		},
		get inputValue() {
			const context = getContext();
			const { url } = context;
			return url;
		},
		get inputName() {
			return 'shareUrl';
		},
	},
	actions: {
		onInputClick: () => {
			const { ref } = getElement();
			// Select the input field...
			ref.focus();
			ref.select();
		},
		onInputBlur: () => {
			const { ref } = getElement();
			// Deselect the input field...
			ref.blur();
		},
	},
});
