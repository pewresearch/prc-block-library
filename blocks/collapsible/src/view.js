/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const collapsibleBlocks = document.querySelectorAll(
		'.wp-block-prc-block-collapsible',
	);
	if (1 <= collapsibleBlocks.length) {
		collapsibleBlocks.forEach((elm) => {
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
