/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'staff-name',
		title: __('Staff Name'),
		attributes: {
			valueToFetch: 'name',
		},
		default: true,
		isActive: ({ valueToFetch }) => 'name' === valueToFetch,
	},
	{
		name: 'staff-job-title',
		title: __('Staff Job Title'),
		attributes: {
			valueToFetch: 'jobTitle',
		},
		isActive: ({ valueToFetch }) => 'jobTitle' === valueToFetch,
	},
	{
		name: 'staff-twitter',
		title: __('Staff Twitter'),
		attributes: {
			valueToFetch: 'twitter',
		},
		isActive: ({ valueToFetch }) => 'twitter' === valueToFetch,
	},
	{
		name: 'staff-bio',
		title: __('Staff Bio'),
		attributes: {
			valueToFetch: 'bio',
		},
		isActive: ({ valueToFetch }) => 'bio' === valueToFetch,
	},
	{
		name: 'staff-mini-bio',
		title: __('Staff Mini Bio'),
		attributes: {
			valueToFetch: 'miniBio',
		},
		isActive: ({ valueToFetch }) => 'miniBio' === valueToFetch,
	},
	{
		name: 'staff-image',
		title: __('Staff Image'),
		attributes: {
			valueToFetch: 'image',
		},
		isActive: ({ valueToFetch }) => 'image' === valueToFetch,
	},
];

export default variations;
