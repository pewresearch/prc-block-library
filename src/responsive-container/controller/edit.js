/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/responsive-container-view'];
const TEMPLATE = [
	[
		'prc-block/responsive-container-view',
		{
			min: 980,
			max: 0,
		},
	],
	[
		'prc-block/responsive-container-view',
		{
			min: 480,
			max: 979,
		},
	],
	[
		'prc-block/responsive-container-view',
		{
			min: 0,
			max: 479,
		},
	],
];

const edit = ({ isSelected }) => {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		template: TEMPLATE,
		renderAppender: isSelected ? InnerBlocks.ButtonBlockAppender : false,
	});

	return <div {...innerBlocksProps} />;
};

export default edit;
