/**
 * WordPress Dependencies
 */
import { dispatch } from '@wordpress/data';

/**
 * Register the forms with prc-block/form provider.
 */
export default function registerForms() {
	const newForms = [
		{
			label: 'MailChimp Form',
			description:
				'MailChimp form (deprecated — use Form block Newsletter Signup variation)',
			namespace: 'prc-block/mailchimp-form',
			action: 'subscribe',
			method: 'api',
			hidden: true,
			template: [
				[
					'prc-block/form-input-text',
					{
						type: 'email',
						label: 'Email Address',
						required: true,
						placeholder: 'Enter your email',
						metadata: {
							name: 'emailAddress',
						},
					},
				],
				['prc-block/form-submit', {}],
				[
					'prc-block/form-message',
					{},
					[
						[
							'core/paragraph',
							{
								content: 'Thank you for subscribing!',
							},
						],
					],
				],
			],
		},
	];
	newForms.forEach((form) => {
		dispatch('prc-block-library/forms').registerForm(form);
	});
}
