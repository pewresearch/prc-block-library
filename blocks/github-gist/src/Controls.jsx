/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

function Controls({ attributes, setAttributes, setPreview }) {
	const { url, file, meta } = attributes;

	const updateURL = (newURL) => {
		if ('undefined' === typeof newURL || !newURL.trim()) {
			setPreview(false);
		}
		setAttributes({ url: newURL });
	};

	const updateFile = (newFile) => {
		setAttributes({ file: newFile });
	};

	const getGistMetaHelp = (checked) =>
		checked
			? __('Showing gist meta data.', 'prc-block-library')
			: __('Toggle to show the gist meta data.', 'prc-block-library');

	return (
		<InspectorControls>
			<PanelBody title={__('Gist settings', 'prc-block-library')}>
				<TextControl
					label={__('Gist URL', 'prc-block-library')}
					value={url}
					onChange={updateURL}
				/>
				<TextControl
					label={__('Gist File', 'prc-block-library')}
					value={file}
					onChange={updateFile}
				/>
				<ToggleControl
					label={__('Gist Meta', 'prc-block-library')}
					checked={!!meta}
					onChange={() => setAttributes({ meta: !meta })}
					help={getGistMetaHelp}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Controls;
