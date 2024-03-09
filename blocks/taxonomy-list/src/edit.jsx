/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = [
	'prc-block/taxonomy-list-link',
	'prc-block/taxonomy-search',
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param            props.className
 * @param            props.clientId
 * @param            props.context
 * @param            props.isSelected
 * @param            props.textColor
 * @param            props.setTextColor
 * @param            props.backgroundColor
 * @param            props.setBackgroundColor
 * @param            props.borderColor
 * @param            props.setBorderColor
 * @param            props.__unstableLayoutClassNames
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { templateLock, layout, allowedBlocks, className } = attributes;
	const orientation = layout?.orientation || 'vertical';

	const blockProps = useBlockProps({
		className: classNames(className, layoutClassNames),
	});

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks:
			'horizontal' === orientation
				? ['prc-block/taxonomy-list-link']
				: allowedBlocks || ALLOWED_BLOCKS,
		orientation,
	});

	return <div {...innerBlocksProps} />;
}
