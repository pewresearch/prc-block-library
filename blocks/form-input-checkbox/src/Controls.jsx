/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
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
	const { type, value } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<SelectControl
					label="Input Type"
					value={type}
					options={[
						{ label: 'Checkbox', value: 'checkbox' },
						{ label: 'Radio', value: 'radio' },
					]}
					onChange={(newType) => {
						setAttributes({ type: newType });
					}}
				/>
				<TextControl
					label="Value"
					value={value}
					onChange={(newValue) => {
						setAttributes({ value: newValue });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, context }) {
	return <InspectorPanel {...{ attributes, setAttributes, context }} />;
}
