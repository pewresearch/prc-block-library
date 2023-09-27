/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import loadVideoHandler from './video-handlers';

function closeModal(targetModal, provider, loadPlayer) {
	if ('vimeo' === provider && 'function' === typeof loadPlayer) {
		const p = loadPlayer();
		p.stopVideo();
	}
	targetModal.classList.remove('animate-in');
	targetModal.classList.add('animate-out');
	setTimeout(() => {
		targetModal.classList.remove('active');
		targetModal.classList.remove('animate-out');
	}, 1501);
	document.querySelector('body').classList.toggle('has-active-modal');
}

function prepareController(popupController) {
	const videoHandler = loadVideoHandler(popupController);
	const { provider, loadPlayer } = videoHandler;

	const trigger = popupController.querySelector(
		'.wp-block-prc-block-popup-content'
	);
	const modal = popupController.querySelector(
		'.wp-block-prc-block-popup-modal--outer'
	);
	const closeButton = popupController.querySelector(
		'.wp-block-prc-block-popup-modal--close-button'
	);


	closeButton.addEventListener('click', (event) => {
		event.preventDefault();
		closeModal(modal, provider, loadPlayer);
	});

	trigger.addEventListener('click', (event) => {
		event.preventDefault();
		if (!modal.classList.contains('initialized')) {
			modal.classList.add('initialized');
		}
		modal.classList.toggle('animate-in');
		setTimeout(() => {
			modal.classList.toggle('active');
			document.querySelector('body').classList.toggle('has-active-modal');
			if ('vimeo' === provider && 'function' === typeof loadPlayer) {
				const p = loadPlayer();
				setTimeout(() => {
					p.playVideo();
				}, 1250);
			}
		}, 100);
	});
}

function initControllers() {
	// Initialize all popup controllers.
	document
		.querySelectorAll('.wp-block-prc-block-popup-controller')
		.forEach((popupController) => {
			prepareController(popupController);
		});
}

function watchForOutsideClicks() {
	document.addEventListener('click', (event) => {
		const currentActiveModal = document.querySelector(
			'.wp-block-prc-block-popup-modal--outer.active.initialized'
		);
		if (!currentActiveModal) {
			return;
		}

		// Get currentActiveModal parent element and check if its class is .is-style-video.wp-block-prc-block-popup-controller
		// If it is, then we need to stop the video.
		const popupController = currentActiveModal.closest(
			'.wp-block-prc-block-popup-controller'
		);
		const modalWindow = currentActiveModal.querySelector(
			'.wp-block-prc-block-popup-modal'
		);
		if (currentActiveModal && !modalWindow.contains(event.target)) {
			let provider = false;
			let loadPlayer = false;
			if (popupController.classList.contains('is-style-video')) {
				const videoHandler = loadVideoHandler(popupController);
				provider = videoHandler?.provider;
				loadPlayer = videoHandler?.loadPlayer;
			}
			closeModal(currentActiveModal, provider, loadPlayer);
		}
	});
}

domReady(() => {
	initControllers();
	watchForOutsideClicks();
});
