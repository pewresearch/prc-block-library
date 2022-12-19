/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

function InspectorPanel({ attributes, setAttributes }) {
	const { subExpandOpenedLabel, label } = attributes;

	let placeholder = 'More' === label ? 'Less' : '~ Less or Close or Collapse ~';
	if ('Expand' === label) {
		placeholder = 'Collapse';
	}
	if ('Open' === label) {
		placeholder = 'Close';
	}

	return (
		<InspectorControls>
			<PanelBody title="Sub Expand Settings">
				<TextControl
					label={__('Expanded Label', 'prc-block-library-core-blocks')}
					help={__(
						'Label for expanded submenu',
						'prc-block-library-core-blocks',
					)}
					value={subExpandOpenedLabel}
					onChange={(value) => setAttributes({ subExpandOpenedLabel: value })}
					placeholder={placeholder}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
