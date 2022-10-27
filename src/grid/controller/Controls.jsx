/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Notice,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import {
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	PanelColorSettings,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	hasExplicitPercentColumnWidths,
	getMappedColumnWidths,
	getRedistributedColumnWidths,
	toWidthPrecision,
} from './utils';

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors,
}) {
	const { verticalAlignment } = attributes;

	const {
		backgroundColor,
		textColor,
		dividerColor,
		setBackgroundColor,
		setTextColor,
		setDividerColor,
	} = colors;

	const { updateBlockAttributes, replaceInnerBlocks } =
		useDispatch(blockEditorStore);

	const { count, innerBlockClientIds, getBlocks } = useSelect(
		(select) => ({
			count: select(blockEditorStore).getBlockCount(clientId),
			innerBlockClientIds: select(blockEditorStore).getBlockOrder(clientId),
			getBlocks: select(blockEditorStore).getBlocks,
		}),
		[clientId],
	);

	/**
	 * Update all child Column blocks with a new vertical alignment setting
	 * based on whatever alignment is passed in. This allows change to parent
	 * to overide anything set on a individual column basis.
	 *
	 * @param {string} verticalAlignment the vertical alignment setting
	 */
	const updateAlignment = (newAlignment) => {
		// Update own alignment.
		setAttributes({ verticalAlignment: newAlignment });

		// Update all child Column Blocks to match.
		innerBlockClientIds.forEach((innerBlockClientId) => {
			updateBlockAttributes(innerBlockClientId, {
				verticalAlignment: newAlignment,
			});
		});
	};

	/**
	 * Updates the column count, including necessary revisions to child Column
	 * blocks to grant required or redistribute available space.
	 *
	 * @param {number} previousColumns Previous column count.
	 * @param {number} newColumns      New column count.
	 */
	const updateColumns = (previousColumns, newColumns) => {
		let innerBlocks = getBlocks(clientId);
		const hasExplicitWidths = hasExplicitPercentColumnWidths(innerBlocks);
		// Redistribute available width for existing inner blocks.
		const isAddingColumn = newColumns > previousColumns;
		if (isAddingColumn && hasExplicitWidths) {
			// If adding a new column, assign width to the new column equal to
			// as if it were `1 / columns` of the total available space.
			const newColumnWidth = toWidthPrecision(100 / newColumns);
			// Redistribute in consideration of pending block insertion as
			// constraining the available working width.
			const widths = getRedistributedColumnWidths(
				innerBlocks,
				100 - newColumnWidth,
			);
			innerBlocks = [
				...getMappedColumnWidths(innerBlocks, widths),
				...Array.from({
					length: newColumns - previousColumns,
				}).map(() =>
					createBlock('prc-block/grid-column', {
						width: `${newColumnWidth}%`,
					}),
				),
			];
		} else if (isAddingColumn) {
			innerBlocks = [
				...innerBlocks,
				...Array.from({
					length: newColumns - previousColumns,
				}).map(() => createBlock('prc-block/grid-column')),
			];
		} else {
			// The removed column will be the last of the inner blocks.
			innerBlocks = innerBlocks.slice(0, -(previousColumns - newColumns));
			if (hasExplicitWidths) {
				// Redistribute as if block is already removed.
				const widths = getRedistributedColumnWidths(innerBlocks, 100);
				innerBlocks = getMappedColumnWidths(innerBlocks, widths);
			}
		}
		replaceInnerBlocks(clientId, innerBlocks);
	};

	return (
		<Fragment>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__('Columns')}
						value={count}
						onChange={(value) => updateColumns(count, value)}
						min={1}
						max={Math.max(6, count)}
					/>
					{6 < count && (
						<Notice status="warning" isDismissible={false}>
							{__(
								'This column count exceeds the recommended amount and may cause visual breakage.',
							)}
						</Notice>
					)}
				</PanelBody>
				<PanelColorSettings
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					title={__('Color')}
					disableCustomColors
					colorSettings={[
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __('Text'),
						},
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background'),
						},
						{
							value: dividerColor.color,
							onChange: setDividerColor,
							label: __('Gutter Divider'),
						},
					]}
				/>
			</InspectorControls>
		</Fragment>
	);
}
