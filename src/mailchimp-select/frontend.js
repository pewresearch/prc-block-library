/**
 * External Dependencies
 */
import {mailChimpInterests} from '@pewresearch/app-components';
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Form from './form';


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
