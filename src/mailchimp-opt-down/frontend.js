/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import MailchimpOptDown from './component';

// When the document is fully loaded load the mailchimp-form
domReady( () => {
	if ( document.querySelector('.wp-block-prc-block-mailchimp-opt-down') && !document.querySelector('body.wp-admin') ) {
        const elms = document.querySelectorAll('.wp-block-prc-block-mailchimp-opt-down',);

        // eslint-disable-next-line no-restricted-syntax
        for (const elm of elms) {
            render(<MailchimpOptDown/>, elm);
        }
    }
} );
