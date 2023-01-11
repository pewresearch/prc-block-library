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
	PanelBody,
	ToolbarButton,
	Popover,
	ToolbarGroup,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from '@wordpress/components';

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
	const { position } = attributes;

	const [alignmentIsOpen, toggleAlignmentOpen] = useState(false);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="admin-site"
					label="Select Alignment"
					isActive={alignmentIsOpen}
					onClick={() => {
						toggleAlignmentOpen(!alignmentIsOpen);
					}}
				/>
				{alignmentIsOpen && (
					<Popover>
						<AlignmentMatrixControl
							value={position}
							onChange={(newPosition) => {
								console.log(newPosition, position);
								setAttributes({ position: newPosition });
							}}
						/>
					</Popover>
				)}
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes }) {
	return (
		<Fragment>
			<InspectorPanel {...{ attributes, setAttributes }} />
			<Toolbar {...{ attributes, setAttributes }} />
		</Fragment>
	);
}
