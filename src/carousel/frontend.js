/* eslint-disable no-undef */
/** External Dependencies */
import { randomId } from '@prc-app/shared';
import { Splide } from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

// eslint-disable-next-line no-prototype-builtins
if (!window.hasOwnProperty('prcBlocks')) {
	window.prcBlocks = {};
}
window.prcBlocks.carouselBlocks = {
	debug: false,
	watched: [],
	toggleBodyLock: (enable = true) => {
		const body = document.querySelector('body');
		if (true === enable) {
			body.classList.add('carousel-locked');
		} else {
			body.classList.remove('carousel-locked');
		}
	},
};

/**
 * Helper Functions:
 */

function getScrollingDirection(changeEvent) {
	// if not in watched list then return  null.
	if (
		!window.prcBlocks.carouselBlocks.watched.some(
			(e) => e.id === changeEvent.target.id,
		)
	) {
		return null;
	}

	const currentY = changeEvent.boundingClientRect.y;
	const { isIntersecting, intersectionRatio, target } = changeEvent;
	const currentRatio = intersectionRatio;
	const { id } = target;

	const previousY = window.prcBlocks.carouselBlocks.watched.find(
		(e) => e.id === id,
	).y;

	const previousRatio = window.prcBlocks.carouselBlocks.watched.find(
		(e) => e.id === id,
	).ratio;

	let direction = null;

	// Scrolling down/up
	if (currentY < previousY) {
		if (currentRatio > previousRatio && isIntersecting) {
			direction = 'scrolling-down-enter';
		} else {
			direction = 'scrolling-down-leave';
		}
	} else if (currentY > previousY && isIntersecting) {
		if (currentRatio < previousRatio) {
			direction = 'scrolling-up-leave';
		} else {
			direction = 'scrolling-up-enter';
		}
	}

	window.prcBlocks.carouselBlocks.watched.find((e) => e.id === id).y = currentY;
	window.prcBlocks.carouselBlocks.watched.find((e) => e.id === id).ratio =
		currentRatio;

	return direction;
}

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

function unlockCarousel(entry, isMobile) {
	if (!isMobile) {
		window.prcBlocks.carouselBlocks.toggleBodyLock(true);
	}
	// Little hack to snap the carousel into the viewport fully.
	setTimeout(() => {
		entry.target.parentElement.parentElement.scrollIntoView(true);
	}, 200);
	const index = window.prcBlocks.carouselBlocks.watched.findIndex(
		(e) => e.id === entry.target.id,
	);
	window.prcBlocks.carouselBlocks.watched[index].enabled = true;
	console.warn('unlockCarousel: ', entry);
}

function lockCarousel(id, isMobile) {
	if (!isMobile) {
		window.prcBlocks.carouselBlocks.toggleBodyLock(false);
	}
	const index = window.prcBlocks.carouselBlocks.watched.findIndex(
		(e) => e.id === id,
	);
	window.prcBlocks.carouselBlocks.watched[index].enabled = false;
	console.warn('lockCarousel: ', id);
}

/**
 * Initialize Carousel(s):
 */

function initCarousel(id, elm, isMobile) {
	// Setup classes...
	const innerGroupBlocks = elm.querySelectorAll(
		'ul.splide__list > .wp-block-group',
	);
	innerGroupBlocks.forEach((block) => {
		block.classList.add('splide__slide');
	});

	const isHorizontal = elm.classList.contains('horizontal');
	const height = elm.offsetHeight;

	const opts = {
		direction: !isHorizontal ? 'ttb' : 'rtl',
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

	if (window.prcBlocks.carouselBlocks.debug) {
		console.warn(
			'Carousel initialized:',
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
			console.log('Scrolling...', enabled);
			if (!enabled) {
				e.stopPropagation();
			}
		},
		{ capture: true, passive: true },
	);

	// window.addEventListener('scroll', (e) => {
	// 	const { enabled } = window.prcBlocks.carouselBlocks.watched.find(
	// 		(a) => a.id === id,
	// 	);
	// 	if (!enabled && isMobile) {
	// 		carousel.Components.Drag.disable(true);
	// 	}
	// 	if (enabled && isMobile) {
	// 		carousel.Components.Drag.disable(false);
	// 	}
	// });

	// Disallow drag while the carousel is not enabled, on mobile:
	if (
		isMobile &&
		!window.prcBlocks.carouselBlocks.watched.find((a) => a.id === id).enabled
	) {
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
		unlockCarousel(entry, isMobile);
		if (isMobile) {
			carousel.Components.Drag.disable(false);
		}
	});
}

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');
	const carouselBlocks = Array.from(carousels);
	const isMobile = carouselBlocks.some((e) => e.getAttribute('data-is-mobile'));

	if (carousels.length) {
		carousels.forEach((carousel) => {
			// Track elements:
			const carouselId = randomId();
			carousel.setAttribute('id', carouselId);
			initCarousel(carouselId, carousel, isMobile);
		});
	}
});
