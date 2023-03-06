/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, context, clientId }) {
	const { uuid } = attributes;
	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select('core/block-editor');
			return {
				hasChildBlocks: 0 < getBlockOrder(clientId).length,
			};
		},
		[clientId]
	);

	const blockProps = useBlockProps({
		'aria-hidden': 'true',
		'data-uuid': `${uuid}`,
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		renderAppender: hasChildBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
		template: [['core/paragraph', { placeholder: 'Add content…' }]],
	});

	return <div {...innerBlocksProps} />;
}
