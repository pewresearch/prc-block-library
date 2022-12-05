/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { Fragment } from '@wordpress/element';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
	const { heading, subHeading, headingLevel } = attributes;
	return (
		<Fragment>
			<div className="wp-block-prc-block-promo__text">
				{heading && (
					<RichText.Content
						className="wp-block-prc-block-promo__heading"
						tagName={`h${headingLevel}`}
						value={heading}
					/>
				)}
				{subHeading && (
					<RichText.Content
						className="wp-block-prc-block-promo__sub_heading"
						tagName="div"
						value={subHeading}
					/>
				)}
			</div>
			<div className="wp-block-prc-block-promo__action">
				<InnerBlocks.Content />
			</div>
		</Fragment>
	);
}
