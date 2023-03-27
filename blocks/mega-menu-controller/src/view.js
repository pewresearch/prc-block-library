import domReady from '@wordpress/dom-ready';

domReady(() => {
	const megaMenuControllers = document.querySelectorAll(
		'.wp-block-prc-block-mega-menu-controller'
	);

	if (megaMenuControllers) {
		megaMenuControllers.forEach((controller) => {
			controller.addEventListener('click', () => {
				controller.classList.toggle('is-active');
			});
		});
	}
});
