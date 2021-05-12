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
        console.log('MailChimpForm Init');
        const forms = document.querySelectorAll(
            '.wp-block-prc-block-mailchimp-form',
        );
        forms.forEach(elm => {
            const props = {
                display: true,
                interest: elm.getAttribute('data-segment-id'),
                blockProps: {
                    className: elm.getAttribute('class'),
                },
            };
            render(<MailchimpForm {...props} />, elm);
        });
    }
});
