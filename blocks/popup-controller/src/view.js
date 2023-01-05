/**
 * WordPress Dependencies
 */

import domReady from '@wordpress/dom-ready';

domReady(() => {
	// Initialize triggers, add click event listener to each trigger. Then watch for clicks outside of the modal to close.
	document
		.querySelectorAll('.wp-block-prc-block-popup-controller')
		.forEach((popupController) => {
			const trigger = popupController.querySelector(
				'.wp-block-prc-block-popup-content',
			);
			const modal = popupController.querySelector(
				'.wp-block-prc-block-popup-modal--outer',
			);

			modal.addEventListenter('click', (event) => {
				if (
					event.target === modal &&
					event.target.classList.contains('active')
				) {
					modal.classList.remove('active');
				}
			});

			trigger.addEventListener('click', (event) => {
				event.preventDefault();
				console.log('trigger clicked');
				if (!modal.classList.contains('initialized')) {
					modal.classList.add('initialized');
				}
				modal.classList.toggle('active');
			});
		});
});
