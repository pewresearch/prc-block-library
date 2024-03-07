/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	BlockControls,
	JustifyToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

function JustificationControl({ attributes, setAttributes }) {
	const { justification } = attributes;
	return (
		<JustifyToolbar
			allowedControls={['left', 'center', 'right']}
			onChange={(value) => setAttributes({ justification: value })}
			value={justification}
		/>
	);
}

function WidthControls({ attributes, setAttributes, clientId }) {
	const { width } = attributes;
	return (
		<InspectorControls group="dimensions">
			<ToolsPanelItem
				label="Logo Width"
				hasValue={() => !!width}
				panelId={clientId}
			>
				<NumberControl
					isShiftStepEnabled={true}
					onChange={(newValue) => setAttributes({ width: newValue })}
					shiftStep={1}
					value={width}
					help="Control the width of the logo inside by entering a number in pixels."
				/>
			</ToolsPanelItem>
		</InspectorControls>
	);
}

export default function Controls({ attributes, setAttributes, clientId }) {
	return (
		<BlockControls>
			<JustificationControl {...{ attributes, setAttributes }} />
			<WidthControls {...{ attributes, setAttributes, clientId }} />
		</BlockControls>
	);
}
