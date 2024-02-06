/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { MarkedRangeControl } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	Notice,
	RangeControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';

const DESKTOP_MAX = 12;
const TABLET_MAX = 8;
const MOBILE_MAX = 4;

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors,
}) {
	const { verticalAlignment } = attributes;

	const {
		dividerColor,
		setDividerColor,
	} = colors;

	const colorSettings = useMultipleOriginColorsAndGradients();

	const { updateBlockAttributes, replaceInnerBlocks } =
		useDispatch(blockEditorStore);

	const { count, innerBlocks, innerBlockClientIds } = useSelect(
		(select) => ({
			count: select(blockEditorStore).getBlockCount(clientId),
			innerBlockClientIds:
				select(blockEditorStore).getBlockOrder(clientId),
			innerBlocks:
				select(blockEditorStore).getBlock(clientId).innerBlocks,
		}),
		[clientId]
	);

	/**
	 * Update all child Column blocks with a new vertical alignment setting
	 * based on whatever alignment is passed in. This allows change to parent
	 * to overide anything set on a individual column basis.
	 *
	 * @param {string} verticalAlignment the vertical alignment setting
	 * @param          newAlignment
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
		let columns = innerBlocks;
		const isAddingColumn = newColumns > previousColumns;

		console.log(
			'updateColumns -> ',
			columns,
			isAddingColumn,
			previousColumns,
			newColumns
		);
		// See if there is available space, how much in terms of span count is available.

		// get all the attributes.gridLayout.desktopSpan from the innerBlocks
		let availableDesktopSpan = columns.reduce(
			(acc, column) => acc - column.attributes.gridLayout.desktopSpan,
			DESKTOP_MAX
		);
		if (0 > availableDesktopSpan) {
			availableDesktopSpan = 0;
		}

		let availableTabletSpan = columns.reduce(
			(acc, column) => acc - column.attributes.gridLayout.tabletSpan,
			TABLET_MAX
		);
		if (0 > availableTabletSpan) {
			availableTabletSpan = 0;
		}

		// Get available mobile spans but if its negative then just return 0
		let availableMobileSpan = columns.reduce(
			(acc, column) => acc - column.attributes.gridLayout.mobileSpan,
			MOBILE_MAX
		);
		if (0 > availableMobileSpan) {
			availableMobileSpan = 0;
		}

		console.log('Available Spans:', {
			availableDesktopSpan,
			availableTabletSpan,
			availableMobileSpan,
		});

		if (isAddingColumn) {
			const newBlock = createBlock('prc-block/grid-column', {
				gridLayout: {
					index: columns.length + 1,
					desktopSpan: 4,
					tabletSpan: 4,
					mobileSpan: 4,
					tabletStart: 1,
					mobileStart: 1,
				},
			});
			columns = [...columns, newBlock];
		} else {
			// Get the last column's innerBlocks and merge them with the second to last column's innerBlocks.
			const lastColumnInnerBlocks =
				columns[columns.length - 1].innerBlocks;
			const secondToLastColumnInnerBlocks =
				columns[columns.length - 2].innerBlocks;
			const mergedInnerBlocks = [
				...secondToLastColumnInnerBlocks,
				...lastColumnInnerBlocks,
			];
			// Replace the second to last column's innerBlocks with the merged innerBlocks.
			columns[columns.length - 2].innerBlocks = mergedInnerBlocks;
			// The removed column will be the last of the inner blocks.
			columns = columns.slice(0, -(previousColumns - newColumns));
			// We will need to redistribute the remaining space to the last column.
		}

		console.log(
			'"updateColumns" replaceInnerBlocks...',
			isAddingColumn,
			previousColumns,
			newColumns,
			columns,
			innerBlocks
		);

		replaceInnerBlocks(clientId, columns);
	};

	return (
		<Fragment>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					label={__('Columns')}
					hasValue={() => undefined !== count}
					panelId={clientId}
				>
					<MarkedRangeControl
						label={__('Columns')}
						value={count}
						onChange={(value) => updateColumns(count, value)}
						min={1}
						max={Math.max(6, count)}
						withInputField={false}
						marks={[
							{ value: 1, label: '1' },
							{ value: 2, label: '2' },
							{ value: 3, label: '3' },
							{ value: 4, label: '4' },
							{ value: 5, label: '5' },
							{ value: 6, label: '6' },
						]}
					/>
					{6 < count && (
						<Notice status="warning" isDismissible={false}>
							{__(
								'This column count exceeds the recommended amount and may cause visual breakage.'
							)}
						</Notice>
					)}
				</ToolsPanelItem>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							colorValue: dividerColor?.color,
							onColorChange: setDividerColor,
							label: __('Column Divider'),
						},
					] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ true }
					__experimentalIsRenderedInSidebar
					{ ...colorSettings }
				/>
			</InspectorControls>
		</Fragment>
	);
}
