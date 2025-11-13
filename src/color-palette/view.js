/**
 * WordPress Dependencies
 */
import { store, getContext, withScope } from '@wordpress/interactivity';

const { state } = store('prc-block/color-palette', {
	state: {
		get colorPalette() {
			return state.colorPalette || {};
		},
	},
	actions: {
		copyToClipboard: () => {
			const context = getContext();
			if (context.disallowCopy) {
				return;
			}
			
			if (context.hex) {
				navigator.clipboard.writeText(context.hex);
				context.clicked = true;
				
				setTimeout(
					withScope(() => {
						context.clicked = false;
					}),
					2000
				);
			}
		},
		showTooltip: () => {
			const context = getContext();
			context.visible = true;
		},
		hideTooltip: () => {
			const context = getContext();
			context.visible = false;
		},
	},
	callbacks: {
		initColor: () => {
			const context = getContext();
			// If hex is already set from server-side rendering, no need to fetch
			if (!context.hex && context.colorSlug && state.colorPalette) {
				context.hex = state.colorPalette[context.colorSlug] || null;
			}
		},
	},
});
