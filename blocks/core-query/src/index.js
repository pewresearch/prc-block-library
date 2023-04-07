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

const stubQueryVariation = {
	name: 'stub-query',
	title: 'Stub Query',
	description:
		'Display a list of Stub objects as Story Items configured in the style of a "Publication Listing".',
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
			isStoryItemLoop: true,
		},
	},
	allowedControls: ['order', 'taxQuery', 'search'],
	isActive: (blockAttributes) => {
		return blockAttributes.query.isStoryItemLoop;
	},
	innerBlocks: StoryItemListingTemplate,
	scope: ['inserter'],
};

registerBlockVariation('core/query', stubQueryVariation);

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
registerBlockVariation('core/query', storyItemListingVariation);
