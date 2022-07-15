/**
 * External Dependencies
 */
// import Swiper from 'swiper';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';

window.carouselActivated = false;

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');

	if (carousels.length) {
		carousels.forEach((carousel) => {
			const lastCarouselSlide = carousel.querySelector(
				':scope > .wp-block-group:last-child',
			);

			// Watch for scrolling on the document to activate the carousel.
			window.addEventListener('scroll', () => {
				const carouselTop = carousel.getBoundingClientRect().top;
				const carouselHeight = carousel.getBoundingClientRect().height;
				if (0 > carouselTop && false === window.carouselActivated) {
					carousel.classList.add('active');
					document.querySelector('body').classList.add('carousel-locked');
					window.carouselActivated = true;
				}
				// If the carousel is scrolled to the bottom and out of view then reset the scroll position.
				if (
					carouselHeight <= Math.round(Math.abs(carouselTop)) &&
					window.carouselActivated
				) {
					carousel.scrollTop = 0;
				}
			});

			// Watch scrolling INSIDE the carousel, when we reach the last slide unlock everything and reset the carousel scroll position to the top.
			carousel.addEventListener('scroll', () => {
				const lastCarouselSlideTop =
					lastCarouselSlide.getBoundingClientRect().top;
				if (0 > lastCarouselSlideTop) {
					carousel.classList.remove('active');
					document.querySelector('body').classList.remove('carousel-locked');
				}
			});
		});
	}
});
