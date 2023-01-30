/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import CollectionList from './CollectionList';
import CollectionDropdown from './CollectionDropdown';

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
	const blockProps = useBlockProps();

	const { className, pdf } = attributes;
	const classNames = undefined !== className ? className.split(' ') : [];
	const { id } = pdf || {
		id: false,
	};

	return (
		<div {...blockProps}>
			{!classNames.includes('is-style-dropdown') && <CollectionList />}
			{classNames.includes('is-style-dropdown') && <CollectionDropdown />}
			<MediaDropZone
				className="wp-block-prc-block-fact-sheet-collection--pdf-link"
				attachmentId={id}
				onUpdate={(attachment) => {
					const newAttachment = {
						id: attachment.id,
						slug: attachment.slug,
						title: attachment.title,
						link: attachment.link,
						description: attachment.description,
						caption: attachment.caption,
						alt_text: attachment.alt_text,
						media_type: attachment.media_type,
						mime_type: attachment.mime_type,
						media_details: attachment.media_details,
						post: attachment.post,
						source_url: attachment.source_url,
					};
					setAttributes({ pdf: newAttachment });
				}}
				onClear={() => setAttributes({ pdf: null })}
				mediaType={['application/pdf']}
				label="Upload PDF"
				singularLabel="PDF"
			>
				<Button variant="secondary" label="Update PDF" icon="pdf">
					{`Update ${pdf ? `${pdf.title}.pdf` : 'PDF'}`}
				</Button>
			</MediaDropZone>
		</div>
	);
}
