/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const taxonomyMenuLinks = document.querySelectorAll(
		'.wp-block-prc-block-taxonomy-menu-link.is-style-sub-expand, .wp-block-prc-block-taxonomy-menu-link.is-style-sub-tree',
	);

	// Get the hash at end of the URL, if present.
	const { hash } = window.location;
	// If there is a hash, and it matches a taxonomy menu link, open the sub menu.
	if (hash && taxonomyMenuLinks.length) {
		const hashId = hash.substring(1);
		const hashLink = document.getElementById(hashId);
		if (hashLink) {
			hashLink.classList.add('is-active');

			// Scroll to the hash link.
			// hashLink.scrollIntoView();
		}
	}

	taxonomyMenuLinks.forEach((taxonomyMenuLink) => {
		const subMenu = taxonomyMenuLink.querySelector(
			'.wp-block-prc-block-taxonomy-menu-link--sub-menu',
		);
		console.log('subMenu', subMenu);

		if (!subMenu) {
			return;
		}

		const subMenuToggles = taxonomyMenuLink.querySelectorAll(
			'.wp-block-prc-block-taxonomy-menu-link--toggle',
		);

		console.log('toggle', subMenuToggles);

		if (!subMenuToggles) {
			return;
		}

		subMenuToggles.forEach((subMenuToggle) => {
			subMenuToggle.addEventListener('click', (event) => {
				console.log('click');
				event.preventDefault();
				taxonomyMenuLink.classList.toggle('is-active');

				// Update the window history with the id from taxonomyMenuLink as a hash.
				const { id } = taxonomyMenuLink;
				const { pathname } = window.location;
				const newUrl = `${pathname}#${id}`;

				window.history.pushState({ id }, '', newUrl);
			});
		});
	});
});
