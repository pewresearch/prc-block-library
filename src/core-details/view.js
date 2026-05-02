/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

import { syncEntityIframeActive } from '../entity-as-iframe/shared/sync-entity-iframe-active.js';
import { prefetchEntityIframeUrl } from '../entity-as-iframe/shared/prefetch-entity-iframe.js';

store('core/details', {
	actions: {
		/**
		 * Handle clicks outside the details element to close it
		 */
		handleOutsideClick: withSyncEvent((event) => {
			const context = getContext();

			// Only proceed if closeWhenFocusLost is enabled
			if (!context.closeWhenFocusLost) {
				return;
			}

			const { ref } = getElement();

			// Check if the click is outside the details element
			if (ref && !ref.contains(event.target)) {
				// Close the details element by removing the open attribute
				if (ref.hasAttribute('open')) {
					ref.removeAttribute('open');
				}
			}
		}),
		/**
		 * Handle summary click: if click is in the logo zone (::before, 183px), open
		 * the Pew-Knight collection in a new tab and prevent toggling the details.
		 */
		handleSummaryClick: withSyncEvent((event) => {
			const context = getContext();
			if (!context.knightCollectionUrl) {
				return;
			}
			const { ref } = getElement();
			if (!ref) {
				return;
			}
			const rect = ref.getBoundingClientRect();
			const clickX = event.clientX - rect.left;
			const isRtl = window.getComputedStyle(ref).direction === 'rtl';
			const logoWidth = 183;
			const inLogoZone = isRtl
				? rect.width - clickX < logoWidth
				: clickX < logoWidth;
			if (inLogoZone) {
				event.preventDefault();
				event.stopPropagation();
				window.open(
					context.knightCollectionUrl,
					'_blank',
					'noopener,noreferrer'
				);
			}
		}),
		/**
		 * Keep `context.isOpen` in sync with the native `<details>` open state (toggle fires on user and programmatic changes).
		 */
		syncDetailsOpenFromToggle: () => {
			const { ref } = getElement();
			if (!ref) {
				return;
			}
			getContext().isOpen = ref.hasAttribute('open');
		},
	},
	callbacks: {
		/**
		 * Keep nested entity-as-iframe `isActive` in sync with `context.isOpen` (same `core/details` store).
		 */
		syncEntityIframeWithDetails: () => {
			const { ref } = getElement();
			if (!ref?.querySelector?.('.wp-block-prc-block-entity-as-iframe')) {
				return;
			}
			syncEntityIframeActive(ref, !!getContext().isOpen);
		},
		/**
		 * Prefetch entity iframe document(s) when the pointer enters the summary (set on `<summary>` via PHP).
		 */
		prefetchEntityIframeOnSummaryPointer: withSyncEvent((event) => {
			const summary = event.currentTarget;
			const detailsEl = summary?.closest?.('details');
			if (!detailsEl) {
				return;
			}
			detailsEl
				.querySelectorAll('[data-entity-iframe-prefetch-url]')
				.forEach((el) => {
					const url = el.getAttribute(
						'data-entity-iframe-prefetch-url'
					);
					if (url) {
						prefetchEntityIframeUrl(url);
					}
				});
		}),
	},
});
