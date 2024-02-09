/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state } = store('prc-block/social-share-sheet', {
	state: {},
	actions: {
		onButtonClick: (event) => {
			const id = 'xyz';
			// invoke share sheet.
			window.navigator.share({
				title: state[id]?.title,
				text: state[id]?.text,
				url: state[id]?.url,
			});
		},
	},
	callbacks: {
		onInit: () => {
			// determine if the share sheet should include an image..., check for og:meta or state.id.image
		},
	},
});
