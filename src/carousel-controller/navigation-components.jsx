/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

export const Dots = ({ innerBlocks, selectBlock, selectedCarouselSlideClientId }) => (
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

export const PreviousArrow = ({ selectBlock, previousClientId, orientation }) => (
	<button
			className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__prev"
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
);

export const NextArrow = ({ selectBlock, nextClientId, orientation }) => (
	<button
		className="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow__next"
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
);

export const Arrows = ({ previousClientId, nextClientId, selectBlock, orientation }) => (
	<div className="prc-block-carousel-controller__arrows">
		<PreviousArrow selectBlock={selectBlock} previousClientId={previousClientId} orientation={orientation} />
		<NextArrow selectBlock={selectBlock} nextClientId={nextClientId} orientation={orientation} />
	</div>
);