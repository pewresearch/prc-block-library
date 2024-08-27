export default function checkPasswordStrength(password) {
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
