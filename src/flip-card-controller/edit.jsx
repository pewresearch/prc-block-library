/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
/**
 * Internal Dependencies
 */
import FlipControl from './flip-control';

const ALLOWED_BLOCKS = ['prc-block/flip-card-side'];
const TEMPLATE = [
	[
		'prc-block/flip-card-side',
		{
			className: 'is-style-front',
		},
		[
			[
				'core/paragraph',
				{
					placeholder: 'Flip Card Front...',
				},
			],
		],
	],
	[
		'prc-block/flip-card-side',
		{
			className: 'is-style-back',
		},
		[
			[
				'core/paragraph',
				{
					placeholder: 'Flip Card Back...',
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
 * @param {obect}    props.context       Context object.
 * @param {string}   props.clientId      Block client ID.
 * @param {boolean}  props.isSelected    Whether the block is selected.
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
	const [isFlipped, setIsFlipped] = useState(false);
	const blockProps = useBlockProps({
		'data-flipped': isFlipped,
	});
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-flip-card-controller__inner-blocks',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: 'insert',
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<Fragment>
			<FlipControl {...{ isFlipped, setIsFlipped, clientId }} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}
