/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useCallback } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
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

function InspectorPanel({ attributes, colors }) {
	const { layout: { orientation = 'horizontal' } = {} } = attributes;

	const {
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		borderColor,
		setBorderColor,
	} = colors;

	const colorSettings = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __('Menu Item Text'),
		},
	];

	if ('horizontal' === orientation) {
		colorSettings.push({
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __('Menu Item Background'),
		});
		colorSettings.push({
			value: borderColor.color,
			onChange: setBorderColor,
			label: __('Menu Item Border'),
		});
	}

	return (
		<InspectorControls>
			<PanelColorSettings
				__experimentalHasMultipleOrigins
				__experimentalIsRenderedInSidebar
				title={__('Color')}
				disableCustomColors
				colorSettings={colorSettings}
			/>
		</InspectorControls>
	);
}

// function Toolbar( { attributes, setAttributes, context } ) {
// 	const { myNewAttribute } = attributes;

// 	const MemoizedIconValue = useCallback( () => {
// 		if ( myNewAttribute ) {
// 			return 'admin-site';
// 		}
// 		return 'admin-site-alt';
// 	}, [ myNewAttribute ] );

// 	return (
// 		<BlockControls>
// 			<ToolbarGroup>
// 				<ToolbarDropdownMenu
// 					icon={ MemoizedIconValue }
// 					label="Select Option"
// 					controls={ [
// 						{
// 							title: 'A',
// 							icon: 'admin-site',
// 							isActive: true === myNewAttribute,
// 							onClick: () => {
// 								setAttributes( { myNewAttribute: true } );
// 							},
// 						},
// 						{
// 							title: 'B',
// 							icon: 'admin-site-alt',
// 							isActive: false === myNewAttribute,
// 							onClick: () => {
// 								setAttributes( { myNewAttribute: false } );
// 							},
// 						},
// 					] }
// 				/>
// 			</ToolbarGroup>
// 		</BlockControls>
// 	);
// }

export default function Controls({
	attributes,
	setAttributes,
	colors,
	context,
}) {
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, colors }} />
			{/* <Toolbar { ...{ attributes, setAttributes, context } } /> */}
		</Fragment>
	);
}
