/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	AnglePickerControl,
	BaseControl,
	Button,
	CardDivider,
	RangeControl,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	ticks = [],
}) {
	const { autoPlayInterval, enableAutoPlay, tickMarkInterval, tickMarkHeight, showAllTickMarks, hideLastTick, tickLabelAngle, visibleTicks = [] } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Playback Controls">
				<ToggleControl
					label="Auto Play"
					checked={enableAutoPlay}
					onChange={() =>
						setAttributes({ enableAutoPlay: !enableAutoPlay })
					}
				/>
				<RangeControl
					label="Interval (seconds)"
					value={autoPlayInterval / 1000} // Convert milliseconds to seconds for display
					onChange={(value) =>
						setAttributes({ autoPlayInterval: value * 1000 })
					} // Convert seconds to milliseconds for storage
					min={1}
					max={10}
					step={0.5}
					marks={[
						{ value: 1, label: '1s' },
						{ value: 3, label: '3s' },
						{ value: 5, label: '5s' },
						{ value: 10, label: '10s' },
					]}
				/>
			</PanelBody>
			<PanelBody title="Tick Mark Controls">
				<ToggleControl
					label="Show All Tick Marks"
					checked={showAllTickMarks}
					onChange={() =>
						setAttributes({ showAllTickMarks: !showAllTickMarks })
					}
					help="When enabled, all tick marks are shown regardless of density. When disabled, tick marks are filtered based on the interval setting."
				/>
				{!showAllTickMarks && (
					<RangeControl
						label="Tick Mark Interval"
						value={tickMarkInterval}
						onChange={(value) =>
							setAttributes({ tickMarkInterval: value })
						}
						min={1}
						max={10}
						step={1}
						help="Display every Nth tick mark. For example, 2 shows every other tick, 5 shows every 5th tick."
					/>
				)}
				<ToggleControl
					label="Hide Last Tick"
					checked={hideLastTick}
					onChange={() =>
						setAttributes({ hideLastTick: !hideLastTick })
					}
					help="Hide the last tick mark on the timeline."
				/>
				<RangeControl
					label="Tick Mark Height (px)"
					value={tickMarkHeight}
					onChange={(value) =>
						setAttributes({ tickMarkHeight: value })
					}
					min={4}
					max={20}
					step={1}
					help="Adjust the height of the tick marks on the timeline."
				/>
				<AnglePickerControl
					label="Tick Label Angle"
					value={tickLabelAngle}
					onChange={(value) =>
						setAttributes({ tickLabelAngle: value })
					}
					help="Rotate the tick labels to prevent overlap or improve readability."
				/>
			</PanelBody>
			<PanelBody title="Specific Tick Selection" initialOpen={false}>
				<BaseControl
					help="Select which specific ticks to display. When any ticks are selected, this overrides other visibility settings."
				>
					{ticks.length === 0 && (
						<p style={{ fontStyle: 'italic', color: '#757575' }}>
							No timeline slides added yet.
						</p>
					)}
					{ticks.length > 0 && (
						<>
							<div style={{ marginBottom: '8px' }}>
								<Button
									isSmall
									variant="secondary"
									onClick={() => {
										setAttributes({ visibleTicks: [] });
									}}
								>
									Clear Selection
								</Button>
								<Button
									isSmall
									variant="secondary"
									onClick={() => {
										setAttributes({
											visibleTicks: ticks.map((_, index) => index)
										});
									}}
									style={{ marginLeft: '8px' }}
								>
									Select All
								</Button>
							</div>
							<div style={{
								maxHeight: '300px',
								overflowY: 'auto',
								border: '1px solid #ddd',
								borderRadius: '2px',
								padding: '8px'
							}}>
								{ticks.map((tick, index) => {
									const { metadata } = tick.attributes;
									const { name } = metadata;
									const label = name || `Tick ${index + 1}`;
									const isChecked = visibleTicks.includes(index);

									return (
										<ToggleControl
											key={tick.clientId}
											label={label}
											checked={isChecked}
											onChange={() => {
												const newVisibleTicks = isChecked
													? visibleTicks.filter(i => i !== index)
													: [...visibleTicks, index].sort((a, b) => a - b);
												setAttributes({ visibleTicks: newVisibleTicks });
											}}
										/>
									);
								})}
							</div>
						</>
					)}
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
}
