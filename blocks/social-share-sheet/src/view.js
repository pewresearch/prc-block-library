/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

store('prc-block/social-share-sheet', {
	state: {},
	actions: {
		onClick: (event) => {
			const context = getContext();
			console.log('onClick', context, event);
			if (true === context.enabled) {
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
			const context = getContext();
			if (window.navigator.share === undefined) {
				context.enabled = false;
			} else if (undefined !== window.navigator.canShare()) {
				if (true === window.navigator.canShare()) {
					context.enabled = true;
				} else {
					context.enabled = false;
				}
			} else {
				context.enabled = false;
			}
			console.log('detect#WebShareSupport', context);
		},
	},
});
