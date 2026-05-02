import { store, getContext, getElement } from '@wordpress/interactivity';

const { state } = store('prc-block/entity-as-iframe', {
	state: {
		get active() {
			const context = getContext();
			return state[context.id].isActive;
		},
	},
	actions: {
		activate: () => {
			const context = getContext();
			state[context.id].isActive = !state[context.id].isActive;
		},
	},
	callbacks: {
		isActive: () => {
			return state.active;
		},
		onActivate: () => {
			const { ref } = getElement();
			const iframe = ref?.querySelector?.('iframe');

			if (!iframe) {
				return;
			}
			const context = getContext();
			if (state.active) {
				context.src = context.url;
				// prc-embeds registers `window.iFrameResize` (v5 UMD); avoid `[0]` on undefined.
				let resize = null;
				if (typeof window.iFrameResize === 'function') {
					resize = window.iFrameResize;
				} else if (typeof window.iframeResize === 'function') {
					resize = window.iframeResize;
				}
				if (resize) {
					const result = resize(
						{
							license: 'GPLv3',
							direction: 'vertical',
							heightCalculationMethod: 'taggedElement',
						},
						iframe
					);
					const fromArray =
						Array.isArray(result) && result.length > 0
							? result[0]
							: null;
					// v5 returns a frozen array of iframes; fall back to the element we passed in.
					state[context.id].resizer = fromArray ?? iframe ?? null;
				}
			} else {
				context.src = '';
				const api = iframe.iframeResizer || iframe.iFrameResizer;
				api?.disconnect?.();
				state[context.id].resizer = null;
			}
		},
	},
});
