/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

const TARGET = '.wp-block-prc-block-accordion-controller';

domReady(() => {
	const controllers = document.querySelectorAll(TARGET);
	controllers.forEach((accordionController) => {
		const accordions = accordionController.querySelectorAll(
			'.wp-block-prc-block-accordion',
		);
		accordions.forEach((accordion) => {
			const toggle = accordion.querySelector(
				'.wp-block-prc-block-accordion--title',
			);
			const content = accordion.querySelector(
				'.wp-block-prc-block-accordion--content',
			);
			toggle.addEventListener('click', () => {
				// if accordion is already active, close it
				if (accordion.classList.contains('is-active')) {
					accordion.classList.remove('is-active');
					content.classList.remove('is-open');
					return;
				}

				// look for already is-active accordion and close it
				accordions.forEach((acc) => {
					if (acc.classList.contains('is-active')) {
						acc.classList.remove('is-active');
						acc
							.querySelector('.wp-block-prc-block-accordion--content')
							.classList.remove('is-open');
					}
				});

				// toggle accordion
				accordion.classList.toggle('is-active');
				content.classList.toggle('is-open');
			});
		});
	});
});
