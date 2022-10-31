/* eslint-disable no-undef */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Switches the active tab and panel.
 * @param {elm} newTab The tab to activate.
 */
function switchTab(id, newTab, updateHash = true) {
	if (updateHash) {
		newTab.focus();
		const href = newTab.getAttribute('href');
		// Update the hash in the URL without scrolling the page.
		window.history.replaceState(null, null, href);
	}

	const oldTab = document.querySelector(
		`#${id} .wp-block-prc-block-tabs-menu-item[aria-selected="true"]`,
	);

	const oldPanel = document.querySelector(
		`#${id} .wp-block-prc-block-tabs-pane[aria-hidden="false"]`,
	);
	const newPanel = document.getElementById(
		newTab.getAttribute('aria-controls'),
	);

	if (null !== oldTab && oldTab !== newTab) {
		oldTab.setAttribute('aria-selected', 'false');
	}
	if (null !== oldPanel && oldPanel !== newPanel) {
		oldPanel.setAttribute('aria-hidden', 'true');
	}

	newTab.setAttribute('aria-selected', 'true');
	newPanel.setAttribute('aria-hidden', 'false');
}

domReady(() => {
	const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
	tabs.forEach((t) => {
		const id = t.getAttribute('id');
		const menuItems = t.querySelectorAll('.wp-block-prc-block-tabs-menu-item');
		menuItems.forEach((menuItem, index) => {
			menuItem.addEventListener('click', (elm) => {
				elm.preventDefault();
				switchTab(id, elm.target);
			});
			// Activate first tab
			if (0 === index) {
				switchTab(id, menuItem, false);
			}
			// Activate tab from url hash
			if (window.location.hash === menuItem.getAttribute('href')) {
				switchTab(id, menuItem);
				// Scroll to the tab
				setTimeout(() => {
					menuItem.scrollIntoView();
				}, 1000);
			}
		});
	});
});
