/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import checkPasswordStrength from './check-password-strength';

const { state } = store('prc-block/form-input-password', {
	state: {
		get id() {
			return getContext()?.id || false;
		},
		get value() {
			const { id } = state;
			return state[id]?.value || '';
		},
		get hasConfirmation() {
			const { id } = state;
			return state[id]?.hasConfirmation || false;
		},
		get confirmationInputId() {
			const { id } = state;
			return state[id]?.confirmationInputId || '';
		},
		get confirmationValue() {
			const { id } = state;
			return state[id]?.confirmationValue || '';
		},
		get passwordsMatch() {
			const { id } = state;
			return state[id]?.passwordsMatch || false;
		},
	},
	actions: {
		onInputChange: (event) => {
			const { ref } = getElement();
			const { id, name } = ref;
			const newValue = event.target?.value;
			const blockId = state.id;

			// Store the input's value in the appropriate state object for the input:
			state[id].value = newValue;
			if ('confirmPassword' === name) {
				state[blockId].confirmationValue = newValue;
			} else {
				state[blockId].value = newValue;
			}
		},
	},
	callbacks: {
		onConfirmationInit: () => {
			const blockId = state.id;
			// We're going to search through state to find the input field that has a type
			// of password and a name of confirmPassword to get the correct input field.
			// Then we're going to return the key of that input field, the ID.
			const confirmationInputId = Object.keys(state).find(
				(key) =>
					state[key].type === 'password' &&
					state[key].name === 'confirmPassword'
			);
			state[blockId].confirmationInputId = confirmationInputId;
			state[confirmationInputId].isDisabled = true;
		},
		onPasswordAnalyzer: () => {
			const { value, confirmationValue, confirmationInputId } = state;
			const blockId = state.id;
			if (null === confirmationInputId || '' === confirmationInputId) {
				return;
			}
			if ('' === value) {
				return;
			}
			const passwordStrengthCheck = checkPasswordStrength(value);

			// check if all the values in passwordStrengthCheck are true
			const disableConfirmInput = Object.values(
				passwordStrengthCheck
			).every((result) => result === true);
			// Disable the confirmationn input if the password does not meet the requirements
			state[confirmationInputId].isDisabled = !disableConfirmInput;
			// Report the password strength to the user
			const newConditionsList = [];
			Object.keys(passwordStrengthCheck).forEach((key) => {
				const index = state[blockId].conditionsList.findIndex(
					(condition) => condition.id === key
				);
				const condition = state[blockId].conditionsList[index];
				condition.met = passwordStrengthCheck[key];
				newConditionsList[index] = condition;
			});

			const doesMatch = confirmationValue === value;
			state[blockId].passwordsMatch = doesMatch;

			const doesMatchIndex = state[blockId].conditionsList.findIndex(
				(condition) => condition.id === 'hasMatch'
			);
			const passMatchCondition =
				state[blockId].conditionsList[doesMatchIndex];
			passMatchCondition.met = doesMatch;
			newConditionsList[doesMatchIndex] = passMatchCondition;
			state[blockId].conditionsList = newConditionsList;
		},
		onValueChange: () => {
			const { targetNamespace, id } = getContext();
			const { value, hasConfirmation, passwordsMatch } = state;
			if (value) {
				const { actions } = store(targetNamespace);
				if (actions.onPasswordChange) {
					if (hasConfirmation && passwordsMatch) {
						actions.onPasswordChange(value);
					} else if (!hasConfirmation) {
						actions.onPasswordChange(value);
					}
				}
			}
		},
	},
});
