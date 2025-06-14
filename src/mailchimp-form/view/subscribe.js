const ENDPOINT = '/prc-api/v3/mailchimp/subscribe';

export default async function subscribe({
	emailAddress,
	captchaToken = false,
	interest = false,
	NONCE = false,
}) {
	console.log('🐵 subscribe', {
		emailAddress,
		captchaToken,
		interest,
		NONCE,
	});
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

		const path = buildQueryString({
			email,
			captcha_token: captchaToken,
			interests: interest,
			api_key: 'mailchimp-form',
			origin_url: url,
		});

		// Setup the nonce middleware.
		apiFetch.use(apiFetch.createNonceMiddleware(NONCE));

		apiFetch({
			path: `${ENDPOINT}/?${path}`,
			method: 'POST',
		})
			.then((response) => {
				if (response.success) {
					console.log('🐵 MailChimp success', response);
					return resolve(response);
				} else {
					console.error('🙊 MailChimp reject', response);
					return reject(response);
				}
			})
			.catch((e) => {
				console.error('🙊 MailChimp error', e);
				return reject(e);
			});
	});
}
