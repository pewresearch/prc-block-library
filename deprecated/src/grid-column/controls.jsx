/**
 * WordPress Dependencies
 */
import { useEffect } from '@wordpress/element';
import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import SpanControls from './span-controls';
import ColumnOrderPanel from './column-order-panel';
import AddColumnToolbarControl from './add-column-toolbar-control';
import RemoveColumnToolbarControl from './remove-column-toolbar-control';

const VERTICAL_ALIGNMENT_CONTROLS = ['top', 'center', 'bottom', 'stretch'];

export default function Controls({ attributes, setAttributes, clientId }) {
	const { gridLayout, verticalAlignment } = attributes;
	const { index } = gridLayout;

	const { rootClientId, blockIndex } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockIndex } =
				select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			return {
				rootClientId: rootId,
				blockIndex: getBlockIndex(clientId) + 1,
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const updateVerticalAlignment = (value) => {
		// Update own alignment.
		setAttributes({ verticalAlignment: value });
		// Reset parent Columns block.
		updateBlockAttributes(rootClientId, {
			verticalAlignment: null,
		});
	};

	useEffect(() => {
		if (index !== blockIndex) {
			setAttributes({
				gridLayout: {
					...gridLayout,
					index: blockIndex,
				},
			});
		}
	}, [blockIndex]);

	return (
		<>
			<AddColumnToolbarControl parentClientId={rootClientId} />
			<RemoveColumnToolbarControl clientId={clientId} />
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					controls={VERTICAL_ALIGNMENT_CONTROLS}
					onChange={updateVerticalAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<SpanControls
					gridLayout={gridLayout}
					setAttributes={setAttributes}
				/>
				<ColumnOrderPanel
					parentClientId={rootClientId}
					activeColumnClientId={clientId}
				/>
			</InspectorControls>
		</>
	);
}
