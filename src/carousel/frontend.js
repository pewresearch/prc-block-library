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
	debug: false,
	watched: [],
	activated: [],
	thresholds: {
		carousel: [0.7, 0.9],
		lastSlide: [0.9],
		firstSlide: [0.9],
	},
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

function activateCarousel(id, elm) {
	if (id && !window.prcBlocks.carouselBlocks.activated.includes(id)) {
		window.prcBlocks.carouselBlocks.activated.push(id);

		// If not on mobile or if the url doesnt have a hash then lock the body:
		if (!window.location.hash) {
			window.prcBlocks.carouselBlocks.toggleBodyLock(true);
		}

		// Finally, allow the carousel to scroll it's contents:
		elm.classList.add('active');

		if (window.prcBlocks.carouselBlocks.debug) {
			console.warn('Activating carousel:', id);
		}
	}
}

function deactivateCarousel(carouselBlock, stage = 1) {
	if (!carouselBlock) {
		console.warn('No carousel block found to deactivate.');
	}

	const id = carouselBlock.getAttribute('id');

	if (1 === stage) {
		window.prcBlocks.carouselBlocks.toggleBodyLock(false);
		carouselBlock.classList.remove('active');
	}

	if (2 === stage) {
		window.prcBlocks.carouselBlocks.activated =
			window.prcBlocks.carouselBlocks.activated.filter((ID) => ID !== id);
	}

	if (window.prcBlocks.carouselBlocks.debug) {
		console.warn(`Deactivating Carousel (Stage: ${stage})`, id);
	}
}

function snapFirstCoverCarousel(timer = 800) {
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
				}, timer);
			}
		}
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
		const { intersectionRatio, target } = change;
		const { id } = target;
		const scrollingDirection = getScrollingDirection(change);

		if (window.prcBlocks.carouselBlocks.debug) {
			console.log(
				'observing change...',
				change,
				change.target.classList,
				intersectionRatio,
				scrollingDirection,
				id,
			);
		}

		if (
			0.8 >= intersectionRatio &&
			('scrolling-down-enter' === scrollingDirection ||
				'scrolling-up-enter' === scrollingDirection) &&
			!window.prcBlocks.carouselBlocks.activated.includes(id)
		) {
			console.log("Just entered the carousel's viewport.");
		}

		if (
			0.8 <= intersectionRatio &&
			'scrolling-down-enter' === scrollingDirection &&
			!window.prcBlocks.carouselBlocks.activated.includes(id)
		) {
			activateCarousel(id, change.target);
		}

		if (
			0.8 <= intersectionRatio &&
			'scrolling-down-leave' === scrollingDirection &&
			window.prcBlocks.carouselBlocks.activated.includes(id)
		) {
			deactivateCarousel(change.target, 2);
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

		if (
			'scrolling-down-enter' === scrollingDirection &&
			0.5 <= intersectionRatio
		) {
			deactivateCarousel(carouselBlock, 1);
			if (window.prcBlocks.carouselBlocks.debug) {
				console.warn(
					`This is exiting the carousel 'scrolling-down-enter' -> deactivating carousel:`,
					id,
					change,
				);
			}
		}

		if ('scrolling-up-enter' === scrollingDirection) {
			if (window.prcBlocks.carouselBlocks.debug) {
				console.warn(
					`This is re-entering the carousel 'scrolling-up-enter' -> reactivating carousel:`,
					id,
					change,
				);
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
			deactivateCarousel(carouselBlock, 1);
			if (window.prcBlocks.carouselBlocks.debug) {
				console.log(
					"This is existing the carousel 'scrolling-up-enter' ->",
					change,
					window.prcBlocks,
				);
			}
		}
	});
}

/**
 * Watches for active carousel and then snaps the cover block into view.
 * @param {*} mutationList
 * @param {*} observer
 */
function useActiveCarouselEffect(mutationList) {
	mutationList.forEach((mutation) => {
		if (
			'attributes' === mutation.type &&
			'class' === mutation.attributeName &&
			mutation.target.classList.contains('active')
		) {
			const coverBlock = mutation.target.parentElement.parentElement;
			if (window.prcBlocks.carouselBlocks.debug) {
				console.warn('Snapping to top of cover block...', coverBlock);
			}
			setTimeout(() => {
				coverBlock.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 200);
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

	/**
	 * Initialize Observers:
	 */

	const carouselObserver = new IntersectionObserver(carouselObserverCallback, {
		threshold: window.prcBlocks.carouselBlocks.thresholds.carousel,
	});

	// This may seem overkill but I found performance wise it was better to watch for the class change and then initiate a manual scroll.
	const isCarouselActiveObserver = new MutationObserver(
		useActiveCarouselEffect,
	);

	/**
	 * Watches the last carousel slide and when in view depending on scroll position will unlock the carousel or re-lock it.
	 */
	const lastCarouselSlideObserver = new IntersectionObserver(
		lastCarouselSlideCallback,
		{
			threshold: window.prcBlocks.carouselBlocks.thresholds.lastSlide,
		},
	);

	/**
	 * Watches the first carousel slide (when scrolling back up) and will unlock the carousel.
	 */
	const firstCarouselSlideObserver = new IntersectionObserver(
		firstCarouselSlideCallback,
		{
			threshold: window.prcBlocks.carouselBlocks.thresholds.firstSlide,
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
			snapFirstCoverCarousel(800);
		}
	}
});
