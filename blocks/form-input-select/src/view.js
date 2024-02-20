/* eslint-disable @wordpress/no-unused-vars-before-return */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/form-input-select', {
	actions: {
		moveThroughOptions: (direction, id) => {
			const context = getContext();
			const { activeId, filteredOptions, options } = context;
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
			const highlightedOption = options[nextActive];
			actions.setOptionActive(id, highlightedOption.value);
		},
		setOptionActive: (id, refid) => {
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
		},
		setValueOnEnter: (id) => {
			console.log('setting value on enter');
			const context = getContext();
			const { targetNamespace } = context;
			const { state: targetState } = store(targetNamespace);
			const highlightedOption = context.filteredOptions[context.activeId];
			context.filteredOptions = context.options;
			context.value = highlightedOption.value;
			context.label = highlightedOption.label;
			targetState[id].value = highlightedOption.value;
			targetState[id].isOpen = false;
			document.getElementById(`${id}-input`).value =
				highlightedOption.label;
		},
		onOpen: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace } = context;
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}

			const { state: targetState } = store(targetNamespace);
			targetState[id].isOpen = true;
		},
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const context = getContext();
			console.log('setting value on click', context, ref);
			const { options, targetNamespace } = context;
			const { state: targetState } = store(targetNamespace);
			// get parent with class 'wp-block-prc-block-form-input-select'
			const id = ref.getAttribute('aria-controls');
			const val = ref.getAttribute('refid');
			actions.setOptionActive(id, val);
			const selectedOption = options.find(
				(option) => option.value === val
			);
			if (!selectedOption) {
				return;
			}
			// find the object in the options array that matches the value
			// then set the activeId to the index of that object
			const index = options.findIndex(
				(option) => option.value === selectedOption.value
			);
			context.filteredOptions = options;
			context.activeId = index;
			context.label = selectedOption.label;
			context.value = selectedOption.value;
			targetState[id].value = selectedOption.value;
			targetState[id].isOpen = false;
			console.log({ context });
			document.getElementById(`${id}-input`).value = selectedOption.label;
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
			const context = getContext();
			const { targetNamespace, options } = context;
			const { state: targetState } = store(targetNamespace);
			targetState[id].isOpen = true;
			if (event.key === 'Enter') {
				actions.setValueOnEnter(id);
			}
			if (event.keyCode === 40 && event.key === 'ArrowDown') {
				actions.moveThroughOptions(1, id);
				return;
			}
			if (event.keyCode === 38 && event.key === 'ArrowUp') {
				actions.moveThroughOptions(-1, id);
				return;
			}

			// check if any of the options contain the value of the input
			const matches = options.filter((option) => {
				const { label } = option;
				return label.toLowerCase().includes(value.toLowerCase());
			});
			// if there are matches, set the first match to active

			if (matches.length) {
				context.filteredOptions = matches;
				actions.setOptionActive(id, matches[0].value);
			}
		},
		onClear: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}
			const context = getContext();
			const { targetNamespace, options } = context;
			const { state: targetState } = store(targetNamespace);
			console.log({ targetState });
			context.filteredOptions = options;
			context.value = '';
			context.label = '';
			targetState[id].value = '';
			targetState[id].isOpen = false;
			document.getElementById(`${id}-input`).value = '';
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			const { targetNamespace } = context;

			if (!id) {
				return;
			}
			window.addEventListener('click', (e) => {
				const { state: targetState } = store(targetNamespace);
				if (
					!ref.innerHTML.includes(e.target.innerHTML) &&
					true === targetState[id].isOpen
				) {
					targetState[id].isOpen = false;
					console.log('on click outside');
					console.log(context.filteredOptions);
				} else {
					console.log('on click inside');
					console.log(context.filteredOptions);
				}
			});
		},
		onValueChange: () => {
			console.log('value change detected');
			const { ref } = getElement();
			const { id } = ref;
			if (!id) {
				return;
			}
			const context = getContext();
			const { targetNamespace, value } = context;
			if (value) {
				const { actions } = store(targetNamespace);
				if (actions.onSelectChange) {
					actions.onSelectChange(value, ref, ref.id);
				}
			}
		},
		onESCKey: (event) => {
			const { ref } = getElement();
			const { id } = ref;
			if (!id) {
				return;
			}
			const context = getContext();
			const { targetNamespace } = context;
			const { state: targetState } = store(targetNamespace);
			if (event.key === 'Escape') {
				if (true === targetState[id].isOpen) {
					event.preventDefault();
					targetState[id].isOpen = false;
					return;
				}
				context.activeId = 0;
				context.value = '';
				context.label = '';
				targetState[id].value = '';
				targetState[id].isOpen = false;
				document.getElementById(`${id}-input`).value = '';
			}
		},
	},
});
