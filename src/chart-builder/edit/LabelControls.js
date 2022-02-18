/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	Flex,
	FlexItem,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { formatNum } from '../utils/helpers';

const LabelControls = ({ attributes, setAttributes, chartType }) => {
	const {
		chartOrientation,
		labelsActive,
		labelPositionDY,
		labelPositionDX,
		labelToFixedDecimal,
		labelUnit,
		labelUnitPosition,
		barLabelPosition,
		barLabelCutoff,
		barLabelCutoffMobile,
	} = attributes;
	return (
		<PanelBody title={__('Labels')} initialOpen={false}>
			<ToggleControl
				label="Labels Active"
				checked={labelsActive}
				onChange={() => setAttributes({ labelsActive: !labelsActive })}
			/>
			<PanelRow>Label Positioning</PanelRow>
			<PanelRow>
				Determines the position of label relative to it's parent node
			</PanelRow>
			<Flex>
				<FlexItem>
					<NumberControl
						label={__('DX')}
						value={labelPositionDX}
						disabled={!labelsActive}
						onChange={(value) =>
							setAttributes({
								labelPositionDX: formatNum(value, 'integer'),
							})
						}
					/>
				</FlexItem>
				<FlexItem>
					<NumberControl
						label={__('DY')}
						value={labelPositionDY}
						disabled={!labelsActive}
						onChange={(value) =>
							setAttributes({
								labelPositionDY: formatNum(value, 'integer'),
							})
						}
					/>
				</FlexItem>
			</Flex>
			<NumberControl
				label={__('Label value to fixed decimals')}
				value={labelToFixedDecimal}
				onChange={(value) =>
					setAttributes({
						labelToFixedDecimal: formatNum(value, 'integer'),
					})
				}
			/>
			<TextControl
				label={__('Label Units')}
				value={attributes.labelUnit}
				onChange={(value) => setAttributes({ labelUnit: value })}
			/>
			<SelectControl
				label={__('Label Unit Position')}
				value={labelUnitPosition}
				options={[
					{ label: 'Before', value: 'start' },
					{ label: 'After', value: 'end' },
				]}
				onChange={(value) =>
					setAttributes({ labelUnitPosition: value })
				}
			/>

			{(chartType === 'bar' || chartType === 'stacked-bar') && (
				<Fragment>
					<SelectControl
						label={__('Label Positioning')}
						help={__(
							'For bar charts, determines whether the label for a bar will appear inside or outside the bar. If inside is selected, chart builder will attempt to place the label inside the bar, and adjust label color based on the bar color. Please choose a break point that will force render the label outside the bar if the value is too small, overriding your designated DX or DY values.',
						)}
						value={barLabelPosition}
						options={[
							{
								value: 'inside',
								label: 'Inside',
							},
							{
								value: 'outside',
								label: 'Outside',
							},
						]}
						onChange={(value) => {
							setAttributes({
								barLabelPosition: value,
							});
						}}
					/>
					<NumberControl
						label={__('Label Break Point')}
						disabled={barLabelPosition === 'outside'}
						min={0}
						value={barLabelCutoff}
						onChange={(value) =>
							setAttributes({
								barLabelCutoff: formatNum(value, 'float'),
							})
						}
					/>
					<NumberControl
						label={__('Label Break Point - Mobile')}
						disabled={
							barLabelPosition === 'outside' &&
							chartOrientation === 'vertical'
						}
						min={0}
						value={barLabelCutoffMobile}
						onChange={(value) =>
							setAttributes({
								barLabelCutoffMobile: formatNum(value, 'float'),
							})
						}
					/>
				</Fragment>
			)}
		</PanelBody>
	);
};

export default LabelControls;
