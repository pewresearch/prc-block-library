/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

const { state } = store('core/details', {
	actions: {
		/**
		 * Handle clicks outside the details element to close it
		 */
		handleOutsideClick: withSyncEvent((event) => {
			const context = getContext();
			const { ref } = getElement();

			// Only proceed if closeWhenFocusLost is enabled
			if (!context.closeWhenFocusLost) {
				return;
			}

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
			const isRtl = getComputedStyle(ref).direction === 'rtl';
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
	},
	callbacks: {},
});
