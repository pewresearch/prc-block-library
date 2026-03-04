/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useRef, useEffect, useState } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';

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
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param {string}   props.clientId                   Block client ID.
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 * @param {string}   props.__unstableLayoutClassNames Layout class names from parent.
 *
 * @return {Element} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const ref = useRef(null);
	const { fixedHeight, isFlipped = false } = attributes;
	const { toggleSelection } = useDispatch('core/block-editor');

	// Initialize isFlipped when undefined (e.g. existing blocks before attribute existed).
	useEffect(() => {
		if (attributes.isFlipped === undefined) {
			setAttributes({ isFlipped: false });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Get both flip-card-side blocks and their inner block counts so useMemo re-fires when content changes
	const flipCardSideBlockCount = useSelect(
		(select) => {
			const { getBlockOrder } = select('core/block-editor');
			const innerBlockIds = getBlockOrder(clientId);
			if (innerBlockIds.length < 2) {
				return 0;
			}
			const firstCount = getBlockOrder(innerBlockIds[0]).length;
			const secondCount = getBlockOrder(innerBlockIds[1]).length;
			return firstCount + secondCount;
		},
		[clientId]
	);

	// Measure heights after each DOM commit using useEffect so ref.current reflects
	// the actual current DOM. We use Math.max(prev, new) so the stored height can only
	// grow — when is-initialized is active, editor.scss hides one side via display:none
	// making its offsetHeight 0, but that can never shrink the previously-measured height.
	const [maxHeight, setMaxHeight] = useState(null);
	useEffect(() => {
		if (!ref.current || flipCardSideBlockCount < 1) {
			return;
		}
		const sides = ref.current.querySelectorAll(
			'.wp-block-prc-block-flip-card-side'
		);
		if (!sides.length) {
			return;
		}
		const newMax =
			Math.max(...Array.from(sides).map((side) => side.offsetHeight)) ||
			null;
		if (newMax) {
			setMaxHeight((prev) => Math.max(prev ?? 0, newMax));
		}
	}, [flipCardSideBlockCount]);

	const isInitialized = maxHeight !== null;

	const isSmartHeight =
		fixedHeight === undefined || fixedHeight === null || fixedHeight === -1;
	const effectiveHeight = isSmartHeight ? (maxHeight ?? 200) : fixedHeight;

	const blockProps = useBlockProps({
		ref,
		className: clsx(layoutClassNames, {
			'is-flipped': isFlipped,
			'is-initialized': isInitialized,
		}),
		style: {
			minHeight: `${effectiveHeight}px`,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: clsx(
				'wp-block-prc-block-flip-card-controller__inner-blocks'
			),
		},
		{
			template: TEMPLATE,
			templateLock: 'insert',
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<>
			<FlipControl
				clientId={clientId}
				isFlipped={isFlipped}
				fixedHeight={fixedHeight}
				maxHeight={maxHeight}
			/>
			<div {...blockProps}>
				{isSmartHeight ? (
					<div {...innerBlocksProps} />
				) : (
					<ResizableBox
						size={{ height: effectiveHeight }}
						minHeight={50}
						minWidth={50}
						__experimentalShowTooltip={true}
						__experimentalTooltipProps={{
							showPx: true,
							fadeTimeout: 1000,
						}}
						enable={{
							top: false,
							right: false,
							bottom: true,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						}}
						onResizeStart={() => toggleSelection(false)}
						onResizeStop={(event, direction, elt) => {
							toggleSelection(true);
							setAttributes({
								fixedHeight: Math.max(50, elt.offsetHeight),
							});
						}}
					>
						<div {...innerBlocksProps} />
					</ResizableBox>
				)}
			</div>
		</>
	);
}
