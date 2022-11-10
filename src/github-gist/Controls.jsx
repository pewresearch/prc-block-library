/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
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
			? __('Showing gist meta data.', 'coblocks')
			: __('Toggle to show the gist meta data.', 'coblocks');

	return (
		<InspectorControls>
			<PanelBody title={__('Gist settings', 'coblocks')}>
				<TextControl
					label={__('Gist URL', 'coblocks')}
					value={url}
					onChange={updateURL}
				/>
				<TextControl
					label={__('Gist File', 'coblocks')}
					value={file}
					onChange={updateFile}
				/>
				<ToggleControl
					label={__('Gist Meta', 'coblocks')}
					checked={!!meta}
					onChange={() => setAttributes({ meta: !meta })}
					help={getGistMetaHelp}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Controls;
