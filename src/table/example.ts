/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default {
	attributes: {
		head: [
			{
				cells: [
					{
						content: __('Version', 'flexible-table-block'),
						tag: 'th',
					},
					{
						content: __('Jazz Musician', 'flexible-table-block'),
						tag: 'th',
					},
					{
						content: __('Release Date', 'flexible-table-block'),
						tag: 'th',
					},
				],
			},
		],
		body: [
			{
				cells: [
					{
						content: '5.9',
						tag: 'td',
					},
					{
						content: 'Joséphine Baker',
						tag: 'td',
					},
					{
						content: __('January 25, 2022', 'flexible-table-block'),
						tag: 'td',
					},
				],
			},
			{
				cells: [
					{
						content: '5.8',
						tag: 'td',
					},
					{
						content: 'Art Tatum',
						tag: 'td',
					},
					{
						content: __('July 20, 2021', 'flexible-table-block'),
						tag: 'td',
					},
				],
			},
			{
				cells: [
					{
						content: '5.7',
						tag: 'td',
					},
					{
						content: 'Esperanza Spalding',
						tag: 'td',
					},
					{
						content: __('March 9, 2021', 'flexible-table-block'),
						tag: 'td',
					},
				],
			},
		],
	},
};
