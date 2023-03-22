/* eslint-disable no-undef */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Switches the active tab and panel.
 *
 * @param       tabsControllerId The id of the tabs controller.
 * @param {elm} newTab           The tab to activate.
 * @param       updateHash       Whether to update the hash in the URL.
 */
function switchTab(tabsControllerId, newTab, updateHash = true) {
	if (updateHash) {
		newTab.focus();
		const href = newTab.getAttribute('href');
		// Update the hash in the URL without scrolling the page.
		window.history.replaceState(null, null, href);
	}

	const newPanelId = newTab.getAttribute('aria-controls');

	const oldTab = document.querySelector(
		`#${tabsControllerId} .wp-block-prc-block-tabs-menu-item[aria-selected="true"]`
	);

	const oldPanel = document.querySelector(
		`#${tabsControllerId} .wp-block-prc-block-tabs-pane[aria-hidden="false"]`
	);
	const newPanel = document.getElementById(newPanelId);

	if (null !== oldTab && oldTab !== newTab) {
		oldTab.setAttribute('aria-selected', 'false');
	}
	if (null !== oldPanel && oldPanel !== newPanel) {
		oldPanel.setAttribute('aria-hidden', 'true');
	}

	newTab.setAttribute('aria-selected', 'true');
	newPanel.setAttribute('aria-hidden', 'false');

	console.log(
		'switchTab',
		tabsControllerId,
		newTab,
		updateHash,
		newPanel,
	);
}

domReady(() => {
	const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
	tabs.forEach((t) => {
		const controllerId = t.getAttribute('id');
		const menuItems = t.querySelectorAll(
			'.wp-block-prc-block-tabs-menu-item'
		);

		menuItems.forEach((menuItem, index) => {
			// Activate first tab
			if (0 === index) {
				switchTab(controllerId, menuItem, false);
			}

			// Activate tab from url hash
			if (window.location.hash === menuItem.getAttribute('href')) {
				switchTab(controllerId, menuItem);
				// Scroll to the tab
				setTimeout(() => {
					menuItem.scrollIntoView();
				}, 1000);
			}

			menuItem.addEventListener('click', (elm) => {
				elm.preventDefault();
				switchTab(controllerId, elm.target);
			});

			console.log('menuItem', menuItem, index, controllerId);
		});
	});
});
