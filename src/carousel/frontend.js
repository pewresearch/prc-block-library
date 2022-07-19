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
					!window.prcBlocks.carouselBlocks.activated.includes(ID)
				) {
					// If window href has a hash, scroll to it.
					if (window.location.hash) {
						// Hash found, don't lock the scroll.
					}
					carousel.classList.add('active');
					document.querySelector('body').classList.add('carousel-locked');

					console.log('Carousel locked', carousel, carouselTop);

					if (!window.prcBlocks.carouselBlocks.activated.includes(ID)) {
						window.prcBlocks.carouselBlocks.activated.push(ID);
					}
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
				if (
					0 >= lastCarouselSlideTop &&
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
