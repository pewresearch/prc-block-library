/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */

const ALLOWED_BLOCKS = ['prc-block/promo', 'prc-block/card'];

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
export default function Edit({ attributes, clientId }) {
	const hasInnerBlocks = useSelect(
		(select) => 0 < select(blockEditorStore).getBlocks(clientId).length,
		[clientId],
	);

	const blockProps = useBlockProps();
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	const { allowedBlocks } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		renderAppender: hasInnerBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
	});

	return <div {...innerBlocksProps} />;
}
