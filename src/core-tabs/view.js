/**
 * WordPress Dependencies
 */

import {
	store,
	getContext,
	getElement,
	withSyncEvent,
	withScope,
} from '@wordpress/interactivity';

// Interactivity store for the core-tabs block extension.
const { state, actions } = store('prc-block/tabs', {
	state: {
		/**
		 * Whether tabs should display as mobile dropdown.
		 *
		 * @type {boolean}
		 */
		get isMobileDropdown() {
			const context = getContext();
			return context?.isMobileDropdown || false;
		},
	},
	actions: {
		/**
		 * Signals that the tabs are ready by firing a custom browser event.
		 * This provides extensibility for other scripts to hook into when tabs are initialized.
		 */
		signalTabsReady: () => {
			window.dispatchEvent(new CustomEvent('tabsReady'));
		},
		/**
		 * Handles the change event for the mobile dropdown select element.
		 *
		 * @param {Event} event The select change event.
		 */
		handleSelectChange: withSyncEvent((event) => {
			const selectedIndex = event.target.selectedIndex - 1; // Subtract 1 for the default option
			if (selectedIndex >= 0) {
				actions.setActiveTab(selectedIndex);
			}
		}),
		/**
		 * Updates the mobile dropdown state based on viewport width.
		 */
		updateMobileDropdownState: () => {
			const context = getContext();
			const { mobileDropdown, mobileDropdownWidth } = context;

			if (!mobileDropdown) {
				context.isMobileDropdown = false;
				return;
			}

			const width = window.innerWidth;
			// If the width is less than the mobileDropdownWidth and mobileDropdown is enabled
			// set isMobileDropdown to true
			if (width < mobileDropdownWidth && mobileDropdown) {
				context.isMobileDropdown = true;
			} else {
				context.isMobileDropdown = false;
			}
		},
	},
	callbacks: {
		addEventListeners: () => {
			actions.signalTabsReady();

			// Initialize mobile dropdown state
			const context = getContext();
			if (context?.mobileDropdown) {
				actions.updateMobileDropdownState();
				console.log('updateMobileDropdownState');
				console.log({ context });
				// Add resize listener to update mobile dropdown state
				window.addEventListener(
					'resize',
					actions.updateMobileDropdownState
				);
			}
		},
	},
});
