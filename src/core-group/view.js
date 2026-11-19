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
import {
	sendGoogleAnalyticsLinkEvent,
	sendParselyLinkEvent,
} from './utils/link-tracking-event';

const LINK_TRACKING_SELECTOR = '[data-wp-on-async--click---link-tracking]';

/**
 * Observe the group's computed grid tracks and toggle `context.isStacked`.
 *
 * Gutenberg auto-fill wraps on the *container* width, not the viewport. A
 * `minimumColumnWidth` of 300px stacks inside a 640px content column even
 * when the viewport is still "tablet". ResizeObserver reads the real layout.
 */
store('prc-block/core-group', {
	actions: {
		/**
		 * Send a link click inside the group to the group's tracking service.
		 *
		 * The listener sits on the group wrapper, so it also catches links in
		 * nested blocks. When tracked groups nest, only the innermost one sends.
		 *
		 * @param {MouseEvent} event Click event.
		 */
		trackLinkClick(event) {
			const { ref } = getElement();
			const link = event?.target?.closest?.('a[href]');
			if (!ref || !link || !ref.contains(link)) {
				return;
			}
			if (link.closest(LINK_TRACKING_SELECTOR) !== ref) {
				return;
			}

			const { linkTrackingService, linkTrackingKey } = getContext() || {};
			switch (linkTrackingService) {
				case 'parsely':
					sendParselyLinkEvent(link, linkTrackingKey);
					break;
				case 'google-analytics':
					sendGoogleAnalyticsLinkEvent(link, linkTrackingKey);
					break;
				default:
					break;
			}
		},
	},
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
