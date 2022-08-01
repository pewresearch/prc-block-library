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
	watched: [],
	activated: [],
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

	console.log('getScrollingDirection', changeEvent, id);

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

function activateCarousel(id, elm) {
	const coverBlock = elm.parentElement.parentElement;
	if (id && !window.prcBlocks.carouselBlocks.activated.includes(id)) {
		window.prcBlocks.carouselBlocks.activated.push(id);

		// scroll coverblock into view:
		coverBlock.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		// If not on mobile or if the url doesnt have a hash then lock the body:
		if (!window.location.hash) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(true);
		}

		// Finally, allow the carousel to scroll it's contents:
		elm.classList.add('active');

		console.warn('activating carousel', id);
	}
}

function deactivateCarousel(id) {
	// Filter out current carousel.
	window.prcBlocks.carouselBlocks.activated =
		window.prcBlocks.carouselBlocks.activated.filter((ID) => ID !== id);

	console.warn('deactivating carousel', id);
}

// Initialize watch definition:
function watch(id) {
	// If the element is not in the watched list, then add it.
	if (!window.prcBlocks.carouselBlocks.watched.some((e) => e.id === id)) {
		window.prcBlocks.carouselBlocks.watched.push({
			id,
			y: 0, // When we add horizontal support we need to add X.
			ratio: 0,
		});
	}
}

/**
 * Observer Callbacks:
 */

function carouselObserverCallback(entry) {
	entry.forEach((change) => {
		const { id } = change.target;
		const scrollingDirection = getScrollingDirection(change);

		console.log(
			'observing change...',
			change,
			change.target.classList,
			scrollingDirection,
			id,
		);

		if (
			'scrolling-down-enter' === scrollingDirection &&
			!window.prcBlocks.carouselBlocks.activated.includes(id)
		) {
			activateCarousel(id, change.target);
		}

		if (
			'scrolling-down-leave' === scrollingDirection &&
			window.prcBlocks.carouselBlocks.activated.includes(id)
		) {
			deactivateCarousel(id);
		}
	});
}

function lastCarouselSlideCallback(entry) {
	entry.forEach((change) => {
		const { id } = change.target;
		const carouselBlock = change.target.parentElement;
		const scrollingDirection = getScrollingDirection(change);

		const boundingClientRectHeight = change.boundingClientRect.height;
		const intersectClientRectHeight = change.intersectionRect.height;
		const intersectionRatio =
			intersectClientRectHeight / boundingClientRectHeight;

		if ('scrolling-down-enter' === scrollingDirection) {
			console.log("Last Carousel Slide :: 'scrolling-down-enter' ->", change);
			if (0.89 <= intersectionRatio) {
				console.log(
					"This is exiting the carousel :: 'scrolling-down-enter' ->",
					change,
				);
				window.prcBlocks.carouselBlocks.toggleBodyLock(false);
				carouselBlock.classList.remove('active');
				console.warn('releasing carousel lock');
			}
		}

		if ('scrolling-up-enter' === scrollingDirection) {
			console.log("Last Carousel Slide :: 'scrolling-up-enter' ->", change);
			console.warn('re-activating carousel lock');
			// As we go back through the carousel by enterting the last slide by scrolling up we need to reset the body.
			activateCarousel(id, carouselBlock);
		}

		if ('scrolling-down-leave' === scrollingDirection) {
			console.log("Last Carousel Slide :: 'scrolling-down-leave' ->", change);
		}
		if ('scrolling-up-leave' === scrollingDirection) {
			console.log("Last Carousel Slide :: 'scrolling-up-leave' ->", change);
		}
	});
}

function firstCarouselSlideCallback(entry) {
	entry.forEach((change) => {
		const carouselBlock = change.target.parentElement;
		const scrollingDirection = getScrollingDirection(change);
		if ('scrolling-up-enter' === scrollingDirection) {
			console.log("First Carousel Slide :: 'scrolling-up-enter' ->", change);
			window.prcBlocks.carouselBlocks.toggleBodyLock(false);
			carouselBlock.classList.remove('active');
			console.warn('de-activating carousel lock');
		}
	});
}

/**
 * Initialize Carousels:
 */

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');

	/**
	 * Initialize Observers:
	 */

	const carouselObserver = new IntersectionObserver(carouselObserverCallback, {
		threshold: [0.95],
	});

	const lastCarouselSlideObserver = new IntersectionObserver(
		lastCarouselSlideCallback,
		{
			threshold: [0.9],
		},
	);

	const firstCarouselSlideObserver = new IntersectionObserver(
		firstCarouselSlideCallback,
		{
			threshold: [0.9],
		},
	);

	if (carousels.length) {
		carousels.forEach((carousel) => {
			const firstCarouselSlide = carousel.querySelector(
				':scope > .wp-block-group:first-child',
			);
			const lastCarouselSlide = carousel.querySelector(
				':scope > .wp-block-group:last-child',
			);

			// Track elements:
			const carouselId = randomId();
			carousel.setAttribute('id', carouselId);
			watch(carouselId);

			const firstCarouselSlideId = randomId();
			firstCarouselSlide.setAttribute('id', firstCarouselSlideId);
			watch(firstCarouselSlideId);

			const lastCarouseSlideId = randomId();
			lastCarouselSlide.setAttribute('id', lastCarouseSlideId);
			watch(lastCarouseSlideId);

			// Watch inner workings...
			carouselObserver.observe(carousel);
			lastCarouselSlideObserver.observe(lastCarouselSlide);
			firstCarouselSlideObserver.observe(firstCarouselSlide);
		});
	}
});
