/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	getServerState,
	withSyncEvent,
} from '@wordpress/interactivity';

const { state, actions } = store('prc-block/form-input-select', {
	state: {
		get activeIndex() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return 0;
			}
			return state[id].activeIndex || 0;
		},
		get isOpen() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return state[id].isOpen || false;
		},
		get formField() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return {};
			}
			const {
				name,
				label,
				value,
				required,
				placeholder,
				hidden,
				readonly,
				disabled,
				error,
				options,
			} = state[id];
			return {
				name,
				label,
				value,
				required,
				placeholder,
				hidden,
				readonly,
				disabled,
				error,
				options,
			};
		},
		get isInputRequired() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return state[id].required || false;
		},
		get isInputDisabled() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return state[id].isDisabled || false;
		},
		get isInputReadonly() {
			const context = getContext();
			const { allowSearch } = context;
			// If allowSearch is false, make the input readonly
			return !allowSearch;
		},
		get inputId() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return id;
		},
		get inputLabel() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return state[id].label || '';
		},
		get inputValue() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return '';
			}
			return state[id].value || '';
		},
		get inputPlaceholder() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return state[id].placeholder || '';
		},
		get hasValue() {
			const context = getContext();
			const { id } = context;
			if (!id || !state[id]) {
				return false;
			}
			return !!state[id].value;
		},
		get hasClearIcon() {
			const context = getContext();
			const { id, hasClearIcon } = context;
			if (!id || !state[id]) {
				return false;
			}
			if (hasClearIcon) {
				return !!state[id].value || !!searchTerm;
			}
			return false;
		},
		/**
		 * Gets the full options list, or a filtered list based on the search term
		 * for the input.
		 */
		get inputOptions() {
			const context = getContext();
			const { id, searchTerm } = context;
			if (!id || !state[id]) {
				return [];
			}
			let options = state[id].options || [];
			if (searchTerm && searchTerm.length > 0 && options) {
				const filteredOptions = options.filter((option) =>
					option.label
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
				if (filteredOptions.length > 0) {
					options = filteredOptions;
				} else {
					options = options;
				}
			}
			return options;
		},
	},
	actions: {
		hoistValueToTargetState: (fieldId, targetNamespace) => {
			// Hoist value up to the target namespace.
			const { state: targetState } = store(targetNamespace);
			if (!targetState) {
				return;
			}
			const { formFields } = targetState;
			if (!formFields) {
				return;
			}
			let formField = formFields.find((field) => field.id === fieldId);
			if (!formField) {
				return;
			}
			const newFormField = state.formField;
			if (!newFormField) {
				return;
			}
			// Update the form field with the new state.
			formField = { ...formField, ...newFormField };
			// Update the form field in the target namespace. Only update matching on field id.
			targetState.formFields = formFields.map((field) =>
				field.id === fieldId ? formField : field
			);
		},
		onInputKeyDown: withSyncEvent((event) => {
			const { activeIndex, id, targetNamespace, allowSearch } =
				getContext();

			// Define navigation keys that should always work
			const navigationKeys = [
				'ArrowDown',
				'ArrowUp',
				'Enter',
				'Escape',
				'Tab',
			];
			const isNavigationKey = navigationKeys.includes(event.key);

			// Handle arrow keys specifically to prevent page scrolling
			if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
				event.preventDefault();
				event.stopPropagation();
				// Let onInputKeyUp handle the actual navigation logic
				return;
			}

			// If search is not allowed and this is not a navigation key, prevent the default behavior
			if (!allowSearch && !isNavigationKey) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			// Handle specific key actions
			if (event.key === 'Enter') {
				event.preventDefault();
				event.stopPropagation();
				const { inputOptions } = state;
				if (inputOptions && inputOptions[activeIndex]) {
					const { label, value } = inputOptions[activeIndex];

					state[id].value = value;
					state[id].label = label;
					state[id].isOpen = false;

					actions.hoistValueToTargetState(id, targetNamespace);
				}
			}
		}),
		onInputKeyUp: withSyncEvent((event) => {
			const context = getContext();
			const { id, allowSearch } = context;

			// Only update search term if search is allowed
			if (allowSearch) {
				context.searchTerm = event.target.value;
			}

			// Open dropdown if not already open
			if (!state[id].isOpen) {
				state[id].isOpen = true;
			}

			// Handle arrow key navigation (works regardless of allowSearch)
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				event.stopPropagation();
				actions.moveThroughChoices(1, event.target);
				return;
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				event.stopPropagation();
				actions.moveThroughChoices(-1, event.target);
				return;
			}

			// Close dropdown on escape key
			if (event.key === 'Escape') {
				state[id].isOpen = false;
			}
		}),
		onLabelClick: withSyncEvent((event) => {
			const { id } = getContext();
			// find the input element and focus it.
			const input = document.getElementById(id);
			if (input) {
				input.focus();
			}
		}),
		onInputClearButtonClick: withSyncEvent((event) => {
			const { id } = getContext();
			const { targetNamespace } = getContext();
			getContext().searchTerm = '';
			state[id].value = '';
			state[id].label = '';
			state[id].isOpen = false;
			actions.hoistValueToTargetState(id, targetNamespace);
		}),
		moveThroughChoices: (direction, ref) => {
			const { inputOptions } = state;
			const { activeIndex } = getContext();

			// Determine next active index.
			let nextActive = null;
			if (activeIndex === null || isNaN(activeIndex)) {
				nextActive = 0;
			} else {
				nextActive = activeIndex + direction;
			}
			if (nextActive < 0) {
				nextActive = inputOptions.length - 1;
			}
			if (nextActive >= inputOptions.length) {
				nextActive = 0;
			}

			// Get the next active value.
			const nextActiveValue = inputOptions[nextActive].value;
			// And then scroll the listbox to the active item.
			const listbox = ref.parentElement.parentElement.querySelector(
				'.wp-block-prc-block-form-input-select__list'
			);
			const activeItem = listbox.querySelector(
				`[data-ref-value="${nextActiveValue}"]`
			);
			if (activeItem) {
				// Remove the active class from the previous active item.
				const previousActive = listbox.querySelector('.is-selected');
				if (previousActive) {
					previousActive.classList.remove('is-selected');
				}
				activeItem.classList.add('is-selected');
				activeItem.scrollIntoView({
					block: 'nearest',
				});
			}

			getContext().activeIndex = nextActive;
		},
		onInputOptionClick: withSyncEvent((event) => {
			event.preventDefault();
			const context = getContext();
			const { id, targetNamespace } = context;
			const { value, label } = context.option;
			state[id].value = value;
			state[id].label = label;

			actions.hoistValueToTargetState(id, targetNamespace);
		}),
		onInputFocus: withSyncEvent((event) => {
			const context = getContext();
			const { id } = context;
			if (state[id]) {
				state[id].isOpen = true;
			}
		}),
		onInputBlur: withSyncEvent((event) => {
			// By default this runs on the on-blur directive on the input element
			// but we also use it as a shortcut to close the listbox on click,

			// Because the on-blur event fires before the click event
			// we need to slow things down a bit, 150 ms should do it...
			let isRunning = false;
			if (!isRunning) {
				isRunning = true;
				const context = getContext();
				const { id } = context;
				setTimeout(() => {
					if (state[id]) {
						state[id].isOpen = false;
					}
					isRunning = false;
				}, 150);
			}
		}),
		onDropdownArrowClick: withSyncEvent((event) => {
			const context = getContext();
			const { id } = context;
			if (state[id]) {
				state[id].isOpen = !state[id].isOpen;
			}
		}),
	},
	callbacks: {},
});
