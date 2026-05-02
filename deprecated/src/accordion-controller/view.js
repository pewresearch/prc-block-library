/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

function entityIframeSupport(ref) {
	const entityIframe = ref.parentElement.querySelector(
		'.wp-block-prc-block-entity-as-iframe > iframe'
	);
	if (!entityIframe) {
		return;
	}
	const entityIframeId = entityIframe?.getAttribute('id');
	console.log('entityIframeId', entityIframeId);
	const { state } = store('prc-block/entity-as-iframe');
	console.log('entityStore...', state);
	state[entityIframeId].isActive = !state[entityIframeId].isActive;
}

store('prc-block/accordion-controller', {
	actions: {
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const id = ref.parentElement.getAttribute('id');
			if (!ref || !id) {
				return;
			}
			const context = getContext();
			const { activeId } = context;
			if (id === activeId) {
				context.activeId = null;
			} else {
				context.activeId = id;
			}
			// Set the hash on the url.
			window.location.hash = id;
			// Scroll to the top of the accordion after a 100ms delay.
			setTimeout(() => {
				ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
			// If this accordion has an entity iframe, toggle it.
			entityIframeSupport(ref);
		},
	},
	callbacks: {
		onInit: () => {
			// Get the id's of the section elements inside the accordion.
			const { ref } = getElement();
			const sections = ref.querySelectorAll('section');
			const sectionIds = Array.from(sections).map((section) =>
				section.getAttribute('id')
			);
			// Check if the url hash is one of the section ids, if so, set the activeId to that id.
			const { hash } = window.location;
			if (hash) {
				const id = hash.slice(1);
				if (sectionIds.includes(id)) {
					getContext().activeId = id;
				}
			}
		},
		isActiveAccordion: () => {
			const { activeId } = getContext();
			const { ref } = getElement();
			if (!ref || !activeId) {
				return;
			}
			return ref.getAttribute('id') === activeId;
		},
	},
});
