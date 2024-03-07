/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { SVG, Rect, G } from '@wordpress/components';

const BLOCKNAME = 'core/query';
const BLOCKIDENTIFIER = 'prc-block-pub-listing-query';

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
	]
];

/**
 * Publication Listing Query
 * Changes the default query to only include posts that are published and have a parent, also sets the default post types to post, short-read, fact-sheet, interactives, and quizzes.
 */
const NAMESPACE = "prc-block/pub-listing-query"
const pubListingVariation = {
	name: NAMESPACE,
	title: 'Publication Listing Query',
	description:
		'Query posts in the style of a "Publication Listing".',
	attributes: {
		namespace: NAMESPACE,
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
	allowedControls: ['order', 'taxQuery', 'search', 'author', 'sticky', 'inherit'],
	isActive: ({query}) => {
		return query.isPubListingQuery;
	},
	innerBlocks: PublicationListingTemplate,
	scope: ['inserter', 'transform'],
};

registerBlockVariation('core/query', pubListingVariation);

/**
 * Add html attributes for each responsiveContainerQuery attribute value on the core/group block.
 */
addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-context-area-watcher`,
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes, name, context, isSelected } = props;
			const namespace = attributes?.namespace;
			if (BLOCKNAME !== name || namespace !== NAMESPACE) {
				return <BlockEdit {...props} />;
			}
			const blockAreaContextPostIds = useSelect(select => {
				return select('prc-platform/block-area-context').getPostIds()
			});

			const tmpExclude = attributes.query?.exclude || [];
			attributes.query.exclude = [...blockAreaContextPostIds, ...tmpExclude];

			return <BlockEdit {...props}/>;
		};
	}, 'withBlockAreaContextWatcher')
);
