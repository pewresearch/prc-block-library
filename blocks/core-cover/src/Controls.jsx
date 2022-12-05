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
	const { mobileId } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Media (mobile) settings')}>
				<MediaDropZone
					attachmentId={mobileId}
					label={(__('Set Mobile Background'), 'prc-block-library')}
					onUpdate={(attachment) => {
						setAttributes({
							mobileId: attachment.id,
							mobileUrl: attachment.source_url,
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
