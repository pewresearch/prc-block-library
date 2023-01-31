/**
 * External Dependencies
 */
import {
	addSubmenu as subMenuIcon,
	link as linkIcon,
	heading as subHeadingIcon,
} from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'taxonomy-menu-link-default',
		isDefault: true,
		title: __('Link'),
		icon: linkIcon,
		scope: ['inserter', 'transform'],
		isActive: ({ className, enableSubMenu }) =>
			!className || !className.includes('is-style-sub') || !enableSubMenu,
	},
	{
		name: 'taxonomy-menu-link-sub-tree',
		title: __('Sub Tree'),
		attributes: {
			enableSubMenu: true,
			className: 'is-style-sub-tree',
		},
		icon: subMenuIcon,
		scope: ['inserter', 'transform'],
		isActive: ({ className, enableSubMenu }) =>
			className && className.includes('is-style-sub-tree') && enableSubMenu,
	},
	{
		name: 'taxonomy-menu-link-sub-expand',
		title: __('Sub Expand'),
		attributes: {
			enableSubMenu: true,
			className: 'is-style-sub-expand',
		},
		icon: subMenuIcon,
		scope: ['inserter', 'transform'],
		isActive: ({ className, enableSubMenu }) =>
			className && className.includes('is-style-sub-expand') && enableSubMenu,
	},
	{
		name: 'taxonomy-menu-link-sub-heading',
		title: __('Sub Heading'),
		attributes: {
			enableSubMenu: false,
			className: 'is-style-sub-heading',
		},
		icon: subHeadingIcon,
		isActive: ({ className, enableSubMenu }) =>
			className &&
			className.includes('is-style-sub-heading') &&
			false === enableSubMenu,
	},
];

export default variations;
