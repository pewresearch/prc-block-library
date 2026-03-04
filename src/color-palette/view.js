/**
 * WordPress Dependencies
 */
import { store, getContext, withScope } from '@wordpress/interactivity';

store('prc-block/color-palette', {
	actions: {
		copyToClipboard: () => {
			const context = getContext();
			if (context.hex) {
				navigator.clipboard.writeText(context.hex);
				context.copied = true;

				setTimeout(
					withScope(() => {
						context.copied = false;
					}),
					2000
				);
			}
		},
	},
});
