/**
 * WordPress Dependencies
 */
import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Register the client-side block bindings for remote pivot table sum functionality.
 * 
 * This provides a client-side binding source that mirrors the server-side functionality,
 * allowing blocks in the editor to display live previews of column sums from remote
 * pivot table data.
 */
export default function registerBlockBindings() {
	registerBlockBindingsSource({
		name: 'prc-block/remote-pivot-table-sum',
		label: __('Remote Pivot Table Sum', 'prc-block-library'),
		usesContext: ['remote-data-blocks/remoteData'],
		getValues({ select, clientId, context, bindings }) {
			const { content } = bindings;
			const { args } = content;
			const { column } = args || {};

			if (!column) {
				return {
					content: '0',
				};
			}

			// Get remote data from context
			const remoteDataContext = context?.['remote-data-blocks/remoteData'] || {};
			const { results } = remoteDataContext;

			if (!results || !Array.isArray(results)) {
				return {
					content: '0',
				};
			}

			// Calculate column sum using the same logic as server-side
			const sum = calculateColumnSum(results, column);

			return {
				content: sum.toString(),
			};
		},
	});
}

/**
 * Calculate the sum of raw values for a specified column.
 * Mirrors the server-side calculation logic.
 *
 * @param {Array}  results     The remote data results array.
 * @param {string} columnName  The column name to sum.
 * @return {number}            The sum of raw values for the column.
 */
function calculateColumnSum(results, columnName) {
	let sum = 0;

	for (const result of results) {
		if (!result?.result || typeof result.result !== 'object') {
			continue;
		}

		const rowData = result.result;
		if (!(columnName in rowData)) {
			continue;
		}

		const rawValue = rowData[columnName];
		
		// Extract the numeric value from the raw_value structure
		const value = (Array.isArray(rawValue) || (typeof rawValue === 'object' && rawValue !== null && 'value' in rawValue))
			? rawValue.value 
			: rawValue;

		// Only sum numeric values
		if (typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)))) {
			sum += parseFloat(value);
		}
	}

	return sum;
}