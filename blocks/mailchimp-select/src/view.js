/**
 * WordPress Dependencies
 */
import { store, getElement, getContext } from "@wordpress/interactivity";

/**
 * Internal Dependencies
 */
const NAMESPACE = 'prc-block/mailchimp-select';
const ENDPOINT = '/prc-api/v3/mailchimp/subscribe';

const {state} = store( 'prc-block/mailchimp-select', {
	state: {},
	actions: {
		onInputChange: (event) => {
			const {value} = event.target;
			const context = getContext();
			const {ref} = getElement();
			const {id} = ref;
			// Store the value in the global state where we store all primitve inputs.
			state[id].value = value;
			// Also, store the value in this block's context so we can use it in the submitHandler.
			context.emailAddress = state[id].value;
		},
		onButtonClick: (event) => {
			const context = getContext();
			const {ref} = getElement();
			const {id} = ref;
			context.captchaHidden = false;
		},
		onCheckboxClick: (event) => {
			if ( event.target.tagName === 'LABEL' ) {
				event.preventDefault();
			}
			const context = getContext();
			const {ref} = getElement();
			const input = ref.querySelector('input');
			const {id} = input;
			const {checked, value, type} = state[id];

			state[id].checked = !checked;

			const index = context.interests.indexOf(value);
			if (index > -1) {
				context.interests.splice(index, 1);
			} else {
				context.interests.push(value);
			}

			console.log('onCheckboxClick', ref, state, id, context);
		},
		onCheckboxMouseEnter: () => {
			console.log('prc-block/mailchimp-select', 'onCheckboxMouseEnter');
		},
		onButtonMouseEnter: () => {
			console.log('prc-block/mailchimp-select', 'onButtonMouseEnter');
		}
	},
	callbacks: {
		onInit: () => {
			const {ref} = getElement();
			const context = getContext();

			const input = ref.querySelector('input.wp-block-prc-block-form-input-text');
			if (input?.id) {
				context.inputId = input?.id;
			}
			const button = ref.querySelector('.wp-element-button');
			if (button?.id) {
				context.buttonId = button?.id;
			}
			console.log("prc-block/mailchimp-select -> onInit", context);
		},
		onInputChange: () => {
			// An exercise in how concise can we make this function.
			const {emailAddress, buttonId} = getContext();
			state[buttonId].isDisabled = emailAddress && emailAddress.includes('@') ? false : true;
		},
		// This is the callback that runs once the captcha has verified the user is not a robot.
		onCaptchaVerify: () => {
			const context = getContext();
			const { NONCE, captchaToken, captchaHidden } = context;
			const isCaptchaVisible = !captchaHidden;

			if (!isCaptchaVisible) {
				return;
			}

			if (!captchaToken) {
				return;
			}

			console.log("onCaptchaVerify", context);

			const apiFetch = window.wp.apiFetch;
			const { isURL, buildQueryString } = window.wp.url;

			const url = document.URL;

			if (!isURL(url)) {
				return new Error('Invalid url', url);
			}

			apiFetch({
				path: ENDPOINT,
				method: 'POST',
				data: {
					email: context.emailAddress,
					captcha_token: captchaToken,
					interests: context?.interests.join(','),
					api_key: 'mailchimp-select',
					origin_url: url,
					_wpnonce: NONCE,
				},
			}).then((response) => {
				context.isSuccess = true;
				console.log("SUCCESS", response, context);
			}).catch((e) => {
				context.isError = true;
				console.error("ERROR", e, context);
			});
		},
		onSuccess: () => {
			const context = getContext();
			const {isSuccess, buttonId, inputId} = context;
			if ( null !== isSuccess ) {
				state[inputId].isSuccess = isSuccess;
				state[buttonId].isSuccess = isSuccess;
				if ( true === isSuccess ) {
					state[buttonId].text = 'Success';
				}
			}
		},
		onError: () => {
			const context = getContext();
			const {isError, buttonId, inputId} = context;
			if ( null !== isError ) {
				state[inputId].isError = isError;
				state[buttonId].isError = isError;
				if ( true === isError ) {
					state[buttonId].text = 'Error';
				}
			}
		}
	},
} );

