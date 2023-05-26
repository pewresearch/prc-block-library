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
import handleCSV from './csv-parser';

// for non-commercial use only, see https://handsontable.com/docs/7.4.2/tutorial-license-key.html
const HOT_LICENSE_KEY = 'non-commercial-and-evaluation';

const dataTableContext = createContext();

const useProvideDataTable = ({ clientId, tableRef }) => {
	const { current } = tableRef;
	const HOT = useMemo(() => {
		console.log('TableREF?', tableRef);
		return tableRef.current?.hotInstance;
	}, [current]);

	const { head, body, foot, colWidths, colHeaders, rowHeaders } = useSelect(
		(select) => {
			const block = select('core/block-editor').getBlock(clientId);
			return {
				head: block.attributes.head,
				body: block.attributes.body,
				foot: block.attributes.foot,
				colWidths: block.attributes.colWidths,
				colHeaders: block.attributes.colHeaders,
				rowHeaders: block.attributes.rowHeaders,
			};
		},
		[clientId]
	);

	const [headData, setHeadData] = useState(head);
	const [tableData, setTableData] = useState(body);
	const [footData, setFootData] = useState(foot);

	const debouncedTableData = useDebounce(tableData, 100);

	const [processing, toggleProcessing] = useState(false);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const handleAfterChange = (changes) => {
		if (changes === null) {
			return;
		}

		const newData = changes.map(([row, prop, oldValue, newValue]) => {
			return [row, prop, newValue];
		});

		if (tableData === undefined) {
			setTableData(newData);
		} else {
			newData.forEach(([row, prop, value]) => {
				tableData[row][prop] = value;
			});
			setTableData([...tableData]);
		}
	};

	const handleBeforeKeyDown = (event) => {
		if (
			(event.ctrlKey || event.metaKey) &&
			event.shiftKey &&
			(event.key === 'Enter' || event.code === 'Enter')
		) {
			event.preventDefault();
			insertNewRow();
		} else if (event.metaKey && event.shiftKey && event.code === 'Space') {
			event.preventDefault();
			insertNewColumn();
		}
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
		updateBlockAttributes(clientId, { colWidths: newColWidths });
	};

	const handleColumnHeaderRename = (newName, column) => {
		const newColHeaders = [...colHeaders];
		newColHeaders[column] = newName;
		updateBlockAttributes(clientId, { colHeaders: newColHeaders });
	};

	const insertNewRow = () => {
		HOT?.alter('insert_row_below');
	};

	const insertNewRowBefore = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.rowIndex;
		console.log('insertNewRowBefore index', currentlySelected, index);
		HOT?.alter('insert_row_above', index);
	};

	const insertNewRowAfter = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.rowIndex;
		console.log('insertNewRowAfter index', currentlySelected, index);
		HOT?.alter('insert_row_below', index);
	};

	const insertNewColumn = () => {
		HOT?.alter('insert_col_start');
	};

	const insertNewColumnAfter = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.columnIndex;
		console.log('insertNewColumnAfter index', currentlySelected, index);
		HOT?.alter('insert_col_end', index);
	};

	const insertNewColumnBefore = () => {
		const currentlySelected = getSelectedCellIndexes();
		const index = currentlySelected.columnIndex;
		console.log('insertNewColumnBefore index', currentlySelected, index);
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

	const handleCSVImport = (files) => {
		toggleProcessing(true);
		handleCSV(files, attributes, updateBlockAttributes);
		toggleProcessing(false);
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
		updateBlockAttributes(clientId, { body: [...debouncedTableData] });
	}, [debouncedTableData, clientId, updateBlockAttributes]);

	return {
		loading,
		tableData,
		rowHeaders,
		colHeaders,
		colWidths,
		HOT,
		handleAfterChange,
		handleAfterColumnResize,
		handleBeforeKeyDown,
		handleCSVImport,
		handleColumnHeaderRename,
		insertNewRow,
		insertNewRowBefore,
		insertNewRowAfter,
		insertNewColumn,
		insertNewColumnAfter,
		insertNewColumnBefore,
		getColHeader,
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
