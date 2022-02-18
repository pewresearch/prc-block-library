/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	SelectControl,
	Flex,
	FlexItem,
	__experimentalNumberControl as NumberControl,
	ColorPicker,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const XAxisControls = ({ attributes, setAttributes }) => {
	const {
		chartType,
		xAxisActive,
		xScale,
		xScaleFormat,
		xMinDomain,
		xMaxDomain,
		xDomainPadding,
		xTickNum,
		xTickExact,
		xTickUnit,
		xTickUnitPosition,
		xTickLabelAngle,
		xAbbreviateTicks,
		xAbbreviateTicksDecimals,
		xTickLabelVerticalAnchor,
		xTickLabelTextAnchor,
		xMultiLineTickLabels,
		xMultiLineTickLabelsBreak,
		xLabel,
		xAxisStroke,
		xGridStroke,
	} = attributes;
	return (
		<PanelBody
			title={__('Independent Axis Configuration')}
			initialOpen={false}
		>
			<PanelRow>
				The independent axis is almost always the x-axis, except in
				cases of horizontal bar charts or stack bar charts, where the
				independent values are plotted on the y-axis.
			</PanelRow>
			<ToggleControl
				label="Axis active"
				help={xAxisActive ? 'Shows axis.' : 'No axis.'}
				checked={xAxisActive}
				onChange={() => setAttributes({ xAxisActive: !xAxisActive })}
			/>
			<TextControl
				label={__('Label')}
				value={xLabel}
				onChange={(val) => setAttributes({ xLabel: val })}
			/>
			<SelectControl
				label={__('Independent axis scale')}
				value={xScale}
				options={[
					{
						value: 'linear',
						label: 'Linear',
					},
					{
						value: 'time',
						label: 'Time',
					},
				]}
				onChange={(type) => {
					setAttributes({
						xScale: type,
					});
				}}
			/>
			{xScale === 'time' && (
				<SelectControl
					label={__('Axis scale format')}
					value={xScaleFormat}
					options={[
						{
							value: 'yyyy',
							label: 'yyyy',
						},
						{
							value: 'mm/yyyy',
							label: 'mm/yyyy',
						},
						{
							value: 'mm/dd/yyyy',
							label: 'mm/dd/yyyy',
						},
					]}
					onChange={(type) => {
						setAttributes({ xScaleFormat: type });
					}}
				/>
			)}
			<PanelRow>Domain</PanelRow>
			<Flex>
				<FlexItem>
					<NumberControl
						label={__('Minimum')}
						value={xMinDomain}
						disabled={
							chartType === 'stacked-bar' ||
							chartType === 'bar' ||
							chartType === 'pie'
						}
						disableUnits
						disabledUnits
						onChange={(val) => {
							setAttributes({
								xMinDomain: formatNum(val, 'integer'),
							});
						}}
					/>
				</FlexItem>
				<FlexItem>
					<NumberControl
						label={__('Maximum')}
						value={xMaxDomain}
						disabled={
							chartType === 'stacked-bar' ||
							chartType === 'bar' ||
							chartType === 'pie'
						}
						disableUnits
						disabledUnits
						onChange={(val) => {
							setAttributes({
								xMaxDomain: formatNum(val, 'integer'),
							});
						}}
					/>
				</FlexItem>
			</Flex>
			<NumberControl
				label={__('Domain Padding')}
				help={__(
					'Determines the space between the first tick and the end of the axis',
				)}
				value={xDomainPadding}
				disableUnits={true}
				disabledUnits={true}
				onChange={(val) =>
					setAttributes({ xDomainPadding: formatNum(val, 'integer') })
				}
			/>
			<PanelRow>Axis Ticks and Tick Labels</PanelRow>
			<NumberControl
				label={__('Number of ticks')}
				value={xTickNum}
				disableUnits={true}
				disabledUnits={true}
				onChange={(val) =>
					setAttributes({ xTickNum: formatNum(val, 'integer') })
				}
				help={__(
					'Note: This is return approximately the number of ticks requested, deferring to number that will evenly space ticks on the bar.',
				)}
			/>
			<TextControl
				label={__('Specfic Ticks')}
				value={xTickExact}
				onChange={(val) => setAttributes({ xTickExact: val })}
				help={__(
					'List of numbers seperated by commas (eg. 0, 50, 100). Setting this value will override the "Number of Ticks" parameter',
				)}
			/>
			<TextControl
				label={__('Tick Units')}
				value={xTickUnit}
				onChange={(val) => setAttributes({ xTickUnit: val })}
			/>
			<SelectControl
				label={__('Tick Unit Position')}
				value={xTickUnitPosition}
				options={[
					{
						value: 'start',
						label: 'Start',
					},
					{
						value: 'end',
						label: 'End',
					},
				]}
				onChange={(type) => {
					setAttributes({
						xTickUnitPosition: type,
					});
				}}
			/>
			<ToggleControl
				label={__('Break labels into multiple lines')}
				checked={xMultiLineTickLabels}
				onChange={() =>
					setAttributes({
						xMultiLineTickLabels: !xMultiLineTickLabels,
					})
				}
			/>
			<NumberControl
				label={__('Tick label word break')}
				help={__(
					'Number of words before a label will break into multiple lines',
				)}
				value={xMultiLineTickLabelsBreak}
				disableUnits={true}
				disabledUnits={true}
				onChange={(val) =>
					setAttributes({
						xMultiLineTickLabelsBreak: formatNum(val, 'integer'),
					})
				}
			/>
			<NumberControl
				label={__('Tick Label Angle')}
				value={xTickLabelAngle}
				disableUnits={true}
				disabledUnits={true}
				min={0}
				max={360}
				help={__('Note: Sets the angle of tick labels in degrees.')}
				onChange={(val) =>
					setAttributes({
						xTickLabelAngle: formatNum(val, 'integer'),
					})
				}
			/>
			<SelectControl
				label={__('Tick Label Vertical Anchor')}
				value={xTickLabelVerticalAnchor}
				options={[
					{
						value: 'start',
						label: 'Start',
					},
					{
						value: 'middle',
						label: 'Middle',
					},
					{
						value: 'end',
						label: 'End',
					},
				]}
				onChange={(type) => {
					setAttributes({
						xTickLabelVerticalAnchor: type,
					});
				}}
			/>
			<SelectControl
				label={__('Tick Label Text Anchor')}
				value={xTickLabelTextAnchor}
				options={[
					{
						value: 'start',
						label: 'Start',
					},
					{
						value: 'middle',
						label: 'Middle',
					},
					{
						value: 'end',
						label: 'End',
					},
				]}
				onChange={(type) => {
					setAttributes({
						xTickLabelTextAnchor: type,
					});
				}}
			/>
			<PanelRow>
				<strong>Axis Styles</strong>
			</PanelRow>
			<PanelRow>{__('Axis Stroke')}</PanelRow>
			<ColorPicker
				color={xAxisStroke}
				onChangeComplete={(color) =>
					setAttributes({
						xAxisStroke: color.hex,
					})
				}
			/>
			<PanelRow> {__('Grid Stroke')}</PanelRow>
			<ColorPicker
				color={xGridStroke}
				onChangeComplete={(color) =>
					setAttributes({
						xGridStroke: color.hex,
					})
				}
			/>
		</PanelBody>
	);
};

export default XAxisControls;
