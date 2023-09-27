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
	const { title, description, url } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Share Meta">
				<TextControl
					label={__('Title', 'prc-block-library')}
					value={title}
					onChange={(value) => setAttributes({ title: value })}
				/>
				<TextControl
					label={__('Description', 'prc-block-library')}
					value={description}
					onChange={(value) => setAttributes({ description: value })}
				/>
				<TextControl
					label={__('URL', 'prc-block-library')}
					help={__(
						'Setting a url here will override any selections on the individual social links.',
						'prc-block-library',
					)}
					value={url}
					onChange={(value) => setAttributes({ url: value })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
