/**
 * External Dependencies
 */
import type { Property } from 'csstype';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { link, linkOff } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Flex,
	FlexBlock,
	FlexItem,
	__experimentalGrid as Grid,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalText as Text,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import {
	BORDER_WIDTH_UNITS,
	MAX_BORDER_WIDTH,
	SIDE_CONTROLS,
} from '../constants';
import { parseUnit, sanitizeUnitValue } from '../utils/helper';
import { SideIndicatorControl } from './indicator-control';
import type { SideValue } from '../block-attributes';

const DEFAULT_VALUES = {
	top: '',
	right: '',
	bottom: '',
	left: '',
};

type Props = {
	label: string;
	help?: string;
	onChange: (event: any) => void;
	values: {
		top?: Property.BorderTopWidth;
		right?: Property.BorderRightWidth;
		bottom?: Property.BorderBottomWidth;
		left?: Property.BorderLeftWidth;
	};
	allowSides?: boolean;
	hasIndicator?: boolean;
};

type ValuesKey = keyof typeof DEFAULT_VALUES;
type MaxBorderWidthKey = keyof typeof MAX_BORDER_WIDTH;

export default function BorderWidthControl({
	label = __('Border width', 'flexible-table-block'),
	help,
	onChange,
	values: valuesProp,
	allowSides = true,
	hasIndicator = true,
}: Props) {
	const values = {
		...DEFAULT_VALUES,
		...valuesProp,
	};
	const instanceId = useInstanceId(
		BorderWidthControl,
		'ftb-border-width-control'
	);
	const headingId = `${instanceId}-heading`;

	const isMixed =
		allowSides &&
		!(
			values.top === values.right &&
			values.top === values.bottom &&
			values.top === values.left
		);

	const borderWidthUnits = useCustomUnits({
		availableUnits: BORDER_WIDTH_UNITS,
	});

	const [isLinked, setIsLinked] = useState<boolean>(true);
	const [side, setSide] = useState<SideValue | undefined>(undefined);

	const linkedLabel: string = isLinked
		? __('Unlink sides', 'flexible-table-block')
		: __('Link sides', 'flexible-table-block');

	const allInputPlaceholder: string = isMixed
		? __('Mixed', 'flexible-table-block')
		: '';
	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const toggleLinked = () => {
		setIsLinked(!isLinked);
		setSide(undefined);
	};

	const handleOnReset = () => {
		setIsLinked(true);
		setSide(undefined);
		onChange(DEFAULT_VALUES);
	};

	const handleOnFocus = (focusSide: SideValue) => setSide(focusSide);

	const handleOnChangeAll = (inputValue: string | undefined) => {
		if (inputValue) {
			const [, unit] = parseUnit(inputValue);
			const sanitizedValue = sanitizeUnitValue(inputValue, {
				maxNum: MAX_BORDER_WIDTH[unit as MaxBorderWidthKey],
			});
			onChange({
				top: sanitizedValue,
				right: sanitizedValue,
				bottom: sanitizedValue,
				left: sanitizedValue,
			});
		} else {
			onChange({
				top: undefined,
				right: undefined,
				bottom: undefined,
				left: undefined,
			});
		}
	};

	const handleOnChange = (
		inputValue: string | undefined,
		targetSide: SideValue
	) => {
		if (inputValue) {
			const [, unit] = parseUnit(inputValue);
			const sanitizedValue = sanitizeUnitValue(inputValue, {
				maxNum: MAX_BORDER_WIDTH[unit as MaxBorderWidthKey],
			});
			onChange({
				...values,
				[targetSide]: sanitizedValue,
			});
		} else {
			onChange({
				...values,
				[targetSide]: undefined,
			});
		}
	};

	return (
		<BaseControl
			className="ftb-border-width-control"
			help={help}
			__nextHasNoMarginBottom
		>
			<VStack aria-labelledby={headingId} role="group">
				<Flex>
					<Text
						id={headingId}
						upperCase
						size="11"
						weight="500"
						as={FlexBlock}
					>
						{label}
					</Text>
					<FlexItem>
						<Button
							variant="secondary"
							onClick={handleOnReset}
							size="small"
						>
							{__('Reset', 'flexible-table-block')}
						</Button>
					</FlexItem>
				</Flex>
				<HStack
					alignment="center"
					justify="space-between"
					style={{ minHeight: '40px' }}
				>
					<HStack justify="start">
						{hasIndicator && (
							<SideIndicatorControl
								sides={side === undefined ? undefined : [side]}
							/>
						)}
						{(isLinked || !allowSides) && (
							<div>
								<UnitControl
									aria-label={__(
										'All',
										'flexible-table-block'
									)}
									value={allInputValue}
									units={borderWidthUnits}
									placeholder={allInputPlaceholder}
									onChange={handleOnChangeAll}
									size="__unstable-large"
									__unstableInputWidth="100px"
								/>
							</div>
						)}
					</HStack>
					{allowSides && (
						<Button
							label={linkedLabel}
							icon={isLinked ? link : linkOff}
							onClick={toggleLinked}
							size="small"
						/>
					)}
				</HStack>
				{!isLinked && allowSides && (
					<Grid gap={2} columns={2} rows={3}>
						{SIDE_CONTROLS.map((item) => {
							const gridStyles = (value: SideValue) => {
								if (value === 'top' || value === 'bottom') {
									return {
										gridColumn: 'span 2',
										margin: '0 auto',
									};
								}
								if (value === 'right') {
									return {
										gridColumn: 2,
										display: 'flex',
										justifyContent: 'flex-end',
									};
								}
								return { gridRow: 2 };
							};
							return (
								<div
									key={item.value}
									style={gridStyles(item.value)}
								>
									<UnitControl
										aria-label={item.label}
										value={values[item.value as ValuesKey]}
										units={borderWidthUnits}
										onFocus={() =>
											handleOnFocus(item.value)
										}
										onChange={(value) =>
											handleOnChange(value, item.value)
										}
										size="__unstable-large"
										__unstableInputWidth="100px"
									/>
								</div>
							);
						})}
					</Grid>
				)}
			</VStack>
		</BaseControl>
	);
}
