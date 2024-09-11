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
				// Check if the URL already has a taxonomyLink query arg, if so remove it:
				const existingArgs = window.wp.url.getQueryArg(
					window.location.href,
					'taxonomyLink'
				);
				if (existingArgs && existingArgs === id) {
					const newUrl = window.wp.url.removeQueryArgs(
						window.location.href,
						'taxonomyLink'
					);
					window.history.pushState({}, '', newUrl);
					return;
				}

				const { href } = window.location;
				const newUrl = window.wp.url.addQueryArgs(href, {
					taxonomyLink: id,
				});
				window.history.pushState({ id }, '', newUrl);
			}
		},
	},
	callbacks: {
		getExpandedMenuLabel: () => {
			const context = getContext();
			const { isActive } = context;
			return isActive ? 'Less' : 'More';
		},
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
