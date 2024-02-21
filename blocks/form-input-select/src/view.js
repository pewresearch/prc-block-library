/* eslint-disable @wordpress/no-unused-vars-before-return */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/form-input-select', {
	actions: {
		onOpen: (event) => {
			const context = getContext();
			context.isOpen = true;
			console.log('onOpen', context, event);
		},
		onClose: (event = null) => {
			// By default this runs on the on-blur directive on the input element
			// but we also use it as a shortcut to close the listbox on click so we need to
			// support an event object being passed in as well as no event object
			if (null !== event) {
				event.preventDefault();
			}
			const context = getContext();
			let isRunning = false;
			if (!isRunning) {
				isRunning = true;
				setTimeout(() => {
					context.isOpen = false;
					isRunning = false;
				}, 100);
			}
		},
		onReset: () => {
			const context = getContext();
			context.activeIndex = 0;
			context.value = '';
			context.label = '';
		},
		getOptionByValue: (value) => {
			console.log('getOptionByValue', value);
			const context = getContext();
			const { options } = context;
			const selectedOption = options.find(
				(option) => option.value === value
			);
			if (!selectedOption) {
				return null;
			}
			// find the object in the options array that matches the value
			// then set the activeId to the index of that object
			const index = options.findIndex(
				(option) => option.value === selectedOption.value
			);
			return {
				index,
				...selectedOption,
			};
		},
		moveThroughOptions: (direction, id) => {
			const context = getContext();
			const { activeIndex, filteredOptions } = context;
			let nextActive = null;
			if (activeIndex === null || isNaN(activeIndex)) {
				nextActive = 0;
			} else {
				nextActive = activeIndex + direction;
			}
			if (nextActive < 0) {
				nextActive = filteredOptions.length - 1;
			}
			if (nextActive >= filteredOptions.length) {
				nextActive = 0;
			}

			filteredOptions.forEach((option) => {
				option.isSelected = false;
			});
			filteredOptions[nextActive].isSelected = true;

			context.activeIndex = nextActive;
			context.filteredOptions = filteredOptions;
			console.log('moveThroughOptions', context, nextActive, direction);
		},
		onKeyUp: (event) => {
			event.preventDefault();
			const { value } = event.target;

			const context = getContext();
			const { options } = context;
			const { ref } = getElement();
			const id = ref.getAttribute('aria-controls');
			if (!id) {
				return;
			}

			if (event.key === 'Escape') {
				return;
			}

			if (event.key === 'Enter') {
				// actions.setValueOnEnter(id);
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
			// if there are matches set the filteredOptions to the matches
			if (matches.length) {
				context.filteredOptions = matches;
			}
		},
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const context = getContext();
			const { options } = context;
			console.log('setting value on click', context, ref, event);

			const id = ref.getAttribute('aria-controls');
			const val = ref.getAttribute('data-ref-value');
			const { index, label, value } = actions.getOptionByValue(val);

			context.activeIndex = index;
			context.label = label;
			context.value = value;

			// find any other isSelected and set to false and then set isSelected
			// on the clicked option
			// also, reset the filteredOptions to the original options now that we have a value
			const filteredOptions = options;
			filteredOptions.forEach((option) => {
				option.isSelected = false;
			});
			filteredOptions[index].isSelected = true;
			context.filteredOptions = filteredOptions;

			actions.onClose();
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			const { options } = context;
			// set the filteredOptions immediately...
			context.filteredOptions = options;
		},
		onValueChange: () => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace, value } = context;
			if (value) {
				console.log('onValueChange', context);
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectChange) {
					targetActions.onSelectChange(value, ref);
				}
			}
		},
		onESCKeyClose: (event) => {
			const context = getContext();
			if (event.key === 'Escape') {
				if (true === context.isOpen) {
					event.preventDefault();
					actions.onClose();
					return;
				}
				actions.onReset();
			}
		},
	},
});
