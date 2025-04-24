/**
 * External Dependencies
 */
import clsx from 'clsx';
import type { FormEvent } from 'react';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, createInterpolateElement } from '@wordpress/element';
import { BlockIcon } from '@wordpress/block-editor';
import {
	Button,
	Placeholder,
	TextControl,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalSpacer as Spacer,
	__experimentalText as Text,
} from '@wordpress/components';
import { isAppleOS } from '@wordpress/keycodes';

/**
 * Internal Dependencies
 */
import {
	DEFAULT_PREVIEW_ROWS,
	DEFAULT_PREVIEW_COLUMNS,
	MIN_PREVIEW_TABLE_HEIGHT,
	MAX_PREVIEW_TABLE_COL,
	MAX_PREVIEW_TABLE_ROW,
	THRESHOLD_PREVIEW_TABLE_COL,
	THRESHOLD_PREVIEW_TABLE_ROW,
} from '../constants';
import {
	createTable,
	toTableAttributes,
	type VTable,
} from '../utils/table-state';
import { blockIcon as icon } from '../icons';
import type { BlockAttributes } from '../block-attributes';

type Props = {
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
};

/* eslint-disable max-lines-per-function */
export default function TablePlaceholder({ setAttributes }: Props) {
	const [rowCount, setRowCount] = useState<number | undefined>(
		DEFAULT_PREVIEW_ROWS
	);
	const [colCount, setColCount] = useState<number | undefined>(
		DEFAULT_PREVIEW_COLUMNS
	);
	const [headerSection, setHeaderSection] = useState<boolean>(false);
	const [footerSection, setFooterSection] = useState<boolean>(false);

	const totalRowCount: number | undefined = rowCount
		? rowCount + Number(headerSection) + Number(footerSection)
		: undefined;
	const cellHeight: number | undefined = totalRowCount
		? Number(
				MIN_PREVIEW_TABLE_HEIGHT /
					Math.min(THRESHOLD_PREVIEW_TABLE_ROW, totalRowCount)
			)
		: undefined;

	const onCreateTable = (event: FormEvent) => {
		event.preventDefault();

		if (!rowCount || !colCount) {
			return;
		}

		const vTable: VTable = createTable({
			rowCount: Math.min(rowCount, MAX_PREVIEW_TABLE_ROW),
			colCount: Math.min(colCount, MAX_PREVIEW_TABLE_COL),
			headerSection,
			footerSection,
		});

		setAttributes(toTableAttributes(vTable));
	};

	const onChangeColumnCount = (value: string) => {
		const parsedValue = parseInt(value, 10);
		if (isNaN(parsedValue)) {
			setColCount(undefined);
		} else {
			setColCount(
				Math.max(1, Math.min(MAX_PREVIEW_TABLE_COL, parsedValue))
			);
		}
	};

	const onChangeRowCount = (value: string) => {
		const parsedValue = parseInt(value);
		if (isNaN(parsedValue)) {
			setRowCount(undefined);
		} else {
			setRowCount(
				Math.max(1, Math.min(MAX_PREVIEW_TABLE_ROW, parsedValue))
			);
		}
	};

	const onToggleHeaderSection = (section: boolean) =>
		setHeaderSection(section);

	const onToggleFooterSection = (section: boolean) =>
		setFooterSection(section);

	const tableClasses: string = clsx('ftb-placeholder__table', {
		'is-overflow-row':
			totalRowCount && totalRowCount > THRESHOLD_PREVIEW_TABLE_ROW,
		'is-overflow-col': colCount && colCount > THRESHOLD_PREVIEW_TABLE_COL,
	});

	return (
		<Placeholder
			label={__('Table', 'prc-block')}
			className="ftb-placeholder"
			icon={<BlockIcon icon={icon} showColors />}
		>
			<div className="components-placeholder__instructions">
				{createInterpolateElement(
					isAppleOS()
						? __(
								'Hint: Hold <code>Command</code> key to select multiple cells. Hold <code>Shift</code> key to select the range.',
								'prc-block'
							)
						: __(
								'Hint: Hold <code>Ctrl</code> key to select multiple cells. Hold <code>Shift</code> key to select the range.',
								'prc-block'
							),
					{ code: <code /> }
				)}
			</div>
			<Spacer
				as={VStack}
				className="ftb-placeholder__table-wrap"
				style={{ minHeight: MIN_PREVIEW_TABLE_HEIGHT }}
				alignment="center"
				padding={4}
				marginBottom={0}
			>
				<Text align="center" isBlock weight="500">
					{__('Preview', 'prc-block')}
				</Text>
				{rowCount && colCount && (
					<table className={tableClasses}>
						{headerSection && (
							<thead>
								<tr>
									{Array.from({
										length: Math.min(
											colCount,
											THRESHOLD_PREVIEW_TABLE_COL
										),
									}).map((_col, colIndex) => (
										<th
											key={colIndex}
											style={{ height: cellHeight }}
										/>
									))}
								</tr>
							</thead>
						)}
						<tbody>
							{Array.from({
								length: Math.min(
									rowCount,
									THRESHOLD_PREVIEW_TABLE_ROW
								),
							}).map((_row, rowIndex) => (
								<tr key={rowIndex}>
									{Array.from({
										length: Math.min(
											colCount,
											THRESHOLD_PREVIEW_TABLE_COL
										),
									}).map((_col, colIndex) => (
										<td
											key={colIndex}
											style={{ height: cellHeight }}
										/>
									))}
								</tr>
							))}
						</tbody>
						{footerSection && (
							<tfoot>
								<tr>
									{Array.from({
										length: Math.min(
											colCount,
											THRESHOLD_PREVIEW_TABLE_COL
										),
									}).map((_col, colIndex) => (
										<td
											key={colIndex}
											style={{ height: cellHeight }}
										/>
									))}
								</tr>
							</tfoot>
						)}
					</table>
				)}
			</Spacer>
			<VStack as="form" onSubmit={onCreateTable}>
				<HStack wrap justify="start">
					<ToggleControl
						label={__('Header section', 'prc-block')}
						checked={!!headerSection}
						onChange={onToggleHeaderSection}
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={__('Footer section', 'prc-block')}
						checked={!!footerSection}
						onChange={onToggleFooterSection}
						__nextHasNoMarginBottom
					/>
				</HStack>
				<HStack wrap alignment="end" justify="start">
					<TextControl
						label={__('Column count', 'prc-block')}
						className="ftb-placeholder__input"
						type="number"
						min="1"
						max={MAX_PREVIEW_TABLE_COL}
						value={colCount || ''}
						onChange={onChangeColumnCount}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<TextControl
						label={__('Row count', 'prc-block')}
						className="ftb-placeholder__input"
						type="number"
						min="1"
						max={MAX_PREVIEW_TABLE_ROW}
						value={rowCount || ''}
						onChange={onChangeRowCount}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<Button
						variant="primary"
						type="submit"
						disabled={!rowCount || !colCount}
						__next40pxDefaultSize
					>
						{__('Create Table', 'prc-block')}
					</Button>
				</HStack>
			</VStack>
		</Placeholder>
	);
}
