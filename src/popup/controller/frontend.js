/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

const show = (modal, show = true, args = {}) => {
	if ( true === show ) {
		jQuery(modal).modal('show');
	} else {
		jQuery(modal).modal(args);
	}
}

domReady(() => {
	const controllers = document.querySelectorAll('.wp-block-prc-block-popup-controller');
	if (controllers.length) {
		controllers.forEach(controller => {
			const id = controller.getAttribute('id');
			let modal = controller.querySelector(`.wp-block-prc-block-popup-modal`);
			const trigger = controller.querySelector('.wp-block-prc-block-popup-content');

			modal.setAttribute('data-trigger-id', id);
			modal = document.querySelector(`.wp-block-prc-block-popup-modal[data-trigger-id="${id}"]`);

			const initArgs = {};
			if ( true == modal.getAttribute('data-inverted') ) {
				initArgs.inverted = true;
			}

			show(modal, false, initArgs);

			jQuery(trigger).on('click', function(e) {
				e.preventDefault();
				console.log("CLICKED");
				// @TODO If this is a video modal then we should scan for the video and autoplay when opening...
				show(modal);
			});
		});
	}
});
