/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

import * as slider from './slider';

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

let timerRef;

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
		onSliderButtonClick: () => {
			const context = getContext();
			clearInterval(timerRef);
			context.buttonText =
				context.buttonText === 'Play' ? 'Pause' : 'Play';
			context.isPlaying = !context.isPlaying;
		},
	},
	callbacks: {
		onTabsInit: () => {
			const { ref } = getElement();
			const id = ref.getAttribute('id');
			state.onPage.push(id);

			if (ref.classList.contains('is-slider')) {
				const sliderEl = ref.querySelector('.ui.slider');
				const context = getContext();
				const { menuItems, activeUUID } = context;
				const activeIndex =
					menuItems.findIndex((item) => item.uuid === activeUUID) ||
					0;
				jQuery(sliderEl).slider({
					min: 0,
					max: sliderEl.dataset.menuItemsLength - 1,
					start: activeIndex,
					showLabelTicks: true,
					autoAdjustLabels: true,
					labelDistance: 300,
					interpretLabel(value) {
						// if there are more than 8 menu items, rotate the labels
						if (sliderEl.dataset.menuItemsLength > 8) {
							return `<div class="label-text--rotate">${menuItems[value].title}</div>`;
						}
						return `<div class="label-text">${menuItems[value].title}</div>`;
					},
					onChange(value) {
						context.activeUUID = menuItems[value].uuid;
						updateWindowHistory(ref, menuItems[value].uuid);
					},
					onMove(value) {
						context.activeUUID = menuItems[value].uuid;
						updateWindowHistory(ref, menuItems[value].uuid);
					},
				});
			}
			const event = new CustomEvent('tabsReady', { detail: { id } });
			// Fire a custom event when the tabs are ready
			document.dispatchEvent(event);
		},
		isActive: () => {
			const { ref } = getElement();
			const context = getContext();
			// console.log('isActive', ref, context);
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
		isPlaying: () => {
			const { ref } = getElement();
			const context = getContext();
			const { isPlaying } = context;
			if (!ref.classList.contains('slider')) {
				return;
			}
			const sliderVal = jQuery(ref).slider('get value');
			const labelLength = ref.dataset.menuItemsLength - 1;
			let labelIndex = sliderVal === labelLength ? -1 : sliderVal;
			function advanceSlider() {
				++labelIndex;
				if (labelIndex <= labelLength) {
					jQuery(ref).slider('set value', labelIndex);
				}
				if (labelIndex === labelLength) {
					context.isPlaying = false;
					context.buttonText = 'Play';
				}
			}
			if (isPlaying) {
				timerRef = setInterval(advanceSlider, 2000);
			} else {
				clearInterval(timerRef);
			}
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
