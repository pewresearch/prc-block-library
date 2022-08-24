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
				const icon = clickHandlerTarget.querySelector(
					'.wp-block-prc-block-collapsible__icon > .icon',
				);
				elm.classList.toggle('is-open');
				// if icon has a class of plus then change to minus
				if (icon.classList.contains('plus')) {
					icon.classList.remove('plus');
					icon.classList.add('minus');
				} else {
					icon.classList.remove('minus');
					icon.classList.add('plus');
				}
			});
		});
	}
});
