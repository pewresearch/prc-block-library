/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

function checkPasswordStrength(password) {
	// check if password has a lowercase letter
	const hasLowerCase = /[a-z]/.test(password);
	// check if password has an uppercase letter
	const hasUpperCase = /[A-Z]/.test(password);
	// check if password has a number
	const hasNumber = /\d/.test(password);
	// check if password has a symbol that is valid
	const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
		password
	);
	// check if password is at least 12 characters long
	const hasLength = password.length >= 12;
	// check that it only contains valid characters
	const hasNoInvalidCharacters =
		/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password);

	return {
		hasLowerCase,
		hasUpperCase,
		hasNumber,
		hasSpecialCharacter,
		hasLength,
		hasNoInvalidCharacters,
	};
}

const { state } = store('prc-block/form-input-password', {
	actions: {
		onInputChange: (event) => {
			const context = getContext();
			const { ref } = getElement();
			const { id, name } = ref;
			const { value } = event.target;
			const { hasConfirmation, confirmationInputId } = context;

			state[id].value = value;
			if ('confirmPassword' === name) {
				context.confirmationValue = value;
				context.passwordMatch = context.value === value;
			} else {
				if (hasConfirmation) {
					const passwordStrengthCheck = checkPasswordStrength(value);
					// check if all the values in passwordStrengthCheck are true
					const disableConfirmInput = Object.values(
						passwordStrengthCheck
					).every((result) => result === true);
					// Disable the confirmationn input if the password does not meet the requirements
					state[confirmationInputId].isDisabled =
						!disableConfirmInput;
					// Report the password strength to the user
					Object.keys(passwordStrengthCheck).forEach((key) => {
						const index = context.conditionsList.findIndex(
							(condition) => condition.id === key
						);
						const condition = context.conditionsList[index];
						condition.met = passwordStrengthCheck[key];
						context.conditionsList[index] = condition;
					});
				}
				context.value = value;
			}
		},
	},
	callbacks: {
		onValueChange: () => {
			const context = getContext();
			const { value, targetNamespace, hasConfirmation, passwordMatch } =
				context;
			if (value) {
				const { actions } = store(targetNamespace);
				if (actions.onPasswordChange) {
					console.log('PUSH', value, 'to', targetNamespace, context);
					// If the password is expecting confirmation then check if the passwords match before sending up the value
					if (hasConfirmation && passwordMatch) {
						actions.onPasswordChange(value);
					} else if (!hasConfirmation) {
						actions.onPasswordChange(value);
					}
				}
			}
		},
		onConfirmationInit: () => {
			const context = getContext();
			console.log('onConfirmationInit', context, state);
			// get the confirmation input value id and store it so we can set it as disabled...
			const confirmationInputKey = Object.keys(state).find(
				(key) =>
					state[key].type === 'password' &&
					state[key].name === 'confirmPassword'
			);
			context.confirmationInputId = confirmationInputKey;
			state[confirmationInputKey].isDisabled = true;
		},
	},
});
