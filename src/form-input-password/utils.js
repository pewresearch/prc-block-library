/**
 * Construct a simple form field template for the input text block.
 * @param {*} attributes
 * @param {*} label
 * @param {*} name
 * @return
 */
export const getTemplate = (
	attributes = {},
	label = 'Password',
	name = 'password'
) => {
	const { includesConfirmation } = attributes;

	return [
		'prc-block/form-input-text',
		{
			type: 'password',
			label: label,
			required: true,
			placeholder: includesConfirmation
				? 'Password...'
				: 'Confirm Password...',
			interactiveNamespace: 'prc-block/form-input-password',
			metadata: {
				name,
			},
			lock: {
				move: true,
				remove: true,
			},
		},
	];
};

export const doublePasswordTemplate = [
	getTemplate(),
	getTemplate(
		{ includesConfirmation: true },
		'Confirm Password',
		'confirmPassword'
	),
];
