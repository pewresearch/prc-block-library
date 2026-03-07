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
import OrderControls from './order-controls';
import ResponsiveToolbarControls from './responsive-toolbar-controls';

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
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateVerticalAlignment}
					value={verticalAlignment}
				/>
				{/* <ResponsiveToolbarControls
					gridLayout={gridLayout}
					setAttributes={setAttributes}
					clientId={clientId}
				/> */}
			</BlockControls>
			<InspectorControls>
				<SpanControls
					gridLayout={gridLayout}
					setAttributes={setAttributes}
				/>
				<OrderControls
					gridLayout={gridLayout}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</InspectorControls>
		</>
	);
}
