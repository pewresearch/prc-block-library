/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

function Edit({ attributes, className, context, clientId }) {
	const { uuid } = attributes;
	// eslint-disable-next-line react/destructuring-assignment
	const currentlyActive = context['prc-block/tabs/active'];
	const isActive = uuid === currentlyActive;

	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select('core/block-editor');
			return {
				hasChildBlocks: 0 < getBlockOrder(clientId).length,
			};
		},
		[clientId],
	);

	const blockProps = useBlockProps({
		'aria-hidden': !isActive,
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		renderAppender: hasChildBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
	});

	return <div {...innerBlocksProps} />;
}

export default Edit;
