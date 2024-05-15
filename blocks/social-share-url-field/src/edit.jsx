/**
 * External Dependencies
 */
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

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
	const { url } = attributes;

	console.log('Social Share URL Field: context: ', context);

	const blockProps = useBlockProps({
		style: {
			display: 'flex',
			flexDirection: 'row',
		},
	});

	return (
		<div {...blockProps}>
			<div className="label">{__(`Share This Link:`, 'prc-block-library')}</div>
			<Input
				placeholder="URL..."
				value={url}
				onChange={(e, { value }) => setAttributes({ url: value })}
			/>
		</div>
	);
}
