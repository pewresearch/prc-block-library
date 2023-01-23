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
	ColorPalette,
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
	const { placeholder, inline } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Dropdown Input Settings">
				<TextControl
					label="Placeholder Text"
					value={placeholder}
					onChange={(value) => setAttributes({ placeholder: value })}
				/>
				<ToggleControl
					label="Inline?"
					checked={inline}
					onChange={() => {
						setAttributes({ inline: !inline });
					}}
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
