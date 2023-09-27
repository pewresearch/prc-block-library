/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import {getQueryArg} from '@wordpress/url';

domReady(() => {
	// Get the hash from the URL
	const collapsibleId = getQueryArg(window.location.href, 'collapsibleId');
	console.log("collapsibleId: " + collapsibleId);
	const collapsibleBlocks = document.querySelectorAll(
		'.wp-block-prc-block-collapsible',
	);
	if (1 <= collapsibleBlocks.length) {
		collapsibleBlocks.forEach((elm) => {
			// If the hash matches the block ID, open the block
			if (collapsibleId === elm.id) {
				// scroll smoothly into view
				setTimeout(()=>{
					elm.scrollIntoView({behavior: 'smooth'});
					setTimeout(()=>{
						elm.classList.add('is-open');
					}, 200);
				}, 400);
			}
			const clickHandlerTarget = elm.querySelector(
				'.wp-block-prc-block-collapsible__title',
			);
			clickHandlerTarget.addEventListener('click', (e) => {
				e.preventDefault();
				elm.classList.toggle('is-open');
			});
		});
	}
});
