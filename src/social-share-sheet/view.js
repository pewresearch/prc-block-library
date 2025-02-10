/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state } = store('prc-block/social-share-sheet', {
	state: {
		enabled: false,
	},
	actions: {
		onClick: (event) => {
			const context = getContext();
			if (true === state.enabled) {
				event.preventDefault();
				window.navigator.share({
					title: context?.title,
					text: context?.text,
					url: context?.url,
				});
			}
		},
	},
	callbacks: {
		detectWebShareSupport: () => {
			if (window.navigator.share === undefined) {
				state.enabled = false;
			} else {
				state.enabled = true;
			}
		},
	},
});
