/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

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
		onCardSideInit() {
			const { ref } = getElement();
			if (!ref) {
				return;
			}
			const context = getContext();

			const measure = () => {
				const elementHeight = ref.offsetHeight;
				if (!elementHeight) {
					return false;
				}
				context.minHeight = Math.max(
					context.minHeight || 0,
					elementHeight
				);
				context.initialized = true;
				return true;
			};

			// Fast path: already laid out at hydration.
			if (measure()) {
				return;
			}

			// Self-heal: a hidden/zero-height ancestor or unloaded image means
			// offsetHeight is 0 right now. Re-measure when the side gains height.
			const observer = new ResizeObserver(() => {
				if (measure()) {
					observer.disconnect();
				}
			});
			observer.observe(ref);

			return () => observer.disconnect();
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
