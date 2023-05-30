/**
 * External Dependencies
 */
import CSV from 'comma-separated-values';

/**
 * WordPress Dependencies
 */
import { Fragment, useRef } from '@wordpress/element';
import { BaseControl, Button, DropZone } from '@wordpress/components';

/**
 * Utilities for managing core/table data
 */

function parseCSV(csvInput, setAttributes) {
	const opts = {
		header: true,
	};
	const csv = new CSV(csvInput, opts);
	const parsed = csv.parse();

	console.log(parsed);

	// Create a colHeaders const from the keys of the objects in the first row of parsed
	const colHeaders = Object.keys(parsed[0]);
	// remove the keys from the objects in each row in parsed and make them an array, if the value is empty then make it an empty string.
	const newData = parsed.map((row) =>
		Object.values(row).map((value) => (value === undefined ? '' : value))
	);

	const newAttributes = {
		data: newData,
		colHeaders,
	};

	console.log("TO INIT:", newAttributes);

	setAttributes(newAttributes);

	return parsed;
}

function handleCSV(files, setAttributes) {
	// eslint-disable-next-line no-undef
	const reader = new FileReader();
	reader.onload = () => {
		parseCSV(reader.result, setAttributes);
	};
	Array.from(files).forEach((file) => reader.readAsBinaryString(file));
}

export default function CSVImport({ setAttributes }) {
	const hiddenFileInput = useRef(null);

	return (
		<BaseControl
			id="csv-import"
			help="Import a CSV file to populate the table. The first row will be used as column headers. You can also drag and drop a CSV file here."
		>
			<Button
				variant="primary"
				onClick={() => {
					hiddenFileInput.current.click();
				}}
			>
				CSV Import
			</Button>
			<input
				ref={hiddenFileInput}
				type="file"
				accept="text/csv"
				onChange={(e) => handleCSV(e.target.files, setAttributes)}
				style={{ display: 'none' }}
			/>
			<DropZone
				onFilesDrop={(droppedFiles) =>
					handleCSV(droppedFiles, setAttributes)
				}
			/>
		</BaseControl>
	);
}
