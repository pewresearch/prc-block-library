/**
 * WordPress Dependencies
 */

import {
	store,
	getElement,
	getContext,
	withSyncEvent,
} from '@wordpress/interactivity';

import { syncEntityIframeActive } from '../entity-as-iframe/shared/sync-entity-iframe-active.js';
import { prefetchEntityIframeUrl } from '../entity-as-iframe/shared/prefetch-entity-iframe.js';

/**
 * Interactivity API "universal unlock" token.
 *
 * Gutenberg 23.5 (WordPress/gutenberg#79337) collapsed the tabs `core/tabs/private`
 * store into `core/tabs` and kept it locked (`{ lock: true }`). Extending a locked
 * store requires passing this exact token; without it our `store('core/tabs')` call
 * creates a conflicting *public* store, and core's own locked call then throws
 * "Cannot lock a public store" — which silently disables ALL core tab interactivity
 * (no initial tab, clicks do nothing).
 *
 * WARNING: this string is an intentionally unstable core internal. A future Gutenberg
 * release may change it, which would break tabs again until this value is updated.
 */
const CORE_TABS_STORE_UNLOCK =
	'I acknowledge that using a private store means my plugin will inevitably break on the next store release.';

// Interactivity store for the core-tabs block extension (merges with WordPress core `core/tabs`).
const { state, actions } = store(
	'core/tabs',
	{
		state: {
			/**
			 * Whether to hide the dropdown (inverse of mobileDropdownActive).
			 * Returns true when NOT in mobile dropdown mode.
			 *
			 * @type {boolean}
			 */
			get displayDropdown() {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (!tabsId || !dropdownState) {
					return true;
				}
				return !dropdownState.mobileDropdownActive;
			},
			/**
			 * Whether to hide the tabs list (returns true when in mobile dropdown mode).
			 *
			 * @type {boolean}
			 */
			get displayTabsList() {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (!tabsId || !dropdownState) {
					return false;
				}
				return dropdownState.mobileDropdownActive;
			},
			/**
			 * Whether the dropdown panel is open.
			 *
			 * @type {boolean}
			 */
			get isDropdownOpen() {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (!tabsId || !dropdownState) {
					return false;
				}
				return dropdownState.dropdownOpen;
			},
			/**
			 * Gets the current active tab's label for the dropdown trigger.
			 *
			 * @type {string}
			 */
			get currentTabLabel() {
				const context = getContext('core/tabs');
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
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (dropdownState) {
					dropdownState.dropdownOpen = !dropdownState.dropdownOpen;
				}
			}),
			/**
			 * Updates the mobile dropdown state based on viewport width.
			 */
			updateMobileDropdownState: () => {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (!tabsId || !dropdownState) {
					return;
				}
				const { mobileDropdownEnabled, mobileDropdownWidth } =
					dropdownState;

				if (!mobileDropdownEnabled) {
					dropdownState.mobileDropdownActive = false;
					return;
				}

				const width = window.innerWidth;
				// If the width is less than the mobileDropdownWidth
				if (width < mobileDropdownWidth) {
					dropdownState.mobileDropdownActive = true;
				} else {
					dropdownState.mobileDropdownActive = false;
					// Close dropdown when switching to desktop view.
					dropdownState.dropdownOpen = false;
				}
			},
		},
		callbacks: {
			addEventListeners: withSyncEvent(() => {
				actions.signalTabsReady();
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				if (state.prcMobileDropdown?.[tabsId]?.mobileDropdownEnabled) {
					actions.updateMobileDropdownState();
				}
			}),
			addResizeListener: withSyncEvent(() => {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				if (state.prcMobileDropdown?.[tabsId]?.mobileDropdownEnabled) {
					actions.updateMobileDropdownState();
				}
			}),
			/**
			 * Handles clicks outside the dropdown to close it.
			 * Checks all dropdowns within the same tabs block (top and bottom)
			 * so clicking one dropdown doesn't close the shared state.
			 *
			 * @param {MouseEvent} event The click event.
			 */
			handleClickOutside: withSyncEvent((event) => {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const dropdownElement = getElement();

				if (!dropdownElement?.ref) {
					return;
				}

				// Find the parent tabs block to check all dropdowns within it.
				const tabsBlock = dropdownElement.ref.closest('.wp-block-tabs');
				if (!tabsBlock) {
					return;
				}

				// Check if click is inside ANY dropdown within this tabs block.
				const allDropdowns = tabsBlock.querySelectorAll(
					'.wp-block-tabs-list__dropdown'
				);
				const isInsideAnyDropdown = Array.from(allDropdowns).some(
					(dd) => dd.contains(event.target)
				);

				if (!isInsideAnyDropdown) {
					const dropdownState = state.prcMobileDropdown?.[tabsId];
					if (dropdownState) {
						dropdownState.dropdownOpen = false;
					}
				}
			}),
			/**
			 * Handles dropdown item click - closes dropdown after tab selection.
			 * When using the bottom mobile dropdown, smooth-scrolls to the top dropdown
			 * so the user sees the newly selected tab content from the top.
			 * The tab selection is handled by the core tab button click handler.
			 */
			handleDropdownItemClick: withSyncEvent(() => {
				const context = getContext('core/tabs');
				const tabsId = context?.tabsId;
				const element = getElement();

				if (element?.ref) {
					const dropdown = element.ref.closest(
						'.wp-block-tabs-list__dropdown'
					);
					if (
						dropdown?.classList.contains(
							'wp-block-tabs-list__dropdown--bottom'
						)
					) {
						const tabsBlock = dropdown.closest('.wp-block-tabs');
						const topDropdown = tabsBlock?.querySelector(
							'.wp-block-tabs-list__dropdown:not(.wp-block-tabs-list__dropdown--bottom)'
						);
						if (topDropdown) {
							topDropdown.scrollIntoView({
								behavior: 'smooth',
								block: 'start',
							});
						}
					}
				}

				const dropdownState = state.prcMobileDropdown?.[tabsId];
				if (dropdownState) {
					dropdownState.dropdownOpen = false;
				}
			}),
			/**
			 * Updates the dropdown trigger label with the active tab's inner content.
			 * Uses data-wp-watch to react to activeTabIndex changes.
			 * Copies the full innerHTML (flags + label) from the active dropdown item.
			 */
			updateTriggerLabel: () => {
				const context = getContext('core/tabs');
				const { activeTabIndex } = context;
				const element = getElement();

				if (!element?.ref) {
					return;
				}

				// Find the dropdown container.
				const dropdown = element.ref.closest(
					'.wp-block-tabs-list__dropdown'
				);
				if (!dropdown) {
					return;
				}

				// Find the dropdown item at the active index.
				const items = dropdown.querySelectorAll(
					'.wp-block-tabs-list__dropdown-item'
				);
				if (items[activeTabIndex]) {
					const anchor =
						items[activeTabIndex].querySelector('button');
					if (anchor) {
						// Copy the innerHTML to the trigger label.
						element.ref.innerHTML = anchor.innerHTML;
					}
				}
			},
			/**
			 * Keep nested entity-as-iframe `isActive` in sync with `state.isActiveTab` from the
			 * `core/tabs` store (same reactive source as `data-wp-bind--hidden` on tab panels).
			 *
			 * Use the store `state` closed over from the top-level `store(..., { lock: unlock })`
			 * call — do **not** re-enter via `store('core/tabs')` with the default public lock.
			 * That marks an unlock-created store as public (`storeLocks = false`) and causes
			 * Gutenberg's later `{ lock: true }` registration to throw
			 * "Cannot lock a public store", disabling all tab interactivity.
			 *
			 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/tabs/view.js
			 */
			syncEntityIframeWithTabPanel: () => {
				const { ref } = getElement();
				if (
					!ref?.querySelector?.(
						'.wp-block-prc-block-entity-as-iframe'
					)
				) {
					return;
				}
				syncEntityIframeActive(ref, !!state.isActiveTab);
			},
			/**
			 * Prefetch entity iframe URL when pointer enters a tab button (PHP adds on each tab button).
			 */
			prefetchEntityIframeOnTabMenuItemPointer: withSyncEvent((event) => {
				const btn = event.currentTarget;
				const panelId = btn.getAttribute('aria-controls');
				if (!panelId) {
					return;
				}
				const panel = document.getElementById(panelId);
				const wrap = panel?.querySelector(
					'.wp-block-prc-block-entity-as-iframe'
				);
				const url = wrap?.getAttribute(
					'data-entity-iframe-prefetch-url'
				);
				if (url) {
					prefetchEntityIframeUrl(url);
				}
			}),
		},
	},
	{ lock: CORE_TABS_STORE_UNLOCK }
);
