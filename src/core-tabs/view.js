/**
 * WordPress Dependencies
 */

import {
	store,
	getElement,
	getContext,
	withSyncEvent,
} from '@wordpress/interactivity';

// Interactivity store for the core-tabs block extension.
const { state, actions } = store('core/tabs', {
	state: {
		/**
		 * Whether to hide the dropdown (inverse of mobileDropdownActive).
		 * Returns true when NOT in mobile dropdown mode.
		 *
		 * @type {boolean}
		 */
		get displayDropdown() {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			const { mobileDropdownActive } = state[tabsId];
			return !mobileDropdownActive;
		},
		/**
		 * Whether to hide the tabs list (returns true when in mobile dropdown mode).
		 *
		 * @type {boolean}
		 */
		get displayTabsList() {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			const { mobileDropdownActive } = state[tabsId];
			return mobileDropdownActive;
		},
		/**
		 * Whether the dropdown panel is open.
		 *
		 * @type {boolean}
		 */
		get isDropdownOpen() {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			return state[tabsId].dropdownOpen;
		},
		/**
		 * Gets the current active tab's label for the dropdown trigger.
		 *
		 * @type {string}
		 */
		get currentTabLabel() {
			const context = getContext('core/tabs/private');
			const { activeTabIndex } = context;
			const { tabsList } = state;

			if (tabsList && tabsList[activeTabIndex]) {
				return tabsList[activeTabIndex].label || 'Select a tab';
			}
			return 'Select a tab';
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
		 * Toggles the dropdown open/closed state.
		 */
		toggleDropdown: withSyncEvent(() => {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			if (state[tabsId]) {
				state[tabsId].dropdownOpen = !state[tabsId].dropdownOpen;
			}
		}),
		/**
		 * Updates the mobile dropdown state based on viewport width.
		 */
		updateMobileDropdownState: () => {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			const { mobileDropdownEnabled, mobileDropdownWidth } =
				state[tabsId];

			if (!mobileDropdownEnabled) {
				state[tabsId].mobileDropdownActive = false;
				return;
			}

			const width = window.innerWidth;
			// If the width is less than the mobileDropdownWidth
			if (width < mobileDropdownWidth) {
				state[tabsId].mobileDropdownActive = true;
			} else {
				state[tabsId].mobileDropdownActive = false;
				// Close dropdown when switching to desktop view.
				state[tabsId].dropdownOpen = false;
			}
		},
	},
	callbacks: {
		addEventListeners: withSyncEvent(() => {
			actions.signalTabsReady();
			// Initialize mobile dropdown state.
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			if (state[tabsId]?.mobileDropdownEnabled) {
				actions.updateMobileDropdownState();
			}
		}),
		addResizeListener: withSyncEvent(() => {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			if (state[tabsId]?.mobileDropdownEnabled) {
				actions.updateMobileDropdownState();
			}
		}),
		/**
		 * Handles clicks outside the dropdown to close it.
		 *
		 * @param {MouseEvent} event The click event.
		 */
		handleClickOutside: withSyncEvent((event) => {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			const dropdownElement = getElement();

			// Check if click is outside the dropdown.
			if (
				dropdownElement &&
				!dropdownElement.ref.contains(event.target)
			) {
				if (state[tabsId]) {
					state[tabsId].dropdownOpen = false;
				}
			}
		}),
		/**
		 * Handles dropdown item click - closes dropdown after tab selection.
		 * The tab selection is handled by the core tabs-menu-item click handler.
		 */
		handleDropdownItemClick: withSyncEvent(() => {
			const context = getContext('core/tabs/private');
			const { tabsId } = context;
			if (state[tabsId]) {
				state[tabsId].dropdownOpen = false;
			}
		}),
		/**
		 * Updates the dropdown trigger label with the active tab's inner content.
		 * Uses data-wp-watch to react to activeTabIndex changes.
		 * Copies the full innerHTML (flags + label) from the active dropdown item.
		 */
		updateTriggerLabel: () => {
			const context = getContext('core/tabs/private');
			const { activeTabIndex } = context;
			const element = getElement();

			if (!element?.ref) {
				return;
			}

			// Find the dropdown container.
			const dropdown = element.ref.closest(
				'.wp-block-tabs-menu__dropdown'
			);
			if (!dropdown) {
				return;
			}

			// Find the dropdown item at the active index.
			const items = dropdown.querySelectorAll(
				'.wp-block-tabs-menu__dropdown-item'
			);
			if (items[activeTabIndex]) {
				const anchor = items[activeTabIndex].querySelector(
					'.wp-block-tabs-menu-item'
				);
				if (anchor) {
					// Copy the innerHTML to the trigger label.
					element.ref.innerHTML = anchor.innerHTML;
				}
			}
		},
	},
});
