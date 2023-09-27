/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { SVG, Rect, G } from '@wordpress/components';

const StoryItemListingTemplate = [
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
	[
		'core/group',
		{
			layout: {
				type: 'default',
			},
			style: {
				spacing: {
					padding: {
						top: 'var:preset|spacing|40',
						right: '0',
						bottom: 'var:preset|spacing|40',
						left: '0',
					},
				},
				elements: {
					link: {
						color: {
							text: 'var:preset|color|text-color',
						},
					},
				},
			},
		},
		[
			[
				'core/paragraph',
				{
					align: 'right',
					style: {
						typography: {
							textTransform: 'uppercase',
						},
					},
					textColor: 'slate',
					fontSize: 'small-label',
					fontFamily: 'sans-serif',
					content:
						'<a href="https://www.pewresearch.org/publications">All Publications ></a>',
				},
			],
		],
	],
];

/**
 * Legacy Stub Query
 */
const stubQueryVariation = {
	name: 'stub-query',
	title: 'Stub Query (legacy)',
	description:
		'Display a list of stub objects as Story Items in a "Publication Listing" style.',
	attributes: {
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
			isStubQuery: true,
		},
	},
	allowedControls: ['order', 'taxQuery', 'search'],
	isActive: (blockAttributes) => {
		return blockAttributes.query.isStubQuery;
	},
	innerBlocks: StoryItemListingTemplate,
	scope: ['inserter'],
};

/**
 * Publication Listing Query
 * Changes the default query to only include posts that are published and have a parent, also sets the default post types to post, short-read, fact-sheet, interactives, and quizzes.
 */
const pubListingVariation = {
	name: 'pub-listing-query',
	title: 'Publication Listing Query (new)',
	description:
		'Query published, parent posts in the style of a "Publication Listing".',
	attributes: {
		query: {
			perPage: 10,
			pages: 1,
			offset: 0,
			categoryIds: [],
			postType: ['post', 'short-read', 'fact-sheet', 'interactive', 'quiz'],
			tagIds: [],
			order: 'desc',
			orderBy: 'date',
			author: '',
			search: '',
			sticky: 'include',
			inherit: false,
			isPubListingQuery: true,
		},
	},
	allowedControls: ['order', 'taxQuery', 'search', 'postType'],
	isActive: (blockAttributes) => {
		return blockAttributes.query.isPubListingQuery;
	},
	innerBlocks: StoryItemListingTemplate,
	scope: ['inserter'],
};

/**
 * This is a varaition inside the main query block, it acts as a shortcut to create a story item listing.
 */
const storyItemListingVariation = {
	name: 'story-item-query',
	title: 'Story Item',
	scope: ['block'],
	icon: () => (
		<SVG
			id="Layer_2"
			data-name="Layer 2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			width="48px"
			height="48px"
		>
			<G id="Layer_1-2" data-name="Layer 1" focusable="false">
				<Rect y="23" width="30" height="1" />
				<Rect y="29" width="30" height="1" />
				<Rect y="26" width="12" height="1" />
				<Rect width="34" height="17.7" />
				<Rect y="19.14" width="34" height="2.11" />
			</G>
		</SVG>
	),
	attributes: {
		className: 'has-story-items',
		query: {
			perPage: 5,
			pages: 1,
			offset: 0,
			postType: 'post',
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
	allowedControls: ['inherit', 'order', 'postType', 'taxQuery', 'search'],
	innerBlocks: StoryItemListingTemplate,
};

registerBlockVariation('core/query', stubQueryVariation);
registerBlockVariation('core/query', pubListingVariation);
registerBlockVariation('core/query', storyItemListingVariation);
