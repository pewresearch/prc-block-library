/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup, Dropdown } from '@wordpress/components';
import { layout } from '@wordpress/icons';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

/**
 * Redistributes existing inner block content into a new column layout.
 * Columns that exist in both old and new layouts keep their content.
 * Extra columns have their content merged into the last new column.
 * New columns beyond the old count start empty.
 *
 * @param {Array} existingColumns      Array of existing column blocks.
 * @param {Array} variationInnerBlocks Inner blocks template from the variation.
 * @return {Array} New column blocks with preserved content.
 */
function redistributeContent(existingColumns, variationInnerBlocks) {
	const newColumns =
		createBlocksFromInnerBlocksTemplate(variationInnerBlocks);
	const oldCount = existingColumns.length;
	const newCount = newColumns.length;

	return newColumns.map((newCol, i) => {
		if (i < oldCount) {
			const existingContent = existingColumns[i].innerBlocks;
			if (i === newCount - 1 && oldCount > newCount) {
				const overflow = existingColumns
					.slice(i)
					.flatMap((col) => col.innerBlocks);
				return createBlock(
					'prc-block/grid-column',
					newCol.attributes,
					overflow
				);
			}
			return createBlock(
				'prc-block/grid-column',
				newCol.attributes,
				existingContent
			);
		}
		return newCol;
	});
}

export default function LayoutToolbar({ clientId, setAttributes }) {
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	const { variations, existingColumns } = useSelect(
		(select) => ({
			variations: select(blocksStore).getBlockVariations(
				'prc-block/grid-controller',
				'block'
			),
			existingColumns:
				select(blockEditorStore).getBlock(clientId)?.innerBlocks || [],
		}),
		[clientId]
	);

	return (
		<ToolbarGroup>
			<Dropdown
				popoverProps={{ placement: 'bottom-start' }}
				renderToggle={({ isOpen, onToggle }) => (
					<ToolbarButton
						icon={layout}
						label={__('Change Layout')}
						onClick={onToggle}
						aria-expanded={isOpen}
					/>
				)}
				renderContent={({ onClose }) => (
					<div style={{ padding: '16px', minWidth: '320px' }}>
						<BlockVariationPicker
							label={__('Change Layout')}
							variations={variations}
							onSelect={(nextVariation) => {
								if (nextVariation.attributes) {
									setAttributes(nextVariation.attributes);
								}
								if (nextVariation.innerBlocks) {
									const newColumns = redistributeContent(
										existingColumns,
										nextVariation.innerBlocks
									);
									replaceInnerBlocks(
										clientId,
										newColumns,
										false
									);
								}
								onClose();
							}}
						/>
					</div>
				)}
			/>
		</ToolbarGroup>
	);
}
