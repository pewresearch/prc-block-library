/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
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
			help="Enable this option to display the logo in white when the user has dark mode enabled, overriding any color selection."
			checked={darkModeEnabled}
			onChange={(value) => setAttributes({ darkModeEnabled: value })}
		/>
	);
}

function WidthControl({ attributes, setAttributes, clientId }) {
	const { width } = attributes;

	return (
		<NumberControl
			label="Max Width"
			isShiftStepEnabled={true}
			onChange={(value) => setAttributes({ width: value })}
			shiftStep={10}
			max={360}
			value={width}
		/>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	return (
		<Fragment>
			<BlockControls>
				<JustificationControl
					{...{ attributes, setAttributes, clientId }}
				/>
			</BlockControls>
			<InspectorControls group="styles">
				<PanelBody title="Dynamic Logo Settings">
					<div>
						<DarkModeControl
							{...{ attributes, setAttributes, clientId }}
						/>
						<WidthControl
							{...{ attributes, setAttributes, clientId }}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
