/**
 * Internal dependencies
 */
import {
	getEditorCellDisplayContent,
	parseCellHtmlForSort,
	parseFloatingNumberForRounding,
	parseNumericForSort,
	parsePlainTextForSort,
	roundHalfUp,
	roundPlainHtmlTextForDisplay,
	stripHtmlToPlain,
} from '../round-display';

describe('round-display', () => {
	describe('roundHalfUp', () => {
		it('matches spec examples', () => {
			expect(roundHalfUp(2.016, 2)).toBe('2.02');
			expect(roundHalfUp(2.016, 1)).toBe('2.0');
		});

		it('handles zero decimal places', () => {
			expect(roundHalfUp(2.6, 0)).toBe('3');
		});

		it('handles negative numbers (half away from zero)', () => {
			expect(roundHalfUp(-2.016, 2)).toBe('-2.02');
		});

		it('throws when decimalPlaces out of range', () => {
			expect(() => roundHalfUp(1, 11)).toThrow(RangeError);
			expect(() => roundHalfUp(1, -1)).toThrow(RangeError);
		});
	});

	describe('stripHtmlToPlain', () => {
		it('removes tags', () => {
			expect(stripHtmlToPlain('<p>2.016</p>')).toBe('2.016');
			expect(
				stripHtmlToPlain('<strong>1</strong><span>,</span>234.5')
			).toBe('1,234.5');
		});
	});

	describe('parsePlainTextForSort', () => {
		it('parses numbers with commas, currency, and percent', () => {
			expect(parsePlainTextForSort('1,234.56')).toStrictEqual({
				value: 1234.56,
				isNumeric: true,
			});
			expect(parsePlainTextForSort('12%')).toStrictEqual({
				value: 12,
				isNumeric: true,
			});
			expect(parsePlainTextForSort('$10.5')).toStrictEqual({
				value: 10.5,
				isNumeric: true,
			});
		});

		it('parses ISO dates as timestamps', () => {
			const r = parsePlainTextForSort('2024-01-15');
			expect(r.isNumeric).toBe(true);
			expect(typeof r.value).toBe('number');
		});

		it('parses duration as minutes', () => {
			expect(parsePlainTextForSort('13h 15m')).toStrictEqual({
				value: 13 * 60 + 15,
				isNumeric: true,
			});
		});

		it('returns lowercase string when not numeric', () => {
			expect(parsePlainTextForSort('Hello')).toStrictEqual({
				value: 'hello',
				isNumeric: false,
			});
		});
	});

	describe('parseCellHtmlForSort', () => {
		it('strips HTML before parsing', () => {
			expect(parseCellHtmlForSort('<td>2.016</td>')).toStrictEqual({
				value: 2.016,
				isNumeric: true,
			});
		});
	});

	describe('parseNumericForSort', () => {
		it('returns number for numeric plain text', () => {
			expect(parseNumericForSort('2.016')).toBe(2.016);
		});

		it('returns null for non-numeric text', () => {
			expect(parseNumericForSort('n/a')).toBeNull();
		});
	});

	describe('parseFloatingNumberForRounding', () => {
		it('parses plain numbers and percent', () => {
			expect(parseFloatingNumberForRounding('2.016')).toStrictEqual({
				num: 2.016,
				hasPercent: false,
			});
			expect(parseFloatingNumberForRounding('12%')).toStrictEqual({
				num: 12,
				hasPercent: true,
			});
		});

		it('returns null for dates and durations', () => {
			expect(parseFloatingNumberForRounding('2024-01-15')).toBeNull();
			expect(parseFloatingNumberForRounding('13h 15m')).toBeNull();
		});
	});

	describe('roundPlainHtmlTextForDisplay', () => {
		it('rounds plain numeric cell text', () => {
			expect(roundPlainHtmlTextForDisplay('2.016', 2)).toBe('2.02');
		});

		it('returns null when HTML tags are present (Phase A)', () => {
			expect(
				roundPlainHtmlTextForDisplay('<strong>2.016</strong>', 2)
			).toBe(null);
		});
	});

	describe('getEditorCellDisplayContent', () => {
		it('never rounds header cells', () => {
			expect(
				getEditorCellDisplayContent('2.016', 'head', 0, [2], undefined)
			).toBe('2.016');
		});

		it('applies column rounding for body when cell not overriding', () => {
			expect(
				getEditorCellDisplayContent('2.016', 'body', 0, [2], undefined)
			).toBe('2.02');
		});
	});
});
