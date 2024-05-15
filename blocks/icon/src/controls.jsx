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
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

function InspectorPanel({ IconLibraryIndex, attributes, setAttributes }) {
	const [iconLibrary, setIconLibrary] = useState('solid');
	const availableLibraries = Object.keys(IconLibraryIndex);
	const { library, icon, size } = attributes;
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				<SelectControl
					label={__('Icon Library')}
					value={iconLibrary}
					options={availableLibraries.map((lib) => ({
						label: lib
							.replace(/-/g, ' ')
							.replace(/\b\w/g, (l) => l.toUpperCase()),
						value: lib,
					}))}
					onChange={(lib) => {
						setIconLibrary(lib);
						setAttributes({ library: lib });
					}}
				/>
				<SelectControl
					label={__('Icon')}
					value={icon}
					options={IconLibraryIndex[iconLibrary].map((i) => ({
						// label replace - with space and capitalize first letter of each word
						label: i
							.replace(/-/g, ' ')
							.replace(/\b\w/g, (l) => l.toUpperCase()),
						value: i,
					}))}
					onChange={(i) => setAttributes({ icon: i })}
				/>
				<NumberControl
					label={__('Size (in em)')}
					value={size}
					min={0.1}
					step={0.1}
					onChange={(val) => setAttributes({ size: val })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default function Controls({
	IconLibraryIndex,
	attributes,
	setAttributes,
	context,
}) {
	return (
		<InspectorPanel
			{...{ IconLibraryIndex, attributes, setAttributes, context }}
		/>
	);
}
