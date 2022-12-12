/* eslint-disable no-undef */
/** External Dependencies */
import { randomId } from '@prc/functions';
import { Splide } from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './style.scss';
import '@splidejs/splide/css';

// eslint-disable-next-line no-prototype-builtins
if (!window.hasOwnProperty('prcBlocks')) {
	window.prcBlocks = {};
}
window.prcBlocks.carouselBlocks = {
	debug: true,
	isMobile: false,
	watched: [],
	toggleBodyLock: (enable = true) => {
		const body = document.querySelector('body');
		if (true === enable) {
			body.classList.add('carousel-locked');
		} else {
			body.classList.remove('carousel-locked');
		}
	},
	unlockCarousel: (id) => {
		const elm = document.getElementById(id);
		const index = window.prcBlocks.carouselBlocks.watched.findIndex(
			(e) => e.id === id,
		);
		const { isMobile } = window.prcBlocks.carouselBlocks;
		const { controller } = window.prcBlocks.carouselBlocks.watched[index];
		if (!isMobile) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(true);
		} else {
			controller.Components.Drag.disable(false);
		}

		// Little hack to snap the carousel into the viewport fully.
		setTimeout(() => {
			elm.parentElement.parentElement.scrollIntoView(true);
		}, 200);

		window.prcBlocks.carouselBlocks.watched[index].enabled = true;
	},
	lockCarousel: (id) => {
		const index = window.prcBlocks.carouselBlocks.watched.findIndex(
			(e) => e.id === id,
		);
		const { isMobile } = window.prcBlocks.carouselBlocks;
		const { controller } = window.prcBlocks.carouselBlocks.watched[index];
		if (!isMobile) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(false);
		} else {
			controller.Components.Drag.disable(true);
		}
		window.prcBlocks.carouselBlocks.watched[index].enabled = false;
	},
};

/**
 * Helper Functions:
 */

function watch(id, controller = null) {
	// If the element is not in the watched list, then add it.
	if (!window.prcBlocks.carouselBlocks.watched.some((e) => e.id === id)) {
		window.prcBlocks.carouselBlocks.watched.push({
			id,
			y: 0, // When we add horizontal support we need to add X.
			ratio: 0,
			enabled: false,
			controller,
		});
	}
}

/**
 * Initialize Carousel(s):
 */

function initVerticalCarousel(id, elm) {
	// Setup classes...
	const { lockCarousel, unlockCarousel, isMobile, debug } =
		window.prcBlocks.carouselBlocks;
	const height = elm.offsetHeight;

	const opts = {
		direction: 'ttb',
		height,
		arrows: false,
		wheel: true,
		waitForTransition: true,
		wheelSleep: 700,
		speed: 700,
		releaseWheel: true,
		intersection: {
			threshold: 0.95,
		},
	};
	const carousel = new Splide(elm, opts);

	// Mount the carousel, the intersection extension and watch the carousel.
	carousel.mount({ Intersection });
	watch(id, carousel);

	if (debug) {
		console.warn(
			'Carousel (vertical) initialized:',
			carousel,
			window.prcBlocks.carouselBlocks,
		);
	}

	const numberOfSlides = carousel.length;

	// Disallow scrolling while the carousel is not enabled:
	carousel.root.addEventListener(
		'wheel',
		(e) => {
			const { enabled } = window.prcBlocks.carouselBlocks.watched.find(
				(a) => a.id === id,
			);
			if (!enabled) {
				e.stopPropagation();
			}
		},
		{ capture: true, passive: true },
	);

	// On carousel init, on mobile, disable initial drag ability.
	if (isMobile) {
		carousel.Components.Drag.disable(true);
	}

	// If we are on the first slide and the carousel is enabled OR
	// if this is the last slide then lock the carousel so the user can continue on with the page:
	carousel.on('active', (slide) => {
		const { index } = slide;
		const { enabled } = window.prcBlocks.carouselBlocks.watched.find(
			(a) => a.id === id,
		);
		if ((0 === index && enabled) || numberOfSlides === index + 1) {
			lockCarousel(id, isMobile);
		}
	});

	// When the user scrolls into the carousel unlock it:
	carousel.on('intersection:in', (entry) => {
		unlockCarousel(id, isMobile, entry);
	});
}

function initHorizontalCarousel(id, elm) {
	const { debug } = window.prcBlocks.carouselBlocks;
	// const height = elm.offsetHeight;

	const opts = {
		direction: 'ltr',
		autoHeight: true,
		arrows: true,
		wheel: false,
		waitForTransition: true,
		speed: 700,
	};
	const carousel = new Splide(elm, opts);

	// Mount the carousel and add it to watch list.
	watch(id, carousel);
	carousel.mount();

	if (debug) {
		console.warn(
			'Carousel (horizontal) initialized:',
			carousel,
			window.prcBlocks.carouselBlocks,
		);
	}
}

domReady(() => {
	const carousels = document.querySelectorAll(
		'.wp-block-prc-block-carousel-controller',
	);
	const carouselBlocks = Array.from(carousels);
	// eslint-disable-next-line prettier/prettier
	window.prcBlocks.carouselBlocks.isMobile = carouselBlocks.some((e) => e.getAttribute('data-is-mobile'));

	if (carousels.length) {
		carousels.forEach((carousel) => {
			// Track elements:
			const carouselId = randomId();
			carousel.setAttribute('id', carouselId);

			const slideBlocks = carousel.querySelectorAll(
				'ul.splide__list > .wp-block-prc-block-carousel-slide',
			);
			slideBlocks.forEach((block) => {
				block.classList.add('splide__slide');
			});

			const isHorizontal = carousel.classList.contains('is-style-horizontal');
			if (isHorizontal) {
				initHorizontalCarousel(carouselId, carousel);
			} else {
				initVerticalCarousel(carouselId, carousel);
			}
		});
	}
});
