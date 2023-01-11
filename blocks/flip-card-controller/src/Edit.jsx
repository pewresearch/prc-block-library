/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
	const [isFlipped, toggleFlip] = useState(false);
	const doFlip = () => {
		toggleFlip(!isFlipped);
	};

	const blockProps = useBlockProps({
		className: classNames({
			'is-flipped': isFlipped,
		}),
	});
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: 'all',
			__experimentalCaptureToolbars: true,
		},
	);

	return (
		<Fragment>
			<Controls {...{ isFlipped, doFlip }} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}
