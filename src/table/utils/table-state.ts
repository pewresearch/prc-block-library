/**
 * External Dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal dependencies
 */
import { convertToInline, convertToObject } from './style-converter';
import {
	updateBorderColor,
	updateBorderRadius,
	updateBorderStyle,
	updateBorderWidth,
	updatePadding,
} from './style-updater';
import { toInteger } from './helper';
import type {
	CellTagValue,
	CellScopeValue,
	Cell,
	Row,
	SectionName,
	TableAttributes,
} from '../block-attributes';

// Virtual table
export type VTable = Record<SectionName, VRow[]>;

// Virtual table section type
type VSection = VRow[];

// Virtual table row state
export interface VRow {
	cells: VCell[];
}

// Virtual table cell state
export interface VCell extends Omit<Cell, 'rowSpan' | 'colSpan'> {
	rowSpan: number;
	colSpan: number;
	sectionName: SectionName;
	rowIndex: number;
	vColIndex: number;
	isHidden: boolean;
	isFirstSelected?: boolean;
	isFilled?: boolean;
}

// Virtual table selected line state
export type VSelectedLine =
	| { sectionName: SectionName; rowIndex: number }
	| { vColIndex: number }
	| undefined;

// Virtual table selected cells state
export type VSelectedCells = VCell[] | undefined;

// Minimum / maximum row / column virtual indexes on virtual table
interface VRangeIndexes {
	minRowIndex: number;
	maxRowIndex: number;
	minColIndex: number;
	maxColIndex: number;
}

/**
 * Creates a table state.
 *
 * @param options
 * @param options.rowCount      Row count for the table to create.
 * @param options.colCount      Column count for the table to create.
 * @param options.headerSection With/without header section.
 * @param options.footerSection With/without footer section.
 * @return New virtual table state.
 */
export function createTable({
	rowCount,
	colCount,
	headerSection,
	footerSection,
}: {
	rowCount: number;
	colCount: number;
	headerSection: boolean;
	footerSection: boolean;
}) {
	const createSection = (
		rows: number,
		cols: number,
		sectionName: SectionName
	): VSection => {
		return Array.from({ length: rows }).map(
			(_row, rowIndex): VRow => ({
				cells: Array.from({ length: cols }).map(
					(_col, vColIndex): VCell => ({
						content: '',
						tag: sectionName === 'head' ? 'th' : 'td',
						rowSpan: 1,
						colSpan: 1,
						sectionName,
						rowIndex,
						vColIndex,
						isFirstSelected: false,
						isHidden: false,
					})
				),
			})
		);
	};

	return {
		head: createSection(Number(headerSection), colCount, 'head'),
		body: createSection(rowCount, colCount, 'body'),
		foot: createSection(Number(footerSection), colCount, 'foot'),
	};
}

/**
 * Inserts a row in the virtual table state.
 *
 * @param vTable              Virtual table in which to insert the row.
 * @param options
 * @param options.sectionName Section in which to insert the row.
 * @param options.rowIndex    Row index at which to insert the row.
 * @return  New virtual table state.
 */

export function insertRow(
	vTable: VTable,
	{ sectionName, rowIndex }: { sectionName: SectionName; rowIndex: number }
): VTable {
	// Number of columns in the row to be inserted.
	const newRowColCount: number = vTable.body[0].cells.length;

	const vRows: VRow[] = toVirtualRows(vTable);

	// Row state to be inserted.
	const newRow: VRow = {
		cells: Array.from({ length: newRowColCount }).map(
			(_, vColIndex): VCell => {
				// Find the cell with rowspan that covers the cell in the inserted row.
				const rowSpanCells: VCell[] = vRows
					.reduce(
						(cells: VCell[], row) => cells.concat(row.cells),
						[]
					)
					.filter(
						(cell: VCell) =>
							cell.sectionName === sectionName &&
							cell.rowIndex < rowIndex &&
							cell.rowIndex + cell.rowSpan - 1 >= rowIndex &&
							cell.vColIndex <= vColIndex &&
							vColIndex <= cell.vColIndex + cell.colSpan - 1
					);

				return {
					content: '',
					tag: 'head' === sectionName ? 'th' : 'td',
					rowSpan: 1,
					colSpan: 1,
					sectionName,
					rowIndex,
					vColIndex,
					isFirstSelected: false,
					isHidden: !!rowSpanCells.length,
				};
			}
		),
	};

	return {
		...vTable,
		[sectionName]: [
			...vTable[sectionName].slice(0, rowIndex),
			newRow,
			...vTable[sectionName].slice(rowIndex).map(({ cells }) => ({
				cells: cells.map((cell) => {
					// increment row index.
					return {
						...cell,
						rowIndex: cell.rowIndex + 1,
					};
				}),
			})),
		].map(({ cells }, cRowIndex) => ({
			cells: cells.map((cell) => {
				// Expand cells with rowspan in the before and inserted rows.
				if (
					cell.sectionName === sectionName &&
					cell.rowSpan > 1 &&
					cRowIndex <= rowIndex &&
					cRowIndex + cell.rowSpan - 1 >= rowIndex
				) {
					return {
						...cell,
						sectionName,
						rowIndex: cRowIndex,
						rowSpan: cell.rowSpan + 1,
					};
				}

				return cell;
			}),
		})),
	};
}

/**
 * Deletes a row from the virtual table.
 *
 * @param vTable              Virtual table in which to delete the row.
 * @param options
 * @param options.sectionName Section in which to delete the row.
 * @param options.rowIndex    Row index at which to delete the row.
 * @return  New virtual table state.
 */
export function deleteRow(
	vTable: VTable,
	{ sectionName, rowIndex }: { sectionName: SectionName; rowIndex: number }
) {
	// Find the number of rowspan cells in the row to be deleted.
	const rowSpanCellsCount: number = vTable[sectionName][
		rowIndex
	].cells.filter((cell) => cell.rowSpan > 1).length;

	// Split the found rowspan cells.
	if (rowSpanCellsCount) {
		for (let i = 0; i < rowSpanCellsCount; i++) {
			const vMergedCells: VCell[] = vTable[sectionName]
				.reduce(
					(cells: VCell[], row: VRow) => cells.concat(row.cells),
					[]
				)
				.filter(
					(cell: VCell) =>
						cell.rowSpan > 1 && cell.rowIndex === rowIndex
				);

			if (vMergedCells.length) {
				vTable = splitMergedCell(vTable, vMergedCells[0]);
			}
		}
	}

	return {
		...vTable,
		[sectionName]: vTable[sectionName].reduce(
			(newRows: VRow[], row, cRowIndex) => {
				if (cRowIndex === rowIndex) {
					return newRows;
				}

				newRows.push({
					cells: row.cells.map((cell) => {
						// Contract cells with rowspan in the before rows.
						if (
							cell.rowSpan > 1 &&
							cRowIndex < rowIndex &&
							cRowIndex + cell.rowSpan - 1 >= rowIndex
						) {
							return {
								...cell,
								rowSpan: cell.rowSpan - 1,
							};
						}

						// decrement row index.
						if (cRowIndex > rowIndex) {
							return {
								...cell,
								rowIndex: cell.rowIndex - 1,
							};
						}

						return cell;
					}),
				});
				return newRows;
			},
			[]
		),
	};
}

/**
 * Inserts a column in the virtual table.
 *
 * @param vTable            Virtual table in which to insert column.
 * @param options
 * @param options.vColIndex Virtual column index at which to insert column.
 * @return  New virtual table state.
 */
export function insertColumn(
	vTable: VTable,
	{ vColIndex }: { vColIndex: number }
): VTable {
	// Whether to add a column after the last column.
	const isLastColumnInsert: boolean =
		vTable.body[0].cells.length === vColIndex;

	const vRows: VRow[] = toVirtualRows(vTable);

	return Object.entries(vTable).reduce(
		(newVTable: VTable, [sectionName, section]) => {
			if (!section.length) {
				return newVTable;
			}
			newVTable[sectionName as SectionName] = section.map(
				({ cells }, cRowIndex) => ({
					cells: cells.reduce(
						(newCells: VCell[], cell, cVColIndex) => {
							// Expand cells with colspan in the before columns.
							if (
								cell.colSpan > 1 &&
								cVColIndex < vColIndex &&
								cVColIndex + cell.colSpan - 1 >= vColIndex
							) {
								newCells.push({
									...cell,
									colSpan: cell.colSpan + 1,
								});
								return newCells;
							}

							// Insert cell (after the last column).
							if (
								isLastColumnInsert &&
								cVColIndex + 1 === vColIndex
							) {
								newCells.push(cell, {
									content: '',
									tag: 'head' === sectionName ? 'th' : 'td',
									rowSpan: 1,
									colSpan: 1,
									sectionName: cell.sectionName,
									rowIndex: cell.rowIndex,
									vColIndex: vColIndex + 1,
									isHidden: false,
								});
								return newCells;
							}

							// Insert cell (between columns).
							if (cVColIndex === vColIndex) {
								// Whether the cell to be inserted is a virtual cell filled with colSpan.
								const colSpanCells: VCell[] = vRows
									.reduce(
										(colSpancells: VCell[], row) =>
											colSpancells.concat(row.cells),
										[]
									)
									.filter(
										(colSpancell: VCell) =>
											colSpancell.sectionName ===
												sectionName &&
											colSpancell.colSpan > 1 &&
											colSpancell.rowIndex <= cRowIndex &&
											colSpancell.rowIndex +
												colSpancell.rowSpan -
												1 >=
												cRowIndex &&
											colSpancell.vColIndex < vColIndex &&
											vColIndex <=
												colSpancell.vColIndex +
													colSpancell.colSpan -
													1
									);

								newCells.push(
									{
										content: '',
										tag:
											'head' === sectionName
												? 'th'
												: 'td',
										rowSpan: 1,
										colSpan: 1,
										sectionName: cell.sectionName,
										rowIndex: cell.rowIndex,
										vColIndex,
										isHidden: !!colSpanCells.length,
									},
									{
										...cell,
										vColIndex: vColIndex + 1,
									}
								);
								return newCells;
							}

							// increment after column vCol index.
							if (vColIndex <= cVColIndex) {
								newCells.push({
									...cell,
									vColIndex: cVColIndex + 1,
								});
								return newCells;
							}

							newCells.push(cell);
							return newCells;
						},
						[]
					),
				})
			);
			return newVTable;
		},
		{
			head: [],
			body: [],
			foot: [],
		}
	);
}

/**
 * Deletes a column from the virtual table.
 *
 * @param vTable            Virtual table in which to delete column.
 * @param options
 * @param options.vColIndex Virtual column index at which to delete column.
 * @return  New virtual table state.
 */
export function deleteColumn(
	vTable: VTable,
	{ vColIndex }: { vColIndex: number }
): VTable {
	// Find the colspan cells in the column to be deleted.
	const vRows: VRow[] = toVirtualRows(vTable);

	const colSpanCells: VCell[] = vRows
		.reduce((cells: VCell[], row) => cells.concat(row.cells), [])
		.filter(
			(cell: VCell) => cell.colSpan > 1 && cell.vColIndex === vColIndex
		);

	// Split the found colspan cells.
	if (colSpanCells.length) {
		colSpanCells.forEach(
			(cell) => (vTable = splitMergedCell(vTable, cell))
		);
	}

	return Object.entries(vTable).reduce(
		(newVTable: VTable, [sectionName, section]) => {
			if (!section.length) {
				return newVTable;
			}
			newVTable[sectionName as SectionName] = section.map(
				({ cells }) => ({
					cells: cells.reduce((newCells: VCell[], cell) => {
						// Cells to be deleted.
						if (cell.vColIndex === vColIndex) {
							return newCells;
						}

						// Contract cells with colspan in the before columns.
						if (
							cell.colSpan > 1 &&
							cell.vColIndex < vColIndex &&
							cell.vColIndex + cell.colSpan - 1 >= vColIndex
						) {
							newCells.push({
								...cell,
								colSpan: cell.colSpan - 1,
							});
							return newCells;
						}

						// decrement vCol index.
						if (cell.vColIndex > vColIndex) {
							newCells.push({
								...cell,
								vColIndex: cell.vColIndex - 1,
							});
							return newCells;
						}

						newCells.push(cell);
						return newCells;
					}, []),
				})
			);
			return newVTable;
		},
		{
			head: [],
			body: [],
			foot: [],
		}
	);
}

/**
 * Merge cells in the virtual table.
 *
 * @param vTable         Current virtual table state.
 * @param selectedCells  Current selected cells.
 * @param isMergeContent Whether keep the contents of all cells when merging cells.
 * @return New virtual table state.
 */
export function mergeCells(
	vTable: VTable,
	selectedCells: VSelectedCells,
	isMergeContent: boolean
): VTable {
	if (!selectedCells || !selectedCells.length) {
		return vTable;
	}

	const sectionName: SectionName = selectedCells[0]
		.sectionName as SectionName;

	// Create the minimum / maximum virtual indexes of the matrix from the selected cells.
	const vRangeIndexes: VRangeIndexes = getVirtualRangeIndexes(selectedCells);

	const { minRowIndex, maxRowIndex, minColIndex, maxColIndex } =
		vRangeIndexes;

	// Find the rowspan & colspan cells in selected cells.
	const rowColSpanCellsCount: number = selectedCells.filter(
		({ rowSpan, colSpan }) => rowSpan > 1 || colSpan > 1
	).length;

	// Split the found rowspan & colspan cells before merge cell.
	if (rowColSpanCellsCount) {
		for (let i = 0; i < rowColSpanCellsCount; i++) {
			const vMergedCells: VCell[] = vTable[sectionName as SectionName]
				.reduce((cells: VCell[], row) => cells.concat(row.cells), [])
				.filter(
					(cell: VCell) =>
						(cell.rowSpan > 1 || cell.colSpan > 1) &&
						minRowIndex <= cell.rowIndex &&
						maxRowIndex >= cell.rowIndex &&
						minColIndex <= cell.vColIndex &&
						maxColIndex >= cell.vColIndex
				);

			if (vMergedCells.length) {
				vTable = splitMergedCell(vTable, vMergedCells[0]);
			}
		}
	}

	// Merge the contents of the cells to be merged.
	const mergedCellsContent: string = vTable[sectionName as SectionName]
		.reduce((cells: VCell[], row: VRow) => cells.concat(row.cells), [])
		.reduce((result: string[], cell: VCell) => {
			if (
				cell.rowIndex >= minRowIndex &&
				cell.rowIndex <= maxRowIndex &&
				cell.vColIndex >= minColIndex &&
				cell.vColIndex <= maxColIndex &&
				cell.content
			) {
				result.push(cell.content);
			}
			return result;
		}, [])
		.join('<br>');

	return {
		...vTable,
		[sectionName]: vTable[sectionName as SectionName].map(
			(row, rowIndex) => {
				if (rowIndex < minRowIndex || rowIndex > maxRowIndex) {
					// Row not to be merged.
					return row;
				}

				return {
					cells: row.cells.map((cell, vColIndex) => {
						if (
							vColIndex === minColIndex &&
							rowIndex === minRowIndex
						) {
							// Cell to merge.
							return {
								...cell,
								rowSpan:
									Math.abs(maxRowIndex - minRowIndex) + 1,
								colSpan:
									Math.abs(maxColIndex - minColIndex) + 1,
								content: isMergeContent
									? mergedCellsContent
									: cell.content,
							};
						}

						// Cells to be merged (Mark as deletion).
						if (
							rowIndex >= minRowIndex &&
							rowIndex <= maxRowIndex &&
							vColIndex >= minColIndex &&
							vColIndex <= maxColIndex
						) {
							return {
								...cell,
								isHidden: true,
							};
						}

						// Cells not to be merged.
						return cell;
					}),
				};
			}
		),
	};
}

/**
 * Split selected cells in the virtual table state.
 *
 * @param vTable        Current virtual table state.
 * @param selectedCells Current selected cells.
 * @return  New virtual table state.
 */
export function splitMergedCells(
	vTable: VTable,
	selectedCells: VSelectedCells
): VTable {
	if (!selectedCells) {
		return vTable;
	}
	// Find the rowspan & colspan cells.
	const rowColSpanCells: VCell[] = selectedCells.filter(
		({ rowSpan, colSpan }) => rowSpan > 1 || colSpan > 1
	);

	// Split the found rowspan & colspan cells.
	if (rowColSpanCells.length) {
		rowColSpanCells.forEach((cell) => {
			vTable = splitMergedCell(vTable, cell);
		});
	}

	return vTable;
}

/**
 * Split single cell in the virtual table state.
 *
 * @param vTable       Current virtual table state.
 * @param selectedCell Current selected cells.
 * @return New virtual table state.
 */
export function splitMergedCell(vTable: VTable, selectedCell: VCell): VTable {
	const { sectionName, rowIndex, vColIndex, rowSpan, colSpan } = selectedCell;

	const vSection: VSection = vTable[sectionName as SectionName];

	// Split the selected cells and map them on the virtual section.
	vSection[rowIndex].cells[vColIndex] = {
		...vSection[rowIndex].cells[vColIndex],
		rowSpan: 1,
		colSpan: 1,
	};

	if (colSpan > 1) {
		for (let i = 1; i < colSpan; i++) {
			vSection[rowIndex].cells[vColIndex + i] = {
				...vSection[rowIndex].cells[vColIndex],
				content: '',
				vColIndex: vColIndex + i,
				isHidden: false,
			};
		}
	}

	if (rowSpan > 1) {
		for (let i = 1; i < rowSpan; i++) {
			vSection[rowIndex + i].cells[vColIndex] = {
				...vSection[rowIndex].cells[vColIndex],
				content: '',
				rowIndex: rowIndex + i,
				isHidden: false,
			};

			if (colSpan > 1) {
				for (let j = 1; j < colSpan; j++) {
					vSection[rowIndex + i].cells[vColIndex + j] = {
						...vSection[rowIndex].cells[vColIndex],
						content: '',
						rowIndex: rowIndex + i,
						vColIndex: vColIndex + i,
						isHidden: false,
					};
				}
			}
		}
	}

	return {
		...vTable,
		[sectionName]: vSection,
	};
}

/**
 * Update cells state( styles, tag ) of selected section.
 *
 * @param vTable              Current virtual table state.
 * @param cellState           Cell states to update.
 * @param cellState.styles    Cell styles.
 * @param cellState.tag       Cell tag.
 * @param cellState.className Cell classes.
 * @param cellState.id        Cell id.
 * @param cellState.headers   Cell headers attribute.
 * @param cellState.scope     Cell scope attribute.
 * @param selectedCells       Current selected cells.
 * @return  New virtual table state.
 */
export function updateCells(
	vTable: VTable,
	cellState: {
		styles?: any;
		tag?: CellTagValue;
		className?: string;
		id?: string;
		headers?: string;
		scope?: CellScopeValue;
	},
	selectedCells: VCell[]
): VTable {
	return Object.entries(vTable).reduce(
		(newVTable: VTable, [sectionName, section]) => {
			if (!section.length) {
				return newVTable;
			}
			newVTable[sectionName as SectionName] = section.map(
				({ cells }, cRowIndex) => ({
					cells: cells.map((cell, cVColIndex) => {
						// Refer to the selected cell to determine if it is the target cell to update.
						const isTargetCell: boolean = selectedCells.some(
							(targetCell) =>
								targetCell.sectionName === sectionName &&
								targetCell.rowIndex === cRowIndex &&
								targetCell.vColIndex === cVColIndex
						);

						if (!isTargetCell) {
							return cell;
						}

						let stylesObj: Properties = convertToObject(
							cell?.styles
						);

						if (cellState.styles) {
							stylesObj = {
								...stylesObj,
								...cellState.styles,
							};

							stylesObj = updatePadding(
								stylesObj,
								cellState.styles?.padding
							);
							stylesObj = updateBorderWidth(
								stylesObj,
								cellState.styles?.borderWidth
							);
							stylesObj = updateBorderRadius(
								stylesObj,
								cellState.styles?.borderRadius
							);
							stylesObj = updateBorderStyle(
								stylesObj,
								cellState.styles?.borderStyle
							);
							stylesObj = updateBorderColor(
								stylesObj,
								cellState.styles?.borderColor
							);
						}

						return {
							...cell,
							styles: convertToInline(stylesObj),
							tag: cellState.tag || cell.tag,
							className:
								'className' in cellState
									? cellState.className
									: cell.className,
							id: 'id' in cellState ? cellState.id : cell.id,
							headers:
								'headers' in cellState
									? cellState.headers
									: cell.headers,
							scope:
								'scope' in cellState
									? cellState.scope
									: cell.scope,
						};
					}, []),
				})
			);
			return newVTable;
		},
		{
			head: [],
			body: [],
			foot: [],
		}
	);
}

/**
 * Determines whether a virtual section is empty.
 *
 * @param section Virtual section state.
 * @return True if the virtual section is empty, false otherwise.
 */
export function isEmptySection(section: VSection): boolean {
	return (
		!section ||
		!section.length ||
		section.every(
			({ cells }: { cells: VCell[] }) => !(cells && cells.length)
		)
	);
}

/**
 * Determines whether multiple sections are selected on the virtual table.
 *
 * @param selectedCells Current selected cells.
 * @return True if multiple sections are selected, false otherwise.
 */
export function isMultiSectionSelected(selectedCells: VCell[]): boolean {
	const selectedSections: SectionName[] = selectedCells.reduce(
		(result: SectionName[], selectedCell) => {
			if (!result.includes(selectedCell.sectionName as SectionName)) {
				result.push(selectedCell.sectionName as SectionName);
			}
			return result;
		},
		[]
	);

	return selectedSections.length > 1;
}

/**
 * Create virtual table object with the cells placed in positions based on how they actually look.
 * This function is used to determine the apparent position of a cell when insert / delete row / column, or merge / split cells, etc.
 *
 * @param state Current table state.
 * @return Object of virtual table.
 */
export function toVirtualTable(state: TableAttributes): VTable {
	const { head, body, foot } = state;
	const vSections = {
		head,
		body,
		foot,
	};

	return Object.entries(vSections).reduce(
		(vTable: VTable, [sectionName, section]) => {
			if (!section.length) {
				return vTable;
			}

			// Create a virtual section array.
			const rowCount: number = section.length;
			const colCount: number = section[0].cells.reduce(
				(count: number, cell: Cell) => {
					return count + toInteger(cell.colSpan, 1);
				},
				0
			);

			const vSection: VSection = Array.from({ length: rowCount }).map(
				(_row, rowIndex): VRow => ({
					cells: Array.from({ length: colCount }).map(
						(_col, vColIndex): VCell => ({
							content: '',
							tag: 'head' === sectionName ? 'th' : 'td',
							rowSpan: 1,
							colSpan: 1,
							sectionName: sectionName as SectionName,
							isHidden: false,
							// Whether the actual cell is placed or not.
							isFilled: false,
							// Dummy indexes.
							rowIndex,
							vColIndex,
						})
					),
				})
			);

			// Mapping the actual section cells on the virtual section cell.
			section.forEach((row: Row, cRowIndex: number) => {
				row.cells.forEach((cell) => {
					// Colmun index on the virtual section excluding cells already marked as "filled".
					const vColIndex: number = vSection[
						cRowIndex
					].cells.findIndex(({ isFilled }) => !isFilled);
					const rowSpan = toInteger(cell.rowSpan, 1);
					const colSpan = toInteger(cell.colSpan, 1);

					// Mark the cell as "filled" and record the position on the virtual section.
					vSection[cRowIndex].cells[vColIndex] = {
						...cell,
						isFilled: true,
						sectionName: sectionName as SectionName,
						rowSpan,
						colSpan,
						rowIndex: cRowIndex,
						vColIndex,
						isHidden: false,
					};

					// For cells with rowspan / colspan, mark cells that are visually filled as "filled".
					// Additionaly mark it as a cell to be deleted because it does not exist in the actual section.
					if (colSpan > 1) {
						for (let i = 1; i < colSpan; i++) {
							vSection[cRowIndex].cells[vColIndex + i].isFilled =
								true;
							vSection[cRowIndex].cells[vColIndex + i].isHidden =
								true;
						}
					}
					if (rowSpan > 1) {
						for (let i = 1; i < rowSpan; i++) {
							vSection[cRowIndex + i].cells[vColIndex].isFilled =
								true;
							vSection[cRowIndex + i].cells[vColIndex].isHidden =
								true;

							if (colSpan > 1) {
								for (let j = 1; j < colSpan; j++) {
									vSection[cRowIndex + i].cells[
										vColIndex + j
									].isFilled = true;
									vSection[cRowIndex + i].cells[
										vColIndex + j
									].isHidden = true;
								}
							}
						}
					}
				});
			});

			vTable[sectionName as SectionName] = vSection;
			return vTable;
		},
		{
			head: [],
			body: [],
			foot: [],
		}
	);
}

/**
 * Remove cells from the virtual table that are not actually needed and convert them to table attributes.
 *
 * @param  vTable Current table state.
 * @return {Object} Table attributes.
 */
export function toTableAttributes(vTable: VTable): TableAttributes {
	return Object.entries(vTable).reduce(
		(newTableAttributes: TableAttributes, [sectionName, section]) => {
			if (!section.length) {
				return newTableAttributes;
			}
			newTableAttributes[sectionName as SectionName] = section.map(
				({ cells }) => ({
					cells: cells
						// Delete cells marked as deletion.
						.filter((cell) => !cell.isHidden)
						// Keep only the properties needed.
						.map((cell) => ({
							content: cell.content,
							styles: cell.styles,
							tag: cell.tag,
							className: cell.className,
							id: cell.id,
							headers: cell.headers,
							scope: cell.scope,
							rowSpan:
								cell.rowSpan > 1
									? String(cell.rowSpan)
									: undefined,
							colSpan:
								cell.colSpan > 1
									? String(cell.colSpan)
									: undefined,
						})),
				})
			);
			return newTableAttributes;
		},
		{
			head: [],
			body: [],
			foot: [],
		}
	);
}

/**
 * Create an array of rows from a virtual table by removing empty sections.
 *
 * @param vTable Current virtual table state.
 * @return virtual table rows array.
 */
export function toVirtualRows(vTable: VTable): VRow[] {
	return Object.keys(vTable).reduce((result: VRow[], sectionName) => {
		if (isEmptySection(vTable[sectionName as SectionName])) {
			return result;
		}
		result.push(...vTable[sectionName as SectionName]);
		return result;
	}, []);
}

/**
 * Get the minimum / maximum row / column virtual indexes on virtual table from selected cells.
 *
 * @param selectedCells Current selected cells.
 * @return Minimum / maximum virtual indexes.
 */
export function getVirtualRangeIndexes(selectedCells: VCell[]): VRangeIndexes {
	return selectedCells.reduce(
		({ minRowIndex, maxRowIndex, minColIndex, maxColIndex }, cell) => {
			const VRowIndex: number =
				cell.rowSpan > 1
					? cell.rowIndex + cell.rowSpan - 1
					: cell.rowIndex;
			const vColIndex: number =
				cell.colSpan > 1
					? cell.vColIndex + cell.colSpan - 1
					: cell.vColIndex;

			return {
				minRowIndex:
					minRowIndex < cell.rowIndex ? minRowIndex : cell.rowIndex,
				maxRowIndex: maxRowIndex > VRowIndex ? maxRowIndex : VRowIndex,
				minColIndex:
					minColIndex < cell.vColIndex ? minColIndex : cell.vColIndex,
				maxColIndex: maxColIndex > vColIndex ? maxColIndex : vColIndex,
			};
		},
		{
			minRowIndex: selectedCells[0].rowIndex,
			maxRowIndex: selectedCells[0].rowIndex,
			minColIndex: selectedCells[0].vColIndex,
			maxColIndex: selectedCells[0].vColIndex,
		}
	);
}

/**
 * Determines whether a rectangle will be formed from the selected cells in the virtual table.
 * This function is used to determines whether to allow cell merging from the selected cells.
 *
 * @param selectedCells Current selected cells.
 * @return True if a rectangle will be formed from the selected cells, false otherwise.
 */
export function isRectangleSelected(selectedCells: VSelectedCells): boolean {
	if (!selectedCells) {
		return false;
	}

	// No need to merge If only one or no cell is selected.
	if (selectedCells.length <= 1) {
		return false;
	}

	// Check if multiple sections are selected.
	if (isMultiSectionSelected(selectedCells)) {
		return false;
	}

	// Get the minimum / maximum virtual indexes of the matrix from the selected cells.
	const vRangeIndexes: VRangeIndexes = getVirtualRangeIndexes(selectedCells);

	// Generate indexed matrix from the indexes.
	const vRange: boolean[][] = [];

	for (
		let i = vRangeIndexes.minRowIndex;
		i <= vRangeIndexes.maxRowIndex;
		i++
	) {
		vRange[i] = [];
		for (
			let j = vRangeIndexes.minColIndex;
			j <= vRangeIndexes.maxColIndex;
			j++
		) {
			vRange[i][j] = false;
		}
	}

	// Map the selected cells to the matrix (mark the cell as "true").
	selectedCells.forEach((cell: VCell) => {
		if (
			cell.rowIndex in vRange &&
			cell.vColIndex in vRange[cell.rowIndex]
		) {
			vRange[cell.rowIndex][cell.vColIndex] = true;

			if (cell.colSpan > 1) {
				for (let i = 1; i < cell.colSpan; i++) {
					vRange[cell.rowIndex][cell.vColIndex + i] = true;
				}
			}

			if (cell.rowSpan > 1) {
				for (let i = 1; i < cell.rowSpan; i++) {
					vRange[cell.rowIndex + i][cell.vColIndex] = true;

					if (cell.colSpan > 1) {
						for (let j = 1; j < cell.colSpan; j++) {
							vRange[cell.rowIndex + i][cell.vColIndex + j] =
								true;
						}
					}
				}
			}
		}
	});

	// Whether all cells in the matrix are filled (whether cell merging is possible).
	return vRange
		.reduce((cells, row) => cells.concat(row), [])
		.every((cell) => cell);
}

/**
 * Return a set of cells from the start cell and the end cell that will form a rectangle, taking into account the join cells.
 *
 * @param vTable           Current virtual table state.
 * @param options
 * @param options.fromCell Start cell of the selected range.
 * @param options.toCell   End cell of the selected range.
 * @return Selected cells that represent a rectangle.
 */
export function toRectangledSelectedCells(
	vTable: VTable,
	{ fromCell, toCell }: { fromCell: VCell; toCell: VCell }
): VCell[] {
	if (!fromCell || !toCell) {
		return [];
	}

	// Check if multiple sections are selected.
	if (fromCell.sectionName !== toCell.sectionName) {
		return [];
	}

	// Get the minimum / maximum virtual indexes of the matrix from the selected cells.
	const vRangeIndexes: VRangeIndexes = getVirtualRangeIndexes([
		fromCell,
		toCell,
	]);

	let isRectangled: boolean = false;

	let { minRowIndex, maxRowIndex, minColIndex, maxColIndex } = vRangeIndexes;

	const currentSection: VSection =
		vTable[fromCell.sectionName as SectionName];
	const rowCount: number = currentSection.length;
	const colCount: number = currentSection[0].cells.length;

	const VCells: VCell[] = currentSection
		.reduce((cells: VCell[], row: VRow) => cells.concat(row.cells), [])
		.map((cell: VCell) => {
			if (
				cell.rowIndex === fromCell.rowIndex &&
				cell.vColIndex === fromCell.vColIndex
			) {
				cell.isFirstSelected = true;
			}
			return cell;
		})
		.filter((cell: VCell) => !cell.isHidden);

	// Expand the rectangle if there is a combined cell that passes through each edge.
	while (!isRectangled) {
		// Extend the virtual range to top if there are cells that overlap to top.
		const topCells: VCell[] = VCells.filter((cell: VCell) => {
			return (
				((cell.vColIndex + cell.colSpan - 1 >= minColIndex &&
					cell.vColIndex + cell.colSpan - 1 <= maxColIndex) ||
					(cell.vColIndex >= minColIndex &&
						cell.vColIndex <= maxColIndex)) &&
				cell.rowIndex < minRowIndex &&
				cell.rowIndex + cell.rowSpan - 1 >= minRowIndex &&
				cell.rowSpan > 1
			);
		});

		const isTopFixed: boolean = minRowIndex === 0 || !topCells.length;
		if (!isTopFixed) {
			minRowIndex--;
		}

		// Extend the virtual range to right if there are cells that overlap to right.
		const rightCells: VCell[] = VCells.filter((cell: VCell) => {
			return (
				((cell.rowIndex + cell.rowSpan - 1 >= minRowIndex &&
					cell.rowIndex + cell.rowSpan - 1 <= maxRowIndex) ||
					(cell.rowIndex >= minRowIndex &&
						cell.rowIndex <= maxRowIndex)) &&
				cell.vColIndex <= maxColIndex &&
				cell.vColIndex + cell.colSpan - 1 > maxColIndex &&
				cell.colSpan > 1
			);
		});

		const isRightFixed: boolean =
			maxColIndex === colCount - 1 || !rightCells.length;
		if (!isRightFixed) {
			maxColIndex++;
		}

		// Extend the virtual range to bottom if there are cells that overlap to bottom.
		const bottomCells: VCell[] = VCells.filter((cell: VCell) => {
			return (
				((cell.vColIndex + cell.colSpan - 1 >= minColIndex &&
					cell.vColIndex + cell.colSpan - 1 <= maxColIndex) ||
					(cell.vColIndex >= minColIndex &&
						cell.vColIndex <= maxColIndex)) &&
				cell.rowIndex <= maxRowIndex &&
				cell.rowIndex + cell.rowSpan - 1 > maxRowIndex &&
				cell.rowSpan - 1
			);
		});

		const isBottomFixed: boolean =
			maxRowIndex === rowCount - 1 || !bottomCells.length;
		if (!isBottomFixed) {
			maxRowIndex++;
		}

		// Extend the virtual range to left if there are cells that overlap to left.
		const leftCells: VCell[] = VCells.filter((cell: VCell) => {
			return (
				((cell.rowIndex + cell.rowSpan - 1 >= minRowIndex &&
					cell.rowIndex + cell.rowSpan - 1 <= maxRowIndex) ||
					(cell.rowIndex >= minRowIndex &&
						cell.rowIndex <= maxRowIndex)) &&
				cell.vColIndex < minColIndex &&
				cell.vColIndex + cell.colSpan - 1 >= minColIndex &&
				cell.colSpan > 1
			);
		});

		const isLeftFixed: boolean =
			maxColIndex === colCount - 1 || !leftCells.length;
		if (!isLeftFixed) {
			minColIndex--;
		}

		isRectangled =
			isTopFixed && isRightFixed && isBottomFixed && isLeftFixed;
	}

	// Cells in the newly computed rectangle.
	return VCells.filter(
		(cell: VCell) =>
			cell.rowIndex >= minRowIndex &&
			cell.rowIndex <= maxRowIndex &&
			cell.vColIndex >= minColIndex &&
			cell.vColIndex <= maxColIndex
	);
}

/**
 * Determines whether the selected cells in the virtual table contain merged cells.
 *
 * @param selectedCells Current selected cells.
 * @return True if the selected cells in the virtual table contain merged cells, false otherwise.
 */
export function hasMergedCells(selectedCells: VSelectedCells): boolean {
	if (!selectedCells) {
		return false;
	}
	return selectedCells.some(
		({ rowSpan, colSpan }: { rowSpan: number; colSpan: number }) =>
			rowSpan > 1 || colSpan > 1
	);
}

/**
 * Toggles the existance of a section.
 *
 * @param vTable      Current virtual table state.
 * @param sectionName Name of the section to toggle.
 * @return New virtual table state.
 */
export function toggleSection(
	vTable: VTable,
	sectionName: SectionName
): VTable {
	// Section exists, replace it with an empty row to remove it.
	if (!isEmptySection(vTable[sectionName])) {
		return {
			...vTable,
			[sectionName]: [],
		};
	}

	// Number of columns in the row to be inserted.
	const newRowColCount: number = vTable.body[0].cells.length;

	// Row state to be inserted.
	const newRow: VRow = {
		cells: Array.from({ length: newRowColCount }).map((_, vColIndex) => ({
			content: '',
			tag: 'head' === sectionName ? 'th' : 'td',
			rowSpan: 1,
			colSpan: 1,
			sectionName,
			rowIndex: 0,
			vColIndex,
			isHidden: false,
			isFirstSelected: false,
		})),
	};

	return {
		...vTable,
		[sectionName]: [newRow],
	};
}
