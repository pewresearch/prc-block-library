/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * Resolves a carousel slide's background color into a CSS color value usable as
 * the dot color. Preset slugs map to the theme `var(--wp--preset--color--*)`
 * custom property; explicit style values pass through. Returns undefined when
 * the slide has no background color set.
 *
 * @param {Object} block A carousel-slide inner block.
 * @return {string|undefined} CSS color value or undefined.
 */
const getSlideBackgroundColor = (block) => {
	const attributes = block?.attributes ?? {};
	if (attributes.backgroundColor) {
		return `var(--wp--preset--color--${attributes.backgroundColor})`;
	}
	return attributes.style?.color?.background || undefined;
};

export const Dots = ({
	innerBlocks,
	selectBlock,
	selectedCarouselSlideClientId,
	useSlideBgForDots = false,
}) => (
	<div className="prc-block-carousel-controller__dots">
		{innerBlocks.map((block, index) => {
			const isActive = selectedCarouselSlideClientId === block.clientId;
			const slideColor = useSlideBgForDots
				? getSlideBackgroundColor(block)
				: undefined;
			return (
				<button
					key={block.clientId}
					className="prc-block-carousel-controller__dot"
					type="button"
					onClick={() => selectBlock(block.clientId)}
					aria-label={`Go to slide ${index + 1}`}
					data-active={isActive}
					style={
						slideColor
							? {
									'--prc-carousel-controller-dot-color':
										slideColor,
								}
							: undefined
					}
				>
					<Icon library="solid" icon="circle" />
				</button>
			);
		})}
	</div>
);

const getPrevIcon = (viewType) =>
	viewType === 'vertical' ? 'chevron-up' : 'chevron-left';

const getNextIcon = (viewType) =>
	viewType === 'vertical' ? 'chevron-down' : 'chevron-right';

export const PreviousArrow = ({
	selectBlock,
	previousClientId,
	viewType,
	disabled = false,
}) => (
	<button
		className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__prev"
		type="button"
		onClick={() => previousClientId && selectBlock(previousClientId)}
		disabled={disabled}
		aria-disabled={disabled || undefined}
		aria-label="Previous slide"
	>
		<Icon library="solid" icon={getPrevIcon(viewType)} />
	</button>
);

export const NextArrow = ({
	selectBlock,
	nextClientId,
	viewType,
	disabled = false,
}) => (
	<button
		className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__next"
		type="button"
		onClick={() => nextClientId && selectBlock(nextClientId)}
		disabled={disabled}
		aria-disabled={disabled || undefined}
		aria-label="Next slide"
	>
		<Icon library="solid" icon={getNextIcon(viewType)} />
	</button>
);

export const Arrows = ({
	previousClientId,
	nextClientId,
	selectBlock,
	viewType,
}) => (
	<div className="prc-block-carousel-controller__arrows">
		<PreviousArrow
			selectBlock={selectBlock}
			previousClientId={previousClientId}
			viewType={viewType}
		/>
		<NextArrow
			selectBlock={selectBlock}
			nextClientId={nextClientId}
			viewType={viewType}
		/>
	</div>
);
