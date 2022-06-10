/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	Flex,
	FlexItem,
	__experimentalNumberControl as NumberControl,
	ColorPicker,
	SelectControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

function YAxisControls({ attributes, setAttributes }) {
	const {
		yAxisActive,
		yLabel,
		yMinDomain,
		yMaxDomain,
		yDomainPadding,
		yTickNum,
		yTickExact,
		yTickUnit,
		yTickUnitPosition,
		yTickLabelAngle,
		yAbbreviateTicks,
		yAbbreviateTicksDecimals,
		yTickLabelVerticalAnchor,
		yTickLabelTextAnchor,
		yMultiLineTickLabels,
		yMultiLineTickLabelsBreak,
		showYMinDomainLabel,
		yAxisStroke,
		yGridStroke,
	} = attributes;
	return (
		<PanelBody title={__('Dependent Axis Configuration')} initialOpen={false}>
			<PanelRow>
				Dependent variables are properties that change in response to a change
				in another property. As such, the dependent axis is usually the y-axis.
			</PanelRow>
			<ToggleControl
				label="Axis active"
				help={yAxisActive ? 'Shows axis.' : 'No y-axis.'}
				checked={yAxisActive}
				onChange={() => setAttributes({ yAxisActive: !yAxisActive })}
			/>
			<TextControl
				label={__('Label')}
				value={yLabel}
				onChange={(val) => setAttributes({ yLabel: val })}
			/>
			<PanelRow>Y Domain</PanelRow>
			<Flex>
				<FlexItem>
					<NumberControl
						label={__('Minimum')}
						value={yMinDomain}
						disableUnits
						disabledUnits
						onChange={(val) =>
							setAttributes({
								yMinDomain: formatNum(val, 'integer'),
							})
						}
					/>
				</FlexItem>
				<FlexItem>
					<NumberControl
						label={__('Maximum')}
						value={yMaxDomain}
						disableUnits
						disabledUnits
						onChange={(val) =>
							setAttributes({
								yMaxDomain: formatNum(val, 'integer'),
							})
						}
					/>
				</FlexItem>
			</Flex>
			<NumberControl
				label={__('Domain Padding')}
				help={__(
					'Determines the space between the first tick and the end of the axis',
				)}
				value={yDomainPadding}
				disableUnits
				disabledUnits
				onChange={(val) =>
					setAttributes({ yDomainPadding: formatNum(val, 'integer') })
				}
			/>
			<PanelRow>Axis Ticks and Tick Labels</PanelRow>
			<NumberControl
				label={__('Number of ticks')}
				value={yTickNum}
				disableUnits
				disabledUnits
				min={1}
				onChange={(val) =>
					setAttributes({ yTickNum: formatNum(val, 'integer') })
				}
				help={__(
					'Note: This is return approximately the number of ticks requested, deferring to number that will evenly space ticks on the bar.',
				)}
			/>
			<ToggleControl
				label="Show min domain label"
				help={__(
					"Forces the minimum domain value's lable to appear on axis. May overlap with x axis.",
				)}
				checked={showYMinDomainLabel}
				onChange={() =>
					setAttributes({ showYMinDomainLabel: !showYMinDomainLabel })
				}
			/>
			<TextControl
				label={__('Specfic Ticks')}
				value={yTickExact}
				onChange={(val) => setAttributes({ yTickExact: val })}
				help={__(
					'List of numbers seperated by commas (eg. 0, 50, 100). Setting this value will override the "Number of ticks" parameter',
				)}
			/>
			<ToggleControl
				label={__('Abbreviate ticks')}
				help={
					yAbbreviateTicks
						? __(
								'Tick values will be abbreviated when possible (eg. 100,000 -> 100K)',
						  )
						: __('Tick values will be displayed as-is')
				}
				checked={yAbbreviateTicks}
				onChange={() => setAttributes({ yAbbreviateTicks: !yAbbreviateTicks })}
			/>
			<NumberControl
				label={__('Abbreviated tick to set decimal place (when applicable)')}
				value={yAbbreviateTicksDecimals}
				disabled={!yAbbreviateTicks}
				disableUnits
				disabledUnits
				min={0}
				onChange={(val) =>
					setAttributes({ yAbbreviateTicksDecimals: formatNum(val, 'integer') })
				}
			/>
			<TextControl
				label={__('Tick Units')}
				value={yTickUnit}
				onChange={(val) => setAttributes({ yTickUnit: val })}
			/>
			<SelectControl
				label={__('Tick Unit Position')}
				value={yTickUnitPosition}
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
						yTickUnitPosition: type,
					});
				}}
			/>
			<ToggleControl
				label={__('Break labels into multiple lines')}
				checked={yMultiLineTickLabels}
				onChange={() =>
					setAttributes({
						yMultiLineTickLabels: !yMultiLineTickLabels,
					})
				}
			/>
			<NumberControl
				label={__('Tick label word break')}
				help={__(
					'Number of words before a label will break into multiple lines',
				)}
				value={yMultiLineTickLabelsBreak}
				disableUnits
				disabledUnits
				onChange={(val) =>
					setAttributes({
						yMultiLineTickLabelsBreak: formatNum(val, 'integer'),
					})
				}
			/>
			<NumberControl
				label={__('Tick Label Angle')}
				value={yTickLabelAngle}
				disableUnits
				disabledUnits
				min={0}
				max={360}
				help={__('Note: Sets the angle of tick labels in degrees.')}
				onChange={(val) =>
					setAttributes({
						yTickLabelAngle: formatNum(val, 'integer'),
					})
				}
			/>
			<SelectControl
				label={__('Tick Label Vertical Anchor')}
				value={yTickLabelVerticalAnchor}
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
						yTickLabelVerticalAnchor: type,
					});
				}}
			/>
			<SelectControl
				label={__('Tick Label Text Anchor')}
				value={yTickLabelTextAnchor}
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
						yTickLabelTextAnchor: type,
					});
				}}
			/>
			<PanelRow>
				<strong>Axis Styles</strong>
			</PanelRow>
			<PanelRow>{__('Axis Stroke')}</PanelRow>
			<ColorPicker
				color={yAxisStroke}
				onChangeComplete={(color) =>
					setAttributes({
						yAxisStroke: color.hex,
					})
				}
			/>
			<PanelRow> {__('Grid Stroke')}</PanelRow>
			<ColorPicker
				color={yGridStroke}
				onChangeComplete={(color) =>
					setAttributes({
						yGridStroke: color.hex,
					})
				}
			/>
		</PanelBody>
	);
}

export default YAxisControls;
