/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'taxonomy-menu-nav',
		title: __('Taxonomy Nav Menu'),
		attributes: {
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'horizontal',
			},
		},
		isActive: ({ layout }) => 'horizontal' === layout.orientation,
	},
	{
		name: 'taxonomy-menu-list',
		title: __('Taxonomy List Menu'),
		isDefault: true,
		attributes: {
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'vertical',
			},
		},
		isActive: ({ layout }) => 'vertical' === layout.orientation,
	},
];

export default variations;
