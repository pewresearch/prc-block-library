/**
 * External Dependencies
 */
import type { Property, Properties } from 'csstype';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Flex,
	FlexBlock,
	TextControl,
	__experimentalSpacer as Spacer,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { FONT_SIZE_UNITS, TEXT_ALIGNMENT_CONTROLS } from '../constants';
import { PaddingControl } from '../controls';
import { convertToInline } from '../utils/style-converter';
import { pickPadding, type DirectionProps } from '../utils/style-picker';
import { updatePadding } from '../utils/style-updater';
import { sanitizeUnitValue } from '../utils/helper';
import type { BlockAttributes } from '../block-attributes';

type Props = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	tableTitleStylesObj: Properties;
};

/* eslint-disable max-lines-per-function */
export default function TableTitleSettings({
	attributes,
	setAttributes,
	tableTitleStylesObj,
}: Props) {
	const fontSizeUnits = useCustomUnits({ availableUnits: FONT_SIZE_UNITS });

	const onChangeFontSize = (value: Property.FontSize | undefined) => {
		const newStylesObj = {
			...tableTitleStylesObj,
			fontSize: sanitizeUnitValue(value),
		};
		setAttributes({ tableTitleStyles: convertToInline(newStylesObj) });
	};

	const onChangeLineHeight = (value: Property.LineHeight) => {
		const newStylesObj = {
			...tableTitleStylesObj,
			lineHeight: value,
		};
		setAttributes({ tableTitleStyles: convertToInline(newStylesObj) });
	};

	const onChangePadding = (values: DirectionProps) => {
		const newStylesObj = updatePadding(tableTitleStylesObj, values);
		setAttributes({ tableTitleStyles: convertToInline(newStylesObj) });
	};

	const onChangeAlign = (value: string | number | undefined) => {
		const isAllowedValue = (
			_value: any
		): _value is Properties['textAlign'] => {
			return (
				!value ||
				TEXT_ALIGNMENT_CONTROLS.some(
					(control) => control.value === _value
				)
			);
		};
		if (isAllowedValue(value)) {
			const newStylesObj = {
				...tableTitleStylesObj,
				textAlign:
					value === tableTitleStylesObj.textAlign ? undefined : value,
			};
			setAttributes({
				tableTitleStyles: convertToInline(newStylesObj),
			});
		}
	};

	const onResetSettings = () => {
		setAttributes({
			tableTitleStyles: undefined,
		});
	};

	return (
		<>
			<Spacer marginBottom="4" as={Flex} justify="end">
				<Button variant="link" isDestructive onClick={onResetSettings}>
					{__('Clear caption settings', 'flexible-table-block')}
				</Button>
			</Spacer>
			<Spacer marginBottom="4" as={Flex} align="end">
				<FlexBlock>
					<UnitControl
						label={__('Table title font size', 'prc-block')}
						value={tableTitleStylesObj?.fontSize}
						units={fontSizeUnits}
						min={0}
						onChange={onChangeFontSize}
						size="__unstable-large"
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						label={__('Table title line height', 'prc-block')}
						autoComplete="off"
						onChange={onChangeLineHeight}
						step={0.1}
						type="number"
						value={tableTitleStylesObj?.lineHeight || ''}
						min={0}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</FlexBlock>
			</Spacer>
			<PaddingControl
				label={__('Table title padding', 'prc-block')}
				values={pickPadding(tableTitleStylesObj)}
				onChange={onChangePadding}
			/>
			<ToggleGroupControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={__('Table title text alignment', 'prc-block')}
				value={tableTitleStylesObj?.textAlign}
				isDeselectable
				onChange={onChangeAlign}
			>
				{TEXT_ALIGNMENT_CONTROLS.map(({ icon, label, value }) => (
					<ToggleGroupControlOptionIcon
						key={value}
						value={value}
						icon={icon}
						label={label}
					/>
				))}
			</ToggleGroupControl>
		</>
	);
}
