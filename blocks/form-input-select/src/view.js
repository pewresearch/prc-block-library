/* eslint-disable @wordpress/no-unused-vars-before-return */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/form-input-select', {
	actions: {
		onOpen: () => {
			const context = getContext();
			context.isOpen = true;
		},
		onClose: (event = null) => {
			// By default this runs on the on-blur directive on the input element
			// but we also use it as a shortcut to close the listbox on click,
			// so this is a quick check to see if we're using this as a shortcut or not.
			if (null !== event) {
				event.preventDefault();
			}
			const context = getContext();
			// Because the on-blur event fires before the click event we need to slow things down a bit, 100 ms should do it
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
			context.filteredOptions = context.options;
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
				actions.onReset();
				if (true === context.isOpen) {
					ref.blur();
				}
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
			const { options } = context;
			// Loop through everything in options and add a isSelected property equal to false
			options.forEach((option) => {
				option.isSelected = false;
			});
			// set filteredOptions immediately...
			context.filteredOptions = options;
		},
		onValueChange: () => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace, value } = context;
			// if the value is not empty and the targetNamespace is not the same as the current namespace
			// then hoist the value up to the targetNamespace
			if (value && 'prc-block/form-input-select' !== targetNamespace) {
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectChange) {
					console.log(
						'onValueChange -> onSelectChange:',
						context,
						value,
						ref
					);
					targetActions.onSelectChange(value, ref);
				}
			}
		},
	},
});
