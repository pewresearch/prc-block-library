/**
 * Half-up rounding and plain-text parsing for table cell display/sort.
 * Aligns with `view.js` `parseValue` (plain text from `textContent` / `data-sort-value`) for sort parity.
 */

import type { SectionName } from '../block-attributes';

export type PlainTextSortResult = {
	value: number | string;
	isNumeric: boolean;
};

/**
 * Strip HTML tags and return visible text. Regex-based so it runs in Node (Jest) without DOM.
 * Sufficient for typical table cell markup; matches `view.js` cell text after tag stripping.
 * @param html
 */
export function stripHtmlToPlain(html: string): string {
	return html.replace(/<[^>]*>/g, '');
}

/**
 * Round half away from zero at `decimalPlaces` fractional digits (same family as `toFixed` for positive numbers).
 *
 * @param value         Numeric value to round.
 * @param decimalPlaces 0–10 inclusive.
 */
export function roundHalfUp(value: number, decimalPlaces: number): string {
	if (decimalPlaces < 0 || decimalPlaces > 10) {
		throw new RangeError(
			'roundHalfUp: decimalPlaces must be between 0 and 10'
		);
	}
	const factor = 10 ** decimalPlaces;
	const shifted = value * factor;
	const rounded = Math.round(shifted);
	const result = rounded / factor;
	return result.toFixed(decimalPlaces);
}

/**
 * @param text - Already plain text (no HTML).
 */
function parseDate(text: string): number | null {
	if (!text || text.length < 6) {
		return null;
	}

	const isoMatch = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
	if (isoMatch) {
		const date = new Date(
			parseInt(isoMatch[1], 10),
			parseInt(isoMatch[2], 10) - 1,
			parseInt(isoMatch[3], 10)
		);
		if (!isNaN(date.getTime())) {
			return date.getTime();
		}
	}

	const slashMatch = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
	if (slashMatch) {
		const first = parseInt(slashMatch[1], 10);
		const second = parseInt(slashMatch[2], 10);
		const year = parseInt(slashMatch[3], 10);

		let month: number;
		let day: number;
		if (first > 12) {
			day = first;
			month = second;
		} else {
			month = first;
			day = second;
		}

		const date = new Date(year, month - 1, day);
		if (!isNaN(date.getTime())) {
			return date.getTime();
		}
	}

	const parsed = Date.parse(text);
	if (!isNaN(parsed) && !/^\d+$/.test(text)) {
		return parsed;
	}

	return null;
}

/**
 * @param text - Already plain text (no HTML).
 */
function parseDuration(text: string): number | null {
	const match = text.match(
		/^\s*(?:(\d+)\s*(?:h|hr)s?)?\s*(?:(\d+)\s*(?:m|min)s?)?\s*$/i
	);
	if (!match) {
		return null;
	}
	const hours = match[1] ? parseInt(match[1], 10) : 0;
	const minutes = match[2] ? parseInt(match[2], 10) : 0;
	if (hours === 0 && minutes === 0) {
		return null;
	}
	return hours * 60 + minutes;
}

/**
 * Parse **plain** cell text for sorting — same order and rules as `view.js` `parseValue`.
 *
 * @param plainText - Trimmed plain text (no tags).
 */
export function parsePlainTextForSort(plainText: string): PlainTextSortResult {
	const text = plainText.trim();

	const dateValue = parseDate(text);
	if (dateValue !== null) {
		return { value: dateValue, isNumeric: true };
	}

	const durationValue = parseDuration(text);
	if (durationValue !== null) {
		return { value: durationValue, isNumeric: true };
	}

	const cleanedText = text
		.replace(/[$€£¥,]/g, '')
		.replace(/%$/, '')
		.trim();

	const num = parseFloat(cleanedText);

	if (!isNaN(num) && isFinite(num)) {
		return { value: num, isNumeric: true };
	}

	return { value: text.toLowerCase(), isNumeric: false };
}

/**
 * Parse HTML cell content for sort (strips tags first).
 * @param html
 */
export function parseCellHtmlForSort(html: string): PlainTextSortResult {
	return parsePlainTextForSort(stripHtmlToPlain(html));
}

/**
 * Numeric sort scalar for plain text: `null` when not a simple numeric path (dates/durations return their numeric value).
 * For full comparison behavior use {@link parsePlainTextForSort}.
 *
 * @param      plainText
 * @deprecated Prefer `parsePlainTextForSort` for parity with `view.js`.
 */
export function parseNumericForSort(plainText: string): number | null {
	const { value, isNumeric } = parsePlainTextForSort(plainText);
	if (!isNumeric) {
		return null;
	}
	return typeof value === 'number' ? value : null;
}

/**
 * Parse a value suitable for half-up decimal rounding (excludes dates and durations).
 * @param plain
 */
export function parseFloatingNumberForRounding(
	plain: string
): { num: number; hasPercent: boolean } | null {
	const t = plain.trim();
	if (!t) {
		return null;
	}
	if (parseDate(t) !== null) {
		return null;
	}
	if (parseDuration(t) !== null) {
		return null;
	}
	const cleaned = t
		.replace(/[$€£¥,]/g, '')
		.replace(/%$/, '')
		.trim();
	const num = parseFloat(cleaned);
	if (isNaN(num) || !isFinite(num)) {
		return null;
	}
	const hasPercent = /%$/.test(t);
	return { num, hasPercent };
}

/**
 * Phase A: plain text / no child elements in HTML string only.
 * Returns `null` when rounding should not change display (rich HTML, dates, durations, non-numeric).
 * @param html
 * @param decimalPlaces
 */
export function roundPlainHtmlTextForDisplay(
	html: string,
	decimalPlaces: number
): string | null {
	if (decimalPlaces < 1 || decimalPlaces > 10) {
		return null;
	}
	if (/<[a-z][\s\S]*>/i.test(html)) {
		return null;
	}
	const plain = stripHtmlToPlain(html).trim();
	if (!plain) {
		return null;
	}
	const parsed = parseFloatingNumberForRounding(plain);
	if (!parsed) {
		return null;
	}
	const out = roundHalfUp(parsed.num, decimalPlaces);
	return parsed.hasPercent ? `${out}%` : out;
}

/**
 * Editor preview: same Phase A rules as the front end for body/footer cells.
 * @param html
 * @param sectionName
 * @param vColIndex
 * @param columnRoundDecimals
 * @param cellRoundDecimals
 */
export function getEditorCellDisplayContent(
	html: string,
	sectionName: SectionName,
	vColIndex: number,
	columnRoundDecimals: (number | null)[] | undefined,
	cellRoundDecimals: number | undefined
): string {
	if (sectionName === 'head') {
		return html;
	}
	let effective: number | null = null;
	if (
		typeof cellRoundDecimals === 'number' &&
		cellRoundDecimals >= 1 &&
		cellRoundDecimals <= 10
	) {
		effective = cellRoundDecimals;
	} else if (
		columnRoundDecimals &&
		typeof columnRoundDecimals[vColIndex] === 'number' &&
		columnRoundDecimals[vColIndex]! >= 1 &&
		columnRoundDecimals[vColIndex]! <= 10
	) {
		effective = columnRoundDecimals[vColIndex] as number;
	}
	if (effective === null) {
		return html;
	}
	const rounded = roundPlainHtmlTextForDisplay(html, effective);
	return rounded !== null ? rounded : html;
}
