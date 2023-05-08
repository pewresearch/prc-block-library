/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import TableView from './TableView';

domReady(() => {
	const tableBlocks = document.querySelectorAll(
		'.wp-block-prc-block-data-table'
	);
	tableBlocks.forEach((tableBlock) => {
		const tableId = tableBlock.getAttribute('id');
		const tableAttributes = window.prcDataTables[tableId];
		render(<TableView attributes={tableAttributes} />, tableBlock);
	});
});
