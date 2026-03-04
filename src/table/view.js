/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Helper function to strip HTML tags from a string
 * @param {string} html - HTML string to strip
 * @return {string} - Plain text content
 */
function stripHtml(html) {
	const tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
}

/**
 * Attempt to parse a string as a date
 * Supports common formats:
 * - MM/DD/YYYY, MM-DD-YYYY (US format)
 * - DD/MM/YYYY, DD-MM-YYYY (EU format, when day > 12)
 * - YYYY-MM-DD, YYYY/MM/DD (ISO format)
 * - Month DD, YYYY (e.g., "January 15, 2024")
 * @param {string} text - The text to parse
 * @return {number|null} - Timestamp if valid date, null otherwise
 */
function parseDate(text) {
	// Skip if empty or too short
	if (!text || text.length < 6) return null;

	// ISO format: YYYY-MM-DD or YYYY/MM/DD
	const isoMatch = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
	if (isoMatch) {
		const date = new Date(
			parseInt(isoMatch[1], 10),
			parseInt(isoMatch[2], 10) - 1,
			parseInt(isoMatch[3], 10)
		);
		if (!isNaN(date.getTime())) return date.getTime();
	}

	// US/EU format: MM/DD/YYYY or DD/MM/YYYY
	const slashMatch = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
	if (slashMatch) {
		const first = parseInt(slashMatch[1], 10);
		const second = parseInt(slashMatch[2], 10);
		const year = parseInt(slashMatch[3], 10);

		// Assume US format (MM/DD/YYYY) by default
		// If first > 12, it must be DD/MM/YYYY
		let month, day;
		if (first > 12) {
			day = first;
			month = second;
		} else {
			month = first;
			day = second;
		}

		const date = new Date(year, month - 1, day);
		if (!isNaN(date.getTime())) return date.getTime();
	}

	// Try native Date.parse for formats like "January 15, 2024"
	const parsed = Date.parse(text);
	if (!isNaN(parsed)) {
		// Verify it's actually a date and not a number being misinterpreted
		// Date.parse can parse numbers, so we avoid that
		if (!/^\d+$/.test(text)) {
			return parsed;
		}
	}

	return null;
}

/**
 * Parse a duration string (e.g. "13h 15m", "2hr", "90min") into total minutes.
 * @param {string} text - Plain text to parse
 * @return {number|null} - Total minutes if valid duration, null otherwise
 */
function parseDuration(text) {
	const match = text.match(
		/^\s*(?:(\d+)\s*(?:h|hr)s?)?\s*(?:(\d+)\s*(?:m|min)s?)?\s*$/i
	);
	if (!match) return null;
	const hours = match[1] ? parseInt(match[1], 10) : 0;
	const minutes = match[2] ? parseInt(match[2], 10) : 0;
	if (hours === 0 && minutes === 0) return null;
	return hours * 60 + minutes;
}

/**
 * Helper function to parse a value for sorting
 * Attempts to detect and parse numeric values
 * @param {string} value - The cell content value
 * @return {{ value: number | string, isNumeric: boolean }} Parsed value and whether it is numeric
 */
function parseValue(value) {
	const text = stripHtml(value).trim();

	// Try to parse as a date first (common formats)
	const dateValue = parseDate(text);
	if (dateValue !== null) {
		return { value: dateValue, isNumeric: true };
	}

	// Duration: e.g. "13h 15m", "13hr 10min", "2h", "90m"
	const durationValue = parseDuration(text);
	if (durationValue !== null) {
		return { value: durationValue, isNumeric: true };
	}

	// Try to parse as a number (handles commas, percentages, currency)
	const cleanedText = text
		.replace(/[$€£¥,]/g, '') // Remove currency symbols and commas
		.replace(/%$/, '') // Remove trailing percent
		.trim();

	const num = parseFloat(cleanedText);

	if (!isNaN(num) && isFinite(num)) {
		return { value: num, isNumeric: true };
	}

	return { value: text.toLowerCase(), isNumeric: false };
}

/**
 * Compare two values for sorting
 * @param {any}    a         - First value
 * @param {any}    b         - Second value
 * @param {string} direction - 'asc' or 'desc'
 * @return {number} Negative if a < b, positive if a > b, zero if equal
 */
function compareValues(a, b, direction) {
	const parsedA = parseValue(a);
	const parsedB = parseValue(b);

	let result = 0;

	// If both are numeric, compare as numbers
	if (parsedA.isNumeric && parsedB.isNumeric) {
		result = parsedA.value - parsedB.value;
	} else {
		// Compare as strings
		const strA = String(parsedA.value);
		const strB = String(parsedB.value);
		result = strA.localeCompare(strB);
	}

	return direction === 'desc' ? -result : result;
}

/**
 * Perform the actual table sorting
 * @param {HTMLElement} tableWrapper - The table wrapper element
 * @param {number}      columnIndex  - Column to sort by
 * @param {string}      direction    - 'asc', 'desc', or 'none'
 */
function sortTable(tableWrapper, columnIndex, direction) {
	const tbody = tableWrapper.querySelector('tbody');
	if (!tbody) return;

	const rows = Array.from(tbody.querySelectorAll('tr'));

	// If direction is 'none', restore original order
	if (direction === 'none') {
		rows.sort((a, b) => {
			const indexA = parseInt(a.getAttribute('data-original-index'), 10);
			const indexB = parseInt(b.getAttribute('data-original-index'), 10);
			return indexA - indexB;
		});
	} else {
		// Sort the rows
		rows.sort((a, b) => {
			const cellA = a.querySelectorAll('td, th')[columnIndex];
			const cellB = b.querySelectorAll('td, th')[columnIndex];

			if (!cellA || !cellB) return 0;

			const valueA =
				cellA.getAttribute('data-sort-value') ?? cellA.innerHTML;
			const valueB =
				cellB.getAttribute('data-sort-value') ?? cellB.innerHTML;

			return compareValues(valueA, valueB, direction);
		});
	}

	// Re-append rows in sorted order
	rows.forEach((row) => tbody.appendChild(row));

	// Update aria-sort on header cells
	const thead = tableWrapper.querySelector('thead');
	if (thead) {
		const headerCells = thead.querySelectorAll('th, td');
		headerCells.forEach((cell, index) => {
			if (index === columnIndex && direction !== 'none') {
				cell.setAttribute(
					'aria-sort',
					direction === 'asc' ? 'ascending' : 'descending'
				);
			} else {
				cell.removeAttribute('aria-sort');
			}

			// Update sort direction classes
			cell.classList.remove('is-sorted-asc', 'is-sorted-desc');
			if (index === columnIndex) {
				if (direction === 'asc') {
					cell.classList.add('is-sorted-asc');
				} else if (direction === 'desc') {
					cell.classList.add('is-sorted-desc');
				}
			}
		});
	}
}

/**
 * Interactivity store for the Power Table block
 */
store('prc-block/table', {
	state: {
		/**
		 * Returns the sort indicator character based on direction
		 */
		get sortIndicator() {
			const { ref } = getElement();
			if (!ref) return '';

			const context = getContext();
			const columnIndex = parseInt(
				ref.getAttribute('data-column-index'),
				10
			);

			if (context.sortColumn !== columnIndex) {
				return '';
			}

			return context.sortDirection === 'asc' ? '↑' : '↓';
		},

		/**
		 * Returns the label for the mobile sort direction button
		 */
		get mobileSortDirectionLabel() {
			const context = getContext();
			if (context.sortDirection === 'desc') {
				return 'Z-A ↓';
			}
			return 'A-Z ↑';
		},
	},
	actions: {
		/**
		 * Handle click on sortable header cell
		 */
		onHeaderClick: () => {
			const { ref } = getElement();
			if (!ref) return;

			const context = getContext();
			const columnIndex = parseInt(
				ref.getAttribute('data-column-index'),
				10
			);

			// Check if this column is sortable
			const sortableColumns = context.sortableColumns || [];
			if (
				sortableColumns.length > 0 &&
				!sortableColumns.includes(columnIndex)
			) {
				return;
			}

			// Toggle sort direction
			let newDirection;
			if (context.sortColumn === columnIndex) {
				// Cycle through: asc -> desc -> none
				if (context.sortDirection === 'asc') {
					newDirection = 'desc';
				} else if (context.sortDirection === 'desc') {
					newDirection = 'none';
				} else {
					newDirection = 'asc';
				}
			} else {
				// New column, start with ascending
				newDirection = 'asc';
			}

			context.sortColumn = columnIndex;
			context.sortDirection = newDirection;

			// Get the table element and sort
			const tableWrapper = ref.closest('.wp-block-prc-block-table');
			if (!tableWrapper) return;

			sortTable(tableWrapper, columnIndex, newDirection);
		},

		/**
		 * Handle mobile sort dropdown change
		 * @param {Event} event - The change event from the select element
		 */
		onMobileSortChange: (event) => {
			const { ref } = getElement();
			if (!ref) return;

			const context = getContext();

			// If empty selection, reset to original order
			if (event.target.value === '') {
				context.sortColumn = null;
				context.sortDirection = 'none';

				const tableWrapper = ref.closest('.wp-block-prc-block-table');
				if (tableWrapper) {
					sortTable(tableWrapper, 0, 'none');
				}
				return;
			}

			const columnIndex = parseInt(event.target.value, 10);

			// Set default direction to ascending for new column
			const newDirection =
				context.sortColumn === columnIndex
					? context.sortDirection
					: 'asc';

			context.sortColumn = columnIndex;
			context.sortDirection =
				newDirection === 'none' ? 'asc' : newDirection;

			const tableWrapper = ref.closest('.wp-block-prc-block-table');
			if (tableWrapper) {
				sortTable(tableWrapper, columnIndex, context.sortDirection);
			}
		},

		/**
		 * Toggle sort direction via mobile button
		 */
		onMobileSortDirectionToggle: () => {
			const context = getContext();
			const { ref } = getElement();

			if (!ref || context.sortColumn === null) return;

			// Toggle between asc and desc
			const newDirection =
				context.sortDirection === 'asc' ? 'desc' : 'asc';
			context.sortDirection = newDirection;

			const tableWrapper = ref.closest('.wp-block-prc-block-table');
			if (tableWrapper) {
				sortTable(tableWrapper, context.sortColumn, newDirection);
			}
		},
	},
	callbacks: {
		/**
		 * Initialize the table - store original row indices
		 */
		onInit: () => {
			const { ref } = getElement();

			if (!ref) return;

			const tbody = ref.querySelector('tbody');
			if (!tbody) return;

			// Store original row indices for reset functionality
			const rows = tbody.querySelectorAll('tr');
			rows.forEach((row, index) => {
				row.setAttribute('data-original-index', index.toString());
			});
		},
	},
});
