/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
export default [
	{
		name: 'checkbox',
		title: __('Form Input Checkbox', 'prc-block-library'),
		excerpt: __(
			'A checkbox input field.',
			'prc-block-library'
		),
		attributes: {
			type: 'checkbox',
		},
		isDefault: true,
		category: 'forms',
		scope: ['inserter', 'transform'],
		isActive: (attributes, variationAttributes) =>
			variationAttributes.type ===
			attributes.type,
	},
	{
		name: 'radio',
		title: __('Form Input Radio', 'prc-block-library'),
		excerpt: __(
			'A radio input field.',
			'prc-block-library'
		),
		attributes: {
			type: 'radio',
		},
		category: 'forms',
		scope: ['inserter', 'transform'],
		isActive: (attributes, variationAttributes) =>
			variationAttributes.type ===
			attributes.type,
	},
];
