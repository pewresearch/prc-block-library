/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	RichText, 
} from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

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
	const { value, className } = attributes;

	return (
		<Fragment>
			<pre>
				<RichText.Content
					className='wp-block-prc-block-code-syntax__edit'
					tagName='code'
					value={ value }
				/>
			</pre>
		</Fragment>
	);
}
