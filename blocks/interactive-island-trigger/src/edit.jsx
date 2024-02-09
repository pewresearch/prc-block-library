/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = [ 'core/group', 'core/paragraph' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
} ) {
	const blockProps = useBlockProps();
	/**
	 * By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	 * This gives us a good way to ensure greater template and pattern control.
	 * By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant,
	 * ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	 *
	 * The same applies for "orientation", defaults to "vertical".
	 *
	 * This behavior is being adopted in Core currently, so it's a good idea to get used to it.
	 */
	const { allowedBlocks, orientation } = attributes;
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: allowedBlocks ? allowedBlocks : ALLOWED_BLOCKS,
		orientation: orientation ? orientation : 'vertical',
	} );

	return (
		<Fragment>
			<Controls { ...{ attributes, setAttributes, context: false } } />
			<div { ...innerBlocksProps } />
		</Fragment>
	);
}
