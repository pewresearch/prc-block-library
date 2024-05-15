/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['prc-block/taxonomy-list', 'core/block'];

const BLOCKS_TEMPLATE = [
	[
		'prc-block/grid-controller',
		{},
		[
			[
				'prc-block/grid-column',
				{
					gridLayout: {
						index: 1,
						desktopSpan: 4,
						tabletSpan: 2,
						mobileSpan: 4,
					},
					allowedBlocks: ALLOWED_BLOCKS,
				},
			],
			[
				'prc-block/grid-column',
				{
					gridLayout: {
						index: 2,
						desktopSpan: 4,
						tabletSpan: 4,
						mobileSpan: 4,
					},
					allowedBlocks: ALLOWED_BLOCKS,
				},
			],
			[
				'prc-block/grid-column',
				{
					gridLayout: {
						index: 3,
						desktopSpan: 4,
						tabletSpan: 2,
						mobileSpan: 4,
					},
					allowedBlocks: ALLOWED_BLOCKS,
				},
			],
		],
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
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['prc-block/grid-controller'],
		template: BLOCKS_TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
