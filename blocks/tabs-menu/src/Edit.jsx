/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
const ALLOWED_BLOCKS = ['prc-block/tabs-menu-item'];
const BLOCKS_TEMPLATE = [['prc-block/tabs-menu-item', {}]];

export default function Edit({ context }) {
	const isVerticalLayout = context['prc-block/tabs/layout'];

	const blockProps = useBlockProps({});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: isVerticalLayout ? 'vertical' : 'horizontal',
		template: BLOCKS_TEMPLATE,
		templateLock: false,
	});

	return <div {...innerBlocksProps} />;
}
