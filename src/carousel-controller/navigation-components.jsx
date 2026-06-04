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
	activeSlideClientId,
	onNavigateToSlide,
	useSlideBgForDots = false,
}) => (
	<div className="prc-block-carousel-controller__dots">
		{innerBlocks.map((block, index) => {
			const isActive = activeSlideClientId === block.clientId;
			const slideColor = useSlideBgForDots
				? getSlideBackgroundColor(block)
				: undefined;
			return (
				<button
					key={block.clientId}
					className="prc-block-carousel-controller__dot"
					type="button"
					onClick={() => onNavigateToSlide(index)}
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

export const PreviousArrow = ({ onNavigate, viewType, disabled = false }) => (
	<button
		className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__prev"
		type="button"
		onClick={() => !disabled && onNavigate()}
		disabled={disabled}
		aria-disabled={disabled || undefined}
		aria-label="Previous slide"
	>
		<Icon library="solid" icon={getPrevIcon(viewType)} />
	</button>
);

export const NextArrow = ({ onNavigate, viewType, disabled = false }) => (
	<button
		className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__next"
		type="button"
		onClick={() => !disabled && onNavigate()}
		disabled={disabled}
		aria-disabled={disabled || undefined}
		aria-label="Next slide"
	>
		<Icon library="solid" icon={getNextIcon(viewType)} />
	</button>
);

export const Arrows = ({
	onNavigatePrevious,
	onNavigateNext,
	viewType,
	disabledPrevious = false,
	disabledNext = false,
}) => (
	<div className="prc-block-carousel-controller__arrows">
		<PreviousArrow
			onNavigate={onNavigatePrevious}
			viewType={viewType}
			disabled={disabledPrevious}
		/>
		<NextArrow
			onNavigate={onNavigateNext}
			viewType={viewType}
			disabled={disabledNext}
		/>
	</div>
);
