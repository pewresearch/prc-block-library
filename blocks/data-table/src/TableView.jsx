/**
 * External Dependencies
 */
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { HOT_LICENSE_KEY } from './context';

registerAllModules();

/**
 * Table
 *
 * @param {*} param0
 * @return
 */
export default function TableView({ attributes }) {
	const { head, body, foot, colWidths, colHeaders, rowHeaders } = attributes;
	const hotTableComponent = useRef(null);
	const hotInstance = hotTableComponent.current?.hotInstance;
	return (
		<HotTable
			ref={hotTableComponent}
			data={body}
			rowHeaders={rowHeaders}
			colHeaders={colHeaders}
			contextMenu
			persistentState
			multiColumnSorting
			manualColumnResize
			colWidths={!!colWidths ? colWidths : 100}
			height="auto"
			width="100%"
			licenseKey={HOT_LICENSE_KEY}
		/>
	);
}
