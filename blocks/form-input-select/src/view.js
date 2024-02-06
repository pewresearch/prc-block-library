import { store, getContext, getElement } from '@wordpress/interactivity';

store('prc-block/form-input-select', {
	actions: {
		onOpen: (event) => {
			event.preventDefault();
			const context = getContext();
			const { ref } = getElement();
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}
			const { state } = store(context.targetNamespace);
			state[id].isOpen = true;
		},
		// onClose: (event) => {
		// 	event.preventDefault();
		// 	const context = getContext();
		// 	const { ref } = getElement();
		// 	const id = ref.getAttribute('aria-controls');
		// 	if (!id) {
		// 		return;
		// 	}
		// 	const { state } = store(context.targetNamespace);
		// 	state[id].isOpen = false;
		// },
		/**
		 * When the value of the select changes, change the value in the select's interactivity context.
		 * @returns
		 */
		onSelect: () => {
			const context = getContext();
			const { ref } = getElement();
			const { dataset, innerText } = ref;
			const { wpKey } = dataset;
			console.log(ref.getAttribute('refid'));
			const id = ref.getAttribute('aria-controls');
			if (!wpKey || !innerText || !id) {
				return;
			}
			const value = wpKey;
			const { state, actions } = store(context.targetNamespace);
			state[id].value = value;
			state[id].label = innerText;
			state[id].isOpen = false;
			// actions.onSelectChange(value, ref);
		},
		onKeyUp: (event) => {
			if (event.key === 'Escape') {
				return;
			}
			const context = getContext();
			const { ref } = getElement();
			const { value } = ref;
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}
			const { state } = store(context.targetNamespace);
			if (true === state[id].isOpen) {
				const { options } = state[id];
				// check if any of the options contain the value of the input
				const matches = options.filter((option) => {
					const { label } = option;
					return label.toLowerCase().includes(value.toLowerCase());
				});
				console.log({ matches });
				console.log({ state });
				// if there are matches, set the first match to active
				if (matches.length) {
					state[id].filteredOptions = matches;
				} else {
					state[id].active = null;
				}
			}
		},
	},
	callbacks: {
		/**
		 * Watch for clicks outside the ref and if the select is open close it.
		 * @returns
		 */
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			if (!id) {
				return;
			}
			// window.addEventListener('click', (e) => {
			// 	// We call the store function directly on the click event because we need to get the latest state of the store at click time.
			// 	const { state } = store(context.targetNamespace);
			// 	if (
			// 		!ref.innerHTML.includes(e.target.innerHTML) &&
			// 		true === state[id].isOpen
			// 	) {
			// 		state[id].isOpen = false;
			// 	} else {
			// 		return;
			// 	}
			// });
		},
		onESCKey: (event) => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			if (!id) {
				return;
			}
			if (event.key === 'Escape') {
				const { state } = store(context.targetNamespace);
				if (true === state[id].isOpen) {
					event.preventDefault();
					state[id].isOpen = false;
				}
			}
		},
	},
});
