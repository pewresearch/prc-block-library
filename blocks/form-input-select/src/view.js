/* eslint-disable @wordpress/no-unused-vars-before-return */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions } = store('prc-block/form-input-select', {
	actions: {
		onOpen: () => {
			const context = getContext();
			context.isOpen = true;

			// set icon to up caret
			const useElement = document.querySelector(
				'.wp-block-prc-block-form-input-select__close-toggle use'
			);
			if (useElement) {
				useElement.setAttribute(
					'href',
					`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-up`
				);
			}
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
			// set icon to down caret
			const useElement = document.querySelector(
				'.wp-block-prc-block-form-input-select__close-toggle use'
			);
			if (useElement) {
				useElement.setAttribute(
					'href',
					`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-down`
				);
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
		},
		setValueOnEnter: () => {
			const context = getContext();
			const { filteredOptions, activeIndex } = context;

			const highlightedOption = filteredOptions[activeIndex];

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

			// set icon to xmark

			if (context.hasClearIcon) {
				const useElement = document.querySelector(
					'.wp-block-prc-block-form-input-select__close-toggle use'
				);
				if (useElement) {
					useElement.setAttribute(
						'href',
						`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#xmark`
					);
				}
			}
		},
		setNewValue: (newValue) => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace } = context;
			// if the value is not empty and the targetNamespace is not the same as the current namespace
			// then hoist the value up to the targetNamespace
			context.value = newValue;
			if (newValue && 'prc-block/form-input-select' !== targetNamespace) {
				const { actions: targetActions, state: targetState } =
					store(targetNamespace);
				if (targetActions.onSelectChange) {
					targetActions.onSelectChange(newValue, ref);
				}
			}
		},

		onIconClick: () => {
			const context = getContext();
			const { targetNamespace, isOpen, value } = context;
			const { ref } = getElement();
			if (!isOpen && !value) {
				actions.onOpen();
				// focus the input
				const input = ref.nextElementSibling.querySelector('input');
				if (input) {
					input.focus();
				}
				// set icon to up caret
				const useElement = document.querySelector(
					'.wp-block-prc-block-form-input-select__close-toggle use'
				);
				if (useElement) {
					useElement.setAttribute(
						'href',
						`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-up`
					);
				}
				return;
			}
			if (isOpen && !value) {
				actions.onClose();
				const useElement = document.querySelector(
					'.wp-block-prc-block-form-input-select__close-toggle use'
				);
				if (useElement) {
					useElement.setAttribute(
						'href',
						`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-down`
					);
				}
				return;
			}
			if (
				'prc-block/form-input-select' !== targetNamespace &&
				!isOpen &&
				value &&
				context.hasClearIcon
			) {
				// clear the value and reset the label
				context.activeIndex = 0;
				context.value = '';
				context.label = '';
				context.filteredOptions = context.options;
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectClearIconClick) {
					targetActions.onSelectClearIconClick(value, ref);
				}
				// reset icon to caret
				const useElement = document.querySelector(
					'.wp-block-prc-block-form-input-select__close-toggle use'
				);
				if (useElement) {
					useElement.setAttribute(
						'href',
						`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-down`
					);
				}
			}
		},
		getTargetProcessingState: () => {
			const context = getContext();
			const { targetNamespace } = context;
			if ('prc-block/form-input-select' !== targetNamespace) {
				const { state: targetState } = store(targetNamespace);
				if (targetState.isProcessing) {
					return true;
				}
			}
			return false;
		},
	},
	callbacks: {
		isProcessing: () => {
			return actions.getTargetProcessingState();
		},
		isDisabled: () => {
			return actions.getTargetProcessingState();
		},
		onInit: () => {
			const useElement = document.querySelector(
				'.wp-block-prc-block-form-input-select__close-toggle use'
			);
			if (useElement) {
				useElement.setAttribute(
					'href',
					`${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/solid.svg#caret-down`
				);
			}
		},
	},
});
