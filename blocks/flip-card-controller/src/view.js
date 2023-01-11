/**
 * WordPress Dependencies
 */

import domReady from '@wordpress/dom-ready';

domReady(() => {
	const flipCardControllers = document.querySelectorAll(
		'.wp-block-prc-block-flip-card-controller',
	);
	flipCardControllers.forEach((flipCardController) => {
		const flipCardSides = flipCardController.querySelectorAll(
			'.wp-block-prc-block-flip-card-side',
		);
		flipCardSides.forEach((flipCardSide) => {
			flipCardSide.addEventListener('click', (event) => {
				// Do nothing when clicking on links.
				if ('A' === event.target.tagName) {
					return;
				}
				event.preventDefault();
				flipCardController.classList.toggle('is-flipped');
			});
		});
	});
});
