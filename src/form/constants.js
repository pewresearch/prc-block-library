
const BASE_TEMPLATE = [
	['prc-block/form-submit', {}],
	[
		'prc-block/form-message',
		{},
		[
			[
				'core/paragraph',
				{
					content: 'Thank you for your message!',
				},
			],
		],
	],
];

const DEFAULT_FORM_TEMPLATE = [
	[
		'prc-block/form-input-text',
		{
			type: 'text',
			label: 'Name',
			required: true,
			placeholder: 'Enter your name',
			metadata: {
				name: 'name',
			},
		},
	],
	[
		'prc-block/form-input-text',
		{
			type: 'email',
			label: 'Email',
			required: true,
			placeholder: 'Enter your email',
			metadata: {
				name: 'email',
			},
		},
	],
	[
		'prc-block/form-input-textarea',
		{
			label: 'Message',
			required: true,
			placeholder: 'Enter your message',
			metadata: {
				name: 'message',
			},
		},
	],
	...BASE_TEMPLATE,
];

export { BASE_TEMPLATE, DEFAULT_FORM_TEMPLATE };

export default DEFAULT_FORM_TEMPLATE;
