// Standard list type...
// Paginagion type... just returns numbers...
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'attachments-list',
		isDefault: true,
		title: __('Attachments List'),
		description: __(''),
		attributes: { variant: 'list' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.variant === blockAttributes.variant,
	},
	{
		name: 'attachments-pagination',
		title: __('Attachments Pagination'),
		description: __(''),
		attributes: { variant: 'pagination' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.variant === blockAttributes.variant,
	},
];
