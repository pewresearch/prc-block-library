/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'desktop',
		isDefault: true,
		title: __('Desktop'),
		attributes: {
			deviceType: 'desktop',
			min: 980,
			max: 0,
		},
		scope: ['inserter', 'transform'],
		isActive: ({ deviceType }) => 'desktop' === deviceType,
	},
	{
		name: 'tablet',
		title: __('Tablet'),
		attributes: {
			deviceType: 'tablet',
			min: 480,
			max: 979,
		},
		scope: ['inserter', 'transform'],
		isActive: ({ deviceType }) => 'tablet' === deviceType,
	},
	{
		name: 'mobile',
		title: __('Mobile'),
		attributes: {
			deviceType: 'mobile',
			min: 0,
			max: 479,
		},
		scope: ['inserter', 'transform'],
		isActive: ({ deviceType }) => 'mobile' === deviceType,
	},
];

export default variations;
