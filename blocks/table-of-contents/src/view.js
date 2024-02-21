/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/table-of-contents', {
	actions: {
		getInternalChaptersList: () => {
			const { ref } = getElement();
			// check if the first level of the list has list-items with is-top-level class
			// if so, return the first level of the list
			if (
				ref.querySelector(
					'.wp-block-prc-block-table-of-contents__list .is-top-level'
				)
			) {
				return ref.querySelector(
					'.wp-block-prc-block-table-of-contents__list'
				);
			}
			return ref.querySelector(
				'.wp-block-prc-block-table-of-contents__list .wp-block-prc-block-table-of-contents__list'
			);
		},
		initSmoothScrollClickHandler: () => {
			const internalChaptersList = actions.getInternalChaptersList();
			const links = internalChaptersList.querySelectorAll('a');
			links.forEach((link) => {
				link.addEventListener('click', (e) => {
					const href = link.getAttribute('href');
					// If the link is a hash link, we need to smooth scroll to the hash.
					if (0 === href.indexOf('#')) {
						e.preventDefault();
						const target = document.getElementById(
							href.replace('#', '')
						);
						if (target) {
							console.log('target', target);
							target.scrollIntoView({ behavior: 'smooth' }, true);
							// Add the hash to the end of the URL.
							window.history.pushState(null, null, href);
						}
					}
				});
			});
		},
		onDropdownClick: (event) => {
			event.preventDefault();
			const context = getContext();
			console.log('onDropdownClick', context, event);
			context.isDropdownOpen = !context.isDropdownOpen;
		},
	},
	callbacks: {
		onInit: () => {
			actions.initSmoothScrollClickHandler();
		},
	},
});
