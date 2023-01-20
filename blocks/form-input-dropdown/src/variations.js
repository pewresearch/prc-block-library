/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */

export default [
	{
		name: 'form-input-dropdown-search',
		title: __('Form Input Dropdown - Search'),
		description: __('A form input dropdown with search selection'),
		attributes: {
			search: true,
		},
		isActive: ({ search }) => search,
	},
	{
		name: 'form-input-dropdown-multiple-select',
		title: __('Form Input Dropdown - Multiple Select'),
		description: __('A form input dropdown with multiple selections'),
		attributes: {
			multiple: true,
		},
		isActive: ({ multiple }) => multiple,
	},
	{
		name: 'form-input-dropdown-multiple-select-search',
		title: __('Form Input Dropdown - MSS'),
		description: __(
			'A form input dropdown with search and multiple selections',
		),
		attributes: {
			multipleSearch: true,
		},
		isActive: ({ multipleSearch }) => multipleSearch,
	},
];
