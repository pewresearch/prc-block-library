/** External Dependencies */
import { randomId } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

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
}

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

			// Watch for scrolling on the document to activate the carousel.
			window.addEventListener('scroll', () => {
				const carouselTop = carousel.getBoundingClientRect().top;
				const carouselHeight = carousel.getBoundingClientRect().height;

				if (
					0 >= carouselTop &&
					-15 <= carouselTop &&
					!window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					if (true != isMobile) {
						carousel.parentElement.parentElement.scrollIntoView(); // Scroll to the carousel so its perfeclty in the viewport.
					}

					carousel.classList.add('active');
					if (
						!window.prcBlocks.carouselBlocks.activated.includes(ID) ||
						window.prcBlocks.carouselBlocks.reset.includes(ID)
					) {
						window.prcBlocks.carouselBlocks.activated.push(ID);
					}

					if (!window.location.hash && true != isMobile) {
						toggleBodyLock(true);
					}
				}

				// If the carousel is scrolled to the bottom and out of view then reset the scroll position.
				if (
					carouselHeight <= Math.round(Math.abs(carouselTop)) &&
					window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					// carousel.scrollTop = 0;
					window.prcBlocks.carouselBlocks.activated =
						window.prcBlocks.carouselBlocks.activated.filter((id) => id !== ID);

					window.prcBlocks.carouselBlocks.reset.push(ID);
				}
			});

			// Watch scrolling INSIDE the carousel, when we reach the last slide unlock the DOM.
			carousel.addEventListener('scroll', () => {
				const firstCarouselSlideTop =
					firstCarouselSlide.getBoundingClientRect().top;
				const lastCarouselSlideTop =
					lastCarouselSlide.getBoundingClientRect().top;

				if (
					50 >= lastCarouselSlideTop &&
					window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					carousel.classList.remove('active');
					toggleBodyLock(false);
				}

				if (
					0 >= firstCarouselSlideTop &&
					-15 <= firstCarouselSlideTop &&
					window.prcBlocks.carouselBlocks.reset.includes(ID)
				) {
					toggleBodyLock(false);
					carousel.classList.remove('active');
					window.prcBlocks.carouselBlocks.reset =
						window.prcBlocks.carouselBlocks.reset.filter((id) => id !== ID);
				}
			});
		});
	}
});
