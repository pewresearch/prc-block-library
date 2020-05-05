import { render } from '@wordpress/element';
import MailchimpForm from './component';

// When the document is fully loaded load the mailchimp-form
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-react-mailchimp-form')) {
        const elms = document.querySelectorAll('.js-react-mailchimp-form',);
        // eslint-disable-next-line no-restricted-syntax
        for (const elm of elms) {
            const props = {
                display: true,
                interest: elm.getAttribute('data-segment-id'),
            };
            render(<MailchimpForm {...props} />, elm);
        }
    }
});
