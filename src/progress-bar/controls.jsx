/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	Flex,
	FlexItem,
	__experimentalNumberControl as NumberControl,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

export default function Controls({ attributes, setAttributes, colors, clientId }) {
	const {
		label,
		value,
		maxValue,
		labelFormat,
		barHeight,
		labelPosition,
		valuePosition,
		valueFontSize,
	} = attributes;

	const barHeightInputId = useInstanceId(RangeControl, 'bar-height-input');
	const valueFontSizeInputId = useInstanceId(NumberControl, 'value-font-size-input');

	const [barHeightValue, setBarHeightValue] = useState(barHeight);
	const [valueFontSizeValue, setValueFontSizeValue] = useState(valueFontSize);

	useEffect(() => {
		setAttributes({ barHeight: barHeightValue });
	}, [barHeightValue]);

	useEffect(() => {
		setAttributes({ valueFontSize: valueFontSizeValue });
	}, [valueFontSizeValue]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Data and Formatting')}>
					<TextControl
						label={__('Label')}
						value={label}
						onChange={(val) => setAttributes({ label: val })}
					/>

					<SelectControl
						label={__('Label Position')}
						value={labelPosition}
						options={[
							{ label: __('Left'), value: 'left' },
							{ label: __('Right'), value: 'right' },
						]}
						onChange={(val) => setAttributes({ labelPosition: val })}
					/>

					<RangeControl
						label={__('Value')}
						value={value}
						min={0}
						max={maxValue}
						withInputField
						allowReset
						isShiftStepEnabled
						resetFallbackValue={0}
						step={1}
						onChange={(val) => setAttributes({ value: parseFloat(val) })}
					/>

					<NumberControl
						label={__('Maximum value')}
						value={maxValue}
						disableUnits
						disabledUnits
						onChange={(val) =>
							setAttributes({ maxValue: parseFloat(val) })
						}
					/>

					<SelectControl
						label={__('Value Position')}
						value={valuePosition}
						options={[
							{ label: __('Inside'), value: 'inside' },
							{ label: __('Outside'), value: 'outside' },
						]}
						onChange={(val) => setAttributes({ valuePosition: val })}
					/>

					<SelectControl
						label={__('Value Format')}
						value={labelFormat}
						options={[
							{ label: __('Percentage'), value: 'percentage' },
							{ label: __('Fractional'), value: 'fractional' },
						]}
						onChange={(val) => setAttributes({ labelFormat: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					label={__('Bar Height')}
					hasValue={() => barHeightValue}
					onDeselect={() => setBarHeightValue(undefined)}
					panelId={clientId}
					resetAllFilter={() => setBarHeightValue(undefined)}
					style={{
						gridRow: '3',
					}}
				>
					<RangeControl
						id={barHeightInputId}
						label={__('Bar Height')}
						value={barHeightValue}
						min={1}
						max={30}
						step={1}
						onChange={(val) => setBarHeightValue(parseFloat(val))}
					/>
				</ToolsPanelItem>
			</InspectorControls>
			<InspectorControls group="typography">
				<ToolsPanelItem
					label={__('Value Font Size (px)')}
					hasValue={() => valueFontSizeValue}
					onDeselect={() => setValueFontSizeValue(undefined)}
					resetAllFilter={() => setValueFontSizeValue(undefined)}
					panelId={clientId}
					style={{
						gridRow: '5',
					}}
				>
					<NumberControl
						id={valueFontSizeInputId}
						label={__('Value Font Size (px)')}
						value={valueFontSizeValue}
						disableUnits
						disabledUnits
						onChange={(val) => setValueFontSizeValue(parseFloat(val))}
					/>
				</ToolsPanelItem>
			</InspectorControls>
			<ColorControls colors={colors} clientId={clientId} />
		</Fragment>
	);
}
