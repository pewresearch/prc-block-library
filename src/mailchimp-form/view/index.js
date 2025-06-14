/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
const NAMESPACE = 'prc-block/mailchimp-form';
import subscribe from './subscribe';

store(NAMESPACE, {
	actions: {
		subscribe: async (fieldsForSubmission) => {
			const context = getContext();
			return new Promise(async (resolve, reject) => {
				// console.log(
				// 	'prc-block/mailchimp::view.actions.subscribe',
				// 	fieldsForSubmission,
				// 	context
				// );
				const { interest, NONCE } = context;
				if (!interest && interest.length < 1) {
					return reject({
						status: 'error',
						message: 'No interest id provided',
					});
				}
				if (!NONCE) {
					return reject({
						status: 'error',
						message: 'No nonce provided',
					});
				}
				// Get the object out of fieldsForSubmission that has the name "emailAddress"
				const emailAddress = fieldsForSubmission.find((field) =>
					['emailAddress', 'email'].includes(field.name)
				)?.value;
				// Get the object out of fieldsForSubmission that has the name "captchaToken"
				const captchaToken = fieldsForSubmission.find(
					(field) => field.name === 'captchaToken'
				)?.value;

				return subscribe({
					emailAddress,
					interest,
					captchaToken,
					NONCE,
				})
					.then((response) => {
						return resolve({
							status: 'success',
							message: 'You have been subscribed to the list.',
							data: response,
						});
					})
					.catch((e) => {
						return reject({
							status: 'error',
							message: e.message,
							data: e,
						});
					});
			});
		},
	},
});
