/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, DropZone, PanelBody, PanelRow } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import handleCSV from './csv-parser';

function InspectorPanel({ attributes, setAttributes }) {
	const hiddenFileInput = useRef(null);

	return (
		<InspectorControls>
			<PanelBody title="CSV Import">
				<PanelRow>
					<Button
						isPrimary
						onClick={() => {
							hiddenFileInput.current.click();
						}}
					>
						{__(`Import CSV to Table`, 'prc-block-library')}
					</Button>
					<input
						ref={hiddenFileInput}
						type="file"
						accept="text/csv"
						onChange={(e) =>
							handleCSV(e.target.files, attributes, setAttributes)
						}
						style={{ display: 'none' }}
					/>
					<DropZone
						onFilesDrop={(droppedFiles) =>
							handleCSV(droppedFiles, attributes, setAttributes)
						}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
