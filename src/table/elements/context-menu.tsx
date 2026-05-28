/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';
import {
	Button,
	Popover,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import type { VCell } from '../utils/table-state';
import type { ColumnDataType } from '../block-attributes';

export type ContextMenuProps = {
	isOpen: boolean;
	anchorElement: HTMLElement | null;
	cell: VCell | null;
	onClose: () => void;
	copyToClipboard: (text: string) => void;
	TableCellContextMenuSlot: React.ComponentType<any>;
	/** Per virtual column; omit / null = no column rounding */
	columnRoundDecimals?: (number | null)[];
	onSetColumnRounding?: (vColIndex: number, decimals: number | null) => void;
	onSetCellRounding?: (cell: VCell, decimals: number | 'inherit') => void;
	/** Virtual column indices that are currently hidden */
	hiddenColumns?: number[];
	onHideColumn?: (vColIndex: number) => void;
	/** Per virtual column data type; index matches vColIndex */
	columnDataTypes?: ColumnDataType[];
	onSetColumnDataType?: (vColIndex: number, dataType: ColumnDataType) => void;
};

type MenuView = 'main' | 'column' | 'cell' | 'columnType';

const DECIMAL_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const COLUMN_DATA_TYPE_KEYS: ColumnDataType[] = [
	'auto',
	'text',
	'number',
	'date',
	'currency',
	'percentage',
	'url',
	'fips',
	'cbsa',
	'iso3alpha',
	'iso3numeric',
];

function getColumnDataTypeLabel(value: ColumnDataType): string {
	switch (value) {
		case 'auto':
			return __('Auto (infer)', 'prc-block-library');
		case 'text':
			return __('Text', 'prc-block-library');
		case 'number':
			return __('Number', 'prc-block-library');
		case 'date':
			return __('Date', 'prc-block-library');
		case 'currency':
			return __('Currency', 'prc-block-library');
		case 'percentage':
			return __('Percentage', 'prc-block-library');
		case 'url':
			return __('URL', 'prc-block-library');
		case 'fips':
			return __('FIPS code', 'prc-block-library');
		case 'cbsa':
			return __('CBSA code', 'prc-block-library');
		case 'iso3alpha':
			return __('ISO-3 alpha (e.g. USA)', 'prc-block-library');
		case 'iso3numeric':
			return __('ISO-3 numeric (e.g. 840)', 'prc-block-library');
	}
}

export default function ContextMenu({
	isOpen,
	anchorElement,
	cell,
	onClose,
	copyToClipboard,
	TableCellContextMenuSlot,
	columnRoundDecimals = [],
	onSetColumnRounding = () => {},
	onSetCellRounding = () => {},
	hiddenColumns = [],
	onHideColumn = () => {},
	columnDataTypes = [],
	onSetColumnDataType = () => {},
}: ContextMenuProps) {
	const [menuView, setMenuView] = useState<MenuView>('main');
	const menuContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			setMenuView('main');
		}
	}, [isOpen]);

	/** Outside interaction: ref-scoped (not querySelector) so nested submenus and multi-block work. */
	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const handleOutside = (event: MouseEvent | PointerEvent) => {
			const target = event.target as Node | null;
			if (!target) {
				return;
			}
			const el = menuContentRef.current;
			if (!el || el.contains(target)) {
				return;
			}
			onClose();
		};
		document.addEventListener('pointerdown', handleOutside, true);
		document.addEventListener('mousedown', handleOutside, true);
		document.addEventListener('click', handleOutside, true);
		document.addEventListener('contextmenu', handleOutside, true);
		return () => {
			document.removeEventListener('pointerdown', handleOutside, true);
			document.removeEventListener('mousedown', handleOutside, true);
			document.removeEventListener('click', handleOutside, true);
			document.removeEventListener('contextmenu', handleOutside, true);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return;
			}
			if (menuView !== 'main') {
				setMenuView('main');
				return;
			}
			onClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, menuView, onClose]);

	if (!isOpen || !cell) return null;

	const vColIndex = cell.vColIndex;
	const isDataCell =
		cell.sectionName === 'body' || cell.sectionName === 'foot';
	const isColumnHidden = hiddenColumns.includes(vColIndex);

	const columnCurrent = columnRoundDecimals[vColIndex];
	const cellCurrent =
		typeof cell.roundDecimals === 'number' ? cell.roundDecimals : null;
	const currentDataType: ColumnDataType =
		columnDataTypes[vColIndex] ?? 'auto';

	const renderMain = () => (
		<>
			<Button
				variant="tertiary"
				onClick={() => {
					if (cell?.content) {
						copyToClipboard(cell.content);
					}
					onClose();
				}}
				className="ftb-table-cell-context-menu__button"
			>
				{__('Copy cell content', 'prc-block-library')}
			</Button>
			<Button
				variant="tertiary"
				onClick={() => setMenuView('column')}
				className="ftb-table-cell-context-menu__button"
			>
				{__('Round column…', 'prc-block-library')}
			</Button>
			<Button
				variant="tertiary"
				onClick={() => {
					onHideColumn(vColIndex);
					onClose();
				}}
				className="ftb-table-cell-context-menu__button"
			>
				{isColumnHidden
					? __('Show column', 'prc-block-library')
					: __('Hide column', 'prc-block-library')}
			</Button>
			<Button
				variant="tertiary"
				onClick={() => setMenuView('columnType')}
				className="ftb-table-cell-context-menu__button"
			>
				{sprintf(
					/* translators: %s: current column data type label */
					__('Set column type (%s)', 'prc-block-library'),
					getColumnDataTypeLabel(currentDataType)
				)}
			</Button>
			{isDataCell && (
				<Button
					variant="tertiary"
					onClick={() => setMenuView('cell')}
					className="ftb-table-cell-context-menu__button"
				>
					{__('Round cell…', 'prc-block-library')}
				</Button>
			)}
			<TableCellContextMenuSlot fillProps={{ cell }} />
		</>
	);

	const renderColumnDecimals = () => (
		<>
			<Button
				variant="tertiary"
				onClick={() => setMenuView('main')}
				className="ftb-table-cell-context-menu__button ftb-table-cell-context-menu__back"
			>
				{__('← Back', 'prc-block-library')}
			</Button>
			<Button
				variant={
					columnCurrent === null || columnCurrent === undefined
						? 'primary'
						: 'tertiary'
				}
				onClick={() => {
					onSetColumnRounding(vColIndex, null);
					onClose();
				}}
				className="ftb-table-cell-context-menu__button"
			>
				{__('Off (no column rounding)', 'prc-block-library')}
			</Button>
			{DECIMAL_OPTIONS.map((n) => (
				<Button
					key={`col-${n}`}
					variant={columnCurrent === n ? 'primary' : 'tertiary'}
					onClick={() => {
						onSetColumnRounding(vColIndex, n);
						onClose();
					}}
					className="ftb-table-cell-context-menu__button"
				>
					{sprintf(
						/* translators: %d: decimal place count */
						__('Round to %d decimal places', 'prc-block-library'),
						n
					)}
				</Button>
			))}
		</>
	);

	const renderColumnType = () => (
		<>
			<Button
				variant="tertiary"
				onClick={() => setMenuView('main')}
				className="ftb-table-cell-context-menu__button ftb-table-cell-context-menu__back"
			>
				{__('← Back', 'prc-block-library')}
			</Button>
			{COLUMN_DATA_TYPE_KEYS.map((value) => (
				<Button
					key={value}
					variant={currentDataType === value ? 'primary' : 'tertiary'}
					onClick={() => {
						onSetColumnDataType(vColIndex, value);
						onClose();
					}}
					className="ftb-table-cell-context-menu__button"
				>
					{getColumnDataTypeLabel(value)}
				</Button>
			))}
		</>
	);

	const renderCellDecimals = () => (
		<>
			<Button
				variant="tertiary"
				onClick={() => setMenuView('main')}
				className="ftb-table-cell-context-menu__button ftb-table-cell-context-menu__back"
			>
				{__('← Back', 'prc-block-library')}
			</Button>
			<Button
				variant={
					cellCurrent === null || cellCurrent === undefined
						? 'primary'
						: 'tertiary'
				}
				onClick={() => {
					onSetCellRounding(cell, 'inherit');
					onClose();
				}}
				className="ftb-table-cell-context-menu__button"
			>
				{__('Inherit column setting', 'prc-block-library')}
			</Button>
			{DECIMAL_OPTIONS.map((n) => (
				<Button
					key={`cell-${n}`}
					variant={cellCurrent === n ? 'primary' : 'tertiary'}
					onClick={() => {
						onSetCellRounding(cell, n);
						onClose();
					}}
					className="ftb-table-cell-context-menu__button"
				>
					{sprintf(
						/* translators: %d: decimal place count */
						__('Round to %d decimal places', 'prc-block-library'),
						n
					)}
				</Button>
			))}
		</>
	);

	return (
		<Popover
			anchor={anchorElement}
			position="bottom right"
			onClose={onClose}
			expandOnMobile={true}
			focusOnMount="firstElement"
			className="ftb-table-cell-context-menu"
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				ref={menuContentRef}
				className="ftb-table-cell-context-menu__content"
				onClick={(event) => event.stopPropagation()}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						onClose();
					}
				}}
			>
				<VStack alignment="stretch" spacing={0}>
					{menuView === 'main' && renderMain()}
					{menuView === 'column' && renderColumnDecimals()}
					{menuView === 'columnType' && renderColumnType()}
					{menuView === 'cell' && isDataCell && renderCellDecimals()}
				</VStack>
			</div>
		</Popover>
	);
}
