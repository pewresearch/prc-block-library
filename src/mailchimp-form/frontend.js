import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import MailchimpForm from './component';

// When the document is fully loaded load the mailchimp-form.
domReady(() => {
    if (document.querySelector('.js-react-mailchimp-form')) {
        const elms = document.querySelectorAll('.js-react-mailchimp-form');
        elms.forEach(elm => {
            const props = {
                display: true,
                interest: elm.getAttribute('data-segment-id'),
                className: elm.getAttribute('data-style'),
            };
            render(<MailchimpForm {...props} />, elm);
        });
    }
});
