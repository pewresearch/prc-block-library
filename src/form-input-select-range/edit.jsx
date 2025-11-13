/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { getDoubleSelectTemplate } from './utils';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                                   Properties passed to the function.
 * @param {Object}   props.attributes                        Available block attributes.
 * @param {Function} props.setAttributes                     Function that updates individual attributes.
 * @param {string}   props.__unstableLayoutClassNames        Layout class names.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const blockProps = useBlockProps({
		className: clsx(layoutClassNames, 'wp-block-prc-block-form-input-select-range'),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
			template: getDoubleSelectTemplate(attributes),
		}
	);

	return (
		<div {...blockProps}>
			{innerBlocksProps.children}
		</div>
	);
}
