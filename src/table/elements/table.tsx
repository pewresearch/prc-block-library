/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable max-lines */
/**
 * External dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';
import type {
	Dispatch,
	SetStateAction,
	MouseEvent,
	KeyboardEvent,
} from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	// @ts-ignore: has no exported member
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';
import { SlotFillProvider, createSlotFill } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	toRectangledSelectedCells,
	toVirtualRows,
	toTableAttributes,
	isEmptySection,
	type VTable,
	type VCell,
	type VRow,
	type VSelectedLine,
	type VSelectedCells,
} from '../utils/table-state';
import { convertToObject } from '../utils/style-converter';

import type {
	SectionName,
	CellTagValue,
	BlockAttributes,
} from '../block-attributes';
import type { StoreOptions } from '../store';

import ContextMenu from './context-menu';
import GoToCellModal from '../controls/go-to-cell-modal';
import TableCellControls from './table-cell-controls';

// Create the SlotFill for the context menu
const { Fill: TableCellContextMenuFill, Slot: TableCellContextMenuSlot } =
	createSlotFill('TableCellContextMenu');

// Export for other plugins to use
export { TableCellContextMenuFill };

function TSection(props: any) {
	const { name, ...restProps } = props;
	const TagName = `t${name}`;
	return <TagName {...restProps} />;
}

function Cell(props: any) {
	const { name, ...restProps } = props;
	const TagName: CellTagValue = name;
	return <TagName {...restProps} />;
}

type Props = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	isSelected: boolean;
	options: StoreOptions;
	vTable: VTable;
	tableStylesObj: Properties;
	selectedCells: VSelectedCells;
	setSelectedCells: Dispatch<SetStateAction<VSelectedCells>>;
	selectedLine: VSelectedLine;
	setSelectedLine: Dispatch<SetStateAction<VSelectedLine>>;
	isContentOnlyMode: boolean;
};

// Add new type for context menu state
type ContextMenuState = {
	isOpen: boolean;
	anchorElement: HTMLElement | null;
	cell: VCell | null;
} | null;

/* eslint-disable max-lines-per-function */
export default function Table({
	attributes,
	setAttributes,
	isSelected,
	options,
	vTable,
	tableStylesObj,
	selectedCells,
	setSelectedCells,
	selectedLine,
	setSelectedLine,
	isContentOnlyMode,
}: Props) {
	const { hasFixedLayout, isStackedOnMobile, sticky } = attributes;

	const colorProps = useColorProps(attributes);

	const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

	// Manage rendering status as state since
	// some processing may be performed before rendering components.
	const [isReady, setIdReady] = useState<boolean>(false);
	useEffect(() => setIdReady(true), []);

	const tableRef = useRef(null);
	const { createWarningNotice } = useDispatch(noticesStore);

	let isTabMove: boolean = false;

	const isRowSelected =
		selectedLine &&
		'sectionName' in selectedLine &&
		'rowIndex' in selectedLine;
	const isColumnSelected = selectedLine && 'vColIndex' in selectedLine;

	const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);

	const [isGoToModalOpen, setIsGoToModalOpen] = useState(false);
	const [goToValue, setGoToValue] = useState('');
	const goToInputRef = useRef<HTMLInputElement>(null);

	const onInsertRow = (sectionName: SectionName, rowIndex: number) => {
		const newVTable = insertRow(vTable, { sectionName, rowIndex });
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const onDeleteRow = (sectionName: SectionName, rowIndex: number) => {
		// Do not allow tbody to be empty for table with thead /tfoot sections.
		if (
			sectionName === 'body' &&
			vTable.body.length === 1 &&
			(!isEmptySection(vTable.head) || !isEmptySection(vTable.foot))
		) {
			// @ts-ignore
			createWarningNotice(
				__(
					'The table body must have one or more rows.',
					'flexible-table-block'
				),
				{
					id: 'flexible-table-block-body-row',
					type: 'snackbar',
				}
			);
			return;
		}

		const newVTable = deleteRow(vTable, { sectionName, rowIndex });
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const onInsertColumn = (vTargetCell: VCell, offset: number) => {
		// Calculate column index to be inserted considering colspan of the target cell.
		const vColIndex =
			offset === 0
				? vTargetCell.vColIndex
				: vTargetCell.vColIndex + offset + vTargetCell.colSpan - 1;

		const newVTable = insertColumn(vTable, { vColIndex });
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const onDeleteColumn = (vColIndex: number) => {
		const newVTable = deleteColumn(vTable, { vColIndex });
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const onSelectSectionCells = (sectionName: SectionName) => {
		setSelectedCells(
			vTable[sectionName].reduce((cells: VCell[], row) => {
				return cells.concat(row.cells.filter((cell) => !cell.isHidden));
			}, [])
		);
		setSelectedLine(undefined);
	};

	const onSelectRow = (sectionName: SectionName, rowIndex: number) => {
		if (
			isRowSelected &&
			selectedLine.sectionName === sectionName &&
			selectedLine.rowIndex === rowIndex
		) {
			setSelectedLine(undefined);
			setSelectedCells(undefined);
		} else {
			setSelectedLine({ sectionName, rowIndex });
			setSelectedCells(
				vTable[sectionName].reduce((cells: VCell[], row) => {
					return cells.concat(
						row.cells.filter(
							(cell) =>
								cell.rowIndex === rowIndex && !cell.isHidden
						)
					);
				}, [])
			);
		}
	};

	const onSelectColumn = (vColIndex: number) => {
		if (
			isColumnSelected &&
			selectedLine.vColIndex &&
			selectedLine.vColIndex === vColIndex
		) {
			setSelectedLine(undefined);
			setSelectedCells(undefined);
		} else {
			const vRows = toVirtualRows(vTable);

			setSelectedCells(
				vRows.reduce(
					(cells: VCell[], row) =>
						cells.concat(
							row.cells.filter(
								(cell) =>
									cell.vColIndex === vColIndex &&
									!cell.isHidden
							)
						),
					[]
				)
			);

			setSelectedLine({ vColIndex });
		}
	};

	const onChangeCellContent = (content: string, targetCell: VCell) => {
		// If inline highlight is applied to the RichText,
		// this process is performed before rendering the component,
		// causing a warning error.
		// Therefore, nothing is performed if the component has not yet been rendered.
		if (!isReady) {
			return;
		}

		const {
			sectionName,
			rowIndex: selectedRowIndex,
			vColIndex: selectedVColIndex,
		} = targetCell;
		setSelectedCells([{ ...targetCell, isFirstSelected: true }]);

		const newVTable = {
			...vTable,
			[sectionName]: vTable[sectionName].map((row, rowIndex) => {
				if (rowIndex !== selectedRowIndex) {
					return {
						cells: row.cells.filter((cell) => !cell.isHidden),
					};
				}
				return {
					cells: row.cells.map((cell, vColIndex) => {
						if (
							rowIndex !== selectedRowIndex ||
							vColIndex !== selectedVColIndex
						) {
							return cell;
						}
						return {
							...cell,
							content,
						};
					}),
				};
			}),
		};
		setAttributes(toTableAttributes(newVTable));
	};

	// Monitor pressed key to determine whether multi-select mode or range-select mode.
	// Also the next cell will be focused if tab key navigation is enabled.
	const onKeyDown = (event: KeyboardEvent) => {
		const { key } = event;

		if (key === 'Shift' || key === 'Control' || key === 'Meta') {
			// range-select mode or multi-select mode.
			setIsSelectMode(true);
			console.log('range-select mode or multi-select mode.');
		} else if (key === 'Tab' && options.tab_move && tableRef.current) {
			const isInsideTableBlock =
				(event.target as HTMLElement).closest(
					'.wp-block-prc-block-table'
				) !== null;

			if (!isInsideTableBlock) {
				return;
			}
			// Focus on the next cell.
			isTabMove = true;

			const tableElement: HTMLElement = tableRef.current;
			const { ownerDocument } = tableElement;
			const { activeElement } = ownerDocument;

			const activeCell = tableElement.querySelector(
				'th.is-selected > [contenteditable="true"], td.is-selected > [contenteditable="true"]'
			);
			const isInsidePopover =
				activeElement &&
				activeElement.closest('.components-popover') !== null;
			const hasLinkControl = !!ownerDocument.querySelector(
				'.block-editor-link-control'
			);

			if (!activeCell || isInsidePopover || hasLinkControl) {
				return;
			}

			const tabbableNodes = tableElement.querySelectorAll(
				'th > [contenteditable="true"], td > [contenteditable="true"]'
			);

			const tabbableElements = [].slice.call(tabbableNodes);
			const activeCellIndex = tabbableElements.findIndex(
				(element: Node) => element === activeCell
			);

			if (activeCellIndex === -1) {
				return;
			}

			let nextCellIndex = event.shiftKey
				? activeCellIndex - 1
				: activeCellIndex + 1;

			if (nextCellIndex < 0) {
				nextCellIndex = tabbableElements.length - 1;
			} else if (nextCellIndex >= tabbableElements.length) {
				nextCellIndex = 0;
			}

			const focusbleElement: HTMLElement =
				tabbableElements[nextCellIndex];

			if (!focusbleElement) {
				return;
			}

			event.preventDefault();
			setIsSelectMode(false);
			focusbleElement.focus();

			// Select all text if the next cell is not empty.
			const selection = ownerDocument.getSelection();
			const range = ownerDocument.createRange();

			if (selection && focusbleElement.innerText.trim().length) {
				range.selectNodeContents(focusbleElement);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}
	};

	const onKeyUp = (event: KeyboardEvent) => {
		const { key } = event;

		if (key === 'Shift' || key === 'Control' || key === 'Meta') {
			const isInsideTableBlock =
				(event.target as HTMLElement).closest(
					'.wp-block-prc-block-table'
				) !== null;

			if (!isInsideTableBlock) {
				return;
			}

			setIsSelectMode(false);
		}
	};

	const onClickCell = (event: MouseEvent, clickedCell: VCell) => {
		// console.log('onClickCell', event, clickedCell);
		const { shiftKey, ctrlKey, metaKey } = event;
		const isInsideTableBlock =
			(event.target as HTMLElement).closest(
				'.wp-block-prc-block-table'
			) !== null;

		if (!isInsideTableBlock) {
			return;
		}

		const { sectionName, rowIndex, vColIndex } = clickedCell;

		if (shiftKey) {
			// Range select.
			if (!selectedCells) {
				setSelectedCells([{ ...clickedCell, isFirstSelected: true }]);
			} else {
				const fromCell = selectedCells.find(
					({ isFirstSelected }) => isFirstSelected
				);

				if (!fromCell) {
					return;
				}

				if (fromCell.sectionName !== sectionName) {
					// @ts-ignore
					createWarningNotice(
						__(
							'Cannot select range cells from difference sections.',
							'flexible-table-block'
						),
						{
							id: 'flexible-table-block-range-sections',
							type: 'snackbar',
						}
					);
					return;
				}
				setSelectedCells(
					toRectangledSelectedCells(vTable, {
						fromCell,
						toCell: clickedCell,
					})
				);
			}
		} else if (ctrlKey || metaKey) {
			// Multple select.
			const newSelectedCells = selectedCells ? [...selectedCells] : [];
			const existCellIndex = newSelectedCells.findIndex((cell) => {
				return (
					cell.sectionName === sectionName &&
					cell.rowIndex === rowIndex &&
					cell.vColIndex === vColIndex
				);
			});

			if (
				newSelectedCells.length &&
				sectionName !== newSelectedCells[0].sectionName
			) {
				// @ts-ignore
				createWarningNotice(
					__(
						'Cannot select multi cells from difference sections.',
						'flexible-table-block'
					),
					{
						id: 'flexible-table-block-multi-sections',
						type: 'snackbar',
					}
				);
				return;
			}

			if (existCellIndex === -1) {
				newSelectedCells.push(clickedCell);
			} else {
				newSelectedCells.splice(existCellIndex, 1);
			}

			setSelectedCells(newSelectedCells);
		} else {
			// Select cell for the first time.
			setSelectedCells([{ ...clickedCell, isFirstSelected: true }]);
		}
	};

	// Remove cells from the virtual table that are not needed for dom rendering.
	const filteredVTable = Object.keys(vTable).reduce(
		(result: any, sectionName) => {
			if (isEmptySection(vTable[sectionName as SectionName])) {
				return result;
			}
			return {
				...result,
				[sectionName]: vTable[sectionName as SectionName].map(
					(row) => ({
						cells: row.cells.filter((cell) => !cell.isHidden),
					})
				),
			};
		},
		{}
	);

	if (!filteredVTable) {
		return null;
	}

	const filteredSections = Object.keys(filteredVTable) as SectionName[];

	const handleContextMenu = (event: MouseEvent, cell: VCell) => {
		event.preventDefault();
		event.stopPropagation();
		console.log('handleContextMenu', event);
		setContextMenu({
			isOpen: true,
			anchorElement: event.currentTarget as HTMLElement,
			cell,
		});
	};

	const closeContextMenu = () => {
		setContextMenu(null);
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			createWarningNotice(
				__('Content copied to clipboard', 'flexible-table-block'),
				{
					type: 'snackbar',
				}
			);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	useEffect(() => {
		if (contextMenu?.isOpen) {
			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as Node;
				const menu = document.querySelector(
					'.ftb-table-cell-context-menu'
				);
				const isClickInside = menu?.contains(target);

				if (!isClickInside) {
					closeContextMenu();
				}
			};

			// Use capture phase to ensure we handle the click before other handlers
			document.addEventListener('click', handleClickOutside, true);
			document.addEventListener('contextmenu', handleClickOutside, true);

			return () => {
				document.removeEventListener('click', handleClickOutside, true);
				document.removeEventListener(
					'contextmenu',
					handleClickOutside,
					true
				);
			};
		}
	}, [contextMenu?.isOpen]);

	useEffect(() => {
		if (contextMenu?.isOpen) {
			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					closeContextMenu();
				}
			};

			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}
	}, [contextMenu?.isOpen]);

	const navigateToCell = (value: string) => {
		// Parse input in format "row:column" (1-based indices)
		const [rowStr, colStr] = value.split(':');
		const targetRow = parseInt(rowStr, 10) - 1; // Convert to 0-based
		const targetCol = parseInt(colStr, 10) - 1; // Convert to 0-based

		// Validate input
		if (isNaN(targetRow) || isNaN(targetCol)) {
			createWarningNotice(
				__(
					'Please enter valid row and column numbers (e.g., "1:1")',
					'flexible-table-block'
				),
				{ type: 'snackbar' }
			);
			return;
		}

		// Find the cell in the table
		let found = false;
		for (const sectionName of Object.keys(vTable) as SectionName[]) {
			const section = vTable[sectionName];
			if (targetRow < section.length) {
				const row = section[targetRow];
				const cell = row.cells.find(
					(c) => c.vColIndex === targetCol && !c.isHidden
				);
				if (cell) {
					// Select and focus the cell
					setSelectedCells([{ ...cell, isFirstSelected: true }]);
					setSelectedLine(undefined);

					// Focus the RichText element and scroll into view
					setTimeout(() => {
						const cellElement = document.querySelector(
							`[data-row="${targetRow}"][data-col="${targetCol}"]`
						) as HTMLElement;

						if (cellElement) {
							// Scroll the cell into view with smooth behavior
							cellElement.scrollIntoView({
								behavior: 'smooth',
								block: 'center',
								inline: 'center',
							});

							// Focus the editable content after scrolling
							const editableElement = cellElement.querySelector(
								'[contenteditable="true"]'
							) as HTMLElement;
							editableElement?.focus();
						}
					}, 0);

					found = true;
					break;
				}
			}
		}

		if (!found) {
			createWarningNotice(
				__(
					'Cell not found. Please check the row and column numbers.',
					'flexible-table-block'
				),
				{ type: 'snackbar' }
			);
			return;
		}

		setIsGoToModalOpen(false);
		setGoToValue('');
	};

	return (
		<SlotFillProvider>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<table
				className={clsx(colorProps.className, {
					'has-fixed-layout': hasFixedLayout,
					'is-stacked-on-mobile': isStackedOnMobile,
					[`is-sticky-${sticky}`]: sticky,
				})}
				style={{ ...tableStylesObj, ...colorProps.style }}
				ref={tableRef}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
			>
				{filteredSections.map(
					(sectionName: SectionName, sectionIndex) => (
						<TSection name={sectionName} key={sectionIndex}>
							{filteredVTable[sectionName].map(
								(row: VRow, rowIndex: number) => (
									<tr key={rowIndex}>
										{row.cells.map((cell: VCell) => {
											const {
												content,
												tag,
												className,
												id,
												headers,
												scope,
												styles,
												rowSpan,
												colSpan,
												vColIndex,
											} = cell;

											// Whether or not the current cell is included in the selected cells.
											const isCellSelected = (
												selectedCells || []
											).some(
												(targetCell) =>
													targetCell.sectionName ===
														sectionName &&
													targetCell.rowIndex ===
														rowIndex &&
													targetCell.vColIndex ===
														vColIndex
											);

											const cellStylesObj =
												convertToObject(styles);
											// If there is a hoverBackgroundColor, recast it as --hover-background-color
											if (
												cellStylesObj?.hoverBackgroundColor
											) {
												cellStylesObj[
													'--hover-background-color'
												] =
													cellStylesObj.hoverBackgroundColor;
											}

											return (
												<Cell
													key={vColIndex}
													name={tag}
													className={clsx(className, {
														'is-selected':
															isCellSelected,
													})}
													data-row={rowIndex}
													data-col={vColIndex}
													rowSpan={
														rowSpan > 1
															? rowSpan
															: undefined
													}
													colSpan={
														colSpan > 1
															? colSpan
															: undefined
													}
													style={cellStylesObj}
													id={id}
													headers={headers}
													scope={scope}
													onClick={(
														event: MouseEvent
													) =>
														onClickCell(event, cell)
													}
													onContextMenu={(
														event: MouseEvent
													) =>
														handleContextMenu(
															event,
															cell
														)
													}
												>
													<TableCellControls
														{...{
															isSelected,
															isContentOnlyMode,
															options,
															rowIndex,
															vColIndex,
															sectionIndex,
															sectionName,
															cell,
															rowSpan,
															isRowSelected:
																!!isRowSelected,
															isColumnSelected:
																!!isColumnSelected,
															selectedLine,
															onInsertRow,
															onDeleteRow,
															onInsertColumn,
															onDeleteColumn,
															onSelectRow,
															onSelectColumn,
															filteredVTable,
															content,
															onChangeCellContent,
															isSelectMode,
															isTabMove,
															setSelectedLine,
															setSelectedCells,
															onSelectSectionCells,
														}}
													/>
												</Cell>
											);
										})}
									</tr>
								)
							)}
						</TSection>
					)
				)}
			</table>

			{/* Single Popover instance outside the table */}
			<ContextMenu
				isOpen={!!contextMenu?.isOpen}
				anchorElement={contextMenu?.anchorElement || null}
				cell={contextMenu?.cell || null}
				onClose={closeContextMenu}
				copyToClipboard={copyToClipboard}
				TableCellContextMenuSlot={TableCellContextMenuSlot}
			/>

			<GoToCellModal
				isOpen={isGoToModalOpen}
				value={goToValue}
				onChange={setGoToValue}
				onOpen={() => {
					setIsGoToModalOpen(true);
				}}
				onClose={() => {
					setIsGoToModalOpen(false);
					setGoToValue('');
				}}
				onGoTo={navigateToCell}
				inputRef={goToInputRef}
			/>
		</SlotFillProvider>
	);
}
