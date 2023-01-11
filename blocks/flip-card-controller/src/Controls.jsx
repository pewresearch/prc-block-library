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
	ToolbarButton,
	ToolbarGroup,
	ResizableBox as WPComResizableBox,
} from '@wordpress/components';

function Toolbar({ isFlipped, doFlip }) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					onClick={() => doFlip()}
					isActive={isFlipped}
					label="Flip"
					icon="image-flip-horizontal"
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	context,
	isFlipped,
	doFlip,
}) {
	return <Toolbar {...{ isFlipped, doFlip }} />;
}
