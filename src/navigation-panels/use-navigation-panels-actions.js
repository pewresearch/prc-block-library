import { createBlock } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch, useRegistry } from '@wordpress/data';

/**
 * Get the siblings of a panel.
 * @param {Function} getBlocks - The function to get the blocks.
 * @param {string} parentClientId - The client ID of the parent block.
 * @returns {Array} The siblings of the panel.
 */
export function getPanelSiblings(getBlocks, parentClientId) {
	return getBlocks(parentClientId).filter(
		(block) => block.name === 'prc-block/navigation-panel'
	);
}

/**
 * Get the block index of a panel.
 * @param {Function} getBlocks - The function to get the blocks.
 * @param {string} parentClientId - The client ID of the parent block.
 * @param {number} panelIndex - The index of the panel.
 * @returns {number} The block index of the panel.
 */
function getPanelBlockIndex(getBlocks, parentClientId, panelIndex) {
	const innerBlocks = getBlocks(parentClientId);
	const optionsIndex = innerBlocks.findIndex(
		(block) => block.attributes.type === 'nav-options'
	);
	const offset = optionsIndex === -1 ? 0 : optionsIndex + 1;

	return offset + panelIndex;
}

/**
 * Provides callbacks to insert, remove and move panels for a navigation panels block.
 *
 * The hook intentionally avoids subscribing to the store: all data is derived
 * lazily inside the callbacks via `registry.select`, so consumers don't
 * re-render when the navigation panels structure changes.
 *
 * @param {string|null} clientId The client ID of the navigation-panels block.
 * @return {{ insertPanel: Function, removePanel: Function, movePanel: Function }} Panel action callbacks.
 */
export default function useNavigationPanelActions(clientId) {
	const registry = useRegistry();
	const {
		insertBlock,
		removeBlock,
		moveBlocksToPosition,
		updateBlockAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	} = useDispatch(blockEditorStore);

	const getNavigationPanelsState = () => {
		const { getBlocks, getBlockAttributes } =
			registry.select(blockEditorStore);

		if (!clientId) {
			return {
				panelSiblings: [],
				activeIndex: 0,
			};
		}

		const panelAttributes = getBlockAttributes(clientId);

		return {
			panelSiblings: getPanelSiblings(getBlocks, clientId),
			activeIndex:
				panelAttributes?.editorActivePanelIndex ??
				panelAttributes?.activePanelIndex ??
				0,
			defaultIndex: panelAttributes?.activePanelIndex,
		};
	};

	const insertPanel = (atIndex) => {
		if (!clientId) {
			return;
		}

		const { getBlocks } = registry.select(blockEditorStore);
		const { panelSiblings } = getNavigationPanelsState();
		const newIndex = atIndex ?? panelSiblings.length;
		insertBlock(
			createBlock('prc-block/navigation-panel', {
				type: 'nav-panel',
				label: `New Panel`,
				lock: {
					move: true,
					remove: false,
				},
			}),
			getPanelBlockIndex(getBlocks, clientId, newIndex),
			clientId,
			false
		);

		__unstableMarkNextChangeAsNotPersistent();
		updateBlockAttributes(clientId, {
			editorActivePanelIndex: newIndex,
		});
	};

	const removePanel = (atIndex) => {
		const { panelSiblings, activeIndex, defaultIndex } =
			getNavigationPanelsState();
		const panelCount = panelSiblings.length;

		if (panelCount <= 1) {
			return;
		}

		const removeIndex = atIndex ?? activeIndex;
		const target = panelSiblings[removeIndex];

		if (!target) {
			return;
		}

		const newActiveIndex =
			removeIndex >= panelCount - 1 ? panelCount - 2 : removeIndex;
		let newDefaultIndex =  defaultIndex; 
		// if this index was removed 
		if (defaultIndex === removeIndex) {
			// set it to the new active index 
			newDefaultIndex = newActiveIndex;
			// otherwise, if the removed index was before the default
		  } else if (defaultIndex > removeIndex) {
			newDefaultIndex = defaultIndex - 1;
		  }

		__unstableMarkNextChangeAsNotPersistent();
		updateBlockAttributes(clientId, {
			editorActivePanelIndex: newActiveIndex,
			activePanelIndex: newDefaultIndex,
		});
		removeBlock(target.clientId, false);
	};

	const movePanel = (direction) => {
		if (!clientId) {
			return;
		}

		const { getBlocks } = registry.select(blockEditorStore);
		const { panelSiblings, activeIndex } = getNavigationPanelsState();
		const toIndex = activeIndex + direction;
		const target = panelSiblings[activeIndex];

		if (!target || toIndex < 0 || toIndex >= panelSiblings.length) {
			return;
		}
		// Temporarily unlock
		__unstableMarkNextChangeAsNotPersistent();
		updateBlockAttributes(target.clientId, {
			lock: { remove: false, move: false },
		});

		// Change index
		__unstableMarkNextChangeAsNotPersistent();
		updateBlockAttributes(clientId, {
			editorActivePanelIndex: toIndex,
		});
		// Change position
		moveBlocksToPosition(
			[target.clientId],
			clientId,
			clientId,
			getPanelBlockIndex(getBlocks, clientId, toIndex)
		);

		// Restore lock
		__unstableMarkNextChangeAsNotPersistent();
		updateBlockAttributes(target.clientId, {
			lock: { remove: false, move: true },
		});
	};

	return { insertPanel, removePanel, movePanel };
}
