/**
 * External Dependencies
 */
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './view-table.scss';

const initDataTable = (id) => new DataTable(`#${id}`, {
	searching: false,
	info: false,
	lengthChange: false,
	paging: false,
	responsive: true,
});

domReady(() => {
	const tableBlocks = document.querySelectorAll('.wp-block-prc-block-data-table > table');

	tableBlocks.forEach((tableBlock) => {
		const tableId = tableBlock.getAttribute('id');
		const dataTable = initDataTable(tableId);
		console.log('dataTable', dataTable);
	});
});
