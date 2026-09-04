/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
} from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import { gridIsStacked } from './utils/grid-tracks';

/**
 * Observe the group's computed grid tracks and toggle `context.isStacked`.
 *
 * Gutenberg auto-fill wraps on the *container* width, not the viewport. A
 * `minimumColumnWidth` of 300px stacks inside a 640px content column even
 * when the viewport is still "tablet". ResizeObserver reads the real layout.
 */
store('prc-block/core-group', {
	callbacks: {
		observeStacking() {
			const { ref } = getElement();
			const context = getContext();
			if (!ref || !context) {
				return;
			}

			const update = () => {
				context.isStacked = gridIsStacked(ref);
			};

			const observer = new window.ResizeObserver(withScope(update));
			observer.observe(ref);
			update();

			return () => {
				observer.disconnect();
			};
		},
	},
});
