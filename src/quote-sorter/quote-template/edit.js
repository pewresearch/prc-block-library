/**
 * WordPress dependencies
 */
import { memo, useMemo, useState } from '@wordpress/element';
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

const TEMPLATE = [
	['prc-block/quote-sorter-quote-text'],
	['prc-block/quote-sorter-quote-attribution'],
];

function QuoteTemplateInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-prc-block-quote' },
		{ template: TEMPLATE },
	);
	return <li {...innerBlocksProps} />;
}

function QuoteTemplateBlockPreview({
	blocks,
	blockContextId,
	isHidden,
	setActiveBlockContextId,
}) {
	const blockPreviewProps = useBlockPreview({
		blocks,
		props: {
			className: 'wp-block-prc-block-quote',
		},
	});

	const handleOnClick = () => {
		setActiveBlockContextId(blockContextId);
	};

	const style = {
		display: isHidden ? 'none' : undefined,
	};

	return (
		<li
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

export default function QuoteTemplateEdit({ clientId, context }) {
	const sorterId = context['prc-block/quote-sorter-hash'];

	const [activeBlockContextId, setActiveBlockContextId] = useState();

	const { entries, blocks } = useSelect(
		(select) => {
			const { getBlocks } = select(blockEditorStore);
			// Do apifetch to get your entries by sorterId "hash"
			// const entries = my entries....

			const quotes = apiFetch({
				path: `/prc-api/v2/block/quote-sorter/retrieve?hash=${sorterId}`,
			})
				.then((data) => {
					console.log({ data });
					return data?.quotes;
				})
				.catch((e) => {
					console.log('Error!');
					console.log({ e });
				});
			return {
				entries: quotes,
				blocks: getBlocks(clientId),
			};
		},
		[clientId, sorterId],
	);

	const blockContexts = useMemo(
		() =>
			entries?.map((entry) => ({
				quote: entry.quote,
				attribution: entry.attribution,
			})),
		[entries],
	);

	const blockProps = useBlockProps();

	if (!entries) {
		return (
			<p {...blockProps}>
				<Spinner />
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
		<ul {...blockProps}>
			{blockContexts &&
				blockContexts.map((blockContext) => (
					<BlockContextProvider
						key={JSON.stringify(blockContext)}
						value={blockContext}
					>
						{blockContext.quote ===
						(activeBlockContextId ||
							JSON.stringify(blockContexts[0]?.quote)) ? (
							<QuoteTemplateInnerBlocks />
						) : null}
						<MemoizedQuoteTemplateBlockPreview
							blocks={blocks}
							blockContextId={JSON.stringify(blockContexts[0]?.quote)}
							setActiveBlockContextId={setActiveBlockContextId}
							isHidden={
								JSON.stringify(blockContexts[0]?.quote) ===
								(activeBlockContextId ||
									JSON.stringify(blockContexts[0]?.quote))
							}
						/>
					</BlockContextProvider>
				))}
		</ul>
	);
}
