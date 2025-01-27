/**
 * WordPress Dependencies
 */
import { store, getElement } from '@wordpress/interactivity';

store('prc-block/social-share-url-field', {
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
