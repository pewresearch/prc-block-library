/**
 * External Dependencies
 */
import { link as linkIcon } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import {
	KeyboardShortcuts,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';

function Toolbar({ attributes, setAttributes, setIsLinkOpen }) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<KeyboardShortcuts
					bindGlobal
					shortcuts={{
						[rawShortcut.primary('k')]: () => setIsLinkOpen(true),
					}}
				/>
				<ToolbarButton
					name="link"
					icon={linkIcon}
					title={__('Link')}
					shortcut={displayShortcut.primary('k')}
					onClick={() => setIsLinkOpen(true)}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default function Controls({ attributes, setAttributes, setIsLinkOpen }) {
	return <Toolbar {...{ attributes, setAttributes, setIsLinkOpen }} />;
}
