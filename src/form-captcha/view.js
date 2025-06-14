/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions } = store('prc-block/form-captcha', {
	callbacks: {
		onDisplayCaptcha: () => {
			const context = getContext();
			const { targetNamespace } = context;
			const targetContext = getContext(targetNamespace);
			if (!targetContext) {
				return;
			}

			const isHidden = targetContext?.captchaHidden;
			// When we reach the point of the form where the captcha should be displayed, render it.
			if (true === isHidden) {
				// "Unmount" the captcha when the form is submitted.
				return;
			}

			const { ref } = getElement();
			const target = ref.querySelector(
				'.wp-block-prc-block-form-captcha__captcha'
			);
			if (!target) {
				return;
			}
			// eslint-disable-next-line no-undef
			const { turnstile, prcFormInputCaptcha } = window;
			const key = prcFormInputCaptcha?.turnstile_key || false;
			if (false !== key) {
				turnstile.ready(() => {
					turnstile.render(target, {
						sitekey: key,
						callback: (token) => {
							console.log(`Challenge Success ${token}`);
							targetContext.captchaToken = token;
							targetContext.captchaPassed = true;
						},
					});
				});
			}
		},
	},
});
