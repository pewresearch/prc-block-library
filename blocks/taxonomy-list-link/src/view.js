/**
 * WordPress Dependencies
 */
import { addQueryArgs, getQueryArg } from '@wordpress/url';
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const taxonomyMenuLinks = document.querySelectorAll(
		'.wp-block-prc-block-taxonomy-menu-link.is-style-sub-expand, .wp-block-prc-block-taxonomy-menu-link.is-style-sub-tree'
	);

	taxonomyMenuLinks.forEach((taxonomyMenuLink) => {
		const subMenu = taxonomyMenuLink.querySelector(
			'.wp-block-prc-block-taxonomy-menu-link--sub-menu'
		);

		if (!subMenu) {
			return;
		}

		const subMenuToggles = taxonomyMenuLink.querySelectorAll(
			'.wp-block-prc-block-taxonomy-menu-link--toggle'
		);

		if (!subMenuToggles) {
			return;
		}

		subMenuToggles.forEach((subMenuToggle) => {
			subMenuToggle.addEventListener('click', (event) => {
				event.preventDefault();
				taxonomyMenuLink.classList.toggle('is-active');

				// Update the window history with the id from taxonomyMenuLink as a query parameter.
				const { id } = taxonomyMenuLink;
				const { href } = window.location;
				const newUrl = addQueryArgs(href, { taxonomyLink: id });

				window.history.pushState({ id }, '', newUrl);
			});
		});
	});

	// Get the taxonomyLink from the URL, if present.
	const taxonomyLink = getQueryArg(window.location.href, 'taxonomyLink');
	// If there is a taxonomyLink, and it matches a taxonomy menu link, open the sub menu.
	if (taxonomyLink && taxonomyMenuLinks.length) {
		const taxonomyLinkElement = document.getElementById(taxonomyLink);
		if (taxonomyLinkElement) {
			taxonomyLinkElement.classList.add('is-active');
			// Scroll to the taxonomyLink element.
			setTimeout(() => {
				taxonomyLinkElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}, 100);
		}
	}
});
