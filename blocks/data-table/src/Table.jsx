/**
 * External Dependencies
 */
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

/**
 * WordPress Dependencies
 */
import {
 Fragment, useState, useRef, useEffect
} from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

registerAllModules();

/**
 * Table
 *
 * @param {*} param0
 * @return
 */
export default function Table({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { data, columnWidths } = attributes;
	const hotTableComponent = useRef(null);
	const hotInstance = hotTableComponent.current?.hotInstance;

	const [tableData, setTableData] = useState(data);

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

	const insertNewRow = () => {
		const newData = [...tableData];
		newData.push(['', '', '']);
		setTableData(newData);
	};

	const insertNewColumn = () => {
		const newData = [...tableData];
		newData.forEach((row) => row.push(''));
		setTableData(newData);
	};

	const handleAfterColumnResize = (newSize, column, isDoubleClick) => {
		// check if columnWidths is undefined first
		// if (columnWidths === undefined || null === newSize) {
		// 	return;
		// }
		console.log('currentColumn', column, newSize, columnWidths);

		const newColWidths =
			undefined === columnWidths ? [] : [...columnWidths];
		newColWidths[column] = newSize;
		console.log('newColWidths', newColWidths);
		setAttributes({ columnWidths: newColWidths });
	};

	useEffect(() => {
		if (tableData) {
			setAttributes({ data: tableData });
		}
	}, [tableData]);

	return (
		<Fragment>
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
			<HotTable
				ref={hotTableComponent}
				data={data}
				rowHeaders
				colHeaders
				contextMenu
				persistentState
				multiColumnSorting
				manualColumnResize
				colWidths={!!columnWidths ? columnWidths : 100}
				height="auto"
				width="100%"
				afterChange={(changes) => handleAfterChange(changes)}
				afterColumnResize={(newSize, column, isDoubleClick) =>
					handleAfterColumnResize(newSize, column, isDoubleClick)
				}
				beforeKeyDown={handleBeforeKeyDown}
				licenseKey="non-commercial-and-evaluation" // for non-commercial use only
			/>
		</Fragment>
	);
}
