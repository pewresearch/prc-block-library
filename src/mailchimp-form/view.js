/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
const NAMESPACE = 'prc-block/mailchimp-form';
const ENDPOINT = '/prc-api/v3/mailchimp/subscribe';

function submitHandler({
	emailAddress,
	captchaToken = false,
	interest = false,
	NONCE = false,
}) {
	const { apiFetch } = window.wp;
	const { isURL, buildQueryString } = window.wp.url;

	if (!captchaToken) {
		return new Error(
			"We couldn't verify you're not a robot 🤖. Please try again."
		);
	}

	const email = emailAddress;

	const url = document.URL;
	if (!isURL(url)) {
		return new Error('Invalid url', url);
	}

	const path = buildQueryString({
		email,
		captcha_token: captchaToken,
		interests: interest,
		api_key: 'mailchimp-form',
		origin_url: url,
	});

	return new Promise((resolve, reject) => {
		apiFetch.use(apiFetch.createNonceMiddleware(NONCE));
		apiFetch({
			path: `${ENDPOINT}/?${path}`,
			method: 'POST',
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

const { state, actions } = store('prc-block/mailchimp-form', {
	actions: {
		onInputChange: (event) => {
			const { value } = event.target;
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			// Store the value in the global state where we store all primitve inputs.
			state[id].value = value;
			// Also, store the value in this block's context so we can use it in the submitHandler.
			context.emailAddress = state[id].value;
		},
		onButtonClick: (event) => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			context.captchaHidden = false;
		},
		onCheckboxMouseEnter: () => {},
		onButtonMouseEnter: () => {},
		reset: (context) => {
			const { buttonId, inputId } = context;
			state[inputId].isError = false;
			state[inputId].isSuccess = false;
			state[inputId].value = '';
			state[buttonId].isError = false;
			state[buttonId].isSuccess = false;
			state[buttonId].text = state[buttonId].originalText;
			context.captchaToken = false;
			context.isError = null;
			context.isSuccess = null;
			context.messages = [];
		},
		clearMessages: () => {
			const context = getContext();
			actions.reset(context);
		},
	},
	callbacks: {
		onInit: () => {
			// Get the prc-block/mailchimp-form element
			const { ref } = getElement();
			// Get the prc-block/mailchimp-form context
			const context = getContext();
			// Look for the input element inside the prc-block/mailchimp-form element
			const input = ref.querySelector(
				'input.wp-block-prc-block-form-input-text'
			);
			// Store the ID of the input element in the prc-block/mailchimp-form context so it's aware of it's own components.
			if (input?.id) {
				context.inputId = input?.id;
			}

			// Do the same for the button.
			const button = ref.querySelector('.wp-element-button');
			if (button?.id) {
				context.buttonId = button?.id;
			}
		},
		onKeyDown: (event) => {
			const { ref } = getElement();
			const input = ref.querySelector(
				'input.wp-block-prc-block-form-input-text'
			);
			// Check if the input is focused or not, if not then do nothing...
			if (document.activeElement !== input) {
				return;
			}
			const context = getContext();
			if (event.key === 'Enter') {
				// If the user presses the enter key, then submit the form.
				actions.onButtonClick();
			}
			if (event.key === 'Escape') {
				// If the user presses the escape key, then empty the value of the input.
				state[context.inputId].value = '';
			}
		},
		// When the input value changes, watch for an email address and enable/disable the button
		onInputChange: () => {
			const context = getContext();
			const { emailAddress, buttonId } = context;
			// check if value is an email address, if it is then enable the button, otherwise disable the button.
			if (emailAddress && emailAddress.includes('@')) {
				state[buttonId].isDisabled = false;
			} else {
				state[buttonId].isDisabled = true;
			}
		},
		/**
		 * This is the callback that runs once the user clicks the button to show the captcha. When the captcha is shown, hide the form elements; when the captcha is hidden, show the form elements.
		 */
		onCaptchaDisplayHideFormElements: () => {
			const context = getContext();
			const { captchaHidden, inputId, buttonId } = context;
			if (false === captchaHidden) {
				state[inputId].isHidden = true;
				state[buttonId].isHidden = true;
			}
			if (true === captchaHidden) {
				state[inputId].isHidden = false;
				state[buttonId].isHidden = false;
			}
		},
		/**
		 * This is the callback that runs once the captcha has verified the user is not a robot and hides the captcha.
		 */
		onCaptchaVerifyHideCaptcha: () => {
			const context = getContext();
			if (false !== context.captchaToken) {
				context.captchaHidden = true;
			}
		},
		/**
		 * This is the callback that runs once the captcha has verified the user is not a robot and submits the form and subscribes the user to the designated interest.
		 */
		onCaptchaVerifyThenSubscribe: () => {
			const context = getContext();
			const {
				captchaToken,
				inputId,
				buttonId,
				emailAddress,
				interest,
				NONCE,
			} = context;

			if (false !== captchaToken) {
				state[buttonId].text = 'Subscribing...';

				submitHandler({
					emailAddress,
					interest,
					captchaToken,
					NONCE,
				})
					.then((response) => {
						context.isSuccess = true;
						// Clear the state after 10 seconds.
						setTimeout(() => {
							actions.reset(context);
						}, 10000);
					})
					.catch((e) => {
						console.error('ERROR', context, e);
						context.isError = true;
						context.messages = [
							{
								id: 'error',
								text: e.message,
							},
						];
						// Clear the error message after 10 seconds.
						setTimeout(() => {
							actions.reset(context);
						}, 10000);
					});
			}
		},
		onSuccess: () => {
			const context = getContext();
			const { isSuccess, buttonId, inputId } = context;
			// We explicitly check for null because we want to know if it's true or false, which only is set after the submitHandler runs.
			if (null !== isSuccess) {
				state[inputId].isSuccess = isSuccess;
				state[buttonId].isSuccess = isSuccess;
				if (true === isSuccess) {
					state[buttonId].text = 'Success';
				}
			}
		},
		onError: () => {
			const context = getContext();
			const { isError, buttonId, inputId } = context;
			if (null !== isError && true === isError) {
				state[inputId].isError = true;
				state[buttonId].isError = true;
				state[buttonId].text = 'Error';
			} else if (null !== isError && false === isError) {
				actions.reset(context);
			}
		},
	},
});
