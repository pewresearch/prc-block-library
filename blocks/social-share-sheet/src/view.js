/**
 * WordPress Dependencies
 */
import { store, getContext, } from '@wordpress/interactivity';

store('prc-block/social-share-sheet', {
	state: {},
	actions: {
		onClick: (event) => {
			event.preventDefault();
			const context = getContext();
			window.navigator.share({
				title: context?.title,
				text: context?.text,
				url: context?.url,
			});
		},
	},
});
