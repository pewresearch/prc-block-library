/* eslint-disable no-undef */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Switches the active tab and panel.
 * @param {elm} newTab The tab to activate.
 */
function switchTab(newTab) {
	newTab.focus();
	const oldTab = document.querySelector(
		'.wp-block-prc-block-tabs-menu-item[aria-selected="true"]',
	);
	const oldPanel = document.querySelector(
		'.wp-block-prc-block-tabs-tab-pane[aria-hidden="false"]',
	);
	const newPanel = document.getElementById(
		newTab.getAttribute('aria-controls'),
	);
	console.log('newTab', newTab, oldTab, oldPanel, newPanel);
	if (newTab !== oldTab && oldTab) {
		oldTab.setAttribute('aria-selected', 'false');
	}
	if (newPanel !== oldPanel && oldPanel) {
		oldPanel.setAttribute('aria-hidden', 'true');
	}
	newTab.setAttribute('aria-selected', 'true');
	newPanel.setAttribute('aria-hidden', 'false');
}

domReady(() => {
	const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
	tabs.forEach((t) => {
		// initTabs(t);
		const menuItems = t.querySelectorAll('.wp-block-prc-block-tabs-menu-item');
		menuItems.forEach((menuItem, index) => {
			menuItem.addEventListener('click', (elm) => switchTab(elm.target));
			// Activate first tab
			if (0 === index && !window.location.hash) {
				switchTab(menuItem);
			} else if (window.location.hash === menuItem.getAttribute('href')) {
				switchTab(menuItem);
			}
		});
	});
});
