/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';
import {
	Flex,
	FlexItem,
	FlexBlock,
	Notice,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function DeviceSizeQuickSelect({ attributes, setAttributes }) {
	const sizes = {
		desktop: {
			min: 980,
			max: 0,
		},
		tablet: {
			min: 480,
			max: 979,
		},
		smartphone: {
			min: 0,
			max: 479,
		},
	};

	const existingSelection = Object.keys(sizes).filter(
		(e) => sizes[e].max === attributes.max,
	);

	return (
		<SelectControl
			value={0 === existingSelection.length ? false : existingSelection[0]}
			options={[
				{ label: 'Common Device Sizes...', value: false },
				{ label: 'Desktop', value: 'desktop' },
				{ label: 'Tablet', value: 'tablet' },
				{ label: 'Smartphone', value: 'smartphone' },
			]}
			onChange={(deviceSize) => {
				if (false !== deviceSize) {
					setAttributes({
						min: sizes[deviceSize].min,
						max: sizes[deviceSize].max,
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
		<Fragment>
			<Notice
				isDismissible={false}
				spokenMessage={__(`Visible from ${min} pixels to ${max} pixels`)}
			>
				<span className="sans-serif">
					<strong>Viewport Range:</strong> {__(label)}
				</span>
			</Notice>
			<BlockControls>
				<div
					style={{
						minWidth: '280px ',
						maxWidth: '320px',
						width: '100%',
						paddingTop: '7px',
						paddingLeft: '5px',
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
		</Fragment>
	);
}
