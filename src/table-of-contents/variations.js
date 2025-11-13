/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'table-of-contents',
		isDefault: true,
		title: __('Table of Contents'),
		description: __(
			'Displays a list of links to sections and chapters in a post.'
		),
		attributes: {},
		scope: ['inserter', 'transform'],
	},
];
