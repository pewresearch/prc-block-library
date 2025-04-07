/**
 * External Dependencies
 */
import classNames from 'classnames';

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
		orientation,
		enableArrows,
		enableDots,
		arrowsSize,
		dotsSize,
		dotColor,
		arrowColor,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: classNames({
			'is-style-vertical': orientation === 'vertical',
			[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
			[`has-dots-${dotsSize}`]: enableDots && dotsSize,
			[`has-dot-color`]: dotColor,
			[`has-arrow-color`]: arrowColor,
		}),
	});
	const innerBlocksProps = useInnerBlocksProps.save({
		className: 'prc-block-carousel-controller__track',
	});

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
			{enableArrows && (
				<div className="prc-block-carousel-controller__arrows"></div>
			)}
			{enableDots && (
				<div className="prc-block-carousel-controller__dots"></div>
			)}
		</div>
	);
}
