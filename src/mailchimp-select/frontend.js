/**
 * External Dependencies
 */
import { mailChimpInterests } from '@prc-app/shared';
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import FormList from './form';

domReady(() => {
	const forms = document.querySelectorAll(
		'.wp-block-prc-block-mailchimp-select',
	);
	forms.forEach((elm) => {
		const selected = elm.getAttribute('data-interests').split(',');
		render(
			<FormList
				interests={mailChimpInterests}
				selected={selected}
				allowSubmissions
			/>,
			elm,
		);
	});
});
