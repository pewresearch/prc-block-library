/**
 * WordPress Dependencies
 */

import { CardBody } from '@wordpress/components';
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
			const closeButton = popupController.querySelector(
				'.wp-block-prc-block-popup-modal--close-button',
			);

			closeButton.addEventListener('click', (event) => {
				event.preventDefault();
				modal.classList.remove('active');
				document.querySelector('body').classList.remove('has-active-modal');
			});

			// modal.addEventListenter('click', (event) => {
			// 	if (
			// 		event.target === modal &&
			// 		event.target.classList.contains('active')
			// 	) {
			// 		modal.classList.remove('active');
			// 	}
			// });

			trigger.addEventListener('click', (event) => {
				event.preventDefault();
				console.log('trigger clicked');
				if (!modal.classList.contains('initialized')) {
					modal.classList.add('initialized');
				}
				setTimeout(() => {
					modal.classList.toggle('active');
					document.querySelector('body').classList.toggle('has-active-modal');
				}, 100);
			});
		});

	// Watch for clicks outside of the modal to close.
	document.addEventListener('click', (event) => {
		const activeModal = document.querySelector(
			'.wp-block-prc-block-popup-modal--outer.active.initialized',
		);
		const modalWindow = document.querySelector(
			'.wp-block-prc-block-popup-modal',
		);
		if (activeModal && !modalWindow.contains(event.target)) {
			activeModal.classList.remove('active');
			document.querySelector('body').classList.remove('has-active-modal');
		}
	});
});
