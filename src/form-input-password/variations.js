/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { getTemplate, doublePasswordTemplate } from './utils';

export default [
	{
		name: 'password-without-confirmation',
		title: __('Password field', 'prc-block-library'),
		excerpt: __(
			'A single password field, without a confirmation field.',
			'prc-block-library'
		),
		attributes: {
			className: 'password-without-confirmation',
			includesConfirmation: false,
		},
		isDefault: true,
		category: 'forms',
		innerBlocks: [getTemplate()],
		scope: ['inserter', 'transform'],
		isActive: (attributes, variationAttributes) =>
			variationAttributes.includesConfirmation ===
			attributes.includesConfirmation,
	},
	{
		name: 'password-with-confirmation',
		title: __('Password field with confirmation', 'prc-block-library'),
		excerpt: __(
			'A single password field, with a confirmation field.',
			'prc-block-library'
		),
		attributes: {
			className: 'password-with-confirmation',
			includesConfirmation: true,
		},
		category: 'forms',
		innerBlocks: doublePasswordTemplate,
		scope: ['inserter', 'transform'],
		isActive: (attributes, variationAttributes) =>
			variationAttributes.includesConfirmation ===
			attributes.includesConfirmation,
	},
];
