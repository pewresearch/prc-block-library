import { store, getContext, getElement } from '@wordpress/interactivity';

store('prc-block/collapsible', {
	actions: {
		onClick: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
	},
	callbacks: {
		onInitScrollIntoView: () => {
			const context = getContext();
			const { ref } = getElement();
			// If the collapsible is open on init then scroll to it.
			if ( context.isOpen ) {
				setTimeout(()=> {
					ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}, 500);
			}
		}
	}
});
