import { store, getContext, getElement } from '@wordpress/interactivity';

store('prc-block/collapsible', {
	actions: {
		onClick: () => {
			const context = getContext();
			console.log('onClick', context);
			context.isOpen = !context.isOpen;
		},
	},
	callbacks: {
		onInitScrollIntoView: () => {
			const context = getContext();
			const { ref } = getElement();
			// If the collapsible is open on init then scroll to it.
			if (context.isOpen) {
				console.log('scrolling...', context);
				setTimeout(() => {
					ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}, 500);
			}
		},
	},
});
