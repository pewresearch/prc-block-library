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
			// Because the on-blur event fires before the click event we need to slow things down a bit, 150 ms should do it
			let isRunning = false;
			if (!isRunning) {
				isRunning = true;
				setTimeout(() => {
					context.isOpen = false;
					isRunning = false;
				}, 150);
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
			console.log('form-input-select::getOptionByValue', value);
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
		moveThroughOptions: (direction, ref) => {
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

			// also scroll the listbox to the active item as you go...
			const listbox = ref.parentElement.parentElement.querySelector(
				'.wp-block-prc-block-form-input-select__list'
			);
			const activeItem = listbox.querySelector(
				`[data-ref-value="${filteredOptions[nextActive].value}"]`
			);
			if (activeItem) {
				activeItem.scrollIntoView({
					block: 'nearest',
				});
			}

			filteredOptions.forEach((option) => {
				option.isSelected = false;
			});
			filteredOptions[nextActive].isSelected = true;

			context.activeIndex = nextActive;
			context.filteredOptions = filteredOptions;
			console.log(
				'form-input-select::moveThroughOptions',
				context,
				nextActive,
				direction
			);
		},
		setValueOnEnter: () => {
			const context = getContext();
			const { filteredOptions, activeIndex } = context;

			const highlightedOption = filteredOptions[activeIndex];
			console.log('ENTER === ', {
				filteredOptions,
				activeIndex,
				highlightedOption,
			});

			actions.setNewValue(highlightedOption?.value);
			context.label = highlightedOption?.label;
			context.isOpen = false;

			// reset the filtered options
			// context.filteredOptions = options;
		},
		onKeyUp: (event) => {
			event.preventDefault();
			// The input value.
			const { value } = event.target;

			const context = getContext();
			const { options } = context;
			const { ref } = getElement();

			if (event.key === 'Escape') {
				actions.onReset();
				if (true === context.isOpen) {
					ref.blur();
				}
				return;
			}

			if (event.keyCode === 40 && event.key === 'ArrowDown') {
				actions.moveThroughOptions(1, event.target);
				return;
			}
			if (event.keyCode === 38 && event.key === 'ArrowUp') {
				actions.moveThroughOptions(-1, event.target);
				return;
			}
			if (event.key === 'Enter') {
				actions.setValueOnEnter();
				return;
			}

			// Search options for the value and then set the filteredOptions to any matches...
			const matches = options.filter((option) => {
				const { label } = option;
				return label.toLowerCase().includes(value.toLowerCase());
			});
			if (matches.length) {
				context.filteredOptions = matches;
			}
		},
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const context = getContext();
			const { options, option } = context;

			const id = ref.getAttribute('aria-controls');
			const val = ref.getAttribute('data-ref-value');
			const { index } = actions.getOptionByValue(val);
			const { label, value } = options[index];

			context.activeIndex = index;
			context.label = label;
			actions.setNewValue(value);

			console.log('form-input-select::onClick', {
				context,
				option,
				options,
				index,
				label,
				value,
			});

			// find any other isSelected and set to false and then set isSelected
			// on the clicked option
			// also, reset the filteredOptions to the original options now that we have a value
			const filteredOptions = options;
			filteredOptions.forEach((opt) => {
				opt.isSelected = false;
			});
			filteredOptions[index].isSelected = true;
			context.filteredOptions = filteredOptions;

			actions.onClose();
		},
		setNewValue: (newValue) => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace } = context;
			// if the value is not empty and the targetNamespace is not the same as the current namespace
			// then hoist the value up to the targetNamespace
			context.value = newValue;
			if (newValue && 'prc-block/form-input-select' !== targetNamespace) {
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectChange) {
					console.log(
						'form-input-select::onValueChange -> onSelectChange:',
						context,
						newValue
					);
					targetActions.onSelectChange(newValue, ref);
				}
			}
		},
	},
	callbacks: {
		// onValueChange: () => {
		// 	const { ref } = getElement();
		// 	const context = getContext();
		// 	const { targetNamespace, value } = context;
		// 	// if the value is not empty and the targetNamespace is not the same as the current namespace
		// 	// then hoist the value up to the targetNamespace
		// 	if (value && 'prc-block/form-input-select' !== targetNamespace) {
		// 		const { actions: targetActions } = store(targetNamespace);
		// 		if (targetActions.onSelectChange) {
		// 			console.log(
		// 				'form-input-select::onValueChange -> onSelectChange:',
		// 				context,
		// 				value
		// 			);
		// 			targetActions.onSelectChange(value, ref);
		// 		}
		// 	}
		// },
	},
});
