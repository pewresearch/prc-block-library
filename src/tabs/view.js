/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

// Interactivy store for the tabs block.
const { state, actions } = store('prc-block/tabs', {
	state: {
		/**
		 * Gets a contextually aware list of tabs for the current tabs block.
		 *
		 * @type {Array}
		 */
		get tabsList() {
			const context = getContext();
			const tabsId = context?.tabsId;
			const tabsList = state[tabsId];
			return tabsList;
		},
		/**
		 * Gets the index of the active tab element whether it
		 * is a tab label or tab panel.
		 *
		 * @type {number|null}
		 */
		get tabIndex() {
			const { attributes } = getElement();
			const tabId = attributes?.id?.replace('tab__', '') || null;
			if (!tabId) {
				return null;
			}
			const { tabsList } = state;
			const tabIndex = tabsList.findIndex((t) => t.id === tabId);
			return tabIndex;
		},
		/**
		 * Whether the tab panel or tab label is the active tab.
		 *
		 * @type {boolean}
		 */
		get isActiveTab() {
			const { activeTabIndex } = getContext();
			const { tabIndex } = state;
			return activeTabIndex === tabIndex;
		},
		/**
		 * Whether tabs should display as mobile dropdown.
		 *
		 * @type {boolean}
		 */
		get isMobileDropdown() {
			const context = getContext();
			return context?.isMobileDropdown || false;
		},
		/**
		 * The value of the tabindex attribute.
		 *
		 * @type {false|string}
		 */
		get tabIndexAttribute() {
			return state.isActiveTab ? -1 : 0;
		},
	},
	actions: {
		/**
		 * Handles the keydown events for the tab label and tabs controller.
		 *
		 * @param {KeyboardEvent} event The keydown event.
		 */
		handleTabKeyDown: withSyncEvent((event) => {
			// If this is the enter key then lets get the tab index from context and set the active tab to that index.
			const { isVertical } = getContext();
			if (event.key === 'Enter') {
				const { tabIndex } = state;
				if (tabIndex !== null) {
					actions.setActiveTab(tabIndex);
				}
			} else if (event.key === 'ArrowRight' && !isVertical) {
				const { tabIndex } = state;
				if (tabIndex !== null) {
					actions.setActiveTab(tabIndex + 1);
				}
			} else if (event.key === 'ArrowLeft' && !isVertical) {
				const { tabIndex } = state;
				if (tabIndex !== null) {
					actions.setActiveTab(tabIndex - 1);
				}
			} else if (event.key === 'ArrowDown' && isVertical) {
				const { tabIndex } = state;
				if (tabIndex !== null) {
					actions.setActiveTab(tabIndex + 1);
				}
			} else if (event.key === 'ArrowUp' && isVertical) {
				const { tabIndex } = state;
				if (tabIndex !== null) {
					actions.setActiveTab(tabIndex - 1);
				}
			}
		}),
		/**
		 * Handles the click event for the tab label.
		 *
		 * @param {MouseEvent} event The click event.
		 */
		handleTabClick: withSyncEvent((event) => {
			event.preventDefault();

			const { tabIndex } = state;
			if (tabIndex !== null) {
				actions.setActiveTab(tabIndex);
			}
		}),
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
		/**
		 * Sets the active tab index.
		 *
		 * @param {number} tabIndex    The index of the active tab.
		 * @param          scrollToTab
		 */
		setActiveTab: (tabIndex, scrollToTab = false) => {
			const context = getContext();
			context.activeTabIndex = tabIndex;
			if (scrollToTab) {
				const tabId = state.tabsList[tabIndex].id;
				const tabElement = document.getElementById(tabId);
				if (tabElement) {
					setTimeout(() => {
						tabElement.scrollIntoView({ behavior: 'smooth' });
					}, 100);
				}
			}
		},
		/**
		 * Signals that the tabs are ready by firing a custom browser event.
		 * This provides extensibility for other scripts to hook into when tabs are initialized.
		 */
		signalTabsReady: () => {
			// @TODO: change this from tabsReady to wpTabsReady when migrating to Gutenberg core.
			window.dispatchEvent(new CustomEvent('tabsReady'));
		},
	},
	callbacks: {
		/**
		 * When the tabs are initialized, we need to check if there is a hash in the url and if so if it exists in the current tabsList, set the active tab to that index.
		 * Also setup mobile dropdown responsiveness.
		 */
		onTabsInit: () => {
			const { tabsList } = state;
			if (tabsList.length === 0) {
				return;
			}
			const { hash } = window.location;
			const tabId = hash.replace('#', '');
			const tabIndex = tabsList.findIndex((t) => t.id === tabId);
			// Check if tabIndex is a positive number and if so we'll auto activate that tab.
			if (tabIndex >= 0) {
				actions.setActiveTab(tabIndex, true);
			}
			
			// Initialize mobile dropdown state
			actions.updateMobileDropdownState();
			
			// Add resize listener to update mobile dropdown state
			window.addEventListener('resize', actions.updateMobileDropdownState);
			
			actions.signalTabsReady();
		},
	},
});
