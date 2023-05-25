/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useRef } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
	Button,
	DropZone,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

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

function BlockToolbar({ attributes, setAttributes }) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					label="Insert Row"
					icon="plus-alt2"
					onClick={insertNewRow}
				/>
				<ToolbarButton
					label="Insert Column"
					icon="plus-alt2"
					onClick={insertNewColumn}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return (
		<Fragment>
			<BlockToolbar {...{ attributes, setAttributes, context }} />
			<InspectorPanel {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}
