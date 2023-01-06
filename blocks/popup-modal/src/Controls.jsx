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
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

function InspectorPanel({ attributes, setAttributes }) {
	const [alignment, setAlignment] = useState('center center');

	return (
		<InspectorControls>
			<PanelBody title="Modal Settings">
				<BaseControl label="Viewport Position">
					<AlignmentMatrixControl
						value={alignment}
						onChange={(newAlignment) => setAlignment(newAlignment)}
					/>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
}

function Toolbar({ attributes, setAttributes }) {
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

export default function Controls({ attributes, setAttributes }) {
	return <InspectorPanel {...{ attributes, setAttributes }} />;
}
