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
				if (0 > carouselTop && false === window.carouselActivated) {
					console.log("ACTIVE");
					carousel.classList.add('active');
					window.carouselActivated = true;
				}
			});

			carousel.addEventListener('scroll', () => {
				const lastCarouselSlideTop =
					lastCarouselSlide.getBoundingClientRect().top;
				console.log(
					'lastCarouselSlide:',
					lastCarouselSlide,
					lastCarouselSlideTop,
				);
				if (0 > lastCarouselSlideTop) {
					carousel.classList.remove('active');
				}
			});
		});
	}
});
