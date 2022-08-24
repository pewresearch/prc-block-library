/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(() => {
	const collapsibleBlocks = document.querySelectorAll(
		'.wp-block-prc-block-collapsible',
	);
	if (1 <= collapsibleBlocks.length) {
		console.log("Collapsible blocks found", collapsibleBlocks);
		collapsibleBlocks.forEach((elm) => {
			const clickHandlerTarget = elm.querySelector(
				'.wp-block-prc-block-collapsible__title',
			);
			console.log("clickHandlerTarget", clickHandlerTarget);
			clickHandlerTarget.addEventListener('click', (e) => {
				e.preventDefault();
				console.log("clickHandlerTarget", clickHandlerTarget);
				elm.classList.toggle('is-open');
			});
		});
	}
});
