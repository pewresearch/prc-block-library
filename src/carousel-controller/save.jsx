/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function Save({ attributes }) {
	const {
		viewType,
		enableArrows,
		enableDots,
		arrowsSize,
		dotsSize,
		dotColor,
		arrowColor,
		useSlideBgForDots,
	} = attributes;

	const isCoverflow = viewType === 'coverflow';
	const isSlideshow = viewType === 'slideshow';
	const showCounter = isCoverflow || isSlideshow;

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-carousel-controller', {
			'is-style-vertical': viewType === 'vertical',
			'has-view-coverflow': isCoverflow,
			'has-view-slideshow': isSlideshow,
			[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
			[`has-dots-${dotsSize}`]: enableDots && dotsSize,
			[`has-dot-color`]: dotColor && !useSlideBgForDots,
			[`has-arrow-color`]: arrowColor,
			'has-slide-bg-dots': useSlideBgForDots,
		}),
	});
	const innerBlocksProps = useInnerBlocksProps.save({
		className: 'prc-block-carousel-controller__track__inner',
	});

	return (
		<div {...blockProps}>
			<div className="prc-block-carousel-controller__track">
				<div {...innerBlocksProps} />
				{isSlideshow && (
					<div className="prc-block-carousel-controller__counter"></div>
				)}
			</div>
			{isSlideshow ? (
				<>
					{enableDots && (
						<div className="prc-block-carousel-controller__dots"></div>
					)}
					<div className="prc-block-carousel-controller__controls">
						<div className="prc-block-carousel-controller__play"></div>
						{enableArrows && (
							<div className="prc-block-carousel-controller__arrows"></div>
						)}
					</div>
				</>
			) : (
				<>
					{enableArrows && (
						<div className="prc-block-carousel-controller__arrows"></div>
					)}
					{enableDots && (
						<div className="prc-block-carousel-controller__dots"></div>
					)}
				</>
			)}
			{isCoverflow && showCounter && (
				<div className="prc-block-carousel-controller__counter"></div>
			)}
		</div>
	);
}
