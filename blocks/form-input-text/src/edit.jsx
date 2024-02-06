/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context }) {
	const isRequired = context?.['prc-block/form-field-required'];
	const { placeholder, type } = attributes;
	const blockProps = useBlockProps({
		placeholder,
		onChange: (event) => event.preventDefault(),
		type,
		required: isRequired,
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			{'textarea' !== type ? (<input {...blockProps} />) : (<textarea {...blockProps} />)}
		</Fragment>
	);
}
