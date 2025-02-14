/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
} from '@wordpress/interactivity';

const { state, actions } = store('prc-block/carousel-controller', {
	state: {
		lastScrollY: 0,
		scrollLocking: false,
		bodyObj: null,
		hasEngaged: false,
		scrollLockTimeout: null,
		get isInsideCover() {
			const { ref } = getElement();
			const x = ref.closest('.wp-block-cover');
			return x !== null;
		},
		get coverRef() {
			const { ref } = getElement();
			return ref.closest('.wp-block-cover');
		},
		get isVertical() {
			return getContext().orientation === 'vertical';
		},
		get track() {
			const { id } = getContext();
			return document
				.getElementById(id)
				.querySelector('.prc-block-carousel-controller__track');
		},
	},
	actions: {
		navigateToSlide: (index) => {
			const { track, isVertical } = state;
			getContext().slideIndex = index;
			track.scrollTo({
				[isVertical ? 'top' : 'left']: index * track.offsetWidth,
				behavior: 'smooth',
			});
		},
		goToDot: () => {
			const { attributes } = getElement();
			const index = parseInt(attributes['data-slide-index'], 10);
			actions.navigateToSlide(index);
		},
		goToNextSlide: () => {
			const context = getContext();
			const { count, slideIndex } = context;
			const nextIndex = Math.min(slideIndex + 1, count - 1);
			actions.navigateToSlide(nextIndex);
		},
		goToPreviousSlide: () => {
			const context = getContext();
			const { slideIndex } = context;
			const previousIndex = Math.max(slideIndex - 1, 0);
			actions.navigateToSlide(previousIndex);
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { orientation, count } = context;

			console.log(context);

			const isVertical = orientation === 'vertical';
			state.bodyObj = document.body;

			const _track = ref.querySelector(
				'.prc-block-carousel-controller__track'
			);

			// Add scroll event listener with debounce
			let scrollTimeout;
			_track.addEventListener(
				'scroll',
				withScope((event) => {
					// Clear existing timeout
					clearTimeout(scrollTimeout);

					// Set new timeout to ensure we get the final position after scroll stops
					scrollTimeout = setTimeout(() => {
						// Get container and content dimensions based on orientation
						const containerSize = isVertical
							? _track.clientHeight
							: _track.clientWidth;
						const contentSize = isVertical
							? _track.scrollHeight
							: _track.scrollWidth;
						const scrollPos = isVertical
							? _track.scrollTop
							: _track.scrollLeft;

						// Calculate progress as a percentage (0 to 1)
						const maxScroll = contentSize - containerSize;
						const progress = maxScroll ? scrollPos / maxScroll : 0;

						// Calculate slide index from progress
						const slideIndex = Math.round(progress * (count - 1));

						// Ensure index is within bounds
						const boundedIndex = Math.max(
							0,
							Math.min(slideIndex, count - 1)
						);

						context.slideIndex = boundedIndex;
					}, 10);
				})
			);

			if (!state.isInsideCover) {
				context.enabled = true;
			}
		},
		isDotActive: () => {
			const context = getContext();
			const { attributes } = getElement();
			const index = parseInt(attributes['data-slide-index'], 10);
			return context.slideIndex === index;
		},
		onCoverScroll: () => {
			const { isInsideCover, coverRef } = state;
			const context = getContext();

			if (isInsideCover) {
				const coverRect = coverRef.getBoundingClientRect();

				// Get the bottom position relative to viewport
				const coverBottom = coverRect.bottom;
				const coverTop = coverRect.top;

				// Enable only when cover is at the top of viewport and scrolling down
				if (
					coverTop <= 0 &&
					coverBottom > 0 &&
					window.scrollY > state.lastScrollY &&
					!state.hasEngaged
				) {
					context.enabled = true;
					state.bodyObj.style.overflow = 'hidden';
					state.hasEngaged = true;

					// Release body lock after 2 seconds
					setTimeout(
						withScope(() => {
							state.bodyObj.style.overflow = 'auto';
						}),
						2000
					);
				}
				// On the way out, set context.enabled to false
				if (coverBottom <= 0 || coverTop >= window.innerHeight) {
					context.enabled = false;
					setTimeout(
						withScope(() => {
							state.hasEngaged = false;
						}),
						2000
					);
				}
				state.lastScrollY = window.scrollY;
			}
		},
	},
});
