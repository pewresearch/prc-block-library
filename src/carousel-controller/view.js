/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
	withSyncEvent,
} from '@wordpress/interactivity';

const { state, actions } = store('prc-block/carousel-controller', {
	state: {
		lastScrollY: 0,
		scrollLocking: false,
		bodyObj: null,
		hasEngaged: false,
		scrollLockTimeout: null,
		wheelTimeout: null,
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
				.querySelector('.prc-block-carousel-controller__track__inner');
		},
		get hasNextSlide() {
			const { slideIndex, count } = getContext();
			return slideIndex < count - 1;
		},
		get hasPreviousSlide() {
			const { slideIndex } = getContext();
			return slideIndex > 0;
		},
		get trackStyle() {
			const { containerMinHeight } = getContext();
			return `min-height: ${containerMinHeight}px;`;
		},
		get isActive() {
			const { index, slideIndex } = getContext();
			return index === slideIndex;
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
			const context = getContext();
			const { dot } = context;
			const { index } = dot;
			actions.navigateToSlide(index);
		},
		goToNextSlide: () => {
			const context = getContext();
			const { count, slideIndex } = context;
			const nextIndex = count === slideIndex + 1 ? 0 : slideIndex + 1;
			actions.navigateToSlide(nextIndex);
		},
		goToPreviousSlide: () => {
			const context = getContext();
			const { slideIndex, count } = context;
			const previousIndex = slideIndex === 0 ? count - 1 : slideIndex - 1;
			actions.navigateToSlide(previousIndex);
		},
		resetCarousel: () => {
			actions.navigateToSlide(0);
		},
	},
	callbacks: {
		onInit: () => {
			const { track } = state;
			const context = getContext();
			const { orientation, count } = context;

			// Get all the heights of the slides, wp-block-prc-block-carousel-slide and set the context.minHeight to the highest height
			const slides = track.querySelectorAll(
				'.wp-block-prc-block-carousel-slide'
			);

			const isVertical = orientation === 'vertical';
			state.bodyObj = document.body;

			// We add a debounced scroll event listend to the track to calculate the current slideIndex value based on the scroll position.
			let scrollTimeout;
			track.addEventListener(
				'scroll',
				withScope(
					withSyncEvent((event) => {
						// Clear existing timeout
						clearTimeout(scrollTimeout);

						// Set new timeout to ensure we get the final position after scroll stops
						scrollTimeout = setTimeout(() => {
							// Get container and content dimensions based on orientation
							const containerSize = isVertical
								? track.clientHeight
								: track.clientWidth;
							const contentSize = isVertical
								? track.scrollHeight
								: track.scrollWidth;
							const scrollPos = isVertical
								? track.scrollTop
								: track.scrollLeft;

							// Calculate progress as a percentage (0 to 1)
							const maxScroll = contentSize - containerSize;
							const progress = maxScroll
								? scrollPos / maxScroll
								: 0;

							// Calculate slide index from progress
							const slideIndex = Math.round(
								progress * (count - 1)
							);

							// Ensure index is within bounds
							const boundedIndex = Math.max(
								0,
								Math.min(slideIndex, count - 1)
							);

							context.slideIndex = boundedIndex;
						}, 10);
					})
				)
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
		onMouseEnter: withSyncEvent(() => {
			const context = getContext();
			console.log('onMouseEnter::', context);
			context.isSelected = true;
		}),
		onMouseLeave: withSyncEvent(() => {
			const context = getContext();
			console.log('onMouseLeave::', context);
			context.isSelected = false;
		}),
		onCoverFinalSideDisable: () => {
			const { ref } = getElement();
			const context = getContext();
			const { slideIndex, count } = context;
			const cover = ref.closest('.wp-block-cover');
			if (cover && slideIndex === count - 1) {
				context.enabled = false;
			}
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
				// On the way out, set engaged to false
				if (coverBottom <= 0 || coverTop >= window.innerHeight) {
					setTimeout(
						withScope(() => {
							state.hasEngaged = false;
							actions.resetCarousel();
						}),
						2000
					);
				}
				state.lastScrollY = window.scrollY;
			}
		},
	},
});
