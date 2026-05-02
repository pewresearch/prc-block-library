/**
 * Logo block: on iOS Safari, bind `img` src from context because SVG loaded via
 * `<img>` does not receive dark mode inside the image document. Other platforms
 * rely on the SVG's internal media query; the init callback no-ops there.
 */
import { store, getContext, withScope } from '@wordpress/interactivity';

function isIos() {
	return /iPad|iPhone|iPod/.test(window.navigator.userAgent);
}

store('prc-block/logo', {
	callbacks: {
		/**
		 * Subscribes to prefers-color-scheme on iOS only and updates context.currentSrc.
		 */
		setupIosColorScheme: () => {
			if (!isIos()) {
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
