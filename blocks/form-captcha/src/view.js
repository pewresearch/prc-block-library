/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const PRODUCTION_KEY = '0x4AAAAAAAEXypGz9s3nd01Q';
const DEV_KEY = '0x4AAAAAAAPM0JJJz5nbcTZZ';

store('prc-block/form-captcha', {
	state: {
	},
	actions: {
	},
	callbacks: {
		onDisplayCaptcha: () => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace } = context;
			const targetContext = getContext(targetNamespace);
			const isHidden = targetContext.captchaHidden;
			// When we reach the point of the form where the captcha should be displayed, render it.
			if (true === isHidden) {
				// We need a way to "unmount" the captcha when the form is submitted.
				return;
			}
			const target = ref.querySelector(
				'.wp-block-prc-block-form-captcha__captcha'
			);
			if (!target) {
				return;
			}
			turnstile.ready(function () {
				turnstile.render(target, {
					sitekey: DEV_KEY,
					callback: function(token) {
						console.log(`Challenge Success ${token}`);
						targetContext.captchaToken = token;
					},
				});
			});
		},
	},
});
