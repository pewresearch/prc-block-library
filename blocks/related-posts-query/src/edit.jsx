
/**
 * External Dependencies
 */
import { InnerBlocksAsContextTemplate, getInnerBlocksContextAsQuery } from '@prc/components';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'prc-block/story-item',
	'core/post-title',
	'core/post-date',
	'core/post-excerpt',
]

const TEMPLATE = [
	['prc-block/story-item'],
];

export default function Edit({ clientId, context, attributes, setAttributes }) {
	const { perPage } = attributes;

	const blockProps = useBlockProps({
		style: {
			'gap': getBlockGapSupportValue(attributes),
		},
	});

	const {blockContexts, isResolving} = getInnerBlocksContextAsQuery('post', perPage);

	return (
		<div {...blockProps}>
			<InnerBlocksAsContextTemplate {...{
				clientId,
				allowedBlocks: ALLOWED_BLOCKS,
				template: TEMPLATE,
				blockContexts,
				isResolving,
			}}/>
		</div>
	);
}
