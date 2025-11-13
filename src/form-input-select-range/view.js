/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
} from '@wordpress/interactivity';

/**
 * WordPress Interactivity Store for Select Range Input Block
 *
 * Manages minimum and maximum select input state and validation.
 * Handles range validation and synchronizes with parent form components.
 *
 * @namespace prc-block/form-input-select-range
 */
const { actions, state } = store('prc-block/form-input-select-range', {
	state: {
		/**
		 * Gets the unique identifier for the current select range block instance.
		 *
		 * @returns {string|false} The block ID from context, or false if not available
		 */
		get id() {
			return getContext()?.id || false;
		},
		/**
		 * Gets the current minimum value for this range instance.
		 *
		 * @returns {string} The current minimum value or empty string if not set
		 */
		get minValue() {
			const { id } = state;
			return state[id]?.minValue || '';
		},
		/**
		 * Gets the current maximum value for this range instance.
		 *
		 * @returns {string} The current maximum value or empty string if not set
		 */
		get maxValue() {
			const { id } = state;
			return state[id]?.maxValue || '';
		},
		/**
		 * Gets the DOM ID of the minimum select input field.
		 *
		 * @returns {string} The minimum input field ID or empty string if not set
		 */
		get minInputId() {
			const { id } = state;
			return state[id]?.minInputId || '';
		},
		/**
		 * Gets the DOM ID of the maximum select input field.
		 *
		 * @returns {string} The maximum input field ID or empty string if not set
		 */
		get maxInputId() {
			const { id } = state;
			return state[id]?.maxInputId || '';
		},
		/**
		 * Checks if the range is valid (min <= max).
		 *
		 * @returns {boolean} True if range is valid, false otherwise
		 */
		get isValidRange() {
			const { id } = state;
			if (!state[id]) {
				return true;
			}
			const { minValue, maxValue } = state[id];
			if (!minValue || !maxValue) {
				return true; // If either is empty, we consider it valid (not fully filled yet)
			}
			// Convert to numbers for comparison
			const min = parseFloat(minValue);
			const max = parseFloat(maxValue);
			return min <= max;
		},
		/**
		 * Checks if both minimum and maximum values are selected.
		 *
		 * @returns {boolean} True if both values are selected, false otherwise
		 */
		get hasCompleteRange() {
			const { id } = state;
			if (!state[id]) {
				return false;
			}
			const { minValue, maxValue } = state[id];
			return !!minValue && !!maxValue;
		},
	},
	actions: {
		/**
		 * Handles input change events for both min and max select fields.
		 * Updates the appropriate state values based on the input's name attribute.
		 *
		 * @param {Event} event - The input change event containing the new value
		 */
		onInputChange: (event) => {
			const { id, name } = event.target;
			const newValue = event.target?.value;
			const blockId = state.id;

			if (!blockId || !state[blockId]) {
				// Initialize block state if it doesn't exist
				state[blockId] = {
					minValue: '',
					maxValue: '',
					minInputId: '',
					maxInputId: '',
				};
			}

			// Determine which field was updated based on the input's name attribute
			if ('rangeMin' === name) {
				state[blockId].minValue = newValue;
				state[blockId].minInputId = id;
			} else if ('rangeMax' === name) {
				state[blockId].maxValue = newValue;
				state[blockId].maxInputId = id;
			}
		},
	},
	callbacks: {
		/**
		 * Initializes the select range functionality.
		 *
		 * Sets up the initial state for the block instance.
		 */
		onInit: () => {
			const { id } = getContext();
			const blockId = id;

			if (!blockId) {
				return;
			}

			console.log('Initializing select range block with ID:', blockId, state);
		},
		/**
		 * Validates the range whenever values change.
		 *
		 * Ensures minimum value doesn't exceed maximum value and vice versa.
		 * Updates any validation states or error messages as needed.
		 */
		onRangeValidation: () => {
			const { id } = state;
			const blockId = id;

			if (!blockId || !state[blockId]) {
				return;
			}

			const { isValidRange } = state;

			// You can add error handling here, e.g., setting error states
			// on the form fields if the range is invalid
			if (!isValidRange) {
				console.warn('Invalid range: minimum value exceeds maximum value');
			}
		},
		/**
		 * Propagates range values to the parent form component.
		 *
		 * This generator function communicates with the target namespace (parent form)
		 * to update the form's state when both min and max values are selected
		 * and the range is valid.
		 *
		 * @generator
		 * @yields {Object} Store reference for the target namespace
		 */
		*onValueChange() {
			const { targetNamespace, id } = getContext();
			const { minValue, maxValue, hasCompleteRange, isValidRange } = state;

			if (hasCompleteRange && isValidRange) {
				// Get the target store (parent form) actions
				const { actions: targetActions } = yield store(targetNamespace);

				if (targetActions?.onInputChange) {
					// Send min value
					targetActions.onInputChange({
						target: {
							value: minValue,
							id: `${id}-min`,
							name: 'rangeMin',
						},
					});

					// Send max value
					targetActions.onInputChange({
						target: {
							value: maxValue,
							id: `${id}-max`,
							name: 'rangeMax',
						},
					});
				}
			}
		},
	},
});
