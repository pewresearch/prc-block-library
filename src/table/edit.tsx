/**
 * External dependencies
 */
import React from 'react';
import clsx from 'clsx';
import type { Properties } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	InspectorControls,
	BlockControls,
	useBlockProps,
	// @ts-ignore: has no exported member
	useBlockEditingMode,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import { STORE_NAME, type StoreOptions } from './store';
import {
	TableSettings,
	TableCaptionSettings,
	TableCellSettings,
	TableToolbar,
	TableDataSettings,
	TableDataDropzone,
	TableTitleSettings,
} from './settings';
import {
	Table,
	TablePlaceholder,
	TableCaption,
	TableTitle,
	TableSourceNote,
} from './elements';
import {
	toVirtualTable,
	isEmptySection,
	type VTable,
	type VSelectedLine,
	type VSelectedCells,
} from './utils/table-state';
import { convertToObject } from './utils/style-converter';
import type { BlockAttributes, SectionName } from './block-attributes';

// eslint-disable-next-line max-lines-per-function
function TableEdit(props: BlockEditProps<BlockAttributes>) {
	const {
		attributes,
		setAttributes,
		isSelected: isSingleSelected, // cast as isSingleSelected because isSelected is used below.
		// @ts-ignore: `insertBlocksAfter` prop is not exist at @types
		insertBlocksAfter,
		clientId,
	} = props;
	const {
		contentJustification,
		tableStyles,
		captionStyles,
		captionSide,
		tableTitleStyles,
	} = attributes;

	// Manage cell(s) and line(row) selection.
	const [selectedCells, setSelectedCells] =
		useState<VSelectedCells>(undefined);
	const [selectedLine, setSelectedLine] = useState<VSelectedLine>(undefined);

	// Setup Styles for the <table> element.
	const tableStylesObj: Properties = convertToObject(tableStyles);

	// Setup Styles for the <h4> element.
	const tableTitleStylesObj: Properties = convertToObject(tableTitleStyles);

	// Setup Styles for the <figcaption> element.
	const captionStylesObj: Properties = convertToObject(captionStyles);

	// Get options from the store.
	const options = useSelect((select) => {
		const { getOptions }: { getOptions: () => StoreOptions } =
			select(STORE_NAME);
		return getOptions();
	}, []);

	// Get the block editing mode.
	const blockEditingMode = useBlockEditingMode();

	// Check if the block is in content only mode.
	const isContentOnlyMode = blockEditingMode === 'contentOnly';

	// Release cell selection when the block is not selected.
	useEffect(() => {
		if (!isSingleSelected) {
			setSelectedCells(undefined);
			setSelectedLine(undefined);
		}
	}, [isSingleSelected]);

	// Create virtual table object with the cells placed in positions based on how they actually look.
	const vTable: VTable = toVirtualTable(attributes);

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

	const tableTitleSettingProps = {
		attributes,
		setAttributes,
		tableTitleStylesObj,
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

	const tableSourceNoteProps = {
		attributes,
		setAttributes,
		insertBlocksAfter,
		setSelectedLine,
		setSelectedCells,
		isSelected: isSingleSelected,
	};

	const tableTitleProps = {
		attributes,
		setAttributes,
		setSelectedLine,
		setSelectedCells,
		isSelected: isSingleSelected,
		tableTitleStylesObj,
	};

	const tableToolbarProps = {
		contentJustification,
		vTable,
		attributes,
		selectedCells,
		setAttributes,
		setSelectedCells,
		setSelectedLine,
		clientId,
	};

	const tableDataSettingsProps = {
		attributes,
		setAttributes,
		vTable,
		selectedCells,
	};

	return (
		<>
			{isEmpty && (
				<div {...tablePlaceholderProps}>
					<TablePlaceholder {...props} />
				</div>
			)}
			{!isEmpty && (
				<>
					{!isContentOnlyMode && (
						<BlockControls group="block">
							<TableToolbar {...tableToolbarProps} />
						</BlockControls>
					)}
					<InspectorControls>
						<PanelBody
							title={__('Table data', 'flexible-table-block')}
							initialOpen={false}
						>
							<TableDataSettings {...tableDataSettingsProps} />
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
							title={__('Title settings', 'prc-block-library')}
							initialOpen={false}
						>
							<TableTitleSettings {...tableTitleSettingProps} />
						</PanelBody>
						<PanelBody
							title={__('Caption settings', 'prc-block-library')}
							initialOpen={false}
						>
							<TableCaptionSettings
								{...tableCaptionSettingProps}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			)}
			{!isEmpty && (
				<figure {...tableFigureProps}>
					<TableTitle {...tableTitleProps} />
					{'top' === captionSide && (
						<TableCaption {...tableCaptionProps} />
					)}
					<Table {...tableProps} />
					{'bottom' === captionSide && (
						<TableCaption {...tableCaptionProps} />
					)}
					<TableSourceNote {...tableSourceNoteProps} />
					<TableDataDropzone
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</figure>
			)}
		</>
	);
}

export default TableEdit;
