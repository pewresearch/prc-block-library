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
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
	getTypographyClassesAndStyles,
	__experimentalGetElementClassName,
} from '@wordpress/block-editor';

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
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save();
	const borderProps = getBorderClassesAndStyles(attributes);
	const colorProps = getColorClassesAndStyles(attributes);
	const spacingProps = getSpacingClassesAndStyles(attributes);
	const typographyProps = getTypographyClassesAndStyles(attributes);
	const titleClassName = clsx(
		'wp-block-prc-block-accordion__title',
		borderProps.className,
		colorProps.className,
		spacingProps.className,
		typographyProps.className
	);
	const titleStyle = {
		...borderProps.style,
		...colorProps.style,
		...spacingProps.style,
		...typographyProps.style,
	};
	return (
		<section {...blockProps}>
			<h3 className={titleClassName} style={titleStyle}>
				<span className="wp-block-prc-block-accordion__icon"></span>
				<RichText.Content
					className="wp-block-prc-block-accordion__title-text"
					value={attributes.title}
					tagName="span"
				/>
			</h3>
			<div className="wp-block-prc-block-accordion__content">
				{innerBlocksProps.children}
			</div>
		</section>
	);
}
