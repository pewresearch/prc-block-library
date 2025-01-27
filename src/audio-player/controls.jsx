/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes, type }) {
	const { source, imageSource, enableEventTracking } = attributes;

	console.log('event tracking from InspectorPanel:', enableEventTracking);

	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				{' '}
				{type === 'player' && (
					<MediaDropZone
						attachmentId={imageSource ? imageSource.id : false}
						onUpdate={(attachment) => {
							setAttributes({ imageSource: attachment });
						}}
						onClear={() => setAttributes({ imageSource: null })}
						mediaType={['image']}
						label="Upload Image"
						singularLabel="Image"
					>
						<Button variant="secondary" label="Update Image">
							{`Update ${
								imageSource ? `${imageSource.title}` : 'Image'
							}`}
						</Button>
					</MediaDropZone>
				)}
				<MediaDropZone
					attachmentId={source ? source.id : false}
					onUpdate={(attachment) => {
						setAttributes({ source: attachment });
					}}
					onClear={() => setAttributes({ source: null })}
					mediaType={['image']}
					label="Upload Audio"
					singularLabel="Audio"
				>
					<Button variant="secondary" label="Update Audio">
						{`Update ${source ? `${source.title}` : 'Audio File'}`}
					</Button>
				</MediaDropZone>
				<ToggleControl
					__nextHasNoMarginBottom
					label="Event Tracking"
					help={
						enableEventTracking
							? 'Event tracking enabled.'
							: 'Event tracking disabled.'
					}
					checked={enableEventTracking}
					onChange={() => {
						setAttributes({
							enableEventTracking: !enableEventTracking,
						});
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context, type }) {
	return <InspectorPanel {...{ attributes, setAttributes, context, type }} />;
}
