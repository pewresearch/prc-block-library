/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['prc-block/responsive-container-view'];
const TEMPLATE = [
	[
		'prc-block/responsive-container-view',
		{
			deviceType: 'desktop',
			min: 980,
			max: 0,
		},
	],
	[
		'prc-block/responsive-container-view',
		{
			deviceType: 'tablet',
			min: 480,
			max: 979,
		},
	],
	[
		'prc-block/responsive-container-view',
		{
			deviceType: 'mobile',
			min: 0,
			max: 479,
		},
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ isSelected }) {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		template: TEMPLATE,
		renderAppender: isSelected ? InnerBlocks.ButtonBlockAppender : false,
	});

	return <div {...innerBlocksProps} />;
}
