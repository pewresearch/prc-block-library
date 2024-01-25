/**
 * External Dependencies
 */
import { useHasSelectedInnerBlock } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { Controls, Placeholder } from './controls';
import Image from './image';
import Excerpt from './excerpt';
import Header from './header';
import Meta from './meta';
import Preview from './preview';
import ContextPreview from './context-preview';
import { useStoryItemBlockProps } from '../helpers';

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
}) {
	const isSelected = useHasSelectedInnerBlock(clientId);
	const { postId, isPreview, enableExtra } = attributes;

	const blockProps = useStoryItemBlockProps(attributes);
	const innerBlocksProps = useInnerBlocksProps({
		className: 'extra'
	}, {
		allowedBlocks: ['core/list', 'core/paragraph', 'core/html'],
	});
	
	// If this block is being rendered in the scope of query context
	// then render the ContextPreview component early.
	if (
		undefined !== context.queryId &&
		undefined !== context.postId &&
		undefined !== context.postType &&
		0 !== context.postId &&
		Number.isInteger(context.postId)
	) {
		return (
			<Fragment>
				<Controls
					{...{
						attributes,
						setAttributes,
						context,
					}}
				/>
				<ContextPreview {...{ attributes, context }} />
			</Fragment>
		);
	}

	if (undefined === postId) {
		return (
			<Placeholder
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
		);
	}

	// If not active or is explicitly a preview, return the preview early.
	if (!isSelected || isPreview) {
		return <Preview {...{ attributes, context }} />;
	}

	return (
		<Fragment>
			<article {...blockProps}>
				<Image
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Meta
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Header
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Excerpt
					{...{
						attributes,
						setAttributes,
					}}
				/>

				{true === enableExtra && (
					<div {...innerBlocksProps} />
				)}
			</article>
			<Controls
				{...{
					attributes,
					setAttributes,
					context,
				}}
			/>
		</Fragment>
	);
}
