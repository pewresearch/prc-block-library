/**
 * Logo block: on Safari/WebKit, bind `img` src from context because SVG loaded via
 * `<img>` does not receive dark mode inside the image document. Other platforms
 * rely on the SVG's internal media query; the init callback no-ops there.
 */
import { store, getContext, withScope } from '@wordpress/interactivity';

/**
 * True for WebKit browsers that do not apply prefers-color-scheme inside SVG
 * `<img>` documents: all iOS browsers (Apple requires WebKit) and desktop Safari.
 * Desktop Chromium/Firefox also include "AppleWebKit" in their UA — exclude those.
 *
 * @return {boolean}
 */
function isSafariWebKit() {
	const ua = window.navigator.userAgent;
	// Every iOS browser is WebKit (CriOS/FxiOS/EdgiOS included).
	if (/iPad|iPhone|iPod/.test(ua)) {
		return true;
	}
	return (
		/AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua)
	);
}

store('prc-block/logo', {
	callbacks: {
		/**
		 * Subscribes to prefers-color-scheme on Safari/WebKit and updates
		 * context.currentSrc.
		 */
		setupSafariColorScheme: () => {
			if (!isSafariWebKit()) {
				return;
			}
			const context = getContext();
			const mq = window.matchMedia('(prefers-color-scheme: dark)');
			const apply = () => {
				context.currentSrc = mq.matches
					? context.srcDark
					: context.srcLight;
			};
			apply();
			mq.addEventListener(
				'change',
				withScope(() => {
					apply();
				})
			);
		},
	},
});
