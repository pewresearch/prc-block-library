/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-page'];

export default function Edit() {
	const blockProps = useBlockProps({});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		renderAppender: false,
	});

	return <div {...innerBlocksProps} />;
}
