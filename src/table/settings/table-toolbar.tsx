/**
 * External Dependencies
 */
import React, { useRef } from 'react';
import { blockTable, justifyLeft } from '@wordpress/icons';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { useKeyboardShortcut } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import { CONTENT_JUSTIFY_CONTROLS } from '../constants';
import {
	tableRowAfter,
	tableRowBefore,
	tableColumnBefore,
	tableColumnAfter,
	tableColumnDelete,
	tableRowDelete,
	tableMergeCell,
	tableSplitCell,
} from '../icons';
import {
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	mergeCells,
	splitMergedCells,
	hasMergedCells,
	isRectangleSelected,
	toTableAttributes,
	isEmptySection,
	type VTable,
	type VSelectedLine,
	type VSelectedCells,
} from '../utils/table-state';
import { BlockAttributes, ContentJustifyValue } from '../block-attributes';
import { GenerateAiToolbarControls } from '../utils/ai-generators';
type Props = {
	contentJustification: string;
	vTable: VTable;
	selectedCells: VSelectedCells;
	setAttributes: (attributes: BlockAttributes) => void;
	setSelectedCells: (selectedCells: VSelectedCells) => void;
	setSelectedLine: (selectedLine: VSelectedLine) => void;
	attributes: BlockAttributes;
};

export default function ToolbarControls({
	contentJustification,
	vTable,
	selectedCells,
	setAttributes,
	setSelectedCells,
	setSelectedLine,
	attributes,
}: Props) {
	// Create a warning notice.
	const { createWarningNotice } = useDispatch(noticesStore);

	// Create a ref to store the dropdown button element
	const dropdownRef = useRef<HTMLButtonElement>(null);

	// Register keyboard shortcut
	useKeyboardShortcut('mod+shift+e', (event: KeyboardEvent) => {
		event.preventDefault();
		if (dropdownRef.current) {
			dropdownRef.current.click();
			dropdownRef.current.focus();
		}
	});

	// Handle chaning the content justification of the table.
	const onChangeContentJustification = (value: ContentJustifyValue) => {
		const newValue = contentJustification === value ? undefined : value;
		setAttributes({ contentJustification: newValue });
	};

	// Handle inserting a row into the table.
	const onInsertRow = (offset: number) => {
		if (!selectedCells || selectedCells.length !== 1) {
			return;
		}

		const { sectionName, rowIndex, rowSpan } = selectedCells[0];

		// Calculate row index to be inserted considering rowspan of the selected cell.
		const insertRowIndex =
			offset === 0 ? rowIndex : rowIndex + offset + rowSpan - 1;

		const newVTable = insertRow(vTable, {
			sectionName,
			rowIndex: insertRowIndex,
		});

		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	// Handle deleting a row from the table.
	const onDeleteRow = () => {
		if (!selectedCells || selectedCells.length !== 1) {
			return;
		}

		const { sectionName, rowIndex } = selectedCells[0];

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

	// Handle inserting a column into the table.
	const onInsertColumn = (offset: number) => {
		if (!selectedCells || selectedCells.length !== 1) {
			return;
		}

		const { vColIndex, colSpan } = selectedCells[0];

		// Calculate column index to be inserted considering colspan of the selected cell.
		const insertVColIndex =
			offset === 0 ? vColIndex : vColIndex + offset + colSpan - 1;

		const newVTable = insertColumn(vTable, { vColIndex: insertVColIndex });

		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	// Handle deleting a column from the table.
	const onDeleteColumn = () => {
		if (!selectedCells || selectedCells.length !== 1) {
			return;
		}

		const { vColIndex } = selectedCells[0];

		const newVTable = deleteColumn(vTable, { vColIndex });
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	// Handle merging cells in the table.
	const onMergeCells = () => {
		const newVTable = mergeCells(vTable, selectedCells, true);
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	// Handle splitting merged cells in the table.
	const onSplitMergedCells = () => {
		const newVTable = splitMergedCells(vTable, selectedCells);
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	// Create a list of controls for the content justification dropdown.
	const TableJustifyControls = CONTENT_JUSTIFY_CONTROLS.map(
		({ icon, label, value }) => ({
			icon,
			title: label,
			isActive: contentJustification === value,
			value,
			onClick: () => onChangeContentJustification(value),
		})
	);

	// Create a list of controls for the table edit dropdown.
	const TableEditControls = [
		{
			icon: tableRowBefore,
			title: __('Insert row before', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onInsertRow(0),
		},
		{
			icon: tableRowAfter,
			title: __('Insert row after', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onInsertRow(1),
		},
		{
			icon: tableRowDelete,
			title: __('Delete row', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onDeleteRow(),
		},
		{
			icon: tableColumnBefore,
			title: __('Insert column before', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onInsertColumn(0),
		},
		{
			icon: tableColumnAfter,
			title: __('Insert column after', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onInsertColumn(1),
		},
		{
			icon: tableColumnDelete,
			title: __('Delete column', 'flexible-table-block'),
			isDisabled: (selectedCells || []).length !== 1,
			onClick: () => onDeleteColumn(),
		},
		{
			icon: tableSplitCell,
			title: __('Split merged cells', 'flexible-table-block'),
			isDisabled: !selectedCells || !hasMergedCells(selectedCells),
			onClick: () => onSplitMergedCells(),
		},
		{
			icon: tableMergeCell,
			title: __('Merge cells', 'flexible-table-block'),
			isDisabled: !selectedCells || !isRectangleSelected(selectedCells),
			onClick: () => onMergeCells(),
		},
	];

	return (
		<>
			<ToolbarDropdownMenu
				label={__('Change table justification', 'flexible-table-block')}
				icon={
					(contentJustification &&
						TableJustifyControls.find(
							(control) => control.value === contentJustification
						)?.icon) ||
					justifyLeft
				}
				controls={TableJustifyControls}
			/>
			<ToolbarDropdownMenu
				id="table-edit-dropdown"
				label={__('Edit table', 'flexible-table-block')}
				icon={blockTable}
				controls={TableEditControls}
				ref={dropdownRef}
			/>
			<GenerateAiToolbarControls
				attributes={attributes}
				setAttributes={setAttributes}
			/>
		</>
	);
}
