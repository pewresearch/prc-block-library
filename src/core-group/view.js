/**
 * WordPress Dependencies
 */

import { store, getElement } from '@wordpress/interactivity';

const loadStickyBitsScript = () => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src =
			'https://cdnjs.cloudflare.com/ajax/libs/stickybits/3.7.4/stickybits.min.js';
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
};

const { actions } = store('prc-block/core-group', {
	actions: {
		*initSticky() {
			const { ref } = getElement();
			// check if the ref has class name of is-position-sticky
			if (ref.classList.contains('is-position-sticky')) {
				yield loadStickyBitsScript()
					.then(() => {
						stickybits('.wp-block-group.is-position-sticky', {
							useStickyClasses: true,
						});
					})
					.catch((error) => {
						console.error(
							'Failed to load stickybits script:',
							error
						);
					});
			}
		},
	},
	callbacks: {
		*onInit() {
			yield actions.initSticky();
		},
	},
});
