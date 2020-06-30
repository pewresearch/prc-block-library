import { render } from '@wordpress/element';
import MailchimpOptDown from './component';

// When the document is fully loaded load the mailchimp-form
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.mailchimp-opt-down')) {
        const elms = document.querySelectorAll('.mailchimp-opt-down',);
        // eslint-disable-next-line no-restricted-syntax
        for (const elm of elms) {
            // const props = {
            //     display: true,
            //     interest: elm.getAttribute('data-segment-id'),
            // };
            render(<MailchimpOptDown/*{...props}*/ />, elm);
        }
    }
});
