/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

store('prc-block/breadcrumbs', {
	actions: {
		toggle: withSyncEvent((event) => {
			event.preventDefault();
			event.stopPropagation();
			const context = getContext();
			context.isOpen = !context.isOpen;
		}),
		closeOnOutsideClick: withSyncEvent((event) => {
			const context = getContext();
			if (!context.isOpen) {
				return;
			}
			const { ref } = getElement();
			if (ref && !ref.contains(event.target)) {
				context.isOpen = false;
			}
		}),
		closeOnEscape: withSyncEvent((event) => {
			if (event.key !== 'Escape') {
				return;
			}
			const context = getContext();
			if (!context.isOpen) {
				return;
			}
			context.isOpen = false;
			const { ref } = getElement();
			const active = ref?.ownerDocument?.activeElement;
			if (
				active &&
				ref?.contains(active) &&
				typeof active.blur === 'function'
			) {
				active.blur();
			}
		}),
		closeOnSubnavClick: withSyncEvent((event) => {
			const context = getContext();
			if (!context.isOpen) {
				return;
			}
			const link = event.target.closest('a');
			if (!link || !event.currentTarget.contains(link)) {
				return;
			}
			context.isOpen = false;
			const { ref } = getElement();
			const dropdownItem = ref?.closest(
				'.prc-block-breadcrumbs__item.has-dropdown'
			);
			const active = ref?.ownerDocument?.activeElement;
			if (
				active &&
				dropdownItem?.contains(active) &&
				typeof active.blur === 'function'
			) {
				active.blur();
			}
		}),
	},
});
