/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	Flex,
	FlexItem,
	__experimentalNumberControl as NumberControl,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

export default function Controls({ attributes, setAttributes, colors, clientId }) {
	const {
		maxWidth,
		maxValue,
		currentValue,
		showAxisLabel,
		axisLabel,
		axisLabelMaxWidth,
		axisPadding,
		labelFormat,
		labelPositionDY,
		labelPositionDX,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Layout')}>
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
				</PanelBody>
				<PanelBody title={__('Data and Formatting')}>
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
						label={__('Category Label Max Width')}
						value={axisLabelMaxWidth}
						disabled={!showAxisLabel}
						disableUnits
						disabledUnits
						onChange={(val) =>
							setAttributes({
								axisLabelMaxWidth: parseInt(val, 10),
							})
						}
					/>
					<NumberControl
						label={__('Category Padding')}
						value={axisPadding}
						disabled={!showAxisLabel}
						disableUnits
						disabledUnits
						onChange={(val) =>
							setAttributes({ axisPadding: parseInt(val, 10) })
						}
					/>
					<Flex>
						<FlexItem>
							<NumberControl
								label={__('Current value')}
								value={currentValue}
								disableUnits
								disabledUnits
								onChange={(val) =>
									setAttributes({
										currentValue: parseFloat(val),
									})
								}
							/>
						</FlexItem>
						<NumberControl
							label={__('Maximum value')}
							value={maxValue}
							disableUnits
							disabledUnits
							onChange={(val) =>
								setAttributes({ maxValue: parseFloat(val) })
							}
						/>
						<FlexItem />
					</Flex>
				</PanelBody>
				<PanelBody title={__('Labels')}>
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
				</PanelBody>
			</InspectorControls>
			<ColorControls colors={colors} clientId={clientId} />
		</Fragment>
	);
}
