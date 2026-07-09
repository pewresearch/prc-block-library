/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

/**
 * WordPress Interactivity Store for Select Range Input Block
 *
 * Manages minimum and maximum select input state and validation.
 * Handles range validation and synchronizes with parent form components.
 */
const { state, actions } = store('prc-block/form-input-select-range', {
	state: {
		/**
		 * Gets the unique identifier for the current select range block instance.
		 * @return {string|false} The block ID from context, or false if not available
		 */
		get id() {
			return getContext()?.id || false;
		},
		/**
		 * Gets the target namespace for the current select range block instance.
		 * @return {string|false} The targetNamespace, or false if not available
		 */
		get targetNamespace() {
			return getContext()?.targetNamespace || false;
		},
		/**
		 * Gets the current minimum value for this range instance.
		 * @return {string} The current minimum value or empty string if not set
		 */
		get minValue() {
			const { minInputId, id } = state;
			const { state: subState } = store('prc-block/form-input-select');
			const value = subState[minInputId]?.value || state[id]?.initMinValue;
			return +value;
		},
		/**
		 * Gets the current maximum value for this range instance.
		 * @return {string} The current maximum value or empty string if not set
		 */
		get maxValue() {
			const { maxInputId, id } = state;
			const { state: subState } = store('prc-block/form-input-select');
			const value = subState[maxInputId]?.value || state[id]?.initMaxValue;
			return +value;
		},
		/**
		 * Gets the DOM ID of the minimum select input field.
		 * @return {string} The minimum input field ID or empty string if not set
		 */
		get minInputId() {
			const { id } = state;
			return state[id]?.minInputId || '';
		},
		/**
		 * Gets the DOM ID of the maximum select input field.
		 * @return {string} The maximum input field ID or empty string if not set
		 */
		get maxInputId() {
			const { id } = state;
			return state[id]?.maxInputId || '';
		},
		/**
		 * Returns the default range.
		 * @return {string} Range as an array
		 */
		get defaultRange() {
			const { id } = state;
			const min = state[id]?.initMinValue ?? '';
			const max = state[id]?.initMaxValue ?? '';
			return { min: min, max: max };
		},
		/**
		 * Checks if the range is valid (min <= max).
		 * @return {boolean} True if range is valid, false otherwise
		 */
		get isValidRange() {
			const { minValue, maxValue } = state;
			// Convert to numbers for comparison
			const min = parseFloat(minValue);
			const max = parseFloat(maxValue);
			return min <= max;
		},
		/**
		 * Gets error state.
		 * @return {boolean}  True if error state is on false if not
		 */
		get isRangeError() {
			const { isValidRange } = state;
			return !isValidRange;
		},
	},
	// / npm run start form-input-select-range   npm run build form-input-select-range -w @prc/block-library
	actions: {
		hoistValueToTargetState: ( minValue, maxValue, defaultRange ) => {
			const { targetNamespace } = state;
			// Hoist value up to the target namespace.
			const { state: targetState } = store(targetNamespace);
			// Return if namespace doesn't exist
			if (!targetState) {
				return;
			}
			const { id } = state; 
			if ( ! !!targetState.selectRange ) { targetState.selectRange = {} }
			const isDefaultMin = defaultRange?.min === minValue,
				  isDefaultMax =  defaultRange?.max === maxValue,
				  isDefault = isDefaultMax && isDefaultMin;

			targetState.selectRange[id] = { 
				range: { 
					min: minValue, 
					max: maxValue 
				},
				isDefault: isDefault,
				isDefaultMin: isDefaultMin,
				isDefaultMax: isDefaultMax,
			};

		},
	},
	callbacks: {
		limitSelections: () => {
			const { isValidRange, minInputId, maxInputId, minValue, maxValue } = state;
			// Exit if invalid range
			if (!isValidRange) {
				return;
			}

			// Convert to numbers
			const min = parseFloat(minValue);
			const max = parseFloat(maxValue);
			// Gather inputs
			const { state: targetState } = store('prc-block/form-input-select');
			if ( ! targetState ) { return; }
			// For each input in the field,
			[minInputId, maxInputId].forEach((inputId, index) => {
				// Update the available options:
				// 	- rangeMax may select values greater than or equal to rangeMin
				// 	- rangeMin may select values less than or equal to rangeMax
				targetState?.[inputId]?.options?.forEach((option) => {
					option.disabled =
						index > 0 ? option.value < min : option.value > max;
				});
			});
		},
		publishRange: () => {
			const { isValidRange, minValue, maxValue, defaultRange } = state;
			// If the range is valid
			if ( isValidRange ) {
				actions.hoistValueToTargetState( minValue, maxValue, defaultRange );
			}
		},
	},
});