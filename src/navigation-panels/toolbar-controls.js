import { __, isRTL } from '@wordpress/i18n';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import useNavigationPanelActions from './use-navigation-panels-actions';

import { panelUp, panelDown, newPanel, deletePanel } from './icon';

/**
 * Toolbar controls for navigation panels.
 * @param {Object} props - The component props.
 * @param {string} props.clientId - The client ID of the block.
 * @returns {JSX.Element} The toolbar controls component.
 */
export default function NavigationPanelsToolbarControls({ clientId }) {
	const { insertPanel, removePanel, movePanel } =
		useNavigationPanelActions(clientId);
	const { panelCount, activeEditorIndex, isRemoveDisabled } = useSelect(
		(select) => {
			if (!clientId) {
				return true;
			}
			const { getBlocks, getBlockAttributes } = select(blockEditorStore);
			const panelCount = getBlocks(clientId).filter(
				(block) => block.name === 'prc-block/navigation-panel'
			).length;
			const panelAttributes = getBlockAttributes(clientId);

			return {
				isRemoveDisabled: panelCount <= 1,
				panelCount: panelCount,
				activeEditorIndex:
					panelAttributes?.editorActivePanelIndex ??
					panelAttributes?.activePanelIndex ??
					0,
			};
		},
		[clientId]
	);

	return (
		<>
			<BlockControls group="parent">
				<ToolbarGroup title={__('Move')}>
					<ToolbarButton
						className="components-toolbar__control"
						icon={panelUp}
						label={__('Move panel up')}
						text={__('Up')}
						onClick={() => movePanel(-1)}
						disabled={activeEditorIndex <= 0}
						accessibleWhenDisabled
					/>
					<ToolbarButton
						className="components-toolbar__control"
						icon={panelDown}
						label={__('Move panel down')}
						text={__('Down')}
						onClick={() => movePanel(1)}
						disabled={activeEditorIndex >= panelCount - 1}
						accessibleWhenDisabled
					/>
				</ToolbarGroup>
			</BlockControls>
			<BlockControls group="other">
				<ToolbarGroup>
					<ToolbarButton
						className="components-toolbar__control"
						icon={newPanel}
						onClick={() => insertPanel()}
						text={__('Add new')}
						label={__('Add new panel')}
					/>
					<ToolbarButton
						className="components-toolbar__control"
						icon={deletePanel}
						onClick={() => removePanel()}
						text={__('Remove')}
						label={__('Remove panel')}
						disabled={isRemoveDisabled}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
