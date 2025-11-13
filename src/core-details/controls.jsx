/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

function InspectorPanel({ attributes, setAttributes }) {
	const { closeWhenFocusLost } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Details Settings', 'prc-block-library')}>
				<ToggleControl
					label={__('Close when focus lost', 'prc-block-library')}
					help={__(
						'Automatically close this details element when clicking outside of it.',
						'prc-block-library',
					)}
					checked={closeWhenFocusLost}
					onChange={(value) =>
						setAttributes({ closeWhenFocusLost: value })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
