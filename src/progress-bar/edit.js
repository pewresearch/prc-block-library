/* eslint-disable radix */
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	ColorPalette,
	ColorPicker,
	PanelBody,
	PanelRow,
	SelectControl,
	Flex,
	FlexItem,
	__experimentalNumberControl as NumberControl,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import ProgressBar from './ProgressBar';

const BUTTON_COLORS = [
	{ name: 'blue', color: '#436983' },
	{ name: 'red', color: '#bf3927' },
	{ name: 'purple', color: '#756a7e' },
	{ name: 'orange', color: '#ea9e2c' },
	{ name: 'brown', color: '#bc7b2b' },
];

function SidebarControls({
	maxWidth,
	barColor,
	maxValue,
	currentValue,
	showAxisLabel,
	axisLabel,
	axisPadding,
	labelFormat,
	setAttributes,
	labelPositionDY,
	labelPositionDX,
}) {
	return (
		<InspectorControls>
			<PanelBody title={__('Progress Bar Options')}>
				<PanelRow>Layout</PanelRow>
				<RangeControl
					label={__('Width')}
					withInputField
					min={0}
					max={640}
					value={parseInt(maxWidth, 10)}
					onChange={(num) =>
						setAttributes({
							maxWidth: parseInt(num, 10),
						})
					}
				/>
				<PanelRow>Data and Formatting</PanelRow>
				<ToggleControl
					label={__('Show Category')}
					checked={showAxisLabel}
					onChange={() =>
						setAttributes({
							showAxisLabel: !showAxisLabel,
						})
					}
				/>
				<TextControl
					label={__('Category')}
					value={axisLabel}
					disabled={!showAxisLabel}
					onChange={(val) => setAttributes({ axisLabel: val })}
				/>
				<NumberControl
					label={__('Category Padding')}
					value={axisPadding}
					disabled={!showAxisLabel}
					disableUnits
					disabledUnits
					onChange={(val) => setAttributes({ axisPadding: parseInt(val, 10) })}
				/>
				<Flex>
					<FlexItem>
						<NumberControl
							label={__('Current value')}
							value={currentValue}
							disableUnits
							disabledUnits
							onChange={(val) =>
								setAttributes({ currentValue: parseFloat(val) })
							}
						/>
					</FlexItem>
					<NumberControl
						label={__('Maximum value')}
						value={maxValue}
						disableUnits
						disabledUnits
						onChange={(val) => setAttributes({ maxValue: parseFloat(val) })}
					/>
					<FlexItem />
				</Flex>
				<PanelRow>Labels</PanelRow>
				<SelectControl
					label={__('Label format')}
					value={labelFormat}
					options={[
						{
							value: 'fractional',
							label: 'Fractional',
						},
						{
							value: 'percentage',
							label: 'Percentage',
						},
					]}
					onChange={(format) => {
						setAttributes({
							labelFormat: format,
						});
					}}
				/>
				<Flex>
					<FlexItem>
						<NumberControl
							label={__('Label Position DX')}
							value={labelPositionDX}
							onChange={(value) =>
								setAttributes({
									labelPositionDX: parseInt(value, 10),
								})
							}
						/>
					</FlexItem>
					<FlexItem>
						<NumberControl
							label={__('Label Position DY')}
							value={labelPositionDY}
							onChange={(value) =>
								setAttributes({
									labelPositionDY: parseInt(value, 10),
								})
							}
						/>
					</FlexItem>
				</Flex>
				<PanelRow>Bar Color</PanelRow>
				<PanelRow>
					<ColorPalette
						colors={BUTTON_COLORS}
						value={barColor}
						onChange={(c) => {
							setAttributes({ barColor: c });
						}}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}

const edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<SidebarControls {...attributes} setAttributes={setAttributes} />
			<ProgressBar {...attributes} />
		</div>
	);
};

export default edit;
