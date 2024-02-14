/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store('prc-block/form-captcha', {
	callbacks: {
		onDisplayCaptcha: () => {
			const context = getContext();
			const { targetNamespace, siteKey } = context;
			const targetContext = getContext(targetNamespace);
			const isHidden = targetContext.captchaHidden;
			// When we reach the point of the form where the captcha should be displayed, render it.
			if (true === isHidden) {
				// We need a way to "unmount" the captcha when the form is submitted.
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
			const { turnstile } = window;
			turnstile.ready(() => {
				turnstile.render(target, {
					sitekey: siteKey,
					callback: (token) => {
						console.log(`Challenge Success ${token}`);
						targetContext.captchaToken = token;
					},
				});
			});
		},
	},
});
