/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context, clientId }) {
	const blockProps = useBlockProps();

	const { taxonomy } = attributes;

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					context,
					clientId,
				}}
			/>
			<div {...blockProps}>
				<input
					type="text"
					placeholder={`Start typing to search for a ${
						!taxonomy ? 'term' : taxonomy
					}`}
				/>
			</div>
		</Fragment>
	);
}
