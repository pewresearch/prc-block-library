/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

export default function Controls({ attributes, setAttributes, context }) {
	const { enableLink } = attributes;
	return (
		<BlockControls>
			<ToolbarButton
				onClick={() => setAttributes({ enableLink: !enableLink })}
				isActive={enableLink}
				label="Enable link to Staff page"
				icon="admin-links"
			/>
		</BlockControls>
	);
}
