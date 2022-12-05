/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { anchor, label, type, defaultChecked } = attributes;

	const [checked, setChecked] = useState(defaultChecked);
	const toggleChecked = () => setChecked(!checked);

	useEffect(() => {
		setAttributes({ defaultChecked: checked });
	}, [checked]);

	const blockProps = useBlockProps({});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, context: false }} />
			<div {...blockProps}>
				<input
					type={type}
					id={anchor}
					name={anchor}
					checked={checked}
					onChange={() => toggleChecked()}
				/>
				<RichText
					tagName="label"
					value={label}
					onChange={(value) => setAttributes({ label: value })}
					placeholder="Label"
					keepPlaceholderOnFocus
					multiline={false}
					allowedFormats={['core/bold', 'core/italic']}
				/>
			</div>
		</Fragment>
	);
}
