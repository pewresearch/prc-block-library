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

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<PanelBody title="Block Controls">
				<BaseControl label="Block Custom Control">
					<Button variant="primary">Perform Action</Button>
				</BaseControl>
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
			<InspectorPanel {...{attributes, setAttributes, context}}/>
			<Toolbar { ...{attributes, setAttributes, context}}/>
		</Fragment>
	);
}
