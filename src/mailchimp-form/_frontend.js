/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import MailchimpForm from './component';
import './style.scss';

// When the document is fully loaded load the mailchimp-form.
domReady(() => {
	if (document.querySelector('.wp-block-prc-block-mailchimp-form')) {
		const forms = document.querySelectorAll(
			'.wp-block-prc-block-mailchimp-form',
		);
		forms.forEach((elm) => {
			const props = {
				display: true,
				interest: elm.getAttribute('data-segment-id'),
				buttonColor: elm.getAttribute('data-button-color'),
				hasDarkBackground: elm.getAttribute('data-has-dark-bg'),
				blockProps: {
					className: elm.getAttribute('class'),
				},
			};
			render(<MailchimpForm {...props} />, elm);
		});
	}
});