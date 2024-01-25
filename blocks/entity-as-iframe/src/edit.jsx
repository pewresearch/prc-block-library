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
	__experimentalRecursionProvider as RecursionProvider,
	__experimentalUseHasRecursion as useHasRecursion,
	Warning,
} from '@wordpress/block-editor';
import { withNotices } from '@wordpress/components';
import { useEntityBlockEditor, useEntityRecord } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import Placeholder from './placeholder';
import { POST_TYPE } from './constants';

/**
 * These are defaults and can be overridden by developers using variations, patterns, or editing the block markup in a post directly by adding allowedBlocks attribute.
 */
const ALLOWED_BLOCKS = [ 'core/group', 'core/paragraph' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * For a "Synced Entity" block, this is where we'll handle the logic for
 * rendering the block based on whether or not the entity exists. As well as handle
 * the logic and functionality for rendering the contents of the entity as innerblocks.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {Object}   props.noticeOperations Object with operations for managing notices.
 * @param {Object}   props.noticeUI      Object with operations for displaying notices.
 *
 * @return {WPElement} Element to render.
 */
function SyncedEntityEdit( {
	attributes,
	setAttributes,
	clientId,
	noticeOperations,
	noticeUI,
} ) {
	const { ref } = attributes;
	const isNew = ! ref;
	/**
	 * useHasRecursion pairs with <RecursionProvider /> to prevent infinite recursion (see final render below)
	 */
	const hasAlreadyRendered = useHasRecursion( ref );
	/**
	 * Here we use useEntityRecord to get the entity record for the entity quickly and check if it has resolved or if there even is a record.
	 */
	const { record, hasResolved } = useEntityRecord(
		'postType',
		POST_TYPE,
		ref
	);
	const isResolving = ! hasResolved;
	const isMissing = hasResolved && ! record && ! isNew;

	/**
	 * The useEntityBlockEditor hook handles the logic for
	 * rendering the contents of the entity as innerblocks. It returns an array
	 * of blocks, an onInput callback, and an onChange callback that will be used by
	 * useInnerBlocksProps to render blocks and control their contents.
	 *
	 *
	 * @param {string}   entityName          The name of the entity.
	 * @param {string}   postType            The type of the entity. "post type" or in the case of taxonomies "taxonomy type".
	 * @param {Object}   options             Options object.
	 *
	 */
	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		POST_TYPE,
		{ id: ref }
	);

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		value: blocks,
		onInput,
		onChange,
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: blocks?.length
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	/**
	 * Warn the user if the entity is already being rendered.
	 */
	if ( hasAlreadyRendered ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __( `${ POST_TYPE } cannot be rendered inside itself.` ) }
				</Warning>
			</div>
		);
	}

	/**
	 * Warn the user if the entity is missing.
	 */
	if ( isMissing ) {
		return (
			<div { ...blockProps }>
				<Warning>
					{ __(
						` ${ POST_TYPE }as been deleted or is unavailable.`
					) }
				</Warning>
			</div>
		);
	}

	/**
	 * Render the placeholder if the entity is new or is resolving.
	 */
	if ( isResolving || isNew ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					{ ...{
						attributes,
						setAttributes,
						clientId,
						isResolving,
						isNew,
					} }
				/>
			</div>
		);
	}

	/**
	 * Render the entity editor if the entity exists and has resolved.
	 * It's important to note that the entity editor is rendered inside of the
	 * RecursionProvider. This is because the entity editor is a block that
	 * could contain other blocks including possibly a variation of itself.
	 * The RecursionProvider prevents infinite recursion by tracking the
	 * uniqueId of the block, in our case the entity or "ref" id.
	 */
	return (
		<RecursionProvider uniqueId={ ref }>
			<Controls
				{ ...{
					attributes,
					clientId,
					blocks,
					postType: POST_TYPE,
				} }
			/>
			<div { ...innerBlocksProps } />
		</RecursionProvider>
	);
}

/**
 * Wraps the SyncedEntityEdit component with the withNotices higher order component.
 * This allows us to use the noticeOperations and noticeUI objects to display notices.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-notices/
 */
export default withNotices( SyncedEntityEdit );
