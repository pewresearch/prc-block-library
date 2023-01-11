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
];

export default variations;
