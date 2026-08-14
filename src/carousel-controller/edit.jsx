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
import { useSelect } from '@wordpress/data';
import { Fragment, useRef, useEffect, useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import {
	Dots,
	PreviousArrow,
	NextArrow,
	PlayButton,
} from './navigation-components';
import { useEditorActiveSlide } from './use-editor-active-slide';

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

const COVERFLOW_MOBILE_BREAKPOINT = 600;

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
		editorActiveSlideIndex,
	} = attributes;

	const isCoverflow = viewType === 'coverflow';
	const isSlideshow = viewType === 'slideshow';
	const showCounter = isCoverflow || isSlideshow;
	const trackOrientation =
		viewType === 'vertical' ? 'vertical' : 'horizontal';

	const blockRef = useRef(null);
	const [isMobileViewport, setIsMobileViewport] = useState(false);
	const [isPlayingPreview, setIsPlayingPreview] = useState(true);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${COVERFLOW_MOBILE_BREAKPOINT}px)`
		);
		const updateViewport = () => {
			setIsMobileViewport(mediaQuery.matches);
		};
		updateViewport();
		mediaQuery.addEventListener('change', updateViewport);
		return () => {
			mediaQuery.removeEventListener('change', updateViewport);
		};
	}, []);

	const {
		innerBlocks,
		slideCount,
		activeIndex,
		activeSlideClientId,
		setActiveIndex,
	} = useEditorActiveSlide({
		clientId,
		editorActiveSlideIndex,
	});

	const { _isSelected, userIsTyping } = useSelect((select) => {
		const { hasSelectedInnerBlock, isTyping } = select(blockEditorStore);
		return {
			_isSelected: isSelected || hasSelectedInnerBlock(clientId, true),
			userIsTyping: isTyping(),
		};
	});

	const blockProps = useBlockProps({
		ref: blockRef,
		className: clsx({
			'is-style-vertical': viewType === 'vertical',
			'has-view-coverflow': isCoverflow,
			'has-view-slideshow': isSlideshow,
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
		const peekLimit = isMobileViewport ? 1 : 4;
		slides.forEach((slide, index) => {
			if (isCoverflow) {
				const offset = index - activeIndex;
				const abs = Math.abs(offset);
				slide.style.setProperty('--offset', String(offset));
				slide.style.setProperty('--abs-offset', String(abs));
				slide.classList.toggle('is-coverflow-hidden', abs > peekLimit);
			} else {
				slide.style.removeProperty('--offset');
				slide.style.removeProperty('--abs-offset');
				slide.classList.remove('is-coverflow-hidden');
			}
		});
	}, [isCoverflow, activeIndex, innerBlocks.length, isMobileViewport]);

	const dots = (
		<Dots
			innerBlocks={innerBlocks}
			activeSlideClientId={activeSlideClientId}
			onNavigateToSlide={setActiveIndex}
			useSlideBgForDots={useSlideBgForDots}
		/>
	);

	const previousArrow = enableArrows && (
		<PreviousArrow
			onNavigate={() => setActiveIndex(activeIndex - 1)}
			disabled={activeIndex <= 0}
			viewType={viewType}
		/>
	);

	const nextArrow = enableArrows && (
		<NextArrow
			onNavigate={() => setActiveIndex(activeIndex + 1)}
			disabled={activeIndex >= slideCount - 1}
			viewType={viewType}
		/>
	);

	const counter = showCounter && (
		<div className="prc-block-carousel-controller__counter">
			<span>{activeIndex + 1}</span> / <span>{innerBlocks.length}</span>
		</div>
	);

	const playButton = isSlideshow && (
		<PlayButton
			isPlaying={isPlayingPreview}
			onToggle={() => setIsPlayingPreview((value) => !value)}
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
					{isSlideshow && counter}
				</div>
				{enableDots && dots}
				{isSlideshow ? (
					<div className="prc-block-carousel-controller__controls">
						{playButton}
						{previousArrow}
						{nextArrow}
					</div>
				) : (
					<>
						{previousArrow}
						{nextArrow}
					</>
				)}
				{isCoverflow && counter}
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
