/**
 * External Dependencies
 */
import DataTable from 'DataTables';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

const initSortableTable = (id, extraConfigs = {}) =>
	new DataTable(`#${id}`, {
		searching: false,
		info: false,
		lengthChange: false,
		paging: false,
		responsive: true,
		...extraConfigs,
	});

domReady(() => {
	const tableBlocks = document.querySelectorAll(
		'.wp-block-table.sortable-table'
	);
	tableBlocks.forEach((tableBlock) => {
		const tableId = tableBlock.getAttribute('id');
		const dataTable = initSortableTable(tableId, {});
	});
});
