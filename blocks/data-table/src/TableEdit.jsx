/**
 * External Dependencies
 */
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { ContextMenu } from 'handsontable/plugins/contextMenu';

/**
 * WordPress Dependencies
 */
import { KeyboardShortcuts } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { useDataTable, HOT_LICENSE_KEY } from './context';

registerAllModules();

// at initialization, sort data by the first column, in descending order
const COLUMN_SORTING_CONFIG = {
	initialConfig: {
		column: 1,
		sortOrder: 'desc',
	},
};

const { prompt } = window;

/**
 * Table
 *
 * @param {*} param0
 * @return
 */
export default function TableEdit({ tableRef }) {
	const {
		tableData,
		rowHeaders,
		colHeaders,
		colWidths,
		handleAfterChange,
		handleAfterColumnResize,
		handleBeforeKeyDown,
		handleColumnHeaderRename,
		getColHeader,
		insertNewRow,
		insertNewRowAfter,
		inserNewRowBefore,
		insertNewColumn,
		insertNewColumnAfter,
		insertNewColumnBefore,
	} = useDataTable();

	return (
		<KeyboardShortcuts
			shortcuts={{
				'option+shift+down': () => insertNewRowAfter(),
				'option+shift+right': () => insertNewColumnAfter(),
			}}
		>
			<HotTable
				ref={tableRef}
				data={tableData}
				rowHeaders={rowHeaders}
				colHeaders={colHeaders}
				contextMenu={{
					items: {
						row_above: {},
						row_below: {},
						remove_row: {},
						remove_col: {},
						seperator: ContextMenu.SEPARATOR,
						rename: {
							name: 'Rename this column',
							callback(key, selection, clickEvent) {
								// get the column index from the selection
								const colIndex = selection[0].end.col;
								// get the value from the selected
								const colName = getColHeader(colIndex);

								const newColName = prompt(
									'Enter a new column name',
									colName
								);
								if (newColName) {
									handleColumnHeaderRename(
										newColName,
										colIndex
									);
								}
							},
						},
					},
				}}
				fixedColumnsStart={1}
				persistentState={true}
				columnSorting={COLUMN_SORTING_CONFIG}
				dropdownMenu={true}
				manualColumnResize={true}
				manualColumnFreeze={true}
				colWidths={!!colWidths ? colWidths : 100}
				height="auto"
				width="100%"
				afterChange={(changes) => handleAfterChange(changes)}
				afterColumnResize={(newSize, column, isDoubleClick) =>
					handleAfterColumnResize(newSize, column, isDoubleClick)
				}
				beforeKeyDown={handleBeforeKeyDown}
				licenseKey={HOT_LICENSE_KEY}
			/>
		</KeyboardShortcuts>
	);
}
