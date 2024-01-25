/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

function entityIframeSupport(ref) {
	const entityIframe = ref.parentElement.querySelector(
		'.wp-block-prc-block-entity-as-iframe > iframe',
	);
	if ( ! entityIframe ) {
		return;
	}
	const entityIframeId = entityIframe?.getAttribute('id');
	console.log('entityIframeId', entityIframeId);
	const {state} = store('prc-block/entity-as-iframe');
	console.log('store...', state);
	state[entityIframeId].isActive = !state[entityIframeId].isActive;
}

store('prc-block/accordion-controller', {
	actions: {
		onClick: (event) => {
			event.preventDefault();
			const context = getContext();
			const { ref } = getElement();
			const id = ref.parentElement.getAttribute('id');
			if ( ! ref || ! id ) {
				return;
			}
			const { activeId } = context;
			if ( id === activeId ) {
				context.activeId = null;
			} else {
				context.activeId = id;
			}
			// If this accordion has an entity iframe, toggle it.
			entityIframeSupport(ref);
		}
	},
	callbacks: {
		isActiveAccordion: () => {
			const { activeId } = getContext();
			const { ref } = getElement();
			if ( ! ref || ! activeId ) {
				return;
			}
			return ref.getAttribute('id') === activeId;
		}
	}
});
