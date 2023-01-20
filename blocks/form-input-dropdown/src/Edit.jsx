/**
 * External Dependencies
 */

import classNames from 'classnames';
/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/form-input-dropdown-item'];
const BLOCKS_TEMPLATE = [['prc-block/form-input-dropdown-item', {}]];
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
	const { hasChildSelected } = useSelect((select) => {
		const { hasSelectedInnerBlock } = select('core/block-editor');
		return {
			hasChildSelected: hasSelectedInnerBlock(clientId, true),
		};
	}, []);
	const isActive = isSelected || hasChildSelected;

	const blockProps = useBlockProps({
		className: classNames({
			'is-active': isActive,
		}),
	});
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks, orientation, dropdownOptions, placeholder } =
		attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks ? allowedBlocks : ALLOWED_BLOCKS,
		orientation: orientation ? orientation : 'vertical',
		template: BLOCKS_TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<Fragment>
			<div {...innerBlocksProps} />
			<Controls {...{ attributes, setAttributes, context: false }} />
		</Fragment>
		// <div {...innerBlocksProps} />
	);
}
