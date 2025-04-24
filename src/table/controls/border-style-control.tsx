/**
 * External Dependencies
 */
import type { PropertyValue } from 'csstype';

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
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import { BORDER_STYLE_CONTROLS, SIDE_CONTROLS } from '../constants';
import { SideIndicatorControl } from './indicator-control';

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
		top?: PropertyValue<string>;
		right?: PropertyValue<string>;
		bottom?: PropertyValue<string>;
		left?: PropertyValue<string>;
	};
	allowSides?: boolean;
	hasIndicator?: boolean;
};

type ValuesKey = keyof typeof DEFAULT_VALUES;

export default function BorderStyleControl({
	label = __('Border style', 'flexible-table-block'),
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
		BorderStyleControl,
		'ftb-border-style-control'
	);
	const headingId = `${instanceId}-heading`;

	const isMixed =
		allowSides &&
		!(
			values.top === values.right &&
			values.top === values.bottom &&
			values.top === values.left
		);

	const [isLinked, setIsLinked] = useState<boolean>(true);

	const linkedLabel: string = isLinked
		? __('Unlink sides', 'flexible-table-block')
		: __('Link sides', 'flexible-table-block');

	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const toggleLinked = () => setIsLinked(!isLinked);

	const handleOnReset = () => {
		setIsLinked(true);
		onChange(DEFAULT_VALUES);
	};

	const handleOnClickAll = (value: string | number | undefined) => {
		const newValue =
			value === values.top &&
			value === values.right &&
			value === values.bottom &&
			value === values.left
				? undefined
				: value;

		onChange({
			top: newValue,
			right: newValue,
			bottom: newValue,
			left: newValue,
		});
	};

	const handleOnClick = (
		value: string | number | undefined,
		targetSide: ValuesKey
	) => {
		const newValue =
			values[targetSide as ValuesKey] &&
			value === values[targetSide as ValuesKey]
				? undefined
				: value;

		onChange({
			...values,
			[targetSide]: newValue,
		});
	};

	return (
		<BaseControl
			className="ftb-border-style-control"
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
						{isMixed && isLinked
							? `${label} ${__('(Mixed)', 'flexible-table-block')}`
							: label}
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
				<HStack alignment="start" justify="space-between">
					{isLinked ? (
						<HStack spacing={2} justify="start">
							{hasIndicator && <SideIndicatorControl />}
							<ToggleGroupControl
								hideLabelFromVision
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={label}
								value={allInputValue}
								isDeselectable
								onChange={handleOnClickAll}
							>
								{BORDER_STYLE_CONTROLS.map((borderStyle) => (
									<ToggleGroupControlOptionIcon
										key={borderStyle.value}
										label={borderStyle.label}
										value={borderStyle.value}
										icon={borderStyle.icon}
									/>
								))}
							</ToggleGroupControl>
						</HStack>
					) : (
						<VStack spacing={1}>
							{SIDE_CONTROLS.map((item) => (
								<HStack
									spacing={2}
									justify="start"
									key={item.value}
								>
									{hasIndicator && (
										<SideIndicatorControl
											sides={[item.value]}
										/>
									)}
									<ToggleGroupControl
										hideLabelFromVision
										__nextHasNoMarginBottom
										__next40pxDefaultSize
										label={item.label}
										value={values[item.value as ValuesKey]}
										isDeselectable
										onChange={(value) =>
											handleOnClick(
												value,
												item.value as ValuesKey
											)
										}
									>
										{BORDER_STYLE_CONTROLS.map(
											(borderStyle) => (
												<ToggleGroupControlOptionIcon
													key={borderStyle.value}
													label={borderStyle.label}
													value={borderStyle.value}
													icon={borderStyle.icon}
												/>
											)
										)}
									</ToggleGroupControl>
								</HStack>
							))}
						</VStack>
					)}
					{allowSides && (
						<Button
							label={linkedLabel}
							onClick={toggleLinked}
							icon={isLinked ? link : linkOff}
							size="small"
							style={{ marginTop: '6px' }}
						/>
					)}
				</HStack>
			</VStack>
		</BaseControl>
	);
}
