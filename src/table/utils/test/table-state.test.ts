/**
 * Internal dependencies
 */
import {
	createTable,
	deleteColumn,
	deleteRow,
	insertRow,
	type VTable,
	type VRow,
	type VCell,
} from '../table-state';
import type { SectionName } from '../../block-attributes';

const getRow = (
	cells: number,
	sectionName: SectionName,
	rowIndex: number,
	tag: 'th' | 'td',
	content = '',
	options = {}
): VRow => {
	return {
		cells: Array.from({ length: cells }).map((_, vColIndex): VCell => {
			return {
				content,
				tag,
				rowIndex,
				vColIndex,
				sectionName,
				rowSpan: 1,
				colSpan: 1,
				isHidden: false,
				isFirstSelected: false,
				...options,
			};
		}),
	};
};

const table: VTable = {
	head: [getRow(3, 'head', 0, 'th', 'head')],
	body: [
		getRow(3, 'body', 0, 'td', 'body-0'),
		getRow(3, 'body', 1, 'td', 'body-1'),
		getRow(3, 'body', 2, 'td', 'body-2'),
	],
	foot: [getRow(3, 'foot', 0, 'td', 'foot')],
};

describe('table-state', () => {
	describe('createTable', () => {
		it('should create the right virtual table', () => {
			expect(
				createTable({
					rowCount: 3,
					colCount: 3,
					headerSection: false,
					footerSection: false,
				})
			).toStrictEqual({
				head: [],
				body: [
					getRow(3, 'body', 0, 'td'),
					getRow(3, 'body', 1, 'td'),
					getRow(3, 'body', 2, 'td'),
				],
				foot: [],
			});
		});

		it('should create virtual table with head and foot', () => {
			expect(
				createTable({
					rowCount: 3,
					colCount: 3,
					headerSection: true,
					footerSection: true,
				})
			).toStrictEqual({
				head: [getRow(3, 'head', 0, 'th')],
				body: [
					getRow(3, 'body', 0, 'td'),
					getRow(3, 'body', 1, 'td'),
					getRow(3, 'body', 2, 'td'),
				],
				foot: [getRow(3, 'foot', 0, 'td')],
			});
		});
	});

	describe('insertRow', () => {
		it('should return the table with the correct number of rows', () => {
			expect(
				insertRow({ ...table }, { sectionName: 'body', rowIndex: 1 })
			).toStrictEqual({
				head: [getRow(3, 'head', 0, 'th', 'head')],
				body: [
					getRow(3, 'body', 0, 'td', 'body-0'),
					getRow(3, 'body', 1, 'td', ''),
					getRow(3, 'body', 2, 'td', 'body-1'),
					getRow(3, 'body', 3, 'td', 'body-2'),
				],
				foot: [getRow(3, 'foot', 0, 'td', 'foot')],
			});
			expect(
				insertRow({ ...table }, { sectionName: 'body', rowIndex: 3 })
			).toStrictEqual({
				head: [getRow(3, 'head', 0, 'th', 'head')],
				body: [
					getRow(3, 'body', 0, 'td', 'body-0'),
					getRow(3, 'body', 1, 'td', 'body-1'),
					getRow(3, 'body', 2, 'td', 'body-2'),
					getRow(3, 'body', 3, 'td', ''),
				],
				foot: [getRow(3, 'foot', 0, 'td', 'foot')],
			});
		});
	});

	describe('deleteRow', () => {
		it('should return the table with the correct number of rows', () => {
			expect(
				deleteRow({ ...table }, { sectionName: 'body', rowIndex: 0 })
			).toStrictEqual({
				head: [getRow(3, 'head', 0, 'th', 'head')],
				body: [
					getRow(3, 'body', 0, 'td', 'body-1'),
					getRow(3, 'body', 1, 'td', 'body-2'),
				],
				foot: [getRow(3, 'foot', 0, 'td', 'foot')],
			});
			expect(
				deleteRow({ ...table }, { sectionName: 'body', rowIndex: 1 })
			).toStrictEqual({
				head: [getRow(3, 'head', 0, 'th', 'head')],
				body: [
					getRow(3, 'body', 0, 'td', 'body-0'),
					getRow(3, 'body', 1, 'td', 'body-2'),
				],
				foot: [getRow(3, 'foot', 0, 'td', 'foot')],
			});
		});
	});

	describe('deleteColumn', () => {
		it('should return the table with the correct number of columns', () => {
			expect(deleteColumn({ ...table }, { vColIndex: 0 })).toStrictEqual({
				head: [getRow(2, 'head', 0, 'th', 'head')],
				body: [
					getRow(2, 'body', 0, 'td', 'body-0'),
					getRow(2, 'body', 1, 'td', 'body-1'),
					getRow(2, 'body', 2, 'td', 'body-2'),
				],
				foot: [getRow(2, 'foot', 0, 'td', 'foot')],
			});
			expect(deleteColumn({ ...table }, { vColIndex: 2 })).toStrictEqual({
				head: [getRow(2, 'head', 0, 'th', 'head')],
				body: [
					getRow(2, 'body', 0, 'td', 'body-0'),
					getRow(2, 'body', 1, 'td', 'body-1'),
					getRow(2, 'body', 2, 'td', 'body-2'),
				],
				foot: [getRow(2, 'foot', 0, 'td', 'foot')],
			});
		});
	});
});
