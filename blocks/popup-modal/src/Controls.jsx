/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import {
	ToolbarButton,
	PanelBody,
	Popover,
	ToolbarGroup,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from '@wordpress/components';

function Toolbar({ attributes, setAttributes }) {
	const { position } = attributes;

	const [alignmentIsOpen, toggleAlignmentOpen] = useState(false);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="admin-site"
					label="Select Screen Position"
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
		<InspectorControls>
			<PanelBody title="Popup Modal How-To" initialOpen={true}>
				<p>
					<strong>Keyboard shortcuts available:</strong>
				</p>
				<p>
					<code>esc</code> will close the modal.
				</p>
			</PanelBody>
		</InspectorControls>
	);
}
