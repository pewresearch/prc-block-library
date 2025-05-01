/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import type { MouseEvent } from 'react';
import { useMemo } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { plus, trash, chevronRight, chevronDown } from '@wordpress/icons';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { CELL_ARIA_LABEL } from '../constants';
import type { SectionName } from '../block-attributes';
import type { StoreOptions } from '../store';
import TableRowSelectButton from './table-row-select-button';

interface TableCellControlsProps {
	isSelected: boolean;
	isContentOnlyMode: boolean;
	options: StoreOptions;
	rowIndex: number;
	vColIndex: number;
	sectionIndex: number;
	sectionName: SectionName;
	cell: any;
	rowSpan: number;
	isRowSelected: boolean;
	isColumnSelected: boolean;
	selectedLine: any;
	onInsertRow: (sectionName: SectionName, rowIndex: number) => void;
	onDeleteRow: (sectionName: SectionName, rowIndex: number) => void;
	onInsertColumn: (cell: any, offset: number) => void;
	onDeleteColumn: (vColIndex: number) => void;
	onSelectRow: (sectionName: SectionName, rowIndex: number) => void;
	onSelectColumn: (vColIndex: number) => void;
	filteredVTable: any;
	content: string;
	onChangeCellContent: (value: string, cell: any) => void;
	isSelectMode: boolean;
	isTabMove: boolean;
	setSelectedLine: (selectedLine: any) => void;
	setSelectedCells: (selectedCells: any) => void;
	onSelectSectionCells: (sectionName: SectionName) => void;
}

const TableCellControls = ({
	isSelected,
	isContentOnlyMode,
	options,
	rowIndex,
	vColIndex,
	sectionIndex,
	sectionName,
	cell,
	rowSpan,
	isRowSelected,
	isColumnSelected,
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
}: TableCellControlsProps) => {
	const showControl = useMemo(() => {
		return isSelected && !isContentOnlyMode;
	}, [isSelected, isContentOnlyMode]);

	return (
		<>
			{showControl && rowIndex === 0 && vColIndex === 0 && (
				<TableRowSelectButton
					sectionName={sectionName}
					onSelectSectionCells={onSelectSectionCells}
					options={options}
				/>
			)}
			{showControl && rowIndex === 0 && vColIndex === 0 && (
				<Button
					className={clsx('ftb-row-before-inserter', {
						'ftb-row-before-inserter--has-prev-section':
							sectionIndex > 0,
					})}
					label={__('Insert row before', 'flexible-table-block')}
					tabIndex={options.focus_control_button ? 0 : -1}
					icon={plus}
					iconSize={18}
					onClick={(event: MouseEvent) => {
						onInsertRow(sectionName, rowIndex);
						event.stopPropagation();
					}}
				/>
			)}
			{showControl && vColIndex === 0 && (
				<>
					<Button
						className="ftb-row-selector"
						label={__('Select row', 'flexible-table-block')}
						tabIndex={options.focus_control_button ? 0 : -1}
						icon={chevronRight}
						iconSize={16}
						variant={
							isRowSelected &&
							selectedLine.sectionName === sectionName &&
							selectedLine.rowIndex === rowIndex
								? 'primary'
								: undefined
						}
						onClick={(event: MouseEvent) => {
							onSelectRow(sectionName, rowIndex);
							event.stopPropagation();
						}}
					/>
					{isRowSelected &&
						selectedLine.sectionName === sectionName &&
						selectedLine.rowIndex === rowIndex && (
							<Button
								className="ftb-row-deleter"
								label={__('Delete row', 'flexible-table-block')}
								tabIndex={options.focus_control_button ? 0 : -1}
								icon={trash}
								iconSize={20}
								onClick={(event: MouseEvent) => {
									onDeleteRow(sectionName, rowIndex);
									event.stopPropagation();
								}}
							/>
						)}
				</>
			)}
			{showControl &&
				sectionIndex === 0 &&
				rowIndex === 0 &&
				vColIndex === 0 && (
					<Button
						className="ftb-column-before-inserter"
						label={__(
							'Insert column before',
							'flexible-table-block'
						)}
						tabIndex={options.focus_control_button ? 0 : -1}
						icon={plus}
						iconSize={18}
						onClick={(event: MouseEvent) => {
							onInsertColumn(cell, 0);
							event.stopPropagation();
						}}
					/>
				)}
			{showControl && sectionIndex === 0 && rowIndex === 0 && (
				<>
					<Button
						className="ftb-column-selector"
						label={__('Select column', 'flexible-table-block')}
						tabIndex={options.focus_control_button ? 0 : -1}
						icon={chevronDown}
						iconSize={18}
						variant={
							isColumnSelected &&
							selectedLine.vColIndex === vColIndex
								? 'primary'
								: undefined
						}
						onClick={(event: MouseEvent) => {
							onSelectColumn(vColIndex);
							event.stopPropagation();
						}}
					/>
					{isColumnSelected &&
						selectedLine.vColIndex === vColIndex && (
							<Button
								className="ftb-column-deleter"
								label={__(
									'Delete column',
									'flexible-table-block'
								)}
								tabIndex={options.focus_control_button ? 0 : -1}
								icon={trash}
								iconSize={20}
								onClick={(event: MouseEvent) => {
									onDeleteColumn(vColIndex);
									event.stopPropagation();
								}}
							/>
						)}
				</>
			)}
			{showControl && vColIndex === 0 && (
				<Button
					className={clsx('ftb-row-after-inserter', {
						'ftb-row-after-inserter--has-next-section':
							sectionIndex <
								Object.keys(filteredVTable).length - 1 &&
							rowIndex + rowSpan - 1 ===
								filteredVTable[sectionName].length - 1,
					})}
					label={__('Insert row after', 'flexible-table-block')}
					tabIndex={options.focus_control_button ? 0 : -1}
					icon={plus}
					iconSize={18}
					onClick={(event: MouseEvent) => {
						onInsertRow(sectionName, rowIndex + rowSpan);
						event.stopPropagation();
					}}
				/>
			)}
			<RichText
				key={vColIndex}
				value={content}
				onChange={(value) => onChangeCellContent(value, cell)}
				{...((!isSelectMode || isTabMove) && {
					onFocus: () => {
						isTabMove = false;
						setSelectedLine(undefined);
						setSelectedCells([
							{
								...cell,
								isFirstSelected: true,
							},
						]);
					},
				})}
				aria-label={CELL_ARIA_LABEL[sectionName as SectionName]}
				allowedFormats={[
					'core/link',
					'core/bold',
					'core/italic',
					'core/underline',
					'core/strikethrough',
					'core/code',
					'core/superscript',
					'core/subscript',
				]}
			/>
			{showControl && sectionIndex === 0 && rowIndex === 0 && (
				<Button
					className="ftb-column-after-inserter"
					label={__('Insert column after', 'flexible-table-block')}
					tabIndex={options.focus_control_button ? 0 : -1}
					icon={plus}
					iconSize={18}
					onClick={(event: MouseEvent) => {
						onInsertColumn(cell, 1);
						event.stopPropagation();
					}}
				/>
			)}
		</>
	);
};

export default TableCellControls;
