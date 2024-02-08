import { store, getContext, getElement } from '@wordpress/interactivity';

const setOptionActive = (id, refid) => {
	const listbox = document.getElementById(`listbox-${id}`);
	const option = listbox.querySelector(`[refid="${refid}"]`);
	if (option) {
		option.setAttribute('aria-selected', true);
		option.focus();
		// set all siblings to false
		const siblings = option.parentElement.children;
		for (let i = 0; i < siblings.length; i++) {
			if (siblings[i] !== option) {
				siblings[i].setAttribute('aria-selected', false);
			}
		}
	}
};

const moveThroughOptions = (direction, id) => {
	const { state } = store('prc-block/form-input-select');
	const context = getContext();
	const { activeId } = context;
	console.log({ context });
	const { filteredOptions } = state[id];
	let nextActive = null;
	if (activeId === null || isNaN(activeId)) {
		nextActive = 0;
	} else {
		nextActive = activeId + direction;
	}
	if (nextActive < 0) {
		nextActive = filteredOptions.length - 1;
	}
	if (nextActive >= filteredOptions.length) {
		nextActive = 0;
	}
	context.activeId = nextActive;
	const highlightedOption = filteredOptions[nextActive];
	setOptionActive(id, highlightedOption.value);
};

const setValueOnEnter = (id, state) => {
	const context = getContext();
	const { activeId } = context;
	const { filteredOptions, options } = state[id];
	console.log({ id });
	console.log(state[id]);
	console.log({ activeId });
	const highlightedOption = filteredOptions[activeId];
	if (highlightedOption) {
		state[id].value = highlightedOption.value;
		state[id].label = highlightedOption.label;
		state[id].isOpen = false;
		state[id].filteredOptions = options;
		context.value = highlightedOption.value;
		document.getElementById(`${id}-input`).value = highlightedOption.label;
	}
};

const { state } = store('prc-block/form-input-select', {
	actions: {
		onOpen: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}
			state[id].isOpen = true;
		},
		onSelect: () => {
			const { ref } = getElement();
			// get parent with class 'wp-block-prc-block-form-input-select'
			const id = ref.getAttribute('aria-controls');
			const value = ref.getAttribute('refid');

			setOptionActive(id, value);

			const { options } = state[id];
			const selectedOption = options.find(
				(option) => option.value === value
			);
			if (!selectedOption) {
				return;
			}
			const context = getContext();
			context.value = selectedOption.value;
			state[id].value = selectedOption.value;
			state[id].label = selectedOption.label;
			state[id].isOpen = false;
			document.getElementById(`${id}-input`).value = selectedOption.label;
			// actions.onSelectChange(value, ref);
		},
		onKeyUp: (event) => {
			event.preventDefault();

			const { ref } = getElement();
			const { value } = ref;
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}

			if (event.key === 'Escape') {
				return;
			}
			state[id].isOpen = true;
			if (event.key === 'Enter') {
				setValueOnEnter(id, state);
			}
			if (event.keyCode === 40 && event.key === 'ArrowDown') {
				moveThroughOptions(1, id);
				return;
			}
			if (event.keyCode === 38 && event.key === 'ArrowUp') {
				moveThroughOptions(-1, id);
				return;
			}

			const { options } = state[id];

			// check if any of the options contain the value of the input
			const matches = options.filter((option) => {
				const { label } = option;
				return label.toLowerCase().includes(value.toLowerCase());
			});
			// if there are matches, set the first match to active

			if (matches.length) {
				state[id].filteredOptions = matches;
				setOptionActive(id, matches[0].value);
			} else {
				state[id].filteredOptions = options;
				state[id].active = null;
			}
		},
		onClear: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}
			state[id].value = '';
			state[id].label = '';
			state[id].isOpen = false;
			document.getElementById(`${id}-input`).value = '';
		},
	},
	callbacks: {
		/**
		 * Watch for clicks outside the ref and if the select is open close it.
		 *
		 * @return
		 */
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			console.log({ context });
			console.log({ state });
			if (!id) {
			}
			window.addEventListener('click', (e) => {
				// We call the store function directly on the click event because we need to get the latest state of the store at click time.
				// const { state } = store(context.targetNamespace);
				if (
					!ref.innerHTML.includes(e.target.innerHTML) &&
					true === state[id].isOpen
				) {
					state[id].isOpen = false;
				} else {
				}
			});
		},
		onValueChange: () => {
			const context = getContext();
			const { value, targetNamespace } = context;
			console.log('something is happening');
			if (value) {
				const { actions } = store(targetNamespace);
				if (actions.onSelectChange) {
					console.log('PUSH', value, 'to', targetNamespace, context);
					actions.onSelectChange(value);
				}
			}
		},
		onESCKey: (event) => {
			const { ref } = getElement();
			const { id } = ref;
			if (!id) {
				return;
			}
			if (event.key === 'Escape') {
				if (true === state[id].isOpen) {
					event.preventDefault();
					state[id].isOpen = false;
					return;
				}
				const context = getContext();
				context.activeId = 0;
				state[id].value = '';
				state[id].label = '';
				state[id].isOpen = false;
				document.getElementById(`${id}-input`).value = '';
			}
		},
	},
});
