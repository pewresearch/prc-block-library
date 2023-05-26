/**
 * External Dependencies
 */
import {
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
} from '@wordpress/icons';

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
import { useDataTable } from './context';

function InspectorPanel() {
	const { handleCSVImport } = useDataTable();
	const hiddenFileInput = useRef(null);

	return (
		<InspectorControls>
			<PanelBody title="CSV Import">
				<PanelRow>
					<Button
						variant="primary"
						onClick={() => {
							hiddenFileInput.current.click();
						}}
					>
						<span>
							Click or drag and drop
							<br />a CSV file to import it.
						</span>
					</Button>
					<input
						ref={hiddenFileInput}
						type="file"
						accept="text/csv"
						onChange={(e) => handleCSVImport(e.target.files)}
						style={{ display: 'none' }}
					/>
					<DropZone
						onFilesDrop={(droppedFiles) =>
							handleCSVImport(droppedFiles)
						}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}

function BlockToolbar() {
	const { insertNewColumn, insertNewRow } = useDataTable();

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					label="Insert Row"
					icon={tableRowAfter}
					onClick={insertNewRow}
				/>
				<ToolbarButton
					label="Insert Column"
					icon={tableColumnAfter}
					onClick={insertNewColumn}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls() {
	return (
		<Fragment>
			<BlockToolbar />
			<InspectorPanel />
		</Fragment>
	);
}
