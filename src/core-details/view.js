/**
 * WordPress Dependencies
 */
import { store, getContext, getElement, withSyncEvent } from '@wordpress/interactivity';

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
	},
	callbacks: {
	},
});
