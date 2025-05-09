/**
 * External Dependencies
 */
import { MediaDropZone } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

function InspectorPanel({ attributes, setAttributes }) {
	const { mobileId, tabletId } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Responsive Backgrounds')}>
				<MediaDropZone
					attachmentId={mobileId}
					label={'Set Mobile Background'}
					singularLabel={'Mobile Background'}
					onUpdate={(attachment) => {
						setAttributes({
							mobileId: attachment.id,
							mobileUrl: attachment.source_url,
						});
					}}
				/>
				<MediaDropZone
					attachmentId={tabletId}
					label={'Set Tablet Background'}
					singularLabel={'Tablet Background'}
					onUpdate={(attachment) => {
						setAttributes({
							tabletId: attachment.id,
							tabletUrl: attachment.source_url,
						});
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
