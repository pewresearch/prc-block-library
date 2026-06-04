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

/**
 * Measure front/back sides under a neutralizer class and update context.minHeight.
 *
 * @param {HTMLElement} controllerEl The flip-card controller element.
 * @param {Object}      context      Interactivity context for this controller.
 * @return {boolean} True when a positive minHeight was computed.
 */
const measureSides = (controllerEl, context) => {
	const innerBlocks = controllerEl.querySelector(
		'.wp-block-prc-block-flip-card-controller__inner-blocks'
	);
	if (!innerBlocks) {
		return false;
	}

	const sides = innerBlocks.querySelectorAll(
		'.wp-block-prc-block-flip-card-side'
	);
	if (!sides.length) {
		return false;
	}

	context.isMeasuring = true;
	controllerEl.classList.add('is-measuring');

	const heights = {};
	sides.forEach((side) => {
		const key = side.classList.contains('is-style-back') ? 'back' : 'front';
		const elementHeight = side.offsetHeight;
		if (elementHeight) {
			heights[key] = Math.max(heights[key] || 0, elementHeight);
		}
	});

	controllerEl.classList.remove('is-measuring');
	context.isMeasuring = false;

	const measuredHeights = Object.values(heights);
	if (!measuredHeights.length) {
		return false;
	}

	const next = Math.max(0, ...measuredHeights);
	if (next > 0 && next !== context.minHeight) {
		context.minHeight = next;
	}

	return next > 0;
};

const storeConfig = {
	state: {
		get isInitialized() {
			const { initialized } = getContext();
			return initialized;
		},
		get isFlipped() {
			const { flipped } = getContext();
			return flipped;
		},
	},
	actions: {
		toggleFlip: withSyncEvent((event) => {
			// Let interactive controls handle their own click instead of
			// flipping the card: a <button>, or a real link (an <a> with a
			// non-empty href). An <a> without an href (e.g. a link-less
			// wp-element-button) is non-navigational, so a click on it should
			// fall through and flip the card like any other content.
			const interactive = event.target.closest('a, button');
			if (interactive) {
				const isButton = 'BUTTON' === interactive.tagName;
				const isLinkWithHref =
					'A' === interactive.tagName &&
					!!interactive.getAttribute('href');
				if (isButton || isLinkWithHref) {
					return;
				}
			}
			const context = getContext();
			context.flipped = !context.flipped;
		}),
	},
	callbacks: {
		onControllerInit() {
			const { ref } = getElement();
			if (!ref) {
				return;
			}

			const context = getContext();
			if (context.fixedHeight > 0) {
				return;
			}

			const innerBlocks = ref.querySelector(
				'.wp-block-prc-block-flip-card-controller__inner-blocks'
			);
			if (!innerBlocks) {
				return;
			}

			if (measureSides(ref, context)) {
				context.initialized = true;
			}

			let rafId = null;

			const observer = new window.ResizeObserver(
				withScope(() => {
					if (context.isMeasuring) {
						return;
					}

					if (rafId) {
						window.cancelAnimationFrame(rafId);
					}
					rafId = window.requestAnimationFrame(
						withScope(() => {
							rafId = null;
							if (measureSides(ref, context)) {
								context.initialized = true;
							}
						})
					);
				})
			);

			observer.observe(innerBlocks);

			return () => {
				if (rafId) {
					window.cancelAnimationFrame(rafId);
				}
				observer.disconnect();
			};
		},
		minHeightStyle() {
			const { fixedHeight, minHeight } = getContext();
			if (fixedHeight > 0) {
				return `${fixedHeight}px`;
			}
			return minHeight ? `${minHeight}px` : '100%';
		},
	},
};

store('prc-block/flip-card-controller', storeConfig);
