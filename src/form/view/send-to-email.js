// WIP: This is a work in progress.
export default async function sendToEmail(contextInfo) {
	return new Promise((resolve, reject) => {
		const email = contextInfo.find((item) => item.type === 'email');
		if (!email) {
			reject({
				message: 'Email field not found',
				data: null,
				status: 'error',
			});
		}
		const message = contextInfo.find((item) => item.name === 'message');
		if (!message) {
			reject({
				message: 'Message field not found',
				data: null,
				status: 'error',
			});
		}

		const name = contextInfo.find((item) => item.name === 'name');
		if (!name) {
			reject({
				message: 'Name field not found',
				data: null,
				status: 'error',
			});
		}

		const nonce = contextInfo.find((item) => item.type === 'nonceToken');
		if (!nonce) {
			reject({
				message: 'Nonce field not found',
				data: null,
				status: 'error',
			});
		}

		try {
			const response = fetch(window.location.href, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify({
					_wpnonce: nonce.value,
					email: email.value,
					message: message.value,
					name: name.value,
				}),
			});
			if (response.ok) {
				resolve({
					message: 'Email sent successfully!',
					data: response,
					status: 'success',
				});
			} else {
				reject({
					message:
						response?.message ||
						'Error sending email. Please try again.',
					data: response,
					status: 'error',
				});
			}
		} catch (error) {
			reject({
				message:
					error?.message || 'Error sending email. Please try again.',
				data: error,
				status: 'error',
			});
		}
	});
}
