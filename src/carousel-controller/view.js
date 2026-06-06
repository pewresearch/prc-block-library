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

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SET_ACTIVE_SLIDE_EVENT = 'prc-carousel-controller:set-active-slide';
const COVERFLOW_MOBILE_BREAKPOINT = 600;

/**
 * Returns how many slides may peek on either side of the active coverflow card.
 * Mobile (<= 600px) shows one neighbor; larger viewports show up to four.
 *
 * @return {number} Peek limit on each side of the active slide.
 */
const getCoverflowPeekLimit = () => {
	if (typeof window === 'undefined') {
		return 4;
	}
	return window.innerWidth <= COVERFLOW_MOBILE_BREAKPOINT ? 1 : 4;
};

/**
 * Reads the resolved view type from context, accepting the legacy
 * `orientation` key for back-compat with content rendered before the rename.
 *
 * @param {Object} context Interactivity context.
 * @return {string} The view type.
 */
const getViewType = (context) =>
	context.viewType || context.orientation || 'horizontal';

/**
 * Positions each coverflow slide relative to the active slide by setting an
 * `--offset` CSS variable the stylesheet uses to build the stacked-card
 * transform. Runs on the frontend only (view.js does not execute in the
 * editor; edit.jsx handles the editor visual separately).
 *
 * @param {HTMLElement} track      The track inner element.
 * @param {number}      slideIndex The active slide index.
 */
const applyCoverflowOffsets = (track, slideIndex) => {
	if (!track) {
		return;
	}
	const peekLimit = getCoverflowPeekLimit();
	const slides = track.querySelectorAll('.wp-block-prc-block-carousel-slide');
	slides.forEach((slide, index) => {
		const offset = index - slideIndex;
		const abs = Math.abs(offset);
		slide.style.setProperty('--offset', String(offset));
		slide.style.setProperty('--abs-offset', String(abs));
		slide.classList.toggle('is-coverflow-hidden', abs > peekLimit);
	});
};

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
			return getViewType(getContext()) === 'vertical';
		},
		get isCoverflow() {
			return getViewType(getContext()) === 'coverflow';
		},
		get currentSlideLabel() {
			return getContext().slideIndex + 1;
		},
		get rootEl() {
			const { id } = getContext();
			return document.getElementById(id);
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
			const { track, isVertical, isCoverflow, rootEl } = state;
			const context = getContext();
			context.slideIndex = index;
			if (isCoverflow) {
				applyCoverflowOffsets(track, index);
			} else {
				track.scrollTo({
					[isVertical ? 'top' : 'left']: index * track.offsetWidth,
					behavior: prefersReducedMotion() ? 'auto' : 'smooth',
				});
			}
			if (rootEl) {
				const { slideIndex, count } = context;
				const liveEl = rootEl.querySelector(
					'.prc-block-carousel-controller__live'
				);
				if (liveEl) {
					liveEl.textContent = `Slide ${slideIndex + 1} of ${count}`;
				}
			}
		},
		setActiveSlide: (index) => {
			const { count } = getContext();
			const slideIndex = Number(index);
			if (!Number.isFinite(slideIndex) || count < 1) {
				return;
			}
			const boundedIndex = Math.max(
				0,
				Math.min(Math.trunc(slideIndex), count - 1)
			);
			actions.navigateToSlide(boundedIndex);
		},
		goToDot: () => {
			const context = getContext();
			const { dot } = context;
			const { index } = dot;
			actions.navigateToSlide(index);
		},
		goToNextSlide: () => {
			const context = getContext();
			const { count, slideIndex, enableRewind = true } = context;
			if (slideIndex >= count - 1) {
				if (!enableRewind) return;
				actions.navigateToSlide(0);
				return;
			}
			actions.navigateToSlide(slideIndex + 1);
		},
		goToPreviousSlide: () => {
			const context = getContext();
			const { count, slideIndex, enableRewind = true } = context;
			if (slideIndex <= 0) {
				if (!enableRewind) return;
				actions.navigateToSlide(count - 1);
				return;
			}
			actions.navigateToSlide(slideIndex - 1);
		},
		resetCarousel: () => {
			actions.navigateToSlide(0);
		},
	},
	callbacks: {
		onInit: () => {
			const { track, rootEl } = state;
			const context = getContext();
			const { count } = context;

			const viewType = getViewType(context);
			const isVertical = viewType === 'vertical';
			const isCoverflow = viewType === 'coverflow';
			state.bodyObj = document.body;

			// Ensure an aria-live region exists for slide-change announcements (R19).
			if (rootEl) {
				let announceEl = rootEl.querySelector(
					'.prc-block-carousel-controller__live'
				);
				if (!announceEl) {
					announceEl = document.createElement('div');
					announceEl.className =
						'prc-block-carousel-controller__live screen-reader-text';
					announceEl.setAttribute('aria-live', 'polite');
					announceEl.setAttribute('aria-atomic', 'true');
					rootEl.appendChild(announceEl);
				}
				rootEl.addEventListener(
					SET_ACTIVE_SLIDE_EVENT,
					withScope(
						withSyncEvent((event) => {
							actions.setActiveSlide(event.detail?.index);
						})
					)
				);
			}

			// Coverflow positions cards via transforms (no scroll snapping), so
			// the scroll-derived index detection is skipped; set the initial
			// stacked layout instead.
			if (isCoverflow) {
				applyCoverflowOffsets(track, context.slideIndex);

				window.addEventListener(
					'resize',
					withScope(
						withSyncEvent(() => {
							applyCoverflowOffsets(track, context.slideIndex);
						})
					)
				);

				// Click-to-navigate for coverflow peeking slides. Uses a
				// delegated handler on the track (controller scope) because
				// 3D hit-testing with preserve-3d doesn't reliably resolve
				// clicks on translateZ-offset slides to those elements.
				track.addEventListener(
					'click',
					withScope(
						withSyncEvent((event) => {
							const slide = event.target.closest(
								'.wp-block-prc-block-carousel-slide'
							);

							if (
								slide &&
								slide.classList.contains('is-active')
							) {
								return;
							}

							if (!slide) {
								// Click landed on the track background (3D
								// hit-test miss); navigate by click position.
								const trackRect = track.getBoundingClientRect();
								const trackCenter =
									trackRect.left + trackRect.width / 2;
								if (event.clientX < trackCenter) {
									actions.goToPreviousSlide();
								} else {
									actions.goToNextSlide();
								}
								return;
							}

							event.preventDefault();
							event.stopPropagation();
							const slides = Array.from(
								track.querySelectorAll(
									'.wp-block-prc-block-carousel-slide'
								)
							);
							const clickedIndex = slides.indexOf(slide);
							if (clickedIndex >= 0) {
								actions.navigateToSlide(clickedIndex);
							}
						})
					)
				);
			} else {
				// We add a debounced scroll event listener to the track to calculate the current slideIndex value based on the scroll position.
				let scrollTimeout;
				track.addEventListener(
					'scroll',
					withScope(
						withSyncEvent(() => {
							clearTimeout(scrollTimeout);
							scrollTimeout = setTimeout(
								withScope(() => {
									const containerSize = isVertical
										? track.clientHeight
										: track.clientWidth;
									const contentSize = isVertical
										? track.scrollHeight
										: track.scrollWidth;
									const scrollPos = isVertical
										? track.scrollTop
										: track.scrollLeft;

									const maxScroll =
										contentSize - containerSize;
									const progress = maxScroll
										? scrollPos / maxScroll
										: 0;

									const slideIndex = Math.round(
										progress * (count - 1)
									);

									const boundedIndex = Math.max(
										0,
										Math.min(slideIndex, count - 1)
									);

									context.slideIndex = boundedIndex;
								}),
								10
							);
						})
					)
				);
			}

			// Wheel navigation: one slide per gesture while hovering the carousel.
			// Skipped inside a wp-block-cover to avoid fighting the cover scroll-jack.
			if (rootEl && !state.isInsideCover) {
				const WHEEL_COOLDOWN_MS = 600;
				rootEl.addEventListener(
					'wheel',
					withScope(
						withSyncEvent((event) => {
							const delta = event.deltaY;
							if (Math.abs(delta) < 1) {
								return;
							}
							if (context.wheelTimeout) {
								event.preventDefault();
								return;
							}
							const { slideIndex, enableRewind = true } = context;
							if (delta > 0) {
								if (slideIndex >= count - 1 && !enableRewind) {
									return;
								}
							} else if (slideIndex <= 0 && !enableRewind) {
								return;
							}
							event.preventDefault();
							if (delta > 0) {
								actions.goToNextSlide();
							} else {
								actions.goToPreviousSlide();
							}
							context.wheelTimeout = setTimeout(
								withScope(() => {
									context.wheelTimeout = null;
								}),
								WHEEL_COOLDOWN_MS
							);
						})
					),
					{ passive: false }
				);
			}

			if (!state.isInsideCover) {
				context.enabled = true;
			}
		},
		isDotActive: () => {
			const context = getContext();
			return context.slideIndex === context.dot.index;
		},
		dotStyle: () => {
			const { dot } = getContext();
			if (!dot || !dot.color) return '';
			return `--prc-carousel-controller-dot-color: ${dot.color};`;
		},
		onMouseEnter: withSyncEvent(() => {
			getContext().isSelected = true;
		}),
		onMouseLeave: withSyncEvent(() => {
			getContext().isSelected = false;
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
