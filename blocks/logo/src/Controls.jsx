/**
 * External Dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	BlockControls,
	JustifyToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

function JustificationControl({ attributes, setAttributes, clientId }) {
	const { justification } = attributes;
	return (
		<JustifyToolbar
			allowedControls={['left', 'center', 'right']}
			onChange={(value) => setAttributes({ justification: value })}
			value={justification}
		/>
	);
}

function DarkModeControl({ attributes, setAttributes, clientId }) {
	const { darkModeEnabled } = attributes;
	return (
		<ToggleControl
			label="Dark Mode"
			help="When enabled, the logo will be displayed in white, regardles of color selection when the site is in dark mode."
			checked={darkModeEnabled}
			onChange={(value) => setAttributes({ darkModeEnabled: value })}
		/>
	);
}

function WidthControl({ attributes, setAttributes, clientId }) {
	const { width } = attributes;

	return (
		<div>
			<NumberControl
				lable="Max Width"
				isShiftStepEnabled={true}
				onChange={(value) => setAttributes({ width: value })}
				shiftStep={10}
				max={360}
				value={width}
			/>
		</div>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	return (
		<BlockControls>
			<JustificationControl
				{...{ attributes, setAttributes, clientId }}
			/>
			<InspectorControls group="styles">
				<PanelBody title="Logo Settings">
					<DarkModeControl
						{...{ attributes, setAttributes, clientId }}
					/>
					<WidthControl
						{...{ attributes, setAttributes, clientId }}
					/>
				</PanelBody>
			</InspectorControls>
		</BlockControls>
	);
}
