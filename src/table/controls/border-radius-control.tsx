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
	BORDER_RADIUS_UNITS,
	MAX_BORDER_RADIUS,
	CORNER_CONTROLS,
} from '../constants';
import { CornerIndicatorControl } from './indicator-control';
import { parseUnit, sanitizeUnitValue } from '../utils/helper';
import type { CornerValue } from '../block-attributes';

const DEFAULT_VALUES = {
	topLeft: '',
	topRight: '',
	bottomRight: '',
	bottomLeft: '',
};

type Props = {
	label: string;
	help?: string;
	onChange: (event: any) => void;
	values: {
		topLeft?: Property.BorderTopLeftRadius;
		topRight?: Property.BorderTopRightRadius;
		bottomRight?: Property.BorderBottomRightRadius;
		bottomLeft?: Property.BorderBottomLeftRadius;
	};
};

type ValuesKey = keyof typeof DEFAULT_VALUES;
type MaxBorderRadiusKey = keyof typeof MAX_BORDER_RADIUS;

export default function BorderRadiusControl({
	label = __('Border radius', 'flexible-table-block'),
	help,
	onChange,
	values: valuesProp,
}: Props) {
	const values = {
		...DEFAULT_VALUES,
		...valuesProp,
	};
	const instanceId = useInstanceId(
		BorderRadiusControl,
		'ftb-border-radius-control'
	);
	const headingId = `${instanceId}-heading`;

	const isMixed = !(
		values.topLeft === values.topRight &&
		values.topLeft === values.bottomRight &&
		values.topLeft === values.bottomLeft
	);

	const borderRadiusUnits = useCustomUnits({
		availableUnits: BORDER_RADIUS_UNITS,
	});

	const [isLinked, setIsLinked] = useState<boolean>(true);
	const [corner, setCorner] = useState<CornerValue | undefined>(undefined);

	const linkedLabel: string = isLinked
		? __('Unlink sides', 'flexible-table-block')
		: __('Link sides', 'flexible-table-block');

	const allInputPlaceholder: string = isMixed
		? __('Mixed', 'flexible-table-block')
		: '';
	const allInputValue: string | 0 = isMixed ? '' : values.topLeft;

	const toggleLinked = () => {
		setIsLinked(!isLinked);
		setCorner(undefined);
	};

	const handleOnReset = () => {
		setIsLinked(true);
		setCorner(undefined);
		onChange(DEFAULT_VALUES);
	};

	const handleOnFocus = (focusCorner: CornerValue) => setCorner(focusCorner);

	const handleOnChangeAll = (inputValue: string | undefined) => {
		if (inputValue) {
			const [, unit] = parseUnit(inputValue);
			const sanitizedValue = sanitizeUnitValue(inputValue, {
				maxNum: MAX_BORDER_RADIUS[unit as MaxBorderRadiusKey],
			});

			onChange({
				topLeft: sanitizedValue,
				topRight: sanitizedValue,
				bottomRight: sanitizedValue,
				bottomLeft: sanitizedValue,
			});
		} else {
			onChange({
				topLeft: undefined,
				topRight: undefined,
				bottomRight: undefined,
				bottomLeft: undefined,
			});
		}
	};

	const handleOnChange = (
		inputValue: string | undefined,
		targetCorner: CornerValue
	) => {
		if (inputValue) {
			const [, unit] = parseUnit(inputValue);
			const sanitizedValue = sanitizeUnitValue(inputValue, {
				maxNum: MAX_BORDER_RADIUS[unit as MaxBorderRadiusKey],
			});

			onChange({
				...values,
				[targetCorner]: sanitizedValue,
			});
		} else {
			onChange({
				...values,
				[targetCorner]: undefined,
			});
		}
	};

	return (
		<BaseControl
			className="ftb-border-radius-control"
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
						<CornerIndicatorControl
							corners={
								corner === undefined ? undefined : [corner]
							}
						/>
						{isLinked && (
							<div>
								<UnitControl
									hideLabelFromVision
									label={__('All', 'flexible-table-block')}
									placeholder={allInputPlaceholder}
									onChange={handleOnChangeAll}
									value={allInputValue}
									units={borderRadiusUnits}
									min={0}
									size="__unstable-large"
									__unstableInputWidth="100px"
								/>
							</div>
						)}
					</HStack>
					<Button
						label={linkedLabel}
						onClick={toggleLinked}
						icon={isLinked ? link : linkOff}
						size="small"
					/>
				</HStack>
				{!isLinked && (
					<Grid gap={2}>
						{CORNER_CONTROLS.map((item) => (
							<div key={item.value}>
								<UnitControl
									aria-label={item.label}
									value={values[item.value as ValuesKey]}
									units={borderRadiusUnits}
									min={0}
									onFocus={() => handleOnFocus(item.value)}
									onChange={(value) =>
										handleOnChange(value, item.value)
									}
									size="__unstable-large"
									style={{ marginBottom: 0 }}
								/>
							</div>
						))}
					</Grid>
				)}
			</VStack>
		</BaseControl>
	);
}
