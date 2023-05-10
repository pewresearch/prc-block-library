/* eslint-disable no-undef */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs, getQueryArg } from '@wordpress/url';

/**
 * Switches the active tab and panel.
 *
 * @param       tabsControllerId The id of the tabs controller.
 * @param {elm} newTab           The tab to activate.
 * @param       updateHash       Whether to update the hash in the URL.
 */
function switchTab(tabsControllerId, newTab, updateHash = true) {
	const tabId = newTab.getAttribute('id');
	const newPanelId = tabId.replace('tab-', 'panel-');

	if (updateHash) {
		newTab.focus();
		// add a tabId query arg to the url with the id of the new tab
		const { href } = window.location;
		const newUrl = addQueryArgs(href, {
			tabId,
		});
		window.history.pushState({ path: newUrl }, '', newUrl);
	}

	const oldTab = document.querySelector(
		`#${tabsControllerId} > div > .wp-block-prc-block-tabs-menu > li > .wp-block-prc-block-tabs-menu-item.is-active`
	);

	const oldPanel = document.querySelector(
		`#${tabsControllerId} > div > .wp-block-prc-block-tabs-panes > .wp-block-prc-block-tabs-pane.is-active`
	);
	const newPanel = document.getElementById(newPanelId);

	if (null !== oldTab && oldTab !== newTab) {
		oldTab.classList.remove('is-active');
	}
	if (null !== oldPanel && oldPanel !== newPanel) {
		oldPanel.classList.remove('is-active');
	}

	newTab.classList.add('is-active');
	newPanel.classList.add('is-active');
}

domReady(() => {
	const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
	tabs.forEach((t) => {
		const controllerId = t.getAttribute('id');
		const controllerMenu = t.querySelector('.wp-block-prc-block-tabs-menu');
		const menuItems = controllerMenu.querySelectorAll(
			'.wp-block-prc-block-tabs-menu-item'
		);

		menuItems.forEach((menuItem, index) => {
			// Activate first tab
			if (0 === index) {
				switchTab(controllerId, menuItem, false);
			}
			menuItem.addEventListener('click', (elm) => {
				elm.preventDefault();
				switchTab(controllerId, elm.target);
			});
		});
	});

	// Activate tab from the ?tabId query arg
	const tabId = getQueryArg(window.location.href, 'tabId');
	if (tabId) {
		const tab = document.getElementById(tabId);
		if (tab) {
			const closestController = tab.closest('.wp-block-prc-block-tabs');
			const controllerId = closestController?.getAttribute('id');
			if (controllerId) {
				switchTab(controllerId, tab);
			}
		}
	}
});
