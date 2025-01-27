/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'form-field-input-text',
		isDefault: true,
		title: __('Form Input Text', 'prc-block-library'),
		excerpt: __('Form Input Text block...', 'prc-block-library'),
		attributes: {
			className: 'is-style-form-field-input-text',
			allowedBlocks: ['prc-block/form-input-text'],
		},
		innerBlocks: [
			[
				'prc-block/form-input-text',
				{
					placeholder: 'Text...',
					type: 'text',
				},
			],
		],
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className
				? className.includes('is-style-form-field-input-text')
				: false,
	},
	{
		name: 'form-field-input-textarea',
		title: __('Form Input Text Area', 'prc-block-library'),
		excerpt: __('Form Input Text Area block...', 'prc-block-library'),
		attributes: {
			className: 'is-style-form-field-input-textarea',
			allowedBlocks: ['prc-block/form-input-text'],
		},
		innerBlocks: [
			[
				'prc-block/form-input-text',
				{
					placeholder: 'Text Area...',
					type: 'textarea',
				},
			],
		],
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className
				? className.includes('is-style-form-field-input-textarea')
				: false,
	},
	{
		name: 'form-field-input-email',
		title: __('Form Input Email', 'prc-block-library'),
		excerpt: __('Form Input Email block...', 'prc-block-library'),
		attributes: {
			className: 'is-style-form-field-input-email',
			allowedBlocks: ['prc-block/form-input-text'],
		},
		innerBlocks: [
			[
				'prc-block/form-input-text',
				{
					placeholder: 'Email Address...',
					type: 'email',
				},
			],
		],
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className
				? className.includes('is-style-form-field-input-email')
				: false,
	},
	{
		name: 'form-field-select',
		title: __('Form Input Select', 'prc-block-library'),
		excerpt: __('Form Select block...', 'prc-block-library'),
		attributes: {
			className: 'is-style-form-field-select',
			allowedBlocks: ['prc-block/form-input-select'],
		},
		innerBlocks: [
			[
				'prc-block/form-input-select',
				{
					placeholder: 'Select ...',
					type: 'select',
				},
			],
		],
	},
];
