/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import {
	visibleOptions,
	nextWindow,
	hasMoreOptions,
	shouldAdvanceWindow,
} from './visible-options';

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
			const { id, searchTerm } = context;
			if (!id || !state[id]) {
				return '';
			}
			if (state[id].isOpen) {
				return searchTerm ?? '';
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
			const { id, hasClearIcon, searchTerm } = context;
			if (!id || !state[id]) {
				return false;
			}
			if (hasClearIcon) {
				return !!state[id].value || !!searchTerm;
			}
			return false;
		},
		get inputOptions() {
			const context = getContext();
			const { id, searchTerm, listWindow } = context;
			if (!id || !state[id]) {
				return [];
			}
			return visibleOptions(
				state[id].options || [],
				searchTerm,
				listWindow
			);
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

			if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			const isNavigationKey = navigationKeys.includes(event.key);
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
					const { label, value, disabled } =
						inputOptions[activeIndex];
					if (disabled) {
						return;
					}

					getContext().searchTerm = '';
					state[id].value = value;
					state[id].label = label;
					state[id].isOpen = false;

					actions.hoistValueToTargetState(id, targetNamespace);
				}
			}
		}),
		onInputInput: withSyncEvent((event) => {
			const context = getContext();
			const { allowSearch } = context;
			if (!allowSearch) {
				return;
			}
			if (context.searchTerm !== event.target.value) {
				context.searchTerm = event.target.value;
				context.activeIndex = 0;
			}
		}),
		onInputKeyUp: withSyncEvent((event) => {
			const context = getContext();
			const { id } = context;

			if (!state[id].isOpen) {
				state[id].isOpen = true;
			}

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

			if (event.key === 'Escape') {
				state[id].isOpen = false;
			}
		}),
		onListScroll: withSyncEvent((event) => {
			const context = getContext();
			const { id, searchTerm, listWindow } = context;
			const catalog = state[id]?.options || [];
			if (
				!shouldAdvanceWindow(
					event.target,
					catalog,
					searchTerm,
					listWindow
				)
			) {
				return;
			}
			context.listWindow = nextWindow(catalog, searchTerm, listWindow);
		}),
		onLabelClick: withSyncEvent(() => {
			const { id } = getContext();
			// find the input element and focus it.
			const input = document.getElementById(id);
			if (input) {
				input.focus();
			}
		}),
		onInputClearButtonClick: withSyncEvent(() => {
			const context = getContext();
			const { id, targetNamespace } = context;
			context.searchTerm = '';
			context.activeIndex = 0;
			context.listWindow = null;
			state[id].value = '';
			state[id].label = '';
			state[id].isOpen = false;
			actions.hoistValueToTargetState(id, targetNamespace);
		}),
		moveThroughChoices: (direction, ref) => {
			const context = getContext();
			const { id, searchTerm, listWindow, activeIndex } = context;
			const catalog = state[id]?.options || [];
			let options = state.inputOptions;
			if (!options.length) {
				return;
			}

			let nextActive =
				activeIndex === null || isNaN(activeIndex)
					? 0
					: activeIndex + direction;

			if (
				nextActive >= options.length &&
				hasMoreOptions(catalog, searchTerm, listWindow)
			) {
				context.listWindow = nextWindow(
					catalog,
					searchTerm,
					listWindow
				);
				options = state.inputOptions;
			}

			if (nextActive < 0) {
				nextActive = options.length - 1;
			}
			if (nextActive >= options.length) {
				nextActive = 0;
			}

			const nextOption = options[nextActive];
			if (!nextOption) {
				return;
			}

			context.activeIndex = nextActive;
			actions.highlightActiveOption(ref, nextOption.value);
		},
		highlightActiveOption: (ref, nextActiveValue) => {
			const listbox = ref.parentElement.parentElement.querySelector(
				'.wp-block-prc-block-form-input-select__list'
			);
			if (!listbox) {
				return;
			}
			const applyHighlight = () => {
				const activeItem = listbox.querySelector(
					`[data-ref-value="${nextActiveValue}"]`
				);
				if (!activeItem) {
					return false;
				}
				const previousActive = listbox.querySelector('.is-selected');
				if (previousActive) {
					previousActive.classList.remove('is-selected');
				}
				activeItem.classList.add('is-selected');
				activeItem.scrollIntoView({
					block: 'nearest',
				});
				return true;
			};
			if (!applyHighlight()) {
				window.requestAnimationFrame(applyHighlight);
			}
		},
		onInputOptionPointerDown: withSyncEvent((event) => {
			// Keep focus on the combobox. Blur hides the list
			// (visibility: hidden) before click, so the option never commits.
			// Do not commit here: pointerdown also starts a pan on overflowing lists.
			event.preventDefault();
		}),
		onInputOptionClick: withSyncEvent((event) => {
			event.preventDefault();
			const context = getContext();
			const { id, targetNamespace } = context;
			if (!id || !state[id]) {
				return;
			}
			const target = event.currentTarget;
			const option = context.option || {};
			const value =
				option.value ??
				(target && typeof target.getAttribute === 'function'
					? target.getAttribute('data-ref-value')
					: null);
			const label =
				option.label ??
				(typeof target?.textContent === 'string'
					? target.textContent.trim()
					: '');
			if (option.disabled || null === value || undefined === value) {
				return;
			}
			context.searchTerm = '';
			state[id].value = value;
			state[id].label = label;
			state[id].isOpen = false;

			actions.hoistValueToTargetState(id, targetNamespace);
		}),
		onInputFocus: withSyncEvent(() => {
			const context = getContext();
			const { id } = context;
			if (state[id]) {
				state[id].isOpen = true;
			}
		}),
		onInputBlur: withSyncEvent(() => {
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
		onDropdownArrowClick: withSyncEvent(() => {
			const context = getContext();
			const { id } = context;
			if (state[id]) {
				state[id].isOpen = !state[id].isOpen;
			}
		}),
		onDocumentClick: withSyncEvent((event) => {
			const { id } = getContext();
			if (!id || !state[id] || !state[id].isOpen) {
				return;
			}
			const { ref } = getElement();
			if (ref && !ref.contains(event.target)) {
				state[id].isOpen = false;
			}
		}),
	},
	callbacks: {},
});
