/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	CardDivider,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

function InspectorPanel({ attributes, setAttributes }) {
	const { value } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				<TextControl
					label="Value"
					value={value}
					onChange={(newValue) => setAttributes({ value: newValue })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

function Toolbar() {
	return (
		<BlockControls>
			<ToolbarGroup />
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes, context }} />
			<Toolbar {...{ attributes, setAttributes, context }} />
		</Fragment>
	);
}
