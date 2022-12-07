/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
 const ALLOWED_BLOCKS = ['prc-block/carousel-slide'];

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
export default function Edit({ className }) {
	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: false,
		template: [
			[
				'prc-block/carousel-slide',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: 'You can use any blocks inside this carousel slide.',
						},
					],
				],
			],
		],
	});

	return <div {...innerBlocksProps} />;
}
