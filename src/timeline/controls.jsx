/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
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

export default function InspectorPanel({
	attributes,
	setAttributes,
	clientId,
}) {
	const { autoPlayInterval, enableAutoPlay } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
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
		</InspectorControls>
	);
}
