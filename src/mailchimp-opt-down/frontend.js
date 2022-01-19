/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { mailChimpInterests } from '@pewresearch/app-components';

/**
 * Internal Dependencies
 */
import MailchimpOptDown from './component';

// When the document is fully loaded load the mailchimp-form
domReady( () => {
	if ( document.querySelector('.wp-block-prc-block-mailchimp-opt-down') && !document.querySelector('body.wp-admin') ) {
        const query = new URLSearchParams(window.location.search);
        const elms = document.querySelectorAll('.wp-block-prc-block-mailchimp-opt-down',);

        // eslint-disable-next-line no-restricted-syntax
        for (const elm of elms) {
			const props = {
				interests: mailChimpInterests.map(d => d.value),
				emailAddress: typeof query.get('email') !== 'undefined' ? query.get('email') : ``,
			};
            render(<MailchimpOptDown {...props} />, elm);
        }
    }
} );
