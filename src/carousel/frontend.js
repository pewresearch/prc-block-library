/* eslint-disable no-undef */
/** External Dependencies */
import { randomId } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

// eslint-disable-next-line no-prototype-builtins
if (!window.hasOwnProperty('prcBlocks')) {
	window.prcBlocks = {};
}
window.prcBlocks.carouselBlocks = {
	activated: [],
	reset: [],
};

const resetAll = () => {
	window.prcBlocks.carouselBlocks.activated.forEach((id) => {
		const elm = document.getElementById(id);
		if (elm) {
			elm.classList.remove('active');
		}
	});
	window.prcBlocks.carouselBlocks.activated = [];
};

const toggleBodyLock = (enable = true) => {
	const body = document.querySelector('body');
	if (true === enable) {
		body.classList.add('carousel-locked');
	} else {
		body.classList.remove('carousel-locked');
	}
};

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');

	if (carousels.length) {
		carousels.forEach((carousel) => {
			const ID = randomId();
			// Assign a random id to each carousel
			carousel.setAttribute('id', ID);
			const isMobile = carousel.getAttribute('data-is-mobile');
			const firstCarouselSlide = carousel.querySelector(
				':scope > .wp-block-group:first-child',
			);
			const lastCarouselSlide = carousel.querySelector(
				':scope > .wp-block-group:last-child',
			);
			const carouselCoverBlock = carousel.parentElement.parentElement;
			const viewportHeight = window.innerHeight;
			const threshold = Math.round(viewportHeight / 8);

			// Watch for scrolling on the document to activate the carousel.
			window.addEventListener('scroll', () => {
				const carouselTop = carousel.getBoundingClientRect().top;
				const carouselHeight = carousel.getBoundingClientRect().height;

				console.log('carouselTop:', {
					carouselTop,
					carouselHeight,
					viewportHeight,
				});


				if (
					0 >= carouselTop &&
					-25 <= carouselTop &&
					!window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					// Signal the carousel is active.
					if (
						!window.prcBlocks.carouselBlocks.activated.includes(ID) ||
						window.prcBlocks.carouselBlocks.reset.includes(ID)
					) {
						window.prcBlocks.carouselBlocks.activated.push(ID);
					}

					// If not on mobile or if the url doesnt have a hash then lock the body.
					if (!window.location.hash) {
						toggleBodyLock(true);
					}

					// Force the carousel's cover block into view
					if (true != isMobile) {
						carouselCoverBlock.scrollIntoView();
					}

					// Allow scrolling inside the carousel:
					carousel.classList.add('active');
				}

				// If the carousel's bottom has left the viewport then deactivate it and queue it up for its next iteration back through.
				if (
					carouselHeight <= Math.round(Math.abs(carouselTop)) &&
					window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					window.prcBlocks.carouselBlocks.activated =
						window.prcBlocks.carouselBlocks.activated.filter((id) => id !== ID);

					window.prcBlocks.carouselBlocks.reset.push(ID);
					// This concludes iteration zero.
				}
			});

			// Watch scrolling INSIDE the carousel, when we reach the last slide (down, iteration 0) or first slide (up, iteration 1) and unlock the DOM.
			carousel.addEventListener('scroll', () => {
				const firstCarouselSlideTop =
					firstCarouselSlide.getBoundingClientRect().top;
				const lastCarouselSlideTop =
					lastCarouselSlide.getBoundingClientRect().top;

				console.log('slideTops:', [
					{
						lastCarouselSlideTop,
						threshold,
					},
					{
						firstCarouselSlideTop,
						threshold,
					},
				]);

				const isIterationZero =
					threshold >= lastCarouselSlideTop &&
					window.prcBlocks.carouselBlocks.activated.includes(ID);
				const isIterationOne =
					0 >= firstCarouselSlideTop &&
					-25 <= firstCarouselSlideTop &&
					window.prcBlocks.carouselBlocks.reset.includes(ID);

				if (isIterationZero || isIterationOne) {
					toggleBodyLock(false);
					carousel.classList.remove('active');

					if (isIterationOne) {
						// This concludes iteration one.
						window.prcBlocks.carouselBlocks.reset =
							window.prcBlocks.carouselBlocks.reset.filter((id) => id !== ID);
						// Reset to iteration zero.
						window.prcBlocks.carouselBlocks.activated =
							window.prcBlocks.carouselBlocks.activated.filter(
								(id) => id !== ID,
							);
					}
				}
			});
		});
	}
});
