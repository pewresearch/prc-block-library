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
			const context = getContext();
			const { ref } = getElement();
			if (state.active) {
				context.src = context.url;
				state[context.id].resizer = iFrameResize(
					{
						bodyMargin: 0,
						bodyPadding: 0,
						heightCalculationMethod: 'taggedElement',
					},
					ref.querySelector('iframe')
				)[0];
			} else {
				context.src = '';
				state[context.id].resizer?.iFrameResizer.removeListeners();
			}
		},
	},
});
