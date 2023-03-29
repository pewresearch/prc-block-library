/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['core/group', 'prc-block/grid-controller'];

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
 * @param            props.isSelected
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
	const blockProps = useBlockProps();
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks, orientation } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		orientation: orientation || 'vertical',
		templateLock: false,
	});

	return <div {...innerBlocksProps} />;
}
