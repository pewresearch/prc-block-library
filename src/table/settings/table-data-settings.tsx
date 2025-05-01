/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, Button, DropZone } from '@wordpress/components';
import { useRef } from '@wordpress/element';
/**
 * Internal Dependencies
 */
import { handleCSV, exportCSV } from '../csv-parser';
import { type VTable, type VSelectedCells } from '../utils/table-state';
import type { BlockAttributes } from '../block-attributes';

type TableDataSettingsProps = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	vTable: VTable;
	selectedCells: VSelectedCells;
};

type DropzoneProps = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
};

export function TableDataDropzone({
	attributes,
	setAttributes,
}: DropzoneProps) {
	return (
		<DropZone
			label="Drop a CSV file here to replace this table's data."
			onFilesDrop={(droppedFiles) =>
				handleCSV(droppedFiles, attributes, setAttributes)
			}
		/>
	);
}

/* eslint-disable max-lines-per-function */
export default function TableDataSettings({
	attributes,
	setAttributes,
	vTable,
	selectedCells = [],
}: TableDataSettingsProps) {
	// Create a hidden file input element.
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	return (
		<>
			<PanelRow>
				<Button
					variant="secondary"
					onClick={() => {
						if (hiddenFileInput.current) {
							hiddenFileInput.current.click();
						}
					}}
					help={__(
						"Import a CSV file to replace this table's data.",
						'prc-block-library'
					)}
				>
					{__(`Import CSV`, 'prc-block-library')}
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
				<TableDataDropzone
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</PanelRow>
			<PanelRow>
				<Button
					variant="secondary"
					onClick={() => {
						const csv = exportCSV(attributes);
						console.log('csv...', csv);
						const blob = new Blob([csv], {
							type: 'text/csv',
						});
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = 'table.csv';
						a.click();
					}}
				>
					{__('Export CSV', 'prc-block-library')}
				</Button>
			</PanelRow>
		</>
	);
}
