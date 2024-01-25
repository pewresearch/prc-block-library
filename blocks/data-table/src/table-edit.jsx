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
		debouncedTableData,
		colHeaders,
		colWidths,
		handleAfterChange,
		handleAfterColumnResize,
		handleAfterCreateCol,
		handleAfterCreateRow,
		handleColumnHeaderRename,
		handleAfterRowMove,
		handleColumnFreeze,
		handleColumnSort,
		getColHeader,
		insertNewRowAfter,
		insertNewRowBefore,
		insertNewColumnAfter,
		insertNewColumnBefore,
		getSelectedColumn,
	} = useDataTable();

	return (
		<KeyboardShortcuts
			shortcuts={{
				'option+shift+up': () => insertNewRowBefore(),
				'option+shift+down': () => insertNewRowAfter(),
				'option+shift+left': () => insertNewColumnBefore(),
				'option+shift+right': () => insertNewColumnAfter(),
			}}
		>
			<HotTable
				ref={tableRef}
				data={tableData}
				rowHeaders={false}
				colHeaders={colHeaders}
				contextMenu={{
					items: {
						row_above: {},
						row_below: {},
						remove_row: {},
						col_left: {},
						col_right: {},
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
						freeze_column: {
							name() {
								const currentColumn = getSelectedColumn();
								console.log(currentColumn);
								return 'Freeze this column';
							},
							callback(key, selection, clickEvent) {
								const colIndex = selection[0].end.col;
								handleColumnFreeze(colIndex);
							},
						},
					},
				}}
				// persistentState={true}
				columnSorting={true}
				manualColumnFreeze={true}
				// manualColumnResize={true}
				// colWidths={!!colWidths ? colWidths : 100}
				wordWrap={true}
				stretchH="all"
				height="auto"
				width="100%"
				afterChange={handleAfterChange}
				afterColumnResize={handleAfterColumnResize}
				afterRowMove={handleAfterRowMove}
				afterCreateCol={handleAfterCreateCol}
				afterCreateRow={handleAfterCreateRow}
				beforeColumnSort={handleColumnSort}
				licenseKey={HOT_LICENSE_KEY}
			/>
		</KeyboardShortcuts>
	);
}
