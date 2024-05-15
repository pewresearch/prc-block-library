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

const initDataTable = (id, extraConfigs = {}) =>
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
		'.wp-block-prc-block-data-table > table'
	);

	tableBlocks.forEach((tableBlock) => {
		const { prcDataTables } = window;
		const tableId = tableBlock.getAttribute('id');
		const extraConfigs = {};
		const frozenTargets = prcDataTables[tableId]?.frozenColumns;
		extraConfigs.columnDefs = [
			{ orderable: false, targets: frozenTargets },
		];
		const dataTable = initDataTable(tableId, extraConfigs);
		console.log('dataTable', dataTable, prcDataTables[tableId]);
	});
});
