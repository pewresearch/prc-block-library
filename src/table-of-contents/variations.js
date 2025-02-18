/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'table-of-contents',
		isDefault: true,
		title: __('Table of Contents (Default)'),
		description: __(
			'The default table of contents block. Displays a list of links to sections and chapters in a post in a "Baseball Card" style. On mobile this transforms to a dropdown.'
		),
		attributes: { displayType: 'list' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.displayType === blockAttributes.displayType,
	},
	{
		name: 'table-of-contents-dropdown',
		isDefault: true,
		title: __('Table of Contents (Dropdown)'),
		description: __(
			'Displays a list of sections and chapters in a post in a dropdown style.'
		),
		attributes: { displayType: 'dropdown' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.displayType === blockAttributes.displayType,
	},
	{
		name: 'table-of-contents-accordion',
		isDefault: true,
		title: __('Table of Contents (Accordion)'),
		description: __(
			'Displays a list of sections and chapters in a report in an accordion style.'
		),
		attributes: { displayType: 'accordion' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			variationAttributes.displayType === blockAttributes.displayType,
	},
];
