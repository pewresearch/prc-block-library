/**
 * External Dependencies
 */
import clsx from 'clsx';

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
import { Dots, PreviousArrow, NextArrow } from './navigation-components';

const TEMPLATE = [
	[
		'prc-block/carousel-slide',
		{},
		[
			[
				'core/paragraph',
				{
					placeholder: 'Type / to add blocks inside the carousel slide.',
				},
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
		userIsTyping
	} = useSelect((select) => {
		const {
			getBlock,
			getBlocks,
			getSelectedBlockClientId,
			getBlockParentsByBlockName,
			hasSelectedInnerBlock,
			getNextBlockClientId,
			getPreviousBlockClientId,
			isTyping,
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
				userIsTyping: isTyping(),
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
			userIsTyping: isTyping(),
		};
	});


	const blockProps = useBlockProps({
		className: clsx({
			'is-style-vertical': orientation === 'vertical',
			'is-enabled': _isSelected,
			[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
			[`has-dots-${dotsSize}`]: enableDots && dotsSize,
			[`has-dot-color`]: dotColor,
			[`has-arrow-color`]: arrowColor,
			'is-typing': userIsTyping,
		}),
		style: {
			'--prc-carousel-controller-dot-color': dotColor?.color,
			'--prc-carousel-controller-arrow-color': arrowColor?.color,
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'prc-block-carousel-controller__track__inner',
		},
		{
			orientation,
			templateLock: false,
			__experiementalCaptureToolbars: true,
			renderAppender: false,
			template: TEMPLATE,
			defaultBlock: DEFAULT_BLOCK,
			directInsert: true,
			__experiementalCaptureToolbars: true,
		}
	);

	const dots = (
		<Dots
			innerBlocks={innerBlocks}
			selectBlock={selectBlock}
			selectedCarouselSlideClientId={selectedCarouselSlideClientId}
		/>
	);

	const previousArrow = (
		<PreviousArrow
			selectBlock={selectBlock}
			previousClientId={previousClientId}
			orientation={orientation}
		/>
	);

	const nextArrow = (
		<NextArrow
			selectBlock={selectBlock}
			nextClientId={nextClientId}
			orientation={orientation}
		/>
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
				<div className="prc-block-carousel-controller__track">
					<div {...innerBlocksProps} />
				</div>
				{enableArrows && previousArrow}
				{enableArrows && nextArrow}
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
