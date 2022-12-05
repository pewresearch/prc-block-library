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
				const isCaret = icon.classList.contains('caret');

				elm.classList.toggle('is-open');
				// if icon has a class of plus then change to minus
				if (isCaret && icon.classList.contains('right')) {
					icon.classList.remove('right');
					icon.classList.add('down');
				} else if (isCaret && icon.classList.contains('down')) {
					icon.classList.remove('down');
					icon.classList.add('right');
				} else if (!isCaret && icon.classList.contains('plus')) {
					icon.classList.remove('plus');
					icon.classList.add('minus');
				} else if (!isCaret && icon.classList.contains('minus')) {
					icon.classList.remove('minus');
					icon.classList.add('plus');
				}
			});
		});
	}
});
