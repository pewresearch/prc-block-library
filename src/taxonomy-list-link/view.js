/**
 * WordPress Dependencies
 */
import { store, getElement, getContext } from '@wordpress/interactivity';
import { addQueryArgs, getQueryArg, removeQueryArgs } from '@wordpress/url';

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
				const existingArgs = getQueryArg(
					window.location.href,
					'taxonomyLink'
				);
				if (existingArgs && existingArgs === id) {
					const newUrl = removeQueryArgs(
						window.location.href,
						'taxonomyLink'
					);
					window.history.pushState({}, '', newUrl);
					return;
				}

				const { href } = window.location;
				const newUrl = addQueryArgs(href, {
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
			// If on init this is already active scroll it into view.
			// Use the element ref (not getElementById) so a mid-timeout DOM
			// replacement cannot throw TypeError on null.scrollIntoView.
			if (true === context.isActive && ref) {
				setTimeout(() => {
					ref.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}, 100);
			}
		},
	},
});
