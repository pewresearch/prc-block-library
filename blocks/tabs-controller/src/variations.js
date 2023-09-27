/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'tabs-horizontal',
		isDefault: true,
		title: __('Horizontal Tabs'),
		description: __('A set of tabs that display horizontally'),
		attributes: { className: 'is-style-tabbed', vertical: false },
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) => false === blockAttributes.vertical,
	},
	{
		name: 'tabs-vertical',
		title: __('Vertical Tabs'),
		description: __('A set of tabs that display vertically.'),
		attributes: { className: 'is-style-tabbed', vertical: true },
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) => true === blockAttributes.vertical,
	},
];
