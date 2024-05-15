/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

function updateWindowHistory(tab, uuid) {
	tab.focus();
	// add a tabId query arg to the url with the id of the new tab
	const { href } = window.location;
	// add ?tabId=uuid to the url, check if there is already a query string and append accordingly
	let newUrl;
	if (href.includes('tabItem=')) {
		newUrl = href.replace(/tabItem=[^&]+/, `tabItem=${uuid}`);
	} else if (href.includes('?')) {
		newUrl = `${href}&tabItem=${uuid}`;
	} else {
		newUrl = `${href}?tabItem=${uuid}`;
	}
	window.history.pushState({ path: newUrl }, '', newUrl);
}

const { state } = store('prc-block/tabs-controller', {
	state: {
		// A simple log of all the tab controller blocks on the page
		onPage: [],
	},
	actions: {
		setActiveTab: () => {
			const { ref } = getElement();
			const context = getContext();
			const { uuid } = context;
			if (ref.classList.contains('is-style-dialog')) {
				context.activeDialogUUID = uuid;
			} else {
				context.activeUUID = uuid;
				// When we select a new tab also update the browser history state and add the tab's uuid to the url. This allows users to copy the url and provide deep linking activation of a specific tab by url. Thats handled server side with a query var check on the block render.
				updateWindowHistory(ref, uuid);
			}
			console.log('context...', context);
		},
		hideDialog: () => {
			const context = getContext();
			const { uuid } = context;
			context.activeDialogUUID = null;
		},
	},
	callbacks: {
		onTabsInit: () => {
			const { ref } = getElement();
			const id = ref.getAttribute('id');
			state.onPage.push(id);

			const event = new CustomEvent('tabsReady', { detail: { id } });
			// Fire a custom event when the tabs are ready
			document.dispatchEvent(event);
		},
		isActive: () => {
			const { ref } = getElement();
			const context = getContext();
			console.log('isActive', ref, context);
			// Each panel|tab has its own context containing its own uuid,
			// we can then compare that to the activeUUID.
			// The two contexts get merged.
			const { uuid, activeUUID, dialogLinkUUID, activeDialogUUID } =
				context;
			if (uuid === dialogLinkUUID && uuid === activeDialogUUID) {
				return true;
			}
			if (!uuid) {
				return false;
			}
			return activeUUID === uuid;
		},
		onTabWatch: () => {
			const { ref } = getElement();
			const context = getContext();
			const { uuid, activeUuid } = context;
			if (uuid === activeUuid) {
				console.log('onTabWatch!!', uuid, activeUuid);
			} else {
				console.log('onTabWatch...', ref, context);
			}
		},
	},
});
