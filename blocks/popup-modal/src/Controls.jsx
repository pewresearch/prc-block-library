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
import { ToolbarButton } from '@wordpress/components';

function InspectorPanel({ isVideoModal = false, colors }) {
	const {
		backgroundColor,
		setBackgroundColor,
		modalBackgroundColor,
		setModalBackgroundColor,
		textColor,
		setTextColor,
	} = colors;

	const colorSettings = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __('Text'),
		},
		{
			value: modalBackgroundColor.color,
			onChange: setModalBackgroundColor,
			label: __('Modal Background'),
		},
		{
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __('Background Color'),
		},
	];

	if (isVideoModal) {
		// remove the "Modal background" color setting
		colorSettings.splice(1, 1);
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

export default function Controls({
	attributes,
	setAttributes,
	isVideoModal,
	colors,
}) {
	return <InspectorPanel {...{ isVideoModal, colors }} />;
}
