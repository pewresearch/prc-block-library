/* eslint-disable @wordpress/no-unused-vars-before-return */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/form-input-select', {
	actions: {
		onOpen: (event) => {
			const context = getContext();
			context.isOpen = true;
			console.log('onOpen', context, event);
		},
		onClose: (event) => {
			const context = getContext();
			context.isOpen = false;
			console.log('onClose', context, event);
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
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			const context = getContext();
			const { filteredOptions } = context;
			console.log('setting value on click', context, ref, event);

			const id = ref.getAttribute('aria-controls');
			const val = ref.getAttribute('data-ref-value');
			const { index, label, value } = actions.getOptionByValue(val);

			context.activeIndex = index;
			context.label = label;
			context.value = value;

			// find any other isSelected and set to false and then set isSelected
			// on the clicked option
			filteredOptions.forEach((option) => {
				option.isSelected = false;
			});
			filteredOptions[index].isSelected = true;

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
		onWindowClickClose: (event) => {
			const context = getContext();
			const { isOpen } = context;
			if (!isOpen) {
				return;
			}
			const elm = getElement();
			const { ref } = elm;
			console.log('onWindowClickClose', elm, event.target);
			if (ref.contains(event.target)) {
				return;
			}
			actions.onClose();
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
