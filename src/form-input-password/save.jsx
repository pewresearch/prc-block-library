/**
 * External Dependencies
 */
import clsx from 'clsx';
/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
	const { includesConfirmation } = attributes;
	const blockProps = useBlockProps.save({
		className: clsx(
			'wp-block-prc-block-form-input-password',
			{
				'has-confirmation': includesConfirmation,
			}
		),
	});

	const innerBlocksProps = useInnerBlocksProps.save({});

	return (
		<div {...blockProps}>
			{innerBlocksProps.children}
			{includesConfirmation && (
				<div className="prc-block-form-input-password__analyzer"></div>
			)}
		</div>
	);
}