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

function Toolbar({ attributes, setAttributes, context }) {
	const { myNewAttribute } = attributes;

	const MemoizedIconValue = useCallback(() => {
		if (myNewAttribute) {
			return 'admin-site';
		}
		return 'admin-site-alt';
	}, [myNewAttribute]);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={MemoizedIconValue}
					label="Select Option"
					controls={[
						{
							title: 'A',
							icon: 'admin-site',
							isActive: true === myNewAttribute,
							onClick: () => {
								setAttributes({ myNewAttribute: true });
							},
						},
						{
							title: 'B',
							icon: 'admin-site-alt',
							isActive: false === myNewAttribute,
							onClick: () => {
								setAttributes({ myNewAttribute: false });
							},
						},
					]}
				/>
			</ToolbarGroup>
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
