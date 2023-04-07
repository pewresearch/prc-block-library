/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('core/query', {
	name: 'story-item-listing',
	title: 'Story Item Listing',
	description: 'Display a publication list of Story Items.',
	attributes: {
		className: 'is-story-item-listing',
		query: {
			perPage: 5,
			pages: 1,
			offset: 0,
			postType: 'stub',
			categoryIds: [],
			tagIds: [],
			order: 'desc',
			orderBy: 'date',
			author: '',
			search: '',
			sticky: 'exclude',
			inherit: false,
			isStoryItemLoop: true,
		},
	},
	innerBlocks: [
		[
			'core/post-template',
			{},
			[
				[
					'prc-block/story-item',
					{
						imageSlot: 'left',
						imageSize: 'A3',
					},
				],
			],
		],
	],
	scope: ['block'],
});
