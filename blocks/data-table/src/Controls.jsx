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
	BaseControl,
	Button,
	DropZone,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { useDataTable } from './context';
import CSVImport from './CSVImport';

function InspectorPanel() {
	const { updateAttributes, rowHeaders } = useDataTable();

	return (
		<InspectorControls>
			<PanelBody title="CSV Import">
				<PanelRow>
					<CSVImport setAttributes={updateAttributes} />
				</PanelRow>
			</PanelBody>
			{/* <PanelBody title="Table Options">
				<PanelRow>
					<ToggleControl
						label={__('Row Headers')}
						checked={rowHeaders}
						onChange={() => {
							updateAttributes({ rowHeaders: !rowHeaders });
						}}
					/>
				</PanelRow>
			</PanelBody> */}
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
