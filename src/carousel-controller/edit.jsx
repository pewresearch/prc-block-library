/**
 * External Dependencies
 */
import classNames from 'classnames';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
	InnerBlocks,
	withColors,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const TEMPLATE = [
	[
		'prc-block/carousel-slide',
		{
			layout: {
				type: 'flex',
				orientation: 'vertical',
				verticalAlignment: 'center',
				justifyContent: 'center',
			},
		},
		[
			[
				'core/group',
				{
					layout: {
						type: 'flex',
						orientation: 'vertical',
						verticalAlignment: 'center',
						justifyContent: 'center',
					},
					style: {
						layout: {
							selfStretch: 'fill',
						},
					},
				},
				[
					[
						'core/paragraph',
						{
							placeholder: 'Type / to add blocks to the slide.',
						},
					],
				],
			],
		],
	],
];

const DEFAULT_BLOCK = {
	name: 'prc-block/carousel-slide',
	attributesToCopy: [
		'className',
		'color',
		'fontFamily',
		'fontSize',
		'spacing',
	],
};

function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
	dotColor,
	setDotColor,
	arrowColor,
	setArrowColor,
}) {
	const { orientation, enableDots, enableArrows, arrowsSize, dotsSize } =
		attributes;

	const { selectBlock } = useDispatch(blockEditorStore);

	const {
		innerBlocks,
		selectedCarouselSlideClientId,
		_isSelected,
		nextClientId,
		previousClientId,
	} = useSelect((select) => {
		const {
			getBlock,
			getBlocks,
			getSelectedBlockClientId,
			getBlockParentsByBlockName,
			hasSelectedInnerBlock,
			getNextBlockClientId,
			getPreviousBlockClientId,
		} = select(blockEditorStore);
		const currentlySelectedBlockClientId = getSelectedBlockClientId();
		const blockParents = getBlockParentsByBlockName(
			currentlySelectedBlockClientId,
			'prc-block/carousel-controller'
		);

		const blockParentClientId =
			blockParents?.[0] || currentlySelectedBlockClientId;
		const currentlySelectedBlock = getBlock(currentlySelectedBlockClientId);
		const _innerBlocks = getBlocks(clientId);
		const currentlySelectedSlideBlock =
			'prc-block/carousel-slide' === currentlySelectedBlock?.name
				? currentlySelectedBlockClientId
				: null;
		const blockIsSelected =
			isSelected || hasSelectedInnerBlock(clientId, true);
		if (null === currentlySelectedSlideBlock) {
			return {
				innerBlocks: _innerBlocks,
				selectedCarouselSlideClientId: blockParentClientId,
				nextClientId: null,
				previousClientId: null,
				_isSelected: blockIsSelected,
			};
		}
		return {
			innerBlocks: _innerBlocks,
			selectedCarouselSlideClientId: blockParentClientId,
			nextClientId: getNextBlockClientId(currentlySelectedSlideBlock),
			previousClientId: getPreviousBlockClientId(
				currentlySelectedSlideBlock
			),
			_isSelected: blockIsSelected,
		};
	});

	const blockProps = useBlockProps({
		className: classNames({
			'is-style-vertical': orientation === 'vertical',
			'is-enabled': _isSelected,
			[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
			[`has-dots-${dotsSize}`]: enableDots && dotsSize,
			[`has-dot-color`]: dotColor,
			[`has-arrow-color`]: arrowColor,
		}),
		style: {
			'--prc-carousel-controller-dot-color': dotColor?.color,
			'--prc-carousel-controller-arrow-color': arrowColor?.color,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'prc-block-carousel-controller__track',
		},
		{
			orientation,
			templateLock: false,
			__experiementalCaptureToolbars: true,
			renderAppender: false,
			template: TEMPLATE,
			defaultBlock: DEFAULT_BLOCK,
			directInsert: true,
		}
	);

	const dots = (
		<div className="prc-block-carousel-controller__dots">
			{innerBlocks.map((block, index) => {
				return (
					<button
						key={block.clientId}
						className="prc-block-carousel-controller__dot"
						type="button"
						onClick={() => selectBlock(block.clientId)}
						aria-label={`Go to slide ${index + 1}`}
						data-active={
							selectedCarouselSlideClientId === block.clientId
						}
					>
						<Icon library="solid" icon="circle" />
					</button>
				);
			})}
		</div>
	);

	const arrows = (
		<div className="prc-block-carousel-controller__arrows">
			<button
				className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--prev"
				type="button"
				onClick={() => selectBlock(previousClientId)}
			>
				<Icon
					library="solid"
					icon={
						orientation === 'vertical'
							? 'chevron-up'
							: 'chevron-left'
					}
				/>
			</button>
			<button
				className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--next"
				type="button"
				onClick={() => selectBlock(nextClientId)}
			>
				<Icon
					library="solid"
					icon={
						orientation === 'vertical'
							? 'chevron-down'
							: 'chevron-right'
					}
				/>
			</button>
		</div>
	);

	return (
		<Fragment>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				dotColor={dotColor}
				setDotColor={setDotColor}
				arrowColor={arrowColor}
				setArrowColor={setArrowColor}
			/>
			<div {...blockProps}>
				<div {...innerBlocksProps} />
				{enableArrows && arrows}
				{enableDots && dots}
				<div className="prc-block-carousel-controller__insert-block">
					<InnerBlocks.ButtonBlockAppender />
				</div>
			</div>
		</Fragment>
	);
}

export default withColors({
	dotColor: 'color',
	arrowColor: 'color',
})(Edit);
