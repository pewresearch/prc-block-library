/**
 * External dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	InspectorControls,
	BlockControls,
	useBlockProps,
	// @ts-ignore: has no exported member
	useBlockEditingMode,
} from '@wordpress/block-editor';
import {
	ToolbarDropdownMenu,
	PanelBody,
	PanelRow,
	Button,
	DropZone,
} from '@wordpress/components';
import { blockTable, justifyLeft } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import { handleCSV, exportCSV } from './csv-parser';
import { CONTENT_JUSTIFY_CONTROLS } from './constants';
import { STORE_NAME, type StoreOptions } from './store';
import {
	TableSettings,
	TableCaptionSettings,
	TableCellSettings,
} from './settings';
import { Table, TablePlaceholder, TableCaption } from './elements';
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
	toVirtualTable,
	isEmptySection,
	type VTable,
	type VSelectedLine,
	type VSelectedCells,
} from './utils/table-state';
import { convertToObject } from './utils/style-converter';
import {
	tableRowAfter,
	tableRowBefore,
	tableColumnBefore,
	tableColumnAfter,
	tableColumnDelete,
	tableRowDelete,
	tableMergeCell,
	tableSplitCell,
} from './icons';
import type {
	BlockAttributes,
	SectionName,
	ContentJustifyValue,
} from './block-attributes';

// eslint-disable-next-line max-lines-per-function
function TableEdit(props: BlockEditProps<BlockAttributes>) {
	const {
		attributes,
		setAttributes,
		isSelected: isSingleSelected,
		// @ts-ignore: `insertBlocksAfter` prop is not exist at @types
		insertBlocksAfter,
	} = props;
	const { contentJustification, tableStyles, captionStyles, captionSide } =
		attributes;
	const [selectedCells, setSelectedCells] =
		useState<VSelectedCells>(undefined);
	const [selectedLine, setSelectedLine] = useState<VSelectedLine>(undefined);

	const tableStylesObj: Properties = convertToObject(tableStyles);
	const captionStylesObj: Properties = convertToObject(captionStyles);
	const options = useSelect((select) => {
		const { getOptions }: { getOptions: () => StoreOptions } =
			select(STORE_NAME);
		return getOptions();
	}, []);
	const { createWarningNotice } = useDispatch(noticesStore);
	const blockEditingMode = useBlockEditingMode();
	const isContentOnlyMode = blockEditingMode === 'contentOnly';
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	// Release cell selection.
	useEffect(() => {
		if (!isSingleSelected) {
			setSelectedCells(undefined);
			setSelectedLine(undefined);
		}
	}, [isSingleSelected]);

	// Create virtual table object with the cells placed in positions based on how they actually look.
	const vTable: VTable = toVirtualTable(attributes);

	const onChangeContentJustification = (value: ContentJustifyValue) => {
		const newValue = contentJustification === value ? undefined : value;
		setAttributes({ contentJustification: newValue });
	};

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

	const onMergeCells = () => {
		const newVTable = mergeCells(
			vTable,
			selectedCells,
			options.merge_content
		);
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const onSplitMergedCells = () => {
		const newVTable = splitMergedCells(vTable, selectedCells);
		setAttributes(toTableAttributes(newVTable));
		setSelectedCells(undefined);
		setSelectedLine(undefined);
	};

	const TableJustifyControls = CONTENT_JUSTIFY_CONTROLS.map(
		({ icon, label, value }) => ({
			icon,
			title: label,
			isActive: contentJustification === value,
			value,
			onClick: () => onChangeContentJustification(value),
		})
	);

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

	const isEmpty: boolean = !['head', 'body', 'foot'].filter(
		(sectionName) => !isEmptySection(vTable[sectionName as SectionName])
	).length;

	const tablePlaceholderProps = useBlockProps();

	const tableFigureProps = useBlockProps({
		className: clsx(`is-caption-side-${captionSide}`, {
			[`is-content-justification-${contentJustification}`]:
				contentJustification,
			'show-dot-on-th': options.show_dot_on_th,
			'show-control-button': options.show_control_button,
			'is-content-only': isContentOnlyMode,
		}),
	});

	const tableProps = {
		attributes,
		setAttributes,
		isSelected: isSingleSelected,
		options,
		vTable,
		tableStylesObj,
		selectedCells,
		setSelectedCells,
		selectedLine,
		setSelectedLine,
		isContentOnlyMode,
	};

	const tableSettingsProps = {
		attributes,
		setAttributes,
		vTable,
		setSelectedCells,
		setSelectedLine,
		tableStylesObj,
	};

	const tableCellSettingsProps = {
		setAttributes,
		vTable,
		selectedCells,
	};

	const tableCellSettingsLabel: string =
		selectedCells && selectedCells.length > 1
			? __('Multi cells settings', 'flexible-table-block')
			: __('Cell settings', 'flexible-table-block');

	const tableCaptionProps = {
		attributes,
		setAttributes,
		insertBlocksAfter,
		setSelectedLine,
		setSelectedCells,
		captionStylesObj,
		isSelected: isSingleSelected,
	};

	const tableCaptionSettingProps = {
		attributes,
		setAttributes,
		captionStylesObj,
	};

	return (
		<>
			{isEmpty && (
				<div {...tablePlaceholderProps}>
					<TablePlaceholder {...props} />
				</div>
			)}
			{!isEmpty && (
				<figure {...tableFigureProps}>
					{!isContentOnlyMode && (
						<BlockControls group="block">
							<ToolbarDropdownMenu
								label={__(
									'Change table justification',
									'flexible-table-block'
								)}
								icon={
									(contentJustification &&
										TableJustifyControls.find(
											(control) =>
												control.value ===
												contentJustification
										)?.icon) ||
									justifyLeft
								}
								controls={TableJustifyControls}
							/>
							<ToolbarDropdownMenu
								label={__('Edit table', 'flexible-table-block')}
								icon={blockTable}
								controls={TableEditControls}
							/>
						</BlockControls>
					)}
					<InspectorControls>
						<PanelBody title="Table data" initialOpen={false}>
							<PanelRow>
								<Button
									variant="secondary"
									onClick={() => {
										hiddenFileInput.current.click();
									}}
									help={__(
										"Import a CSV file to replace this table's data.",
										'prc-block-library'
									)}
								>
									{__(`Import CSV`, 'prc-block-library')}
								</Button>
								<input
									ref={hiddenFileInput}
									type="file"
									accept="text/csv"
									onChange={(e) =>
										handleCSV(
											e.target.files,
											attributes,
											setAttributes
										)
									}
									style={{ display: 'none' }}
								/>
								<DropZone
									label="Drop a CSV file here to replace this table's data."
									onFilesDrop={(droppedFiles) =>
										handleCSV(
											droppedFiles,
											attributes,
											setAttributes
										)
									}
								/>
							</PanelRow>
							<PanelRow>
								<Button
									variant="secondary"
									onClick={() => {
										const csv = exportCSV(attributes);
										console.log('csv...', csv);
										const blob = new Blob([csv], {
											type: 'text/csv',
										});
										const url = URL.createObjectURL(blob);
										const a = document.createElement('a');
										a.href = url;
										a.download = 'table.csv';
										a.click();
									}}
								>
									{__('Export CSV', 'prc-block-library')}
								</Button>
							</PanelRow>
						</PanelBody>
						<PanelBody
							title={__('Table settings', 'flexible-table-block')}
							initialOpen={false}
						>
							<TableSettings {...tableSettingsProps} />
						</PanelBody>
						{selectedCells && !!selectedCells.length && (
							<PanelBody
								title={tableCellSettingsLabel}
								initialOpen={false}
							>
								<TableCellSettings
									{...tableCellSettingsProps}
								/>
							</PanelBody>
						)}
						<PanelBody
							title={__(
								'Caption settings',
								'flexible-table-block'
							)}
							initialOpen={false}
						>
							<TableCaptionSettings
								{...tableCaptionSettingProps}
							/>
						</PanelBody>
					</InspectorControls>
					{'top' === captionSide && (
						<TableCaption {...tableCaptionProps} />
					)}
					<Table {...tableProps} />
					{'bottom' === captionSide && (
						<TableCaption {...tableCaptionProps} />
					)}
					<DropZone
						label="Drop a CSV file here to replace this table's data."
						onFilesDrop={(droppedFiles) =>
							handleCSV(droppedFiles, attributes, setAttributes)
						}
					/>
				</figure>
			)}
		</>
	);
}

export default TableEdit;
