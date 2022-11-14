
/**
 * External Dependencies
 */
import md5 from 'md5';

/**
 * WordPress dependencies
 */
import { memo, useMemo, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = [
	'prc-block/story-item',
	'core/post-title',
	'core/post-date',
	'core/post-excerpt',
]

const TEMPLATE = [
	['prc-block/story-item'],
];

function RelatedPostsInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			alllowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
		},
	);
	return <div {...innerBlocksProps} />;
}

function RelatedPostsBlockPreview({
	blocks,
	blockContextId,
	isHidden,
	setActiveBlockContextId,
}) {
	const blockPreviewProps = useBlockPreview({blocks});

	const handleOnClick = () => {
		setActiveBlockContextId(blockContextId);
	};

	const style = {
		display: isHidden ? 'none' : undefined,
	};
	return (
		<div
			{...blockPreviewProps}
			tabIndex={0}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			onClick={handleOnClick}
			onKeyPress={handleOnClick}
			style={style}
		/>
	);
}

const MemoizedRelatedPostsBlockPreview = memo(RelatedPostsBlockPreview);

export default function edit({ clientId, context, attributes, setAttributes }) {
	const { taxonomy, perPage, postType } = attributes;

	const [activeBlockContextId, setActiveBlockContextId] = useState(null);
	const [entries, setEntries] = useState(false);
	const { records, isResolving } = useEntityRecords(
		'postType',
		postType,
		{
			per_page: perPage,
			post_parent: 0, // exclude child posts
			context: 'view',
		},
	);

	// const getQuotes = (sorterId) => {
	// 	console.log('retrieving quotes for sorterId: ', sorterId);
	// 	apiFetch({
	// 		path: `/prc-api/v2/block/quote-sorter/retrieve?hash=${sorterId}`,
	// 	})
	// 		.then(({ data }) => {
	// 			const { quotes } = data;
	// 			if (undefined !== quotes) {
	// 				const quoteArray = [...quotes];
	// 				const firstTen = quoteArray.splice(0, perPage);
	// 				setEntries([...firstTen]);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log({ error });
	// 		});
	// };

	const { blocks } = useSelect(
		(select) => {
			const { getBlocks } = select(blockEditorStore);
			return {
				blocks: getBlocks(clientId),
			};
		},
		[clientId],
	);

	const blockContexts = useMemo(() => {
		if (!records || isResolving) {
			console.log("doing this");
			return [];
		}
		console.log("doing this instead...", records);
		return records?.map((post) => ({
			'queryId': 0,
			'postId': post.id,
			'postType': post.postType,
			props: post.props,
		}));
	}, [records, isResolving]);

	useEffect(() => {
		if (blockContexts.length > 0) {
			const firstBlockContext = blockContexts[0];
			setActiveBlockContextId(md5(JSON.stringify(firstBlockContext)));
		}
	}, [blockContexts]);

	const blockProps = useBlockProps();

	const postTypeLabel = postType.charAt(0).toUpperCase() + postType.slice(1);

	if (!records) {
		return (
			<div {...blockProps}>
				<Spinner style={{ align: 'center' }} />
				<p>Loading {`${postTypeLabel}`}</p>
			</div>
		);
	}

	// To avoid flicker when switching active block contexts, a preview is rendered
	// for each block context, but the preview for the active block context is hidden.
	// This ensures that when it is displayed again, the cached rendering of the
	// block preview is used, instead of having to re-render the preview from scratch.
	return (
		<div {...blockProps}>
			{blockContexts &&
				blockContexts.map((blockContext, index) => {
					const contextId = md5(JSON.stringify(blockContext));
					const isVisible =
						contextId ===
						(activeBlockContextId || md5(JSON.stringify(blockContexts[0])));
					return (
						<BlockContextProvider
							key={`context-key--${index}`}
							value={blockContext}
						>
							{activeBlockContextId === null || isVisible ? (
								<RelatedPostsInnerBlocks />
							) : null}
							<MemoizedRelatedPostsBlockPreview
								blocks={blocks}
								blockContextId={contextId}
								setActiveBlockContextId={setActiveBlockContextId}
								isHidden={isVisible}
							/>
						</BlockContextProvider>
					);
				})}
		</div>
	);
}
