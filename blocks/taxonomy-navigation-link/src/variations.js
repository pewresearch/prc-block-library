/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'taxonomy-navigation-link-default',
		isDefault: true,
		title: __('Taxonomy Navigation Link'),
	},
	{
		name: 'taxonomy-navigation-link-sub-tree',
		title: __('Taxonomy Navigation Link: Sub Tree (>)'),
		attributes: {
			showSubMenu: true,
			className: 'is-style-sub-tree',
		},
		isActive: ({ className, showSubMenu }) =>
			className.includes('is-style-sub-tree') && showSubMenu,
	},
	{
		name: 'taxonomy-navigation-link-sub-expand',
		title: __('Taxonomy Navigation Link: Sub Expand (+)'),
		attributes: {
			showSubMenu: true,
			className: 'is-style-sub-expand',
		},
		isActive: ({ className, showSubMenu }) =>
			className.includes('is-style-sub-expand') && showSubMenu,
	},
];

export default variations;
