/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import {
	Flex,
	FlexItem,
	FlexBlock,
	SelectControl,
	TextareaControl,
	__experimentalInputControl as InputControl,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function DeviceSizeQuickSelect({ attributes, setAttributes }) {
	const { deviceType } = attributes;

	return (
		<SelectControl
			label="Pre-Defined Device Ranges"
			help="Select a pre-defined device range to quickly set the minimum and maximum values for the responsive range."
			value={deviceType}
			options={[
				{ label: 'Devices...', value: null },
				{ label: 'Desktop', value: 'desktop' },
				{ label: 'Tablet', value: 'tablet' },
				{ label: 'Mobile', value: 'mobile' },
			]}
			onChange={(deviceSize) => {
				if (null !== deviceSize) {
					console.log('deviceSize', deviceSize);
					const sizes = {
						desktop: {
							min: 980,
							max: null,
						},
						tablet: {
							min: 480,
							max: 979,
						},
						mobile: {
							min: null,
							max: 479,
						},
					};
					const payload = {
						deviceType: deviceSize,
						min: sizes[deviceSize].min,
						max: sizes[deviceSize].max,
					};
					console.log('payload', payload, deviceType, sizes);
					setAttributes(payload);
				}
			}}
		/>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	// console.log('<Controls/> attributes', attributes);
	const { min, max, additionalStyles } = attributes;

	// Determine the maximum, get the minimum of the previous block and subtract 1. If there are no blocks prior, and this is the first block, set the max to 0.
	const {constrainedMax, isFirstBlock, isLastBlock} = useSelect((select) => {
		const previousBlockClientId =
			select('core/block-editor').getPreviousBlockClientId(clientId);
		const previousBlockAttrs = select(
			'core/block-editor'
		).getBlockAttributes(previousBlockClientId);
		const rootClientId = select('core/block-editor').getBlockRootClientId(clientId);
		const rootBlock = select('core/block-editor').getBlock(rootClientId);
		const rootInnerBlocks = rootBlock.innerBlocks;
		const lastBlockClientId = rootInnerBlocks[rootInnerBlocks.length - 1].clientId;
		const firstBlockClientId = rootInnerBlocks[0].clientId;
		const _isFirstBlock = clientId === firstBlockClientId;
		const _isLastBlock = clientId === lastBlockClientId;
		let _constrainedMax = null;
		if (null !== previousBlockAttrs) {
			const _calc = previousBlockAttrs?.min - 1;
			if (_calc > 0) {
				_constrainedMax = _calc;
			}
		}
		return {
			constrainedMax: _constrainedMax,
			isFirstBlock: _isFirstBlock,
			isLastBlock: _isLastBlock,
		};
	});

	const [minValue, setMinValue] = useState(min);
	const [maxValue, setMaxValue] = useState(max);

	useEffect(() => {
		setMinValue(min);
	}, [min]);

	useEffect(() => {
		setMaxValue(max);
	}, [max]);

	useEffect(() => {
		const _minValue = parseInt(minValue);
		console.log('Updating min', _minValue);
		setAttributes({
			min: _minValue,
		});
	}, [minValue]);

	useEffect(() => {
		const _maxValue = parseInt(maxValue) === 0 ? null : parseInt(maxValue);
		console.log('Updating max', _maxValue);
		setAttributes({
			max: _maxValue,
		});
	}, [maxValue]);

	// On component init, check if there is a constrained max value and max value, if there is no max value then set it to be the constrained max value.
	useEffect(() => {
		if (null === max && null !== constrainedMax) {
			setMaxValue(constrainedMax);
		}
	}, [constrainedMax]);

	return (
		<InspectorControls>
			<PanelBody title="Responsive Range" initialOpen={true}>
				<PanelRow>
					<Flex align="center" justify="space-between">
						{!isLastBlock && (
							<FlexBlock>
								<NumberControl
									__next40pxDefaultSize
									label="Minimum"
									value={minValue}
									max={maxValue}
									step
									onChange={(val) => {
										setMinValue(parseInt(val));
									}}
								/>
							</FlexBlock>
						)}
						{!isFirstBlock && !isLastBlock && (
							<FlexItem>
								<span>
									<strong>~ to ~</strong>
								</span>
							</FlexItem>
						)}
						{!isFirstBlock && (
							<FlexBlock>
								<NumberControl
									__next40pxDefaultSize
									label="Maximum"
									value={maxValue}
									max={constrainedMax}
									step
									onChange={(val) => {
										setMaxValue(parseInt(val));
									}}
								/>
							</FlexBlock>
						)}
					</Flex>
				</PanelRow>
				<PanelRow>
					<DeviceSizeQuickSelect attributes={attributes} setAttributes={setAttributes} />
				</PanelRow>
			</PanelBody>
			<PanelBody title="Responsive Styles" initialOpen={true}>
				<TextareaControl
					label="Styles"
					value={additionalStyles}
					onChange={(val) => setAttributes({ additionalStyles: val })}
					help="Enter CSS styles that will be applied to the responsive container. Each new class will be prefixed with the block ID. One class per line."
				/>
			</PanelBody>
		</InspectorControls>
	);
}
