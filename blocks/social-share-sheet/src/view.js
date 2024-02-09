/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store('prc-block/social-share-sheet', {
	state: {},
	actions: {
		onClick: (event) => {
			event.preventDefault();
			const context = getContext();
			// invoke share sheet.
			console.log(event);
			window.navigator.share({
				title: context?.title,
				text: context?.text,
				url: context?.url,
			});
		},
	},
	callbacks: {
		onInit: () => {
			// determine if the share sheet should include an image..., check for og:meta or state.id.image
		},
	},
});
