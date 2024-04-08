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
		name: 'staff-link',
		title: __('Staff Link'),
		attributes: {
			valueToFetch: 'staffLink',
			enableLink: true,
		},
		isActive: ({ valueToFetch }) => 'staffLink' === valueToFetch,
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
		name: 'staff-job-title-extended',
		title: __('Staff Job Title (Extended)'),
		attributes: {
			valueToFetch: 'staffJobTitleExtended',
		},
		isActive: ({ valueToFetch }) =>
			'staffJobTitleExtended' === valueToFetch,
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
		name: 'staff-bio-short',
		title: __('Staff Bio (Short)'),
		attributes: {
			valueToFetch: 'staffBioShort',
		},
		isActive: ({ valueToFetch }) => 'staffBioShort' === valueToFetch,
	},
	{
		name: 'staff-image',
		title: __('Staff Image'),
		attributes: {
			valueToFetch: 'staffImage',
		},
		isActive: ({ valueToFetch }) => 'staffImage' === valueToFetch,
	},
	{
		name: 'staff-expertise',
		title: __('Staff Expertise'),
		attributes: {
			valueToFetch: 'staffExpertise',
		},
		isActive: ({ valueToFetch }) => 'staffExpertise' === valueToFetch,
	},
];

export default variations;
