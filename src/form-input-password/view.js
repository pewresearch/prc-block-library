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
import checkPasswordStrength from './check-password-strength';

/**
 * WordPress Interactivity Store for Password Input Block
 *
 * Manages password input state, validation, and confirmation functionality.
 * Handles password strength checking and synchronizes with parent form components.
 *
 * @namespace prc-block/form-input-password
 */
const { actions, state } = store('prc-block/form-input-password', {
	state: {
		/**
		 * Gets the unique identifier for the current password input block instance.
		 *
		 * @returns {string|false} The block ID from context, or false if not available
		 */
		get id() {
			return getContext()?.id || false;
		},
		/**
		 * Gets the current password value for this input instance.
		 *
		 * @returns {string} The current password value or empty string if not set
		 */
		get value() {
			const { id } = state;
			return state[id]?.value || '';
		},
		get inputName() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.name;
		},
		get inputPlaceholder() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.placeholder;
		},
		get isInputHidden() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.hidden;
		},
		get isInputDisabled() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.disabled;
		},
		get isInputReadOnly() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.readOnly;
		},
		get isInputRequired() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.required;
		},
		/**
		 * Determines if this password input has a confirmation field enabled.
		 *
		 * @returns {boolean} True if confirmation is required, false otherwise
		 */
		get hasConfirmation() {
			const { id } = state;
			return state[id]?.hasConfirmation || false;
		},
		/**
		 * Gets the DOM ID of the associated password confirmation input field.
		 *
		 * @returns {string} The confirmation input field ID or empty string if not set
		 */
		get confirmationInputId() {
			const { id } = state;
			return state[id]?.confirmationInputId || '';
		},
		/**
		 * Gets the current value of the password confirmation field.
		 *
		 * @returns {string} The confirmation password value or empty string if not set
		 */
		get confirmationValue() {
			const { id } = state;
			return state[id]?.confirmationValue || '';
		},
		/**
		 * Checks if the password and confirmation password values match.
		 *
		 * @returns {boolean} True if passwords match, false otherwise
		 */
		get passwordsMatch() {
			const { id } = state;
			return state[id]?.passwordsMatch || false;
		},
		/**
		 * Determines if all password validation conditions are met.
		 * This includes strength requirements and confirmation matching.
		 *
		 * @returns {boolean} True if all conditions in the conditions list are met
		 */
		get allConditionsMet() {
			const { id } = state;
			return state[id].conditionsList.every((condition) => condition.met);
		},
	},
	actions: {
		/**
		 * Handles input change events for both password and confirmation fields.
		 * Updates the appropriate state values based on the input's name attribute.
		 *
		 * @param {Event} event - The input change event containing the new value
		 */
		onInputChange: withSyncEvent((event) => {
			const { ref } = getElement();
			const { id, name } = ref;
			const newValue = event.target?.value;
			const blockId = state.id;
			const inputId = id;

			// Store the input's value in the appropriate state object for the input:
			state[blockId].value = newValue;

			// Determine which field was updated based on the input's name attribute
			if ('confirmPassword' === name) {
				state[blockId].confirmationValue = newValue;
			} else {
				state[blockId].value = newValue;
			}
		}),
		onLabelClick: withSyncEvent((event) => {
			// Find the adjacent input element and focus it.
			const input = event.target.nextElementSibling;
			if (input && ['INPUT'].includes(input.tagName)) {
				input.focus();
			}
		}),
	},
	callbacks: {
		/**
		 * Initializes the password confirmation functionality.
		 *
		 * Searches through form fields to locate the confirmation password input,
		 * sets up the confirmation input ID, and initially disables the confirmation
		 * field until the main password meets requirements.
		 */
		onConfirmationInit: () => {
			const { id, formFields } = state;
			const blockId = id;

			// Search through form fields to find the confirmation password input
			// by looking for a field with name 'confirmPassword'
			const confirmationInputId =
				formFields.find((field) => field.name === 'confirmPassword')
					?.id || false;
			const confirmationInputIndex = formFields.findIndex(
				(field) => field.name === 'confirmPassword'
			);

			if (!confirmationInputId) {
				return;
			}

			// Store the confirmation input ID and initially disable the field
			state[blockId].confirmationInputId = confirmationInputId;
			state.formFields[confirmationInputIndex].isDisabled = true;
		},
		/**
		 * Analyzes password strength and manages confirmation field state.
		 *
		 * Performs password strength validation, updates condition statuses,
		 * enables/disables the confirmation input based on requirements,
		 * and checks if passwords match when both values are present.
		 */
		onPasswordAnalyzer: () => {
			const { id } = getContext();
			const {
				value,
				confirmationValue,
				confirmationInputId,
				formFields,
			} = state;
			const blockId = state.id;

			// Exit early if no confirmation field is configured
			if (null === confirmationInputId || '' === confirmationInputId) {
				return;
			}

			// Exit early if no password value to analyze
			if ('' === value) {
				return;
			}

			// Run password strength analysis
			const passwordStrengthCheck = checkPasswordStrength(value);

			// Determine if confirmation input should be enabled
			// (only if all strength requirements are met)
			const disableConfirmInput = Object.values(
				passwordStrengthCheck
			).every((result) => result === true);

			// Update confirmation input disabled state
			const confirmationInputIndex = formFields.findIndex(
				(field) => field.name === 'confirmPassword'
			);
			state.formFields[confirmationInputIndex].isDisabled =
				!disableConfirmInput;

			// Update password strength conditions in the conditions list
			const newConditionsList = [];
			Object.keys(passwordStrengthCheck).forEach((key) => {
				const index = state[blockId].conditionsList.findIndex(
					(condition) => condition.id === key
				);
				const condition = state[blockId].conditionsList[index];
				condition.met = passwordStrengthCheck[key];
				newConditionsList[index] = condition;
			});

			// Check if passwords match and update the matching condition
			const doesMatch = confirmationValue === value;
			state[blockId].passwordsMatch = doesMatch;

			const doesMatchIndex = state[blockId].conditionsList.findIndex(
				(condition) => condition.id === 'hasMatch'
			);
			const passMatchCondition =
				state[blockId].conditionsList[doesMatchIndex];
			passMatchCondition.met = doesMatch;
			newConditionsList[doesMatchIndex] = passMatchCondition;

			// Apply all condition updates
			state[blockId].conditionsList = newConditionsList;
		},
		/**
		 * Propagates password value changes to the parent form component.
		 *
		 * This generator function communicates with the target namespace (parent form)
		 * to update the form's state when password validation conditions are met.
		 *
		 * For confirmation-enabled passwords: only propagates when all conditions are met
		 * For simple passwords: propagates changes in real-time
		 *
		 * @generator
		 * @yields {Object} Store reference for the target namespace
		 */
		*onValueChange() {
			const { targetNamespace, id } = getContext();
			const { value, hasConfirmation, passwordsMatch, allConditionsMet } =
				state;

			if (value) {
				// Get the target store (parent form) actions
				const { actions: targetActions } = yield store(targetNamespace);

				if (targetActions.onInputChange) {
					// For confirmation-enabled passwords: only update parent when all conditions are met
					if (hasConfirmation && allConditionsMet) {
						targetActions.onInputChange({
							target: {
								value,
								id,
							},
						});
						// For simple passwords: update parent in real-time
					} else if (!hasConfirmation) {
						targetActions.onInputChange({
							target: {
								value,
								id,
							},
						});
					}
				}
			}
		},
	},
});
