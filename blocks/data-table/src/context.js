/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { useDebounce } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import {
	useState,
	useContext,
	createContext,
	useEffect,
	useMemo,
} from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */

// for non-commercial use only, see https://handsontable.com/docs/7.4.2/tutorial-license-key.html
const HOT_LICENSE_KEY = 'non-commercial-and-evaluation';

const dataTableContext = createContext();

const useProvideDataTable = ({ clientId, tableRef }) => {
	const { current } = tableRef;
	const HOT = useMemo(() => {
		console.log('TableREF?', tableRef);
		return tableRef.current?.hotInstance;
	}, [current]);

	const { data, colWidths, colHeaders, frozenColumns } =
		useSelect(
			(select) => {
				const block = select('core/block-editor').getBlock(clientId);
				return {
					data: block.attributes.data,
					colWidths: block.attributes.colWidths,
					colHeaders: block.attributes.colHeaders,
					frozenColumns: block.attributes.frozenColumns,
				};
			},
			[clientId]
		);

	const [tableData, setTableData] = useState(data);

	const debouncedTableData = useDebounce(tableData, 100);

	const [processing, toggleProcessing] = useState(false);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const updateAttributes = (attributes) => {
		updateBlockAttributes(clientId, attributes);
	};

	const translateChanges = (changes) => {
		return changes.map(([row, prop, oldValue, newValue]) => {
			return [row, prop, newValue];
		});
	};

	const handleAfterChange = (changes) => {
		console.log('handleAfterChange', changes);
		if (changes === null) {
			return;
		}

		const newData = translateChanges(changes);
		console.log('yield...', newData, tableData);

		if (tableData === undefined) {
			setTableData(newData);
		} else {
			console.log('changes', changes);
			newData.forEach(([row, prop, value]) => {
				tableData[row][prop] = value;
			});
			setTableData([...tableData]);
		}
	};

	const handleAfterRowMove = (
		movedRows,
		finalIndex,
		dropIndex,
		movePossible,
		orderChanged
	) => {
		console.log('movedRows', movedRows);
		console.log('finalIndex', finalIndex);
		console.log('dropIndex', dropIndex);
		console.log('movePossible', movePossible);
		console.log('orderChanged', orderChanged);

		// move the movedRows to the finalIndex in tableData
		const newTableData = [...tableData];
		const movedRowsData = newTableData.splice(
			movedRows[0],
			movedRows.length
		);
		newTableData.splice(finalIndex, 0, ...movedRowsData);
		setTableData(newTableData);
	};

	const handleColumnFreeze = (column) => {
		console.log('handleColumnFreeze', column);
		const index = frozenColumns.indexOf(column);
		const newFrozenColumns = [...frozenColumns];
		if (index === -1) {
			newFrozenColumns.push(column);
		} else {
			newFrozenColumns.splice(index, 1);
		}
		updateAttributes({ frozenColumns: newFrozenColumns });
	};

	const handleColumnSort = (currentSortConfig, destinationSortConfigs) => {
		console.log(
			'handleColumnSort',
			currentSortConfig,
			destinationSortConfigs
		);

		// Check if the destinationSortConfigs is empty
		if (destinationSortConfigs.length === 0) {
			return true;
		}

		const newSortConfig = destinationSortConfigs[0];
		const { column, sortOrder } = newSortConfig;

		// check if the column is in frozenColumns if so return false otherwise return true
		const index = frozenColumns.indexOf(column);
		if (index !== -1) {
			return false;
		}

		return true;
	};

	const handleAfterCreateCol = (index, amount, source) => {
		console.log('handleAfterCreateCol', index, amount, source);
	};

	const handleAfterCreateRow = (index, amount, source) => {
		console.log('handleAfterCreateRow', index, amount, source);
	};

	const handleAfterColumnResize = (newSize, column, isDoubleClick) => {
		// check if columnWidths is undefined first
		// if (columnWidths === undefined || null === newSize) {
		// 	return;
		// }
		console.log('currentColumn', column, newSize, colWidths);

		const newColWidths = undefined === colWidths ? [] : [...colWidths];
		newColWidths[column] = newSize;
		console.log('newColWidths', newColWidths);
		updateAttributes({ colWidths: newColWidths });
	};

	const handleColumnHeaderRename = (newName, column) => {
		const newColHeaders = [...colHeaders];
		newColHeaders[column] = newName;
		updateAttributes({ colHeaders: newColHeaders });
	};

	const insertNewRow = () => {
		HOT?.alter('insert_row_below');
	};

	const insertNewRowBefore = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.rowIndex;
		HOT?.alter('insert_row_above', index);
	};

	const insertNewRowAfter = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.rowIndex;
		HOT?.alter('insert_row_below', index);
	};

	const insertNewColumn = () => {
		HOT?.alter('insert_col_start');
	};

	const insertNewColumnAfter = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.columnIndex;
		HOT?.alter('insert_col_end', index);
	};

	const insertNewColumnBefore = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.columnIndex;
		HOT?.alter('insert_col_start', index);
	};

	const getColHeader = (index) => {
		return HOT?.getColHeader(index);
	};

	const getSelectedCellIndexes = () => {
		const selected = HOT?.getSelected();
		console.log('selected', selected);
		const selectedRow = selected[0][0];
		const selectedCol = selected[0][1];
		return { rowIndex: selectedRow, columnIndex: selectedCol };
	};

	const getSelectedColumn = () => {
		const selected = HOT?.getSelected();
		console.log('selected', selected);
		const selectedCol = selected[0][1];
		return selectedCol;
	};

	const loading = useMemo(() => {
		return processing;
	}, [processing]);

	// Update the block attributes when the table data changes
	useEffect(() => {
		if (debouncedTableData === undefined) {
			return;
		}
		console.log(`useEffect: updateBlockAttributes...`, debouncedTableData);
		updateAttributes({ data: [...debouncedTableData] });
	}, [debouncedTableData]);

	return {
		loading,
		tableData,
		colHeaders,
		colWidths,
		frozenColumns,
		HOT,
		handleAfterChange,
		handleAfterColumnResize,
		handleAfterCreateCol,
		handleAfterCreateRow,
		handleAfterRowMove,
		handleColumnHeaderRename,
		handleColumnFreeze,
		handleColumnSort,
		insertNewRow,
		insertNewRowBefore,
		insertNewRowAfter,
		insertNewColumn,
		insertNewColumnAfter,
		insertNewColumnBefore,
		getColHeader,
		getSelectedColumn,
		updateAttributes,
	};
};

// Hook for child components to get the context object ...
// ... and re-render when it changes.
const useDataTable = () => useContext(dataTableContext);

// Available to any child component that calls useDataTable()
function ProvideDataTable({ children, clientId, tableRef }) {
	const provider = useProvideDataTable({ clientId, tableRef });
	return (
		<dataTableContext.Provider value={provider}>
			{children}
		</dataTableContext.Provider>
	);
}

export { ProvideDataTable, useDataTable, HOT_LICENSE_KEY };
export default ProvideDataTable;
