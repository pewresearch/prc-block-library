/**
 * External Dependencies
 */
import type { PropertyValue } from 'csstype';
import TurndownService from 'turndown';

const DEFAULT_PRECISION: number = 4;

// Array with four values for CSS
export type FourCssValues = [string, string, string, string];

// sanitizeUnitValue function option
interface SanitizeOptions {
	minNum?: number;
	maxNum?: number;
	precision?: number;
}

/**
 * Removed falsy values from nested object.
 *
 * @param object Nested object.
 * @return Object cleaned from falsy values.
 */
export function cleanEmptyObject(object: {}): {} | undefined {
	if (
		object === null ||
		typeof object !== 'object' ||
		Array.isArray(object)
	) {
		return object;
	}

	const cleanedNestedObjects = Object.entries(object)
		.map(([key, value]) => [key, cleanEmptyObject(value)])
		.filter(([, value]) => value !== undefined);
	return !cleanedNestedObjects.length
		? undefined
		: Object.fromEntries(cleanedNestedObjects);
}

/**
 * Convert short-hand/long-hand CSS values into an array with four values.
 *
 * @param cssValue CSS value.
 * @return Array with four values.
 */
export function parseCssValue(cssValue: string): FourCssValues {
	const cssValues: string[] = cssValue
		.split(' ')
		.map((value: string) => value.toLowerCase());

	switch (cssValues.length) {
		case 1:
			return [cssValues[0], cssValues[0], cssValues[0], cssValues[0]];
		case 2:
			return [cssValues[0], cssValues[1], cssValues[0], cssValues[1]];
		case 3:
			return [cssValues[0], cssValues[1], cssValues[2], cssValues[1]];
		case 4:
			return [cssValues[0], cssValues[1], cssValues[2], cssValues[3]];
		default:
			return ['', '', '', ''];
	}
}

/**
 * Sanitize the value of UnitControl.
 *
 * @param initialValue      UnitControl value.
 * @param options           Sanitize options.
 * @param options.minNum    Minimum number.
 * @param options.maxNum    Minimum number.
 * @param options.precision Precision.
 * @return Sanitized UnitControl value.
 */
export function sanitizeUnitValue(
	initialValue: PropertyValue<string | number> | undefined,
	options?: SanitizeOptions
): string {
	const value: string = String(initialValue).trim();
	let num: number = parseFloat(value);

	if (isNaN(num)) {
		return '';
	} else if (num < 0) {
		return '';
	} else if (num === 0) {
		return '0';
	}

	// Sanitize value.
	if (options?.minNum) {
		num = Math.max(options.minNum, num);
	}

	if (options?.maxNum) {
		num = Math.min(options.maxNum, num);
	}

	const modifier = 10 ** (options?.precision || DEFAULT_PRECISION);
	num = Math.round(num * modifier) / modifier;

	const unit: string = value.match(/[\d.\-+]*\s*(.*)/)?.[1] ?? '';

	return `${num}${unit.toLowerCase()}`;
}

/**
 * Parses a number and unit from a value.
 *
 * @param initialValue Value to parse
 * @return The extracted number and unit.
 */
export function parseUnit(initialValue: string): [number, string] {
	const value: string = String(initialValue).trim();
	const num: number = parseFloat(value);

	if (isNaN(num)) {
		return [0, ''];
	}

	const unit: string = value.match(/[\d.\-+]*\s*(.*)/)?.[1] ?? '';

	return [num, unit.toLowerCase()];
}

// Convert string to number.
// JSDoc is not used because parsing in eslint fails
export function toInteger(
	value: number | string | undefined,
	defaultValue = 0
): number {
	if (!value) {
		return defaultValue;
	}

	const converted = parseInt(String(value), 10);

	if (isNaN(converted)) {
		return defaultValue;
	}

	return converted || defaultValue;
}

/**
 * Normalize the rowspan/colspan value.
 * Returns undefined if the parameter is not a positive number
 * or the default value (1) for rowspan/colspan.
 *
 * @param rowColSpan rowspan/colspan value.
 * @return normalized rowspan/colspan value.
 */
export function normalizeRowColSpan(rowColSpan: any) {
	const parsedValue = parseInt(rowColSpan, 10);
	if (!Number.isInteger(parsedValue)) {
		return undefined;
	}
	return parsedValue < 0 || parsedValue === 1
		? undefined
		: parsedValue.toString();
}

/**
 * Table cell interface for virtual table rendering.
 */
interface TableCell {
	content: string;
	tag: 'th' | 'td';
	isHidden: boolean;
}

/**
 * Table row interface for virtual table rendering.
 */
interface TableRow {
	cells: TableCell[];
}

/**
 * Table attributes interface for virtual table rendering.
 */
interface TableAttributes {
	head?: TableRow[];
	body?: TableRow[];
	foot?: TableRow[];
	[key: string]: TableRow[] | undefined;
}

/**
 * Create a virtual table.
 *
 * @param tableAttributes - The table attributes to create a virtual table from.
 * @return The virtual table.
 */
export function createVirtualTable(tableAttributes: TableAttributes): string {
	let html = '<table>';

	// Helper to render a section (head, body, foot)
	const renderSection = (sectionName: keyof TableAttributes): string => {
		const rows = tableAttributes[sectionName];
		if (!rows || rows.length === 0) return '';
		let tag: string;
		if (sectionName === 'head') {
			tag = 'thead';
		} else if (sectionName === 'body') {
			tag = 'tbody';
		} else {
			tag = 'tfoot';
		}
		return `<${tag}>${rows
			.map(
				(row) =>
					`<tr>${row.cells
						.filter((cell) => !cell.isHidden)
						.map(
							(cell) =>
								`<${cell.tag}>${cell.content}</${cell.tag}>`
						)
						.join('')}</tr>`
			)
			.join('')}</${tag}>`;
	};

	html += renderSection('head');
	html += renderSection('body');
	html += renderSection('foot');
	html += '</table>';
	return html;
}

/**
 * Convert the table to markdown.
 *
 * @param tableAttributes - The table attributes to convert.
 * @return The markdown representation of the table.
 */
export function convertTableToMarkdown(
	tableAttributes: TableAttributes
): string {
	const html = createVirtualTable(tableAttributes);
	const turndownService = new TurndownService();
	const markdown = turndownService.turndown(html);
	return markdown;
}

/**
 * Interface for the result of convertMarkdownToTable.
 */
interface MarkdownToTableResult {
	data: TableAttributes;
	text: {
		before: string;
		after: string;
	};
}

/**
 * Convert markdown table to vTable attributes.
 *
 * @param markdown - The markdown to convert.
 * @return The table attributes.
 */
export function convertMarkdownToTable(
	markdown: string
): MarkdownToTableResult | null {
	// Split the content into lines
	const lines: string[] = markdown.split('\n');

	// Variables to store text before and after the table
	const preTableText: string[] = [];
	const postTableText: string[] = [];
	let tableLines: string[] = [];
	let isInTable = false;
	let tableEnded = false;

	// Process each line to separate table and text
	for (const line of lines) {
		// Detect table start by looking for a line with | characters
		if (!isInTable && line.includes('|') && line.trim().startsWith('|')) {
			isInTable = true;
			tableLines.push(line);
			continue;
		}

		// If we're in the table and find a line without |, table has ended
		if (
			isInTable &&
			(!line.includes('|') || !line.trim().startsWith('|'))
		) {
			isInTable = false;
			tableEnded = true;
		}

		// Add lines to appropriate arrays
		if (isInTable) {
			tableLines.push(line);
		} else if (!tableEnded) {
			if (line.trim()) preTableText.push(line);
		} else if (line.trim()) postTableText.push(line);
	}

	// Filter out empty lines from the table
	tableLines = tableLines.filter((line) => line.trim());

	if (tableLines.length < 3) {
		return null; // Not enough lines for a valid table
	}

	// Parse header row
	const headerCells: TableCell[] = tableLines[0]
		.split('|')
		.filter((cell) => cell.trim())
		.map((cell) => ({
			content: cell.trim(),
			tag: 'th',
			isHidden: false,
		}));

	// Skip separator row (line with dashes)

	// Parse body rows
	const bodyRows: TableRow[] = tableLines.slice(2).map((line) => ({
		cells: line
			.split('|')
			.filter((cell) => cell.trim())
			.map((cell) => ({
				content: cell.trim(),
				tag: 'td',
				isHidden: false,
			})),
	}));

	// Combine pre and post text
	const textContent = {
		before: preTableText.join('\n').trim(),
		after: postTableText.join('\n').trim(),
	};

	return {
		data: {
			head: [
				{
					cells: headerCells,
				},
			],
			body: bodyRows,
			foot: [], // No footer in this markdown table
		},
		text: textContent,
	};
}
