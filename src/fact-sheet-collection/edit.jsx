/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc/components';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import CollectionList from './collection-list';
// import CollectionDropdown from './collection-dropdown';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.clientId
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { className, pdf, disableHeading } = attributes;
	const classNames = undefined !== className ? className.split(' ') : [];
	const { id } = pdf || {
		id: false,
	};

	const blockProps = useBlockProps({
		style: {
			gap: getBlockGapSupportValue(attributes),
		},
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title="Fact Sheet Collection Settings"
					initialOpen={true}
				>
					<ToggleControl
						label="Disable Heading"
						checked={disableHeading}
						onChange={() =>
							setAttributes({ disableHeading: !disableHeading })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{!classNames.includes('is-style-dropdown') && (
					<CollectionList {...{ clientId, disableHeading }} />
				)}
				{/* {classNames.includes('is-style-dropdown') && <CollectionDropdown />} */}
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
					label="Upload Fact Sheet PDF"
					singularLabel="PDF"
				>
					<Button variant="secondary" label="Update PDF" icon="pdf">
						{`Update ${pdf ? `${pdf.title}.pdf` : 'PDF'}`}
					</Button>
				</MediaDropZone>
			</div>
		</Fragment>
	);
}
