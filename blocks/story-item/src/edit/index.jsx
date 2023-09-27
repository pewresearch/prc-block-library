/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { Controls, Placeholder } from './Controls';
import Image from './Image';
import Excerpt from './Excerpt';
import Extra from './Extra';
import Header from './Header';
import Meta from './Meta';
import Preview from './Preview';
import ContextPreview from './ContextPreview';
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
	isSelected,
}) {
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

	const { postId, isPreview } = attributes;

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

	const blockProps = useStoryItemBlockProps(attributes);

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

				<Extra
					{...{
						attributes,
						setAttributes,
					}}
				/>
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
