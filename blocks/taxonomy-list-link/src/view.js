/**
 * WordPress Dependencies
 */
import { store, getElement, getContext } from '@wordpress/interactivity';

store('prc-block/taxonomy-list-link', {
	actions: {
		onClick: () => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref.parentElement;
			// Toggle active state:
			context.isActive = !context.isActive;
			// Update the URL:
			if (id) {
				const { href } = window.location;
				const newUrl = window.wp.url.addQueryArgs(href, {
					taxonomyLink: id,
				});
				window.history.pushState({ id }, '', newUrl);
			}
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			// If on init this is already active scroll it into view:
			if (true === context.isActive && id) {
				setTimeout(() => {
					document.getElementById(id).scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}, 100);
			}
		},
	},
});
