/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/card'];

function Edit() {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return <div {...innerBlocksProps} />;
}

export default Edit;
