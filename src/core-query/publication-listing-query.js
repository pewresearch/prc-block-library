/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

export default function registerPubListingQueryVariation() {
	const PublicationListingTemplate = [
		[
			'core/post-template',
			{},
			[
				[
					'prc-block/story-item',
					{
						imageSlot: 'left',
						imageSize: 'A3',
						metaTaxonomy: 'formats',
					},
				],
			],
		],
		[
			'core/query-pagination',
			{
				showLabel: true,
			},
		],
	];

	/**
	 * Publication Listing Query
	 * Changes the default query to only include posts that are published and have a parent
	 * also sets the default post types to post, short-read, fact-sheet, interactives, and quizzes.
	 */
	const pubListingVariation = {
		name: 'prc-block/pub-listing-query',
		title: 'Publication Listing Query',
		description: 'Query posts in the style of a "Publication Listing".',
		attributes: {
			namespace: 'prc-block/pub-listing-query',
			query: {
				perPage: 10,
				postType: 'post',
				order: 'desc',
				orderBy: 'date',
				inherit: true,
				isPubListingQuery: true,
			},
			enhancedPagination: true,
		},
		allowedControls: [
			'order',
			'taxQuery',
			'search',
			'author',
			'postCount',
			'sticky',
			'inherit',
		],
		isActive: ({ query }) => {
			return query.isPubListingQuery;
		},
		innerBlocks: PublicationListingTemplate,
		scope: ['inserter', 'transform'],
	};

	registerBlockVariation('core/query', pubListingVariation);
}
