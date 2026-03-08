/**
 * WordPress Dependencies
 */
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { reset } from '@wordpress/icons';

export default function RemoveColumnToolbarControl({ clientId }) {
	const { removeBlock } = useDispatch(blockEditorStore);

	const siblingCount = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockCount } =
				select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			return rootId ? getBlockCount(rootId) : 1;
		},
		[clientId]
	);

	return (
		<BlockControls group="block">
			<ToolbarGroup>
				<ToolbarButton
					icon={reset}
					label={__('Remove Column', 'prc-block-library')}
					onClick={() => removeBlock(clientId)}
					disabled={siblingCount <= 1}
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
