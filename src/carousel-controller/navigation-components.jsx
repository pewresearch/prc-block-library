/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

export const Dots = ({
	innerBlocks,
	selectBlock,
	selectedCarouselSlideClientId,
}) => (
	<div className="prc-block-carousel-controller__dots">
		{innerBlocks.map((block, index) => {
			const isActive = selectedCarouselSlideClientId === block.clientId;
			return (
				<button
					key={block.clientId}
					className="prc-block-carousel-controller__dot"
					type="button"
					onClick={() => selectBlock(block.clientId)}
					aria-label={`Go to slide ${index + 1}`}
					data-active={isActive}
				>
					<Icon library="solid" icon="circle" />
				</button>
			);
		})}
	</div>
);

const getPrevIcon = (orientation) =>
	orientation === 'vertical' ? 'chevron-up' : 'chevron-left';

const getNextIcon = (orientation) =>
	orientation === 'vertical' ? 'chevron-down' : 'chevron-right';

export const PreviousArrow = ({
	selectBlock,
	previousClientId,
	orientation,
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
		<Icon library="solid" icon={getPrevIcon(orientation)} />
	</button>
);

export const NextArrow = ({
	selectBlock,
	nextClientId,
	orientation,
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
		<Icon library="solid" icon={getNextIcon(orientation)} />
	</button>
);

export const Arrows = ({
	previousClientId,
	nextClientId,
	selectBlock,
	orientation,
}) => (
	<div className="prc-block-carousel-controller__arrows">
		<PreviousArrow
			selectBlock={selectBlock}
			previousClientId={previousClientId}
			orientation={orientation}
		/>
		<NextArrow
			selectBlock={selectBlock}
			nextClientId={nextClientId}
			orientation={orientation}
		/>
	</div>
);
