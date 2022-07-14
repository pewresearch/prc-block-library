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



domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');

	if (carousels.length) {
		carousels.forEach((carousel) => {
			// // add "swiper-slide" class to each .wp-block-group element
			// const slides = carousel
			// 	.querySelector('.swiper-wrapper')
			// 	.querySelectorAll(':scope > .wp-block-group');
			// slides.forEach((slide) => {
			// 	slide.classList.add('swiper-slide');
			// });

			// eslint-disable-next-line no-new
			// new Swiper(carousel, {
			// 	direction: 'vertical',
			// 	mousewheel: true,
			// });
		});
	}
});
