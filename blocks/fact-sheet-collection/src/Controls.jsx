/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

function InspectorPanel({ attributes, setAttributes }) {
	const { pdf } = attributes;
	const { id } = pdf || {
		id: false,
	};

	return (
		<InspectorControls>
			<PanelBody title="Collection Settings">
				<MediaDropZone
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
					onClear={() => {
						console.warn(
							'Media DropZone Attachment, use onClear prop when using <MediaDropZone/>: ',
						);
						setAttributes({ pdf: null });
					}}
					mediaType={['application/pdf']}
					label="Upload PDF"
					singularLabel="PDF"
				>
					<Button variant="secondary" label="Update PDF" icon="pdf">
						{`Update ${pdf ? `${pdf.title}.pdf` : 'PDF'}`}
					</Button>
				</MediaDropZone>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
