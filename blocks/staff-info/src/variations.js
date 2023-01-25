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
			valueToFetch: 'staffName',
		},
		default: true,
		isActive: ({ valueToFetch }) => 'staffName' === valueToFetch,
	},
	{
		name: 'staff-job-title',
		title: __('Staff Job Title'),
		attributes: {
			valueToFetch: 'staffJobTitle',
		},
		isActive: ({ valueToFetch }) => 'staffJobTitle' === valueToFetch,
	},
	{
		name: 'staff-twitter',
		title: __('Staff Twitter'),
		attributes: {
			valueToFetch: 'staffTwitter',
		},
		isActive: ({ valueToFetch }) => 'staffTwitter' === valueToFetch,
	},
	{
		name: 'staff-bio',
		title: __('Staff Bio'),
		attributes: {
			valueToFetch: 'staffBio',
		},
		isActive: ({ valueToFetch }) => 'staffBio' === valueToFetch,
	},
	{
		name: 'staff-mini-bio',
		title: __('Staff Mini Bio'),
		attributes: {
			valueToFetch: 'staffMiniBio',
		},
		isActive: ({ valueToFetch }) => 'staffMiniBio' === valueToFetch,
	},
	{
		name: 'staff-image',
		title: __('Staff Image'),
		attributes: {
			valueToFetch: 'staffImage',
		},
		isActive: ({ valueToFetch }) => 'staffImage' === valueToFetch,
	},
];

export default variations;
