/**
 * External Dependencies
 */
import { InnerBlocksAsContextTemplate } from '@prc/components';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import useBylinesBlockContextProvider from './use-bylines-block-context-provider';

const ALLOWED_BLOCKS = ['prc-block/staff-info', 'core/group'];

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
	__unstableLayoutClassNames: layoutClassNames,
	clientId,
	context,
	isSelected
}) {
	const { allowedBlocks } = attributes;
	const {postId, postType} = context;

	const {
		isResolving,
		bylinesContext,
	} = useBylinesBlockContextProvider({ postId, postType });

	const blockProps = useBlockProps({
		className: layoutClassNames,
	});

	// To avoid flicker when switching active block contexts, a preview is rendered
	// for each block context, but the preview for the active block context is hidden.
	// This ensures that when it is displayed again, the cached rendering of the
	// block preview is used, instead of having to re-render the preview from scratch.
	return (
		<div {...blockProps}>
			<InnerBlocksAsContextTemplate {...{
				clientId,
				allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
				blockContexts: bylinesContext,
				isResolving,
			}}/>
		</div>
	);
}
