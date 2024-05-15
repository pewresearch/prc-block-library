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

export default function handleCSV(files, attributes, setAttributes) {
	// eslint-disable-next-line no-undef
	const reader = new FileReader();
	reader.onload = () => {
		parseCSV(reader.result, attributes, setAttributes);
	};
	Array.from(files).forEach((file) => reader.readAsBinaryString(file));
}
