/**
 * WordPress Dependencies
 */

import domReady from '@wordpress/dom-ready';

function initClickHandlers(elm) {
	elm.addEventListener('click', (event) => {
		// Do nothing when clicking on links.
		if ('A' === event.target.tagName) {
			return;
		}
		event.preventDefault();

		const controllerBlock = elm.closest(
			'.wp-block-prc-block-flip-card-controller'
		);

		if (!controllerBlock) {
			return;
		}

		const { flipped } = controllerBlock.dataset;

		controllerBlock.dataset.flipped = 'true' === flipped ? 'false' : 'true';
	});
}

function initFlipCardController(elm) {
	const sides = elm.querySelectorAll('.wp-block-prc-block-flip-card-side');
	const widths = [];
	const heights = [];

	let maxHeight = null;
	let maxWidth = null;

	// find the max height and width of the sides
	sides.forEach((side) => {
		console.log('side...', side, side.offsetWidth, side.offsetHeight);
		widths.push(side.offsetWidth);
		heights.push(side.offsetHeight);
	});

	maxHeight = Math.max(...heights);
	maxWidth = Math.max(...widths);

	// set the height and width of the controller
	elm.style.height = `${maxHeight}px`;
	elm.style.maxWidth = `${maxWidth}px`;

	// Init click handlers that will toggle the "data-flipped" attribute on the controller dom element.
	sides.forEach((side) => {
		side.style.height = `${maxHeight}px`;
		initClickHandlers(side);
	});

	elm.classList.add('is-initialized');
}

domReady(() => {
	const flipCardControllers = document.querySelectorAll(
		'.wp-block-prc-block-flip-card-controller'
	);
	flipCardControllers.forEach((flipCardController) => {
		initFlipCardController(flipCardController);
	});
});
