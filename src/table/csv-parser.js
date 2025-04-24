/**
 * External Dependencies
 */
import CSV from 'comma-separated-values';

/**
 * Utilities for managing core/table data
 */

function convertToRow(d, tag = 'td') {
	return d.map((content) => ({
		content,
		tag,
	}));
}

function convertJSONToAttributes(d, tag = 'td') {
	if ('th' === tag) {
		return convertToRow(d, tag);
	}
	return d.map((row) => ({ cells: convertToRow(row, tag) }));
}

function parseCSV(csvInput, attributes, setAttributes) {
	const opts = {
		header: false,
	};
	const csv = new CSV(csvInput, opts);
	const parsed = csv.parse();

	const headerData = convertJSONToAttributes(parsed.shift(), 'th');
	const bodyData = convertJSONToAttributes(parsed);
	setAttributes({ body: bodyData });
	setAttributes({ head: [{ cells: headerData }] });

	return parsed;
}

export function exportCSV(attributes) {
	const { body, head, footer } = attributes;
	// Restructure body, head, and footer to reduce their body.cells to just each cell's content
	const bodyData = body.map((row) => row.cells.map((cell) => cell.content));
	const headData = head
		? head.map((row) => row.cells.map((cell) => cell.content))
		: [];
	const footerData = footer
		? footer.map((row) => row.cells.map((cell) => cell.content))
		: [];
	const data = [...headData, ...bodyData, ...footerData];
	const csv = new CSV(data);
	return csv.encode();
}

export function handleCSV(files, attributes, setAttributes) {
	// eslint-disable-next-line no-undef
	const reader = new FileReader();
	reader.onload = () => {
		parseCSV(reader.result, attributes, setAttributes);
	};
	Array.from(files).forEach((file) => reader.readAsBinaryString(file));
}
