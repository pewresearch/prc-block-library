import { render } from '@wordpress/element';
import MailchimpOptDown from './component';

// When the document is fully loaded load the mailchimp-form
window.onload = () => {
    if (document.querySelector('.mailchimp-opt-down')) {
        const query = new URLSearchParams(window.location.search);
        const elms = document.querySelectorAll('.mailchimp-opt-down',);

        // eslint-disable-next-line no-restricted-syntax
        for (const elm of elms) {
             const props = {
                 interests: window.prcMailchimpBlock.interests,
                 emailAddress: typeof query.get('email') !== 'undefined' ? query.get('email') : ``,
             };
            render(<MailchimpOptDown {...props} />, elm);
        }
    }
};
  
