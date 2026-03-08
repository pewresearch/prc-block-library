/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { plus } from '@wordpress/icons';

export default function AddColumnToolbarControl({ parentClientId }) {
	const { insertBlock } = useDispatch(blockEditorStore);

	const addColumn = () => {
		const newBlock = createBlock('prc-block/grid-column', {
			gridLayout: {
				desktopSpan: 4,
				tabletSpan: 4,
				mobileSpan: 4,
			},
		});
		insertBlock(newBlock, undefined, parentClientId);
	};

	return (
		<BlockControls group="block">
			<ToolbarGroup>
				<ToolbarButton
					icon={plus}
					label={__('Add Column', 'prc-block-library')}
					onClick={addColumn}
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
