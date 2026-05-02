/**
 * Internal dependencies
 */
import {
	normalizeBlockAttributes,
	normalizeCellPersistedFields,
	normalizeRoundDecimalsValue,
	stripAutoManagedCellClassNames,
} from '../table-attribute-normalize';

describe('table-attribute-normalize', () => {
	describe('stripAutoManagedCellClassNames', () => {
		it('removes is-sortable and is-column-hidden tokens', () => {
			expect(
				stripAutoManagedCellClassNames(
					'is-sortable is-sortable foo is-column-hidden'
				)
			).toBe('foo');
		});
	});

	describe('normalizeRoundDecimalsValue', () => {
		it('coerces numeric strings', () => {
			expect(normalizeRoundDecimalsValue('2')).toBe(2);
		});

		it('returns undefined for invalid values', () => {
			expect(normalizeRoundDecimalsValue('99')).toBeUndefined();
			expect(normalizeRoundDecimalsValue('')).toBeUndefined();
		});
	});

	describe('normalizeCellPersistedFields', () => {
		it('flags change when class had auto-managed tokens', () => {
			const { cell, changed } = normalizeCellPersistedFields({
				content: 'x',
				tag: 'td',
				className: 'is-sortable is-sortable custom',
			});
			expect(changed).toBe(true);
			expect(cell.className).toBe('custom');
		});
	});

	describe('normalizeBlockAttributes', () => {
		it('returns null when nothing to fix', () => {
			expect(
				normalizeBlockAttributes({
					head: [],
					body: [
						{
							cells: [
								{
									content: 'a',
									tag: 'td',
								},
							],
						},
					],
					foot: [],
				} as any)
			).toBeNull();
		});

		it('returns patch when header has duplicate is-sortable', () => {
			const patch = normalizeBlockAttributes({
				head: [
					{
						cells: [
							{
								content: 'h',
								tag: 'th',
								className: 'is-sortable is-sortable',
							},
						],
					},
				],
				body: [],
				foot: [],
			} as any);
			expect(patch?.head?.[0]?.cells?.[0]?.className).toBeUndefined();
		});
	});
});
