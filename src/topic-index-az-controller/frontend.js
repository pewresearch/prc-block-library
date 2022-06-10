/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs, getQueryArg, removeQueryArgs } from '@wordpress/url';

// Mobile Frontend

domReady(() => {
	const azIndex = document.querySelector(
		'.wp-block-prc-block-topic-index-az-controller.ui.accordion',
	);
	if (azIndex) {
		jQuery(azIndex).accordion({
			onOpen() {
				const newUrlArgs = { menuItem: this.dataset.slug };
				let newUrl = addQueryArgs(window.location.href, newUrlArgs);
				newUrl = removeQueryArgs(newUrl, 'menuItemId');
				window.history.pushState(newUrlArgs, document.title, newUrl);
			},
		});
		const existingArg = getQueryArg(window.location.href, 'menuItem');
		console.log('watchAndMove', existingArg);
		if (existingArg) {
			setTimeout(() => {
				document
					.querySelector(`.content[data-slug="${existingArg}"]`)
					.scrollIntoView();
			}, 200);
		}
	}
});
