/**
 * External Dependencies
 */
import type { Property } from 'csstype';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Flex,
	FlexBlock,
	SelectControl,
	TextControl,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
	FONT_SIZE_UNITS,
	CELL_WIDTH_UNITS,
	CELL_TAG_CONTROLS,
	CELL_SCOPE_CONTROLS,
	TEXT_ALIGNMENT_CONTROLS,
	VERTICAL_ALIGNMENT_CONTROLS,
} from '../constants';
import {
	BorderRadiusControl,
	BorderWidthControl,
	BorderStyleControl,
	BorderColorControl,
	PaddingControl,
	ColorControl,
} from '../controls';
import {
	toTableAttributes,
	updateCells,
	type VTable,
	type VSelectedCells,
} from '../utils/table-state';
import { convertToObject } from '../utils/style-converter';
import {
	pickPadding,
	pickBorderWidth,
	pickBorderRadius,
	pickBorderStyle,
	pickBorderColor,
	type CornerProps,
	type DirectionProps,
} from '../utils/style-picker';
import { sanitizeUnitValue } from '../utils/helper';
import type {
	CellTagValue,
	CellScopeValue,
	SectionName,
	BlockAttributes,
} from '../block-attributes';

const PERCENTAGE_WIDTHS = [25, 50, 75, 100];

type Props = {
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	vTable: VTable;
	selectedCells: VSelectedCells;
};

/* eslint-disable max-lines-per-function */
export default function TableCellSettings({
	setAttributes,
	vTable,
	selectedCells = [],
}: Props) {
	const cellWidthUnits = useCustomUnits({ availableUnits: CELL_WIDTH_UNITS });
	const fontSizeUnits = useCustomUnits({ availableUnits: FONT_SIZE_UNITS });

	if (!selectedCells.length) {
		return null;
	}

	const { sectionName, rowIndex, vColIndex } = selectedCells[0];

	const targetCell =
		vTable[sectionName as SectionName][rowIndex].cells[vColIndex];

	if (!targetCell) {
		return null;
	}

	const selectedCellTags = selectedCells.reduce(
		(result: CellTagValue[], selectedCell) => {
			const { tag } =
				vTable[selectedCell.sectionName][selectedCell.rowIndex].cells[
					selectedCell.vColIndex
				];
			if (!result.includes(tag)) {
				result.push(tag);
			}
			return result;
		},
		[]
	);

	const cellStylesObj = convertToObject(targetCell.styles);
	const [parsedWidthQuantity, parsedWidthUnit] =
		parseQuantityAndUnitFromRawValue(cellStylesObj?.width);

	const updateCellsState = (state: {
		styles?: any;
		tag?: CellTagValue;
		className?: string;
		id?: string;
		headers?: string;
		scope?: CellScopeValue;
	}) => {
		const newVTable = updateCells(vTable, state, selectedCells);
		setAttributes(toTableAttributes(newVTable));
	};

	const onChangeFontSize = (value: string | undefined) => {
		updateCellsState({ styles: { fontSize: sanitizeUnitValue(value) } });
	};

	const onChangeLineHeight = (value: Property.LineHeight) => {
		updateCellsState({ styles: { lineHeight: value } });
	};

	const onChangeColor = (value: Property.Color) => {
		updateCellsState({ styles: { color: value } });
	};

	const onChangeBackgroundColor = (value: Property.BackgroundColor) => {
		updateCellsState({ styles: { backgroundColor: value } });
	};

	const onChangeWidth = (value: string | number | undefined) => {
		updateCellsState({ styles: { width: sanitizeUnitValue(value) } });
	};

	const onChangePadding = (values: Partial<DirectionProps>) => {
		updateCellsState({ styles: { padding: values } });
	};

	const onChangeBorderWidth = (values: Partial<DirectionProps>) => {
		updateCellsState({ styles: { borderWidth: values } });
	};

	const onChangeBorderRadius = (values: Partial<CornerProps>) => {
		updateCellsState({ styles: { borderRadius: values } });
	};

	const onChangeBorderStyle = (values: Partial<DirectionProps>) => {
		updateCellsState({ styles: { borderStyle: values } });
	};

	const onChangeBorderColor = (values: Partial<DirectionProps>) => {
		updateCellsState({ styles: { borderColor: values } });
	};

	const onChangeTextAlign = (value: string | number | undefined) => {
		updateCellsState({
			styles: {
				textAlign:
					value === cellStylesObj.textAlign ? undefined : value,
			},
		});
	};

	const onChangeVerticalAlign = (value: string | number | undefined) => {
		updateCellsState({
			styles: {
				verticalAlign:
					value === cellStylesObj.verticalAlign ? undefined : value,
			},
		});
	};

	const onChangeTag = (value: string | number | undefined) => {
		const isAllowedTag = (_value: any): _value is CellTagValue => {
			return CELL_TAG_CONTROLS.some(
				(control) => control.value === _value
			);
		};
		if (isAllowedTag(value)) {
			updateCellsState({
				tag: value,
				id: undefined,
				headers: undefined,
				scope: undefined,
			});
		}
	};

	const onChangeClass = (value: string) => {
		updateCellsState({ className: value !== '' ? value : undefined });
	};

	const onChangeId = (value: string) => {
		updateCellsState({ id: value !== '' ? value : undefined });
	};

	const onChangeHeaders = (value: string) => {
		updateCellsState({ headers: value !== '' ? value : undefined });
	};

	const onChangeScope = (value: CellScopeValue) => {
		updateCellsState({ scope: 'none' === value ? undefined : value });
	};

	const onResetCellSettings = () => {
		updateCellsState({
			styles: {
				fontSize: undefined,
				lineHeight: undefined,
				width: undefined,
				color: undefined,
				backgroundColor: undefined,
				padding: {
					top: undefined,
					right: undefined,
					bottom: undefined,
					left: undefined,
				},
				borderRadius: {
					topLeft: undefined,
					topRight: undefined,
					bottomRight: undefined,
					bottomLeft: undefined,
				},
				borderWidth: {
					top: undefined,
					right: undefined,
					bottom: undefined,
					left: undefined,
				},
				borderStyle: {
					top: undefined,
					right: undefined,
					bottom: undefined,
					left: undefined,
				},
				borderColor: {
					top: undefined,
					right: undefined,
					bottom: undefined,
					left: undefined,
				},
				textAlign: undefined,
				verticalAlign: undefined,
			},
			className: undefined,
			id: undefined,
			headers: undefined,
			scope: undefined,
		});
	};

	return (
		<>
			<Spacer marginBottom="4" as={Flex} justify="end">
				<Button
					variant="link"
					isDestructive
					onClick={onResetCellSettings}
				>
					{__('Clear cell settings', 'flexible-table-block')}
				</Button>
			</Spacer>
			<Spacer marginBottom="4" as={Flex}>
				<FlexBlock>
					<UnitControl
						label={__('Cell font size', 'flexible-table-block')}
						value={cellStylesObj?.fontSize}
						units={fontSizeUnits}
						min={0}
						onChange={onChangeFontSize}
						size="__unstable-large"
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						label={__('Cell line height', 'flexible-table-block')}
						value={cellStylesObj?.lineHeight || ''}
						autoComplete="off"
						type="number"
						step={0.1}
						min={0}
						onChange={onChangeLineHeight}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</FlexBlock>
			</Spacer>
			<HStack alignment="start">
				<UnitControl
					label={__('Cell width', 'flexible-table-block')}
					value={cellStylesObj?.width}
					units={cellWidthUnits}
					min={0}
					onChange={onChangeWidth}
					size="__unstable-large"
					__unstableInputWidth="calc(50% - 8px)"
				/>
				<Button
					variant="secondary"
					size="small"
					onClick={() => onChangeWidth(undefined)}
				>
					{__('Reset', 'flexible-table-block')}
				</Button>
			</HStack>
			<ToggleGroupControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				hideLabelFromVision
				label={__('Cell percentage width', 'flexible-table-block')}
				isBlock
				value={
					parsedWidthQuantity &&
					PERCENTAGE_WIDTHS.includes(parsedWidthQuantity) &&
					parsedWidthUnit === '%'
						? cellStylesObj?.width
						: undefined
				}
				onChange={(value) => onChangeWidth(value as Property.Width)}
			>
				{PERCENTAGE_WIDTHS.map((perWidth) => {
					return (
						<ToggleGroupControlOption
							key={perWidth}
							label={`${perWidth}%`}
							value={`${perWidth}%`}
						/>
					);
				})}
			</ToggleGroupControl>
			<hr />
			<ColorControl
				label={__('Cell text color', 'flexible-table-block')}
				value={cellStylesObj.color}
				onChange={onChangeColor}
			/>
			<ColorControl
				label={__('Cell background color', 'flexible-table-block')}
				value={cellStylesObj.backgroundColor}
				colors={[
					{
						name: __('Transparent', 'flexible-table-block'),
						slug: 'transparent',
						color: 'transparent',
					},
				]}
				onChange={onChangeBackgroundColor}
			/>
			<hr />
			<PaddingControl
				label={__('Cell padding', 'flexible-table-block')}
				values={pickPadding(cellStylesObj)}
				onChange={onChangePadding}
			/>
			<hr />
			<BorderRadiusControl
				label={__('Cell border radius', 'flexible-table-block')}
				values={pickBorderRadius(cellStylesObj)}
				onChange={onChangeBorderRadius}
			/>
			<BorderWidthControl
				label={__('Cell border width', 'flexible-table-block')}
				values={pickBorderWidth(cellStylesObj)}
				onChange={onChangeBorderWidth}
			/>
			<BorderStyleControl
				label={__('Cell border style', 'flexible-table-block')}
				values={pickBorderStyle(cellStylesObj)}
				onChange={onChangeBorderStyle}
			/>
			<BorderColorControl
				label={__('Cell border color', 'flexible-table-block')}
				values={pickBorderColor(cellStylesObj)}
				onChange={onChangeBorderColor}
			/>
			<hr />
			<BaseControl
				id="flexible-table-block-cell-text-align"
				__nextHasNoMarginBottom
			>
				<div
					aria-labelledby="flexible-table-block-cell-text-align-heading"
					role="group"
				>
					<span
						id="flexible-table-block-cell-text-align-heading"
						className="ftb-base-control-label"
					>
						{__('Cell alignment', 'flexible-table-block')}
					</span>
					<Flex
						style={{ marginBottom: '-16px' }}
						justify="start"
						align="start"
					>
						<ToggleGroupControl
							hideLabelFromVision
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={__('Text alignment', 'flexible-table-block')}
							value={cellStylesObj?.textAlign}
							isDeselectable
							onChange={onChangeTextAlign}
						>
							{TEXT_ALIGNMENT_CONTROLS.map(
								({ icon, label, value }) => (
									<ToggleGroupControlOptionIcon
										key={value}
										value={value}
										icon={icon}
										label={label}
									/>
								)
							)}
						</ToggleGroupControl>
						<ToggleGroupControl
							hideLabelFromVision
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={__(
								'Vertical alignment',
								'flexible-table-block'
							)}
							value={cellStylesObj?.verticalAlign}
							isDeselectable
							onChange={onChangeVerticalAlign}
						>
							{VERTICAL_ALIGNMENT_CONTROLS.map(
								({ icon, label, value }) => (
									<ToggleGroupControlOptionIcon
										key={value}
										value={value}
										icon={icon}
										label={label}
									/>
								)
							)}
						</ToggleGroupControl>
					</Flex>
				</div>
			</BaseControl>
			<hr />
			<ToggleGroupControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={__('Cell tag', 'flexible-table-block')}
				value={targetCell.tag}
				isBlock
				onChange={onChangeTag}
			>
				{CELL_TAG_CONTROLS.map(({ label, value }) => (
					<ToggleGroupControlOption
						key={value}
						value={value}
						label={label}
					/>
				))}
			</ToggleGroupControl>
			<TextControl
				label={__('Cell CSS class(es)', 'flexible-table-block')}
				autoComplete="off"
				value={targetCell.className || ''}
				onChange={onChangeClass}
				help={__(
					'Separate multiple classes with spaces.',
					'flexible-table-block'
				)}
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			/>
			{selectedCellTags.length === 1 && (
				<>
					<hr />
					{selectedCellTags.includes('th') && (
						<TextControl
							label={createInterpolateElement(
								__(
									'<code>id</code> attribute',
									'flexible-table-block'
								),
								{ code: <code /> }
							)}
							autoComplete="off"
							value={targetCell.id || ''}
							onChange={onChangeId}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					)}
					<TextControl
						label={createInterpolateElement(
							__(
								'<code>headers</code> attribute',
								'flexible-table-block'
							),
							{ code: <code /> }
						)}
						autoComplete="off"
						value={targetCell.headers || ''}
						onChange={onChangeHeaders}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					{selectedCellTags.includes('th') && (
						<SelectControl
							label={createInterpolateElement(
								__(
									'<code>scope</code> attribute',
									'flexible-table-block'
								),
								{ code: <code /> }
							)}
							value={targetCell.scope}
							options={CELL_SCOPE_CONTROLS.map(
								({ label, value }) => {
									return { label, value };
								}
							)}
							onChange={(value) =>
								onChangeScope(value as CellScopeValue)
							}
							size="__unstable-large"
							__nextHasNoMarginBottom
						/>
					)}
				</>
			)}
		</>
	);
}
