import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { getPanelSiblings } from './use-navigation-panels-actions';

export default function useNavigationPanelsState(clientId) {
  return useSelect((select) => {
    if (!clientId) {
      return { panelSiblings: [], activeIndex: 0, defaultIndex: 0 };
    }
    const { getBlocks, getBlockAttributes } = select(blockEditorStore);
    const attrs = getBlockAttributes(clientId);
    return {
      panelSiblings: getPanelSiblings(getBlocks, clientId),
      activeIndex:
        attrs?.editorActivePanelIndex ?? attrs?.activePanelIndex ?? 0,
      defaultIndex: attrs?.activePanelIndex,
    };
  }, [clientId]);
}