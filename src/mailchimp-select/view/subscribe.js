const ENDPOINT = '/prc-api/v3/mailchimp/subscribe';

export default async function subscribe({
	emailAddress,
	captchaToken = false,
	interests = [],
	NONCE = false,
}) {
	const { apiFetch } = window.wp;
	const { isURL, buildQueryString } = window.wp.url;
	return new Promise((resolve, reject) => {
		if (!captchaToken) {
			return reject(
				new Error(
					"We couldn't verify you're not a robot 🤖. Please try again."
				)
			);
		}

		const url = document.URL;
		if (!isURL(url)) {
			return reject(new Error('Invalid url', url));
		}
		apiFetch.use(apiFetch.createNonceMiddleware(NONCE));
		apiFetch({
			path: ENDPOINT,
			method: 'POST',
			data: {
				email: emailAddress,
				captcha_token: captchaToken,
				interests: interests.join(','),
				api_key: 'mailchimp-select',
				origin_url: url,
			},
		})
			.then((response) => {
				if (response.success) {
					resolve(response);
				} else {
					reject(response);
				}
			})
			.catch((e) => {
				reject(e);
			});
	});
}
