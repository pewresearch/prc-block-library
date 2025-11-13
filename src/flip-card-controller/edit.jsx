/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useState, useRef, useEffect, useMemo } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
/**
 * Internal Dependencies
 */
import FlipControl from './flip-control';

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
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const ref = useRef( null );
	const [isFlipped, setIsFlipped] = useState(false);

	// Get the first flip-card-side block and check its inner blocks count
	const firstFlipCardInnerBlocksCount = useSelect(
		( select ) => {
			const { getBlocksByClientId, getBlockOrder } = select( 'core/block-editor' );
			const innerBlockIds = getBlockOrder( clientId );
			if ( innerBlockIds.length === 0 ) {
				return 0;
			}
			const firstBlockId = innerBlockIds[0];
			const firstBlock = getBlocksByClientId( firstBlockId )[0];
			return firstBlock ? getBlockOrder( firstBlockId ).length : 0;
		},
		[ clientId ]
	);

	// Calculate height from the first flip-card-side block only if it has more than 1 inner block
	const maxHeight = useMemo(() => {
		if ( ! ref.current || firstFlipCardInnerBlocksCount < 1 ) {
			return null;
		}

		const firstSide = ref.current.querySelector(
			'.wp-block-prc-block-flip-card-side'
		);

		return firstSide ? firstSide.offsetHeight : null;
	}, [isSelected, ref.current, firstFlipCardInnerBlocksCount] );

	// Check if component is initialized (has calculated height)
	const isInitialized = useMemo(() => {
		return maxHeight !== null;
	}, [maxHeight] );

	const blockProps = useBlockProps({
		ref,
		className: clsx(layoutClassNames, {
			'is-flipped': isFlipped,
			'is-initialized': isInitialized,
		}),
		style: {
			minHeight: isInitialized && maxHeight ? `${maxHeight}px` : null,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: clsx('wp-block-prc-block-flip-card-controller__inner-blocks'),
		},
		{
			template: TEMPLATE,
			templateLock: 'insert',
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<>
			<FlipControl {...{ isFlipped, setIsFlipped, clientId }} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
