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
					},
					allowedBlocks: ['prc-block/taxonomy-index-az-list'],
				},
			],
			[
				'prc-block/grid-column',
				{
					gridLayout: {
						index: 2,
						desktopSpan: 4,
						tabletSpan: 4,
					},
					allowedBlocks: ['prc-block/taxonomy-index-az-list'],
				},
			],
			[
				'prc-block/grid-column',
				{
					gridLayout: {
						index: 3,
						desktopSpan: 4,
						tabletSpan: 2,
					},
					allowedBlocks: ['prc-block/taxonomy-index-az-list'],
				},
			],
		],
	],
];

const ALLOWED_BLOCKS = [
	'core/group',
	'core/paragraph',
	'prc-block/grid-controller',
	'prc-block/taxonomy-index-az-list',
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes }) {
	const blockProps = useBlockProps();
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks, orientation } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		orientation: orientation || 'vertical',
		template: BLOCKS_TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
