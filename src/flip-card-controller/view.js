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
			const elementHeight = ref.offsetHeight;
			if (!elementHeight) {
				return;
			}
			const context = getContext();
			context.minHeight = Math.max(context.minHeight || 0, elementHeight);
			context.initialized = true;
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
