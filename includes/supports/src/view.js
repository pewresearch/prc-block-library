/**
 * WordPress Dependencies
 */

import { store, getElement } from '@wordpress/interactivity';

const loadStickyBitsScript = () => {
	return new Promise((resolve, reject) => {
		// Check if stickybits is already loaded
		if (typeof window.stickybits !== 'undefined') {
			resolve();
			return;
		}

		// Check if script is already being loaded
		const existingScript = document.querySelector(
			'script[src*="stickybits"]'
		);
		if (existingScript) {
			existingScript.addEventListener('load', resolve);
			existingScript.addEventListener('error', reject);
			return;
		}

		// Load the script
		const script = document.createElement('script');
		script.src =
			'https://cdnjs.cloudflare.com/ajax/libs/stickybits/3.7.4/stickybits.min.js';
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
};

const { actions } = store('prc-block/supports', {
	actions: {
		*initSticky() {
			const { ref } = getElement();
			// check if the ref has class name of is-position-sticky
			if (ref.classList.contains('is-position-sticky')) {
				const stickyId = ref.getAttribute('data-sticky-id');
				if (stickyId) {
					// Add a class to the element to indicate it has been initialized
					yield loadStickyBitsScript()
						.then(() => {
							stickybits(`[data-sticky-id="${stickyId}"]`, {
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
			}
		},
		*spawnIntersectionObservers() {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							observer.unobserve(entry.target);
						}
					});
				},
				{
					// Only trigger when element is in the center 50% of the viewport
					rootMargin: '-25% 0px -25% 0px',
					// Element must be at least 50% visible to trigger
					threshold: 0.5,
				}
			);

			document
				.querySelectorAll('.prc-animations__fade-in-down')
				.forEach((element) => {
					observer.observe(element);
				});
		}
	},
	callbacks: {
		*onInit() {
			yield actions.initSticky();
			yield actions.spawnIntersectionObservers();
		},

	},
});
