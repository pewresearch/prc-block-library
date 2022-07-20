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

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');

	if (carousels.length) {
		carousels.forEach((carousel) => {
			const ID = randomId();
			// Assign a random id to each carousel
			carousel.setAttribute('id', ID);

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
					carousel.parentElement.parentElement.scrollIntoView(); // Scroll to the carousel so its perfeclty in the viewport.
					carousel.classList.add('active');
					if (!window.prcBlocks.carouselBlocks.activated.includes(ID)) {
						window.prcBlocks.carouselBlocks.activated.push(ID);
					}

					if (!window.location.hash) {
						document.querySelector('body').classList.add('carousel-locked');
					}

					console.log('Carousel locked', carousel, carouselTop);
				}

				// If the carousel is scrolled to the bottom and out of view then reset the scroll position.
				if (
					carouselHeight <= Math.round(Math.abs(carouselTop)) &&
					window.prcBlocks.carouselBlocks.activated.includes(ID) &&
					'true' !== carousel.getAttribute('data-carousel-viewed')
				) {
					console.log('Carousel reset', ID);

					carousel.scrollTop = 0;
					carousel.setAttribute('data-carousel-viewed', 'true');
				}
			});

			// Watch scrolling INSIDE the carousel, when we reach the last slide unlock the DOM.
			carousel.addEventListener('scroll', () => {
				const lastCarouselSlideTop =
					lastCarouselSlide.getBoundingClientRect().top;

				console.log("Last Carousel Slide Location:", lastCarouselSlideTop);
				if (
					50 >= lastCarouselSlideTop &&
					window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					console.log('Carousel unlocked', ID);

					carousel.classList.remove('active');
					document.querySelector('body').classList.remove('carousel-locked');
				}
			});
		});
	}
});
