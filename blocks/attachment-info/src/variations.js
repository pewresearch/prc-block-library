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
		description: __(
			'Displays a list of attachmentsfor the parent post of the current attachment. This is only intended for use on Attachment pages.'
		),
		attributes: { variant: 'list' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.variant === blockAttributes.variant,
	},
	{
		name: 'attachments-pagination',
		title: __('Attachments Pagination'),
		description: __(
			'Displays paginated list for the attachments of the parent post of the current attachment. This is only intended for use on Attachment pages.'
		),
		attributes: { variant: 'pagination' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.variant === blockAttributes.variant,
	},
];
