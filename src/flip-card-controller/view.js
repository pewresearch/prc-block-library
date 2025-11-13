/**
 * WordPress Dependencies
 */
import { store, getContext, getElement, withSyncEvent } from '@wordpress/interactivity';

const { state } = store('prc-block/flip-card-controller', {
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
			// Check if event target is a button or a link, if so do nothing.
			if (['A', 'BUTTON'].includes(event.target.tagName)) {
				return;
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
			// Check that the ref element has the is-style-front class
			if (!ref.classList.contains('is-style-front')) {
				return;
			}
			const context = getContext();
			const elementHeight = ref.offsetHeight;
			if (!elementHeight) {
				return;
			}

			context.minHeight = elementHeight;
			context.initialized = true;
		},
		minHeightStyle() {
			const { minHeight } = getContext();
			return minHeight ? `${minHeight}px` : '100%';
		},
	}
});
