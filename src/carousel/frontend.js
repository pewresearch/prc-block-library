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

const DEBUG = true;

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

function activateCarousel(id, elm) {
	if (id && !window.prcBlocks.carouselBlocks.activated.includes(id)) {
		window.prcBlocks.carouselBlocks.activated.push(id);

		// If not on mobile or if the url doesnt have a hash then lock the body:
		if (!window.location.hash) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(true);
		}

		// Finally, allow the carousel to scroll it's contents:
		elm.classList.add('active');

		if (DEBUG) {
			console.warn('activating carousel', id);
		}
	}
}

function deactivateCarousel(id) {
	// Filter out current carousel.
	window.prcBlocks.carouselBlocks.activated =
		window.prcBlocks.carouselBlocks.activated.filter((ID) => ID !== id);

	if (DEBUG) {
		console.warn('deactivating carousel', id);
	}
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

		if (DEBUG) {
			console.log(
				'observing change...',
				change,
				change.target.classList,
				scrollingDirection,
				id,
			);
		}

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

		console.log('intersectionRatio', intersectionRatio);

		if (
			'scrolling-down-enter' === scrollingDirection &&
			0.7 <= intersectionRatio
		) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(false);
			carouselBlock.classList.remove('active');
			if (DEBUG) {
				console.log(
					"This is exiting the carousel :: 'scrolling-down-enter' ->",
					change,
				);
				console.warn('releasing carousel lock');
			}
		}

		if ('scrolling-up-enter' === scrollingDirection) {
			if (DEBUG) {
				console.log("Last Carousel Slide :: 'scrolling-up-enter' ->", change);
				console.warn('re-activating carousel lock');
			}
			activateCarousel(id, carouselBlock);
		}
	});
}

function firstCarouselSlideCallback(entry) {
	entry.forEach((change) => {
		const carouselBlock = change.target.parentElement;
		const scrollingDirection = getScrollingDirection(change);
		if ('scrolling-up-enter' === scrollingDirection) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(false);
			carouselBlock.classList.remove('active');
			if (DEBUG) {
				console.log(
					"First Carousel Slide :: 'scrolling-up-enter' ->",
					change,
					window.prcBlocks,
				);
				console.warn('de-activating carousel lock');
			}
		}
	});
}

/**
 * Initialize Carousels:
 */

domReady(() => {
	const carousels = document.querySelectorAll('.wp-block-prc-block-carousel');
	const carouselBlocks = Array.from(carousels);
	const isMobile = carouselBlocks.some((e) => e.getAttribute('data-is-mobile'));

	console.log('isMobile', isMobile, carouselBlocks);

	/**
	 * Initialize Observers:
	 */

	const carouselObserver = new IntersectionObserver(carouselObserverCallback, {
		threshold: [0.95],
	});

	// This may seem overkill but I found performance wise it was better to watch for the class change and then initiate a manual scroll.
	const isCarouselActiveObserver = new MutationObserver(
		(mutationList, observer) => {
			mutationList.forEach((mutation) => {
				if (
					'attributes' === mutation.type &&
					'class' === mutation.attributeName &&
					mutation.target.classList.contains('active')
				) {
					const coverBlock = mutation.target.parentElement.parentElement;
					if (DEBUG) {
						console.log('Snapping cover block into view:', coverBlock);
					}
					setTimeout(() => {
						coverBlock.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
					}, 300);
				}
			});
		},
	);

	const lastCarouselSlideObserver = new IntersectionObserver(
		lastCarouselSlideCallback,
		{
			threshold: isMobile ? [0.8] : [0.89],
		},
	);

	const firstCarouselSlideObserver = new IntersectionObserver(
		firstCarouselSlideCallback,
		{
			threshold: isMobile ? [0.8] : [0.89],
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
			isCarouselActiveObserver.observe(carousel, {
				attributes: true,
			});
			lastCarouselSlideObserver.observe(lastCarouselSlide);
			firstCarouselSlideObserver.observe(firstCarouselSlide);
		});

		// On mobile, if the first element is a cover block and that block contains a carousel then after a few seconds lets scroll that into view for the user.
		if (isMobile) {
			const postContents = document.querySelector('.post-content');
			if (postContents.firstElementChild.classList.contains('wp-block-cover')) {
				const coverBlock = postContents.firstElementChild;
				if (coverBlock) {
					const carouselBlock = coverBlock.querySelector(
						'.wp-block-prc-block-carousel',
					);
					if (carouselBlock) {
						setTimeout(() => {
							activateCarousel(carouselBlock.id, carouselBlock);
						}, 1000);
					}
				}
			}
		}
	}
});
