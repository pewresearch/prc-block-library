/**
 * External Dependencies
 */
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';

registerAllModules();

/**
 * Table
 *
 * @param {*} param0
 * @return
 */
export default function TableView({ attributes }) {
	const { data, columnWidths, colHeaders, rowHeaders } = attributes;
	const hotTableComponent = useRef(null);
	const hotInstance = hotTableComponent.current?.hotInstance;
	return (
		<HotTable
			ref={hotTableComponent}
			data={data}
			rowHeaders={rowHeaders}
			colHeaders={colHeaders}
			contextMenu
			persistentState
			multiColumnSorting
			manualColumnResize
			colWidths={!!columnWidths ? columnWidths : 100}
			height="auto"
			width="100%"
			licenseKey="non-commercial-and-evaluation" // for non-commercial use only
		/>
	);
}
