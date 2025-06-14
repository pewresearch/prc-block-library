/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
const NAMESPACE = 'prc-block/mailchimp-select';
import subscribe from './subscribe';

const { state, actions } = store(NAMESPACE, {
	actions: {
		subscribe: async (fieldsForSubmission) => {
			const { NONCE } = getContext();
			// Get the object out of fieldsForSubmission that has the name "emailAddress"
			const emailAddress = fieldsForSubmission.find((field) =>
				['emailAddress', 'email'].includes(field.name)
			)?.value;
			// Get the object out of fieldsForSubmission that has the name "captchaToken"
			const captchaToken = fieldsForSubmission.find(
				(field) => field.name === 'captchaToken'
			)?.value;
			// Get the object out of fieldsForSubmission that has the name "interest"
			const interests = fieldsForSubmission
				.filter((field) => field.type === 'checkbox')
				.map((field) => field.value);
			const result = await subscribe({
				emailAddress,
				interests,
				captchaToken,
				NONCE,
			})
				.then((response) => {
					return {
						status: 'success',
						message:
							'You have been subscribed to the selected lists.',
						data: response,
					};
				})
				.catch((e) => {
					return {
						status: 'error',
						message: e.message,
						data: e,
					};
				});

			return result;
		},
	},
	callbacks: {},
});
