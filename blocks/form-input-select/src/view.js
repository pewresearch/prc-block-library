/* eslint-disable max-lines */
/* eslint-disable @wordpress/no-unused-vars-before-return */
import {
	store,
	getContext,
	getElement,
	getServerState,
} from '@wordpress/interactivity';

const { state, actions } = store('prc-block/form-input-select', {
	state: {
		get activeIndex() {
			const id = actions.getId();
			return state[id]?.activeIndex || 0;
		},
		get value() {
			const id = actions.getId();
			return state[id]?.value || '';
		},
		get isOpen() {
			const id = actions.getId();
			return state[id]?.isOpen || false;
		},
		get isDisabled() {
			const id = actions.getId();
			return state[id]?.isDisabled || false;
		},
		get label() {
			const id = actions.getId();
			return state[id]?.label || '';
		},
		get hasClearIcon() {
			const id = actions.getId();
			return state[id]?.hasClearIcon || false;
		},
		get filteredOptions() {
			const id = actions.getId();
			return getServerState()[id]?.filteredOptions || [];
		},
		get options() {
			const id = actions.getId();
			const serverState = getServerState();
			return serverState[id]?.options || [];
		},
		get hasValue() {
			const id = actions.getId();
			return !!state[id]?.value;
		},
	},
	actions: {
		getId: () => {
			const context = getContext();
			const { id } = context;
			return id;
		},
		setIsOpen: (isOpen, id) => {
			state[id].isOpen = isOpen;
		},
		setActiveIndex: (activeIndex, id) => {
			state[id].activeIndex = activeIndex;
		},
		setNewValue: (newValue, id) => {
			const { ref } = getElement();
			const context = getContext();
			const { targetNamespace } = context;

			state[id].value = newValue;
			// if the value is not empty and the targetNamespace is not the same as the current namespace
			// then hoist the value up to the targetNamespace
			if (newValue && 'prc-block/form-input-select' !== targetNamespace) {
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectChange) {
					targetActions.onSelectChange(
						newValue,
						ref,
						id,
						state[id].filteredOptions,
						state,
						context
					);
				}
			}
		},
		setLabel: (label, id) => {
			state[id].label = label;
		},
		setFilteredOptions: (filteredOptions, id) => {
			state[id].filteredOptions = filteredOptions;
		},
		resetValues: (id) => {
			state[id].value = '';
			state[id].label = '';
			state[id].activeIndex = 0;
			state[id].filteredOptions = state[id].options;
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
		getOptionByValue: (value, id) => {
			const { options } = state[id];
			const selectedOption = options.find((option) => {
				return option.value == value;
			});
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
		onOpen: () => {
			const id = actions.getId();
			actions.setIsOpen(true, id);
		},
		onClose: () => {
			// By default this runs on the on-blur directive on the input element
			// but we also use it as a shortcut to close the listbox on click,

			// Because the on-blur event fires before the click event
			// we need to slow things down a bit, 150 ms should do it...
			let isRunning = false;
			if (!isRunning) {
				isRunning = true;
				const id = actions.getId();
				setTimeout(() => {
					actions.setIsOpen(false, id);
					isRunning = false;
				}, 150);
			}
		},
		onReset: () => {
			const id = actions.getId();
			actions.resetValues(id);
		},
		moveThroughOptions: (direction, ref) => {
			const { activeIndex, filteredOptions } = state;
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

			const id = actions.getId();

			actions.setActiveIndex(nextActive, id);
			actions.setFilteredOptions(filteredOptions, id);
		},
		setValueOnEnter: () => {
			const { filteredOptions, activeIndex } = state;

			const id = actions.getId();

			const highlightedOption = filteredOptions[activeIndex];

			actions.setNewValue(highlightedOption.value, id);
			actions.setLabel(highlightedOption.label, id);
			actions.setIsOpen(false, id);

			// reset the filtered options
			// context.filteredOptions = options;
		},
		onKeyUp: (event) => {
			const id = actions.getId();
			event.preventDefault();
			// The input value.
			const { value } = event.target;

			const { options } = state;
			const { ref } = getElement();

			if (event.key === 'Escape') {
				actions.onReset();
				if (true === state.isOpen) {
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
				actions.setFilteredOptions(matches, id);
			}
		},
		onClick: (event) => {
			event.preventDefault();
			const { ref } = getElement();
			// This gets the context of the option <li> element inside the <wp-template/>...
			const { options } = state;

			const id = ref.getAttribute('aria-controls');
			const val = ref.getAttribute('data-ref-value');
			const { index } = actions.getOptionByValue(val, id);
			const { label, value } = options[index];

			actions.setActiveIndex(index, id);
			actions.setLabel(label, id);
			actions.setNewValue(value, id);

			// Reset any other "isSelected" options to false and then set the clicked on option to true...
			// Additionally, reset the filtered options back to options.
			const filteredOptions = options;
			filteredOptions.forEach((opt) => {
				opt.isSelected = false;
			});
			filteredOptions[index].isSelected = true;
			actions.setFilteredOptions(filteredOptions, id);

			actions.onClose(id);
		},
		onIconClick: (event) => {
			event.preventDefault();
			const id = actions.getId();
			const { isOpen, value, hasClearIcon } = state[id];
			if (isOpen) {
				actions.onClose(id);
			} else {
				actions.onOpen(id);
			}
			if (!isOpen && value && hasClearIcon) {
				const { ref } = getElement();
				actions.resetValues(id);
				const { targetNamespace } = getContext();
				const { actions: targetActions } = store(targetNamespace);
				if (targetActions.onSelectClearIconClick) {
					targetActions.onSelectClearIconClick(ref, value, id);
				}
			}
		},
	},
	callbacks: {
		isProcessing: () => {
			return actions.getTargetProcessingState();
		},
		isDisabled: () => {
			return actions.getTargetProcessingState();
		},
	},
});
