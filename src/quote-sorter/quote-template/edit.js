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
/**
 * Internal Dependencies
 */
import Controls from './Controls.jsx';

const TEMPLATE = [
	['prc-block/quote-sorter-quote-text'],
	['prc-block/quote-sorter-quote-attribution'],
];

function QuoteTemplateInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-prc-block-quote active-quote ${
				!includeQuoteArt ? 'no-art' : ''
			}`,
		},
		{ template: TEMPLATE },
	);
	return <div {...innerBlocksProps} />;
}

function QuoteTemplateBlockPreview({
	blocks,
	blockContextId,
	isHidden,
	setActiveBlockContextId,
	includeQuoteArt,
}) {
	const blockPreviewProps = useBlockPreview({
		blocks,
		props: {
			className: `wp-block-prc-block-quote active-quote ${
				!includeQuoteArt ? 'no-art' : ''
			}`,
		},
	});

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

const MemoizedQuoteTemplateBlockPreview = memo(QuoteTemplateBlockPreview);

export default function QuoteTemplateEdit({
	clientId,
	context,
	attributes,
	setAttributes,
}) {
	const sorterId = context['prc-block/quote-sorter-hash'];

	const [activeBlockContextId, setActiveBlockContextId] = useState(null);
	const [entries, setEntries] = useState(false);
	const [currentSorterId, setCurrentSorterId] = useState(null);
	const { blocks } = useSelect(
		(select) => {
			const { getBlocks } = select(blockEditorStore);
			return {
				blocks: getBlocks(clientId),
			};
		},
		[clientId, sorterId],
	);

	useEffect(() => {
		if (sorterId !== currentSorterId) {
			getQuotes(sorterId);
		}
	}, [sorterId]);

	const getQuotes = (sorterId) => {
		console.log('retrieving quotes for sorterId: ', sorterId);
		apiFetch({
			path: `/prc-api/v2/block/quote-sorter/retrieve?hash=${sorterId}`,
		})
			.then(({ data }) => {
				const { quotes } = data;
				if (undefined !== quotes) {
					const quoteArray = [...quotes];
					const firstTen = quoteArray.splice(0, 10);
					setEntries([...firstTen]);
					setCurrentSorterId(sorterId);
				}
			})
			.catch((error) => {
				console.log({ error });
			});
	};

	const blockContexts = useMemo(() => {
		if (!entries) {
			return [];
		}
		return entries?.map((entry) => ({
			'prc-block/quote-sorter/quote': entry.quote,
			'prc-block/quote-sorter/attribution': entry.attribution,
			props: entry.props,
		}));
	}, [entries]);

	useEffect(() => {
		if (blockContexts.length > 0) {
			const firstBlockContext = blockContexts[0];
			setActiveBlockContextId(md5(JSON.stringify(firstBlockContext)));
		}
	}, [blockContexts]);

	const blockProps = useBlockProps();

	if (!entries) {
		return (
			<p {...blockProps}>
				<p>Add data to populate the quote sorter</p>
				<Spinner style={{ align: 'center' }} />
			</p>
		);
	}

	if (!entries.length) {
		return <p {...blockProps}> {__('No quotes found.')}</p>;
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
								<QuoteTemplateInnerBlocks />
							) : null}
							<MemoizedQuoteTemplateBlockPreview
								blocks={blocks}
								blockContextId={contextId}
								setActiveBlockContextId={setActiveBlockContextId}
								isHidden={isVisible}
								includeQuoteArt={attributes.includeQuoteArt}
							/>
						</BlockContextProvider>
					);
				})}
			<Controls attributes={attributes} setAttributes={setAttributes} />
		</div>
	);
}
