/**
 * External Dependencies
 */
import { addSubmenu as subMenuIcon, link as linkIcon } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'taxonomy-menu-link-default',
		isDefault: true,
		title: __('Term Link'),
		icon: linkIcon,
	},
	{
		name: 'taxonomy-menu-link-sub-tree',
		title: __('Sub Tree (>)'),
		attributes: {
			enableSubMenu: true,
			className: 'is-style-sub-tree',
		},
		icon: subMenuIcon,
		isActive: ({ className, enableSubMenu }) =>
			className && className.includes('is-style-sub-tree') && enableSubMenu,
	},
	{
		name: 'taxonomy-menu-link-sub-expand',
		title: __('Sub Expand (+)'),
		attributes: {
			enableSubMenu: true,
			className: 'is-style-sub-expand',
		},
		icon: subMenuIcon,
		isActive: ({ className, enableSubMenu }) =>
			className && className.includes('is-style-sub-expand') && enableSubMenu,
	},
];

export default variations;
