const ENDPOINT = '/prc-api/v3/mailchimp/subscribe';

const isPreviewRequest = () => {
	const params = new URLSearchParams(window.location.search);
	return params.has('preview') || params.has('preview_id');
};

export default async function subscribe({
	emailAddress,
	captchaToken = false,
	interest = false,
	formId = false,
}) {
	if (isPreviewRequest()) {
		return Promise.resolve({
			success: true,
			message: 'Preview: subscription skipped.',
		});
	}

	return new Promise((resolve, reject) => {
		const { apiFetch } = window.wp;
		const { isURL, buildQueryString } = window.wp.url;

		if (!captchaToken) {
			return new Error(
				"🙈 We couldn't verify you're not a robot 🤖. Please try again."
			);
		}

		const email = emailAddress;

		const url = document.URL;
		if (!isURL(url)) {
			return new Error('🙈 Invalid page url', url);
		}

		const queryParams = {
			email,
			captcha_token: captchaToken,
			interests: interest,
			api_key: 'mailchimp-form',
			origin_url: url,
		};

		if (formId) {
			queryParams.form_id = formId;
		}

		const path = buildQueryString(queryParams);

		apiFetch({
			path: `${ENDPOINT}/?${path}`,
			method: 'POST',
		})
			.then((response) => {
				if (response.success) {
					return resolve(response);
				}
				return reject(response);
			})
			.catch((e) => {
				return reject(e);
			});
	});
}
