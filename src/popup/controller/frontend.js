/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { getQueryArg, addQueryArgs, removeQueryArgs } from '@wordpress/url';
// This script gets included automatically by the vimeo/create block. We can use it as we would importing it.
const Vimeo = window.hasOwnProperty('Vimeo') ? window.Vimeo : false;

const show = (modal, show = true, args = {}) => {
	if ( true === show ) {
		jQuery(modal).modal('show');
	} else {
		jQuery(modal).modal(args);
	}
}

const startController = () => {
	const originalUrl = window.location.href;
	const controllers = document.querySelectorAll('.wp-block-prc-block-popup-controller');
	if (controllers.length) {
		controllers.forEach(controller => {
			// Setup the controller block.
			const id = controller.getAttribute('id');
			let modal = controller.querySelector(`.wp-block-prc-block-popup-modal`);
			const trigger = controller.querySelector('.wp-block-prc-block-popup-content');
			const initArgs = {};

			// Give the modal an attribute to identify its controller abd set the variable to it. This will work as the modal travereses the DOM.
			modal.setAttribute('data-trigger-id', id);
			modal = document.querySelector(`.wp-block-prc-block-popup-modal[data-trigger-id="${id}"]`);

			if ( modal.getAttribute('data-transition') ) {
				initArgs.transition = modal.getAttribute('data-transition');
			}

			const isVideo = modal.classList.contains('is-style-video');

			// Determine if the modal has a Vimeo iframe and if so set player accordingly.
			let player = false;
			let iframe = false;
			if ( true === isVideo && false !== Vimeo && Vimeo.hasOwnProperty('Player') ) {
				iframe = modal.querySelector('iframe');
				console.log("iframes found...", iframe);
				if ( null !== iframe ) {
					iframe.setAttribute('allow', 'autoplay');
					player = new Vimeo.Player(iframe);
					// May need to reload the iframe to allow autoplay.

				}
			}

			// If the modal is set to have a whtie background then set the modal to be inverted.
			if ( true == modal.getAttribute('data-inverted') ) {
				initArgs.inverted = true;
			}

			// If the modal has a Vimeo player, set it up.
			if ( false !== player ) {
				// When mouse enters the trigger zone console.log('mouseenter');
				trigger.addEventListener('mouseenter', () => {
					player.ready().then(() =>{
						// the player is ready
						console.log('the player is ready');
					});
				});

				// When the modal is shown, start the video.
				initArgs.onVisible = () => {
					window.history.pushState('modal', 'Modal', `#${id}`);

					player.play().then(() =>{
						console.log('the video was played');
					}).catch(function(error) {
						console.log('error...', error);
						switch (error.name) {
							case 'PasswordError':
								// the video is password-protected and the viewer needs to enter the
								// password first
								break;

							case 'PrivacyError':
								// the video is private
								break;

							default:
								// some other error occurred
								break;
						}
					});
				}

				// When the modal is hidden, reset the video to its original state.
				initArgs.onHidden = () => {
					window.history.back()

					player.unload().then(() => {
						console.log('the video was unloaded');
					}).catch((error) => {
						switch (error.name) {
							case 'PasswordError':
								// the video is password-protected and the viewer needs to enter the
								// password first
								break;

							case 'PrivacyError':
								// the video is private
								break;

							default:
								// some other error occurred
								break;
						}
					});
				}

				// Here we can do some analytic actions?
				player.on('play', () => {
					console.log('played the video!');
					// Send some event to GA?
				});
			} else {
				initArgs.onVisible = () => {
					window.history.pushState('modal', 'Modal', `#${id}`);
				};
				initArgs.onHidden = () => {
					window.history.back()
				};
			}

			// Initialize modals.
			show(modal, false, initArgs);

			// If the end of the url is a hash and that hash matches the id then show the modal.
			if ( window.location.hash === `#${id}` ) {
				console.log("Auto hash...");
				setTimeout(()=>{
					show(modal);
				}, 500);
			}

			// When the trigger is clicked, show the modal.
			jQuery(trigger).on('click', (e) => {
				e.preventDefault();
				show(modal);
			});
		});
	}
}

domReady(() => {
	startController();
});
