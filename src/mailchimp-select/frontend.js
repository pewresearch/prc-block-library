/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Form from './form';
import mailChimpInterests from '../_shared/data/mailchimp-interests';

domReady(() => {
    const forms = document.querySelectorAll('.wp-block-prc-block-mailchimp-select');
    forms.forEach(elm => {
        const selected = elm.getAttribute('data-interests').split(',');
        render(
            <Form
                interests={mailChimpInterests}
                selected={selected}
                allowSubmissions
            />,
            elm,
        );
    });
});
