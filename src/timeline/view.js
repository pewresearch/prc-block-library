/**
 * WordPress Dependencies
 */
import {
	store,
	getElement,
	getContext,
	getServerState,
	getServerContext,
	withScope,
} from '@wordpress/interactivity';

const { actions } = store('prc-block/timeline', {
	actions: {},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { id, ticks } = context;
			const slider = document.getElementById(id);
			slider.addEventListener('input', (event) => {
				const index = event.target.value;
				const tick = ticks[index];
				context.activeTickId = tick.id;
			});
		},
		isTimlineSlideActive: () => {
			const context = getContext();
			const { id, activeTickId } = context;
			return id === activeTickId;
		},
		isTickActive: () => {
			const { context } = getContext();
			const { tick, activeTickId } = context;
			const { id } = tick;
			return id === activeTickId;
		},
	},
});
