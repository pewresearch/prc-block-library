/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'table-of-contents',
		isDefault: true,
		title: __('Table of Contents (Default)'),
		description: __('The default table of contents block. Displays a list of links to chapters and back-chapters in a post in a "Baseball Card" style. On mobile this transforms to a dropdown.'),
		attributes: { className: 'is-style-default' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) => variationAttributes.className === blockAttributes.className,
	},
	{
		name: 'table-of-contents-dropdown',
		isDefault: true,
		title: __('Table of Contents (Dropdown)'),
		description: __('Displays a list of chapters and back-chapters in a post in a dropdown style.'),
		attributes: { className: 'is-style-dropdown' },
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) => variationAttributes.className === blockAttributes.className,
	}
];
