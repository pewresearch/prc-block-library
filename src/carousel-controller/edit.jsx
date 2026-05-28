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
import { Fragment, useRef, useEffect } from '@wordpress/element';

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
					placeholder:
						'Type / to add blocks inside the carousel slide.',
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
	const {
		viewType,
		enableDots,
		enableArrows,
		arrowsSize,
		dotsSize,
		useSlideBgForDots,
	} = attributes;

	const isCoverflow = viewType === 'coverflow';
	const trackOrientation =
		viewType === 'vertical' ? 'vertical' : 'horizontal';

	const blockRef = useRef(null);

	const { selectBlock } = useDispatch(blockEditorStore);

	const {
		innerBlocks,
		selectedCarouselSlideClientId,
		_isSelected,
		userIsTyping,
	} = useSelect((select) => {
		const {
			getBlock,
			getBlocks,
			getSelectedBlockClientId,
			getBlockParentsByBlockName,
			hasSelectedInnerBlock,
			isTyping,
		} = select(blockEditorStore);
		const currentlySelectedBlockClientId = getSelectedBlockClientId();
		const currentlySelectedBlock = getBlock(currentlySelectedBlockClientId);
		const _innerBlocks = getBlocks(clientId);
		const slideClientIds = new Set(
			_innerBlocks.map((block) => block.clientId)
		);
		let currentlySelectedSlideBlock = null;
		if (currentlySelectedBlock?.name === 'prc-block/carousel-slide') {
			if (slideClientIds.has(currentlySelectedBlockClientId)) {
				currentlySelectedSlideBlock = currentlySelectedBlockClientId;
			}
		} else if (currentlySelectedBlockClientId) {
			const slideParents = getBlockParentsByBlockName(
				currentlySelectedBlockClientId,
				'prc-block/carousel-slide'
			);
			currentlySelectedSlideBlock =
				slideParents.find((slideId) => slideClientIds.has(slideId)) ??
				null;
		}
		const blockIsSelected =
			isSelected || hasSelectedInnerBlock(clientId, true);

		// When a slide is selected: that slide's clientId.
		// Otherwise: the first inner slide's clientId (or null if no inner blocks yet).
		const firstSlideClientId = _innerBlocks?.[0]?.clientId ?? null;
		const activeSlideClientId =
			currentlySelectedSlideBlock ?? firstSlideClientId;

		return {
			innerBlocks: _innerBlocks,
			selectedCarouselSlideClientId: activeSlideClientId,
			_isSelected: blockIsSelected,
			userIsTyping: isTyping(),
		};
	});

	const activeIndex = Math.max(
		0,
		innerBlocks.findIndex(
			(block) => block.clientId === selectedCarouselSlideClientId
		)
	);

	// Arrows navigate relative to the visible active slide, regardless of the
	// current editor selection (the controller is often selected, not a slide).
	const previousSlideClientId =
		innerBlocks[activeIndex - 1]?.clientId ?? null;
	const nextSlideClientId = innerBlocks[activeIndex + 1]?.clientId ?? null;

	const blockProps = useBlockProps({
		ref: blockRef,
		className: clsx({
			'is-style-vertical': viewType === 'vertical',
			'has-view-coverflow': isCoverflow,
			'is-enabled': _isSelected,
			[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
			[`has-dots-${dotsSize}`]: enableDots && dotsSize,
			[`has-dot-color`]: dotColor && !useSlideBgForDots,
			[`has-arrow-color`]: arrowColor,
			'has-slide-bg-dots': useSlideBgForDots,
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
			orientation: trackOrientation,
			templateLock: false,
			__experiementalCaptureToolbars: true,
			renderAppender: false,
			template: TEMPLATE,
			defaultBlock: DEFAULT_BLOCK,
			directInsert: true,
		}
	);

	// view.js does not run in the editor, so replicate the coverflow stacked
	// card visual by setting each slide's `--offset` relative to the active
	// slide. Re-runs whenever the active slide or slide count changes.
	useEffect(() => {
		const root = blockRef.current;
		if (!root) {
			return;
		}
		const slides = root.querySelectorAll(
			'.prc-block-carousel-controller__track__inner > .wp-block-prc-block-carousel-slide'
		);
		slides.forEach((slide, index) => {
			if (isCoverflow) {
				const offset = index - activeIndex;
				const abs = Math.abs(offset);
				slide.style.setProperty('--offset', String(offset));
				slide.style.setProperty('--abs-offset', String(abs));
				slide.classList.toggle('is-coverflow-hidden', abs > 4);
			} else {
				slide.style.removeProperty('--offset');
				slide.style.removeProperty('--abs-offset');
				slide.classList.remove('is-coverflow-hidden');
			}
		});
	}, [isCoverflow, activeIndex, innerBlocks.length]);

	const dots = (
		<Dots
			innerBlocks={innerBlocks}
			selectBlock={selectBlock}
			selectedCarouselSlideClientId={selectedCarouselSlideClientId}
			useSlideBgForDots={useSlideBgForDots}
		/>
	);

	const previousArrow = enableArrows && (
		<PreviousArrow
			selectBlock={selectBlock}
			previousClientId={previousSlideClientId}
			viewType={viewType}
		/>
	);

	const nextArrow = enableArrows && (
		<NextArrow
			selectBlock={selectBlock}
			nextClientId={nextSlideClientId}
			viewType={viewType}
		/>
	);

	const counter = isCoverflow && (
		<div className="prc-block-carousel-controller__counter">
			<span>{activeIndex + 1}</span> / <span>{innerBlocks.length}</span>
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
				<div className="prc-block-carousel-controller__track">
					<div {...innerBlocksProps} />
				</div>
				{enableDots && dots}
				{previousArrow}
				{nextArrow}
				{counter}
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
