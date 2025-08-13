/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { state, actions } = store('prc-block/progress-bar', {
	state: {
		get barStyle() {
			const context = getContext();
			console.log('barStyle context', context);
			const { blockId } = context;
			console.log('barStyle attributes', state);
			const { value, maxValue, barHeight, barColor } = state[blockId];
			const width = (value / maxValue) * 100;
			return `height: ${barHeight}px; width: ${width}%; background-color: var(--wp--preset--color--${barColor});`;
		},
		get value() {
			const context = getContext();
			const { blockId } = context;
			const { value } = state[blockId];
			return value;
		},
	},
	actions: {},
	callbacks: {},
});
