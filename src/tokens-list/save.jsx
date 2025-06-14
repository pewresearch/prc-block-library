/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps, RichText, InnerBlocks } from '@wordpress/block-editor';

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
export default function Save( { attributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save();

	const hasLabel = !!label;
	const labelValue = hasLabel ? label : '';

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="label"
				value={labelValue}
			/>
			{innerBlocksProps.children}
		</div>
	);
}
