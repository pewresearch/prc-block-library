/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import {
	Flex,
	FlexItem,
	FlexBlock,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function DeviceSizeQuickSelect({ attributes, setAttributes }) {
	const { deviceType } = attributes;

	useEffect(() => {
		const sizes = {
			desktop: {
				min: 980,
				max: 0,
			},
			tablet: {
				min: 480,
				max: 979,
			},
			mobile: {
				min: 0,
				max: 479,
			},
		};
		setAttributes({
			min: sizes[deviceType].min,
			max: sizes[deviceType].max,
		});
	}, [deviceType]);

	return (
		<SelectControl
			value={deviceType}
			options={[
				{ label: 'Devices...', value: null },
				{ label: 'Desktop', value: 'desktop' },
				{ label: 'Tablet', value: 'tablet' },
				{ label: 'Mobile', value: 'mobile' },
			]}
			onChange={(deviceSize) => {
				if (null !== deviceSize) {
					setAttributes({
						deviceType: deviceSize,
					});
				}
			}}
		/>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	const { min, max } = attributes;

	// Determine the maximum, get the minimum of the previous block and subtract 1. If there are no blocks prior, and this is the first block, set the max to 0.
	const newMax = useSelect((select) => {
		const previousBlockClientId =
			select('core/block-editor').getPreviousBlockClientId(clientId);
		const previousBlockAttrs = select('core/block-editor').getBlockAttributes(
			previousBlockClientId,
		);
		if (null == previousBlockAttrs) {
			return 0;
		}
		return previousBlockAttrs.min - 1;
	});

	const [label, setLabel] = useState(`${min}px to ${max}px`);

	useEffect(() => {
		let l = `between ${min}px and ${max}px`;
		if (!max) {
			l = `minimum ${min}px`;
		}
		if (!min) {
			l = `maximum ${max}px`;
		}
		setLabel(l);
	}, [min, max]);

	useEffect(() => {
		if (undefined === max) {
			setAttributes({ max: newMax });
		}
	}, [max]);

	return (
		<BlockControls>
			<div
				style={{
					minWidth: '280px ',
					maxWidth: '320px',
					width: '100%',
					paddingTop: '7px',
					paddingLeft: '7px',
				}}
			>
				<Flex align="center">
					<FlexBlock style={{ marginBottom: '8px' }}>
						<NumberControl
							value={min}
							min={0}
							max={max}
							onChange={(val) => {
								setAttributes({
									min: parseInt(val),
								});
							}}
						/>
					</FlexBlock>
					<FlexItem style={{ marginBottom: '8px' }}>
						<span>
							<strong>~ to ~</strong>
						</span>
					</FlexItem>
					<FlexBlock style={{ marginBottom: '8px' }}>
						<NumberControl
							value={max}
							min={0}
							max={newMax}
							disabled={0 === newMax}
							onChange={(val) => {
								setAttributes({
									max: parseInt(val),
								});
							}}
						/>
					</FlexBlock>
					<FlexItem style={{ width: '100px' }}>
						<DeviceSizeQuickSelect
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					</FlexItem>
				</Flex>
			</div>
		</BlockControls>
	);
}
