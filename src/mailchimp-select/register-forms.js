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
			label: 'MailChimp Select',
			description: 'MailChimp select',
			namespace: 'prc-block/mailchimp-select',
			action: 'subscribe',
			method: 'api',
			template: [
				[
					'prc-block/form',
					{
						namespace: 'prc-block/mailchimp-select',
						action: 'subscribe',
						interactiveNamespace: 'prc-block/mailchimp-form',
					},
					[
						[
							'prc-block/form-input-text',
							{
								label: 'Email Address',
								required: true,
								type: 'email',
								metdata: {
									name: 'emailAddress',
								},
								placeholder: 'Email Address',
							},
							[],
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
				],
			],
		},
	];
	newForms.forEach((form) => {
		dispatch('prc-block-library/forms').registerForm(form);
	});
}
