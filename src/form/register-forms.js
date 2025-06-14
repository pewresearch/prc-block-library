/**
 * WordPress Dependencies
 */
import { dispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import DEFAULT_FORM_TEMPLATE from './constants';

/**
 * Register the forms with prc-block/form provider.
 */
export default function registerDefaultForms() {
	dispatch('prc-block-library/forms').registerForm({
		label: 'Contact Form',
		description: 'Contact form',
		namespace: 'prc-block/form',
		action: 'sendToEmail',
		method: 'api',
		template: DEFAULT_FORM_TEMPLATE,
	});
}
