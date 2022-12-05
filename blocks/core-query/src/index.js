/**
 * WordPress Dependencies
 */
import {
	registerBlockVariation,
	unregisterBlockVariation,
} from '@wordpress/blocks';

registerBlockVariation('core/query', {
	name: 'story-item-listing',
	title: 'Story Item Listing',
	description: 'Display a publication list of story items.',
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

// unregisterBlockVariation('core/query', 'posts-list');
// unregisterBlockVariation('core/query', 'title-date');
// unregisterBlockVariation('core/query', 'title-excerpt');
// unregisterBlockVariation('core/query', 'title-date-excerpt');
// unregisterBlockVariation('core/query', 'image-date-title');
