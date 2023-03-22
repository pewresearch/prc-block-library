/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import {
	ToolbarButton,
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
	return <Toolbar {...{ attributes, setAttributes }} />;
}
