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
import {
	FONT_SIZE_UNITS,
	TEXT_ALIGNMENT_CONTROLS,
	CAPTION_SIDE_CONTROLS,
} from '../constants';
import { PaddingControl } from '../controls';
import { convertToInline } from '../utils/style-converter';
import { pickPadding, type DirectionProps } from '../utils/style-picker';
import { updatePadding } from '../utils/style-updater';
import { sanitizeUnitValue } from '../utils/helper';
import type { CaptionSideValue, BlockAttributes } from '../block-attributes';

type Props = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	captionStylesObj: Properties;
};

/* eslint-disable max-lines-per-function */
export default function TableCaptionSettings({
	attributes,
	setAttributes,
	captionStylesObj,
}: Props) {
	const { captionSide } = attributes;

	const fontSizeUnits = useCustomUnits({ availableUnits: FONT_SIZE_UNITS });

	const onChangeFontSize = (value: Property.FontSize | undefined) => {
		const newStylesObj = {
			...captionStylesObj,
			fontSize: sanitizeUnitValue(value),
		};
		setAttributes({ captionStyles: convertToInline(newStylesObj) });
	};

	const onChangeLineHeight = (value: Property.LineHeight) => {
		const newStylesObj = {
			...captionStylesObj,
			lineHeight: value,
		};
		setAttributes({ captionStyles: convertToInline(newStylesObj) });
	};

	const onChangePadding = (values: DirectionProps) => {
		const newStylesObj = updatePadding(captionStylesObj, values);
		setAttributes({ captionStyles: convertToInline(newStylesObj) });
	};

	const onChangeSide = (value: string | number | undefined) => {
		const isAllowedValue = (_value: any): _value is CaptionSideValue => {
			return CAPTION_SIDE_CONTROLS.some(
				(control) => control.value === _value
			);
		};
		if (isAllowedValue(value)) {
			setAttributes({ captionSide: value });
		}
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
				...captionStylesObj,
				textAlign:
					value === captionStylesObj.textAlign ? undefined : value,
			};
			setAttributes({
				captionStyles: convertToInline(newStylesObj),
			});
		}
	};

	const onResetSettings = () => {
		setAttributes({
			captionSide: 'bottom',
			captionStyles: undefined,
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
						label={__('Caption font size', 'flexible-table-block')}
						value={captionStylesObj?.fontSize}
						units={fontSizeUnits}
						min={0}
						onChange={onChangeFontSize}
						size="__unstable-large"
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						label={__(
							'Caption line height',
							'flexible-table-block'
						)}
						autoComplete="off"
						onChange={onChangeLineHeight}
						step={0.1}
						type="number"
						value={captionStylesObj?.lineHeight || ''}
						min={0}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</FlexBlock>
			</Spacer>
			<PaddingControl
				label={__('Caption padding', 'flexible-table-block')}
				values={pickPadding(captionStylesObj)}
				onChange={onChangePadding}
			/>
			<ToggleGroupControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={__('Caption position', 'flexible-table-block')}
				value={captionSide}
				isBlock
				onChange={onChangeSide}
			>
				{CAPTION_SIDE_CONTROLS.map(({ label, value }) => (
					<ToggleGroupControlOption
						key={value}
						value={value}
						label={label}
					/>
				))}
			</ToggleGroupControl>
			<ToggleGroupControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={__('Caption text alignment', 'flexible-table-block')}
				value={captionStylesObj?.textAlign}
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
