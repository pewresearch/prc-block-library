/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	RangeControl,
} from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import DividerControls from './divider-controls';
import LayoutToolbar from './layout-toolbar';
import AddColumnToolbarControl from '../grid-column/add-column-toolbar-control';
import ColumnOrderPanel from '../grid-column/column-order-panel';

const DESKTOP_MAX = 12;
const TABLET_MAX = 12;
const MOBILE_MAX = 4;

const VERTICAL_ALIGNMENT_CONTROLS = ['top', 'center', 'bottom', 'stretch'];

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors,
}) {
	const { verticalAlignment, dividerStyle, dividerInset } = attributes;

	const { dividerColor, setDividerColor } = colors;

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
	 * to override anything set on an individual column basis.
	 *
	 * @param {string} newAlignment - The vertical alignment setting
	 */
	const updateAlignment = (newAlignment) => {
		setAttributes({ verticalAlignment: newAlignment });
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

		let availableMobileSpan = columns.reduce(
			(acc, column) => acc - column.attributes.gridLayout.mobileSpan,
			MOBILE_MAX
		);
		if (0 > availableMobileSpan) {
			availableMobileSpan = 0;
		}

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
			const lastColumnInnerBlocks =
				columns[columns.length - 1].innerBlocks;
			const secondToLastColumnInnerBlocks =
				columns[columns.length - 2].innerBlocks;
			const mergedInnerBlocks = [
				...secondToLastColumnInnerBlocks,
				...lastColumnInnerBlocks,
			];
			columns[columns.length - 2].innerBlocks = mergedInnerBlocks;
			columns = columns.slice(0, -(previousColumns - newColumns));
		}

		replaceInnerBlocks(clientId, columns);
	};

	return (
		<>
			<AddColumnToolbarControl parentClientId={clientId} />
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					controls={VERTICAL_ALIGNMENT_CONTROLS}
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
				<LayoutToolbar
					clientId={clientId}
					setAttributes={setAttributes}
				/>
			</BlockControls>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					label={__('Columns')}
					hasValue={() => undefined !== count}
					panelId={clientId}
				>
					<RangeControl
						__nextHasNoMarginBottom
						label={__('Columns')}
						value={count}
						onChange={(value) => updateColumns(count, value)}
						min={1}
						max={Math.max(12, count)}
					/>
				</ToolsPanelItem>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							colorValue: dividerColor?.color,
							onColorChange: setDividerColor,
							label: __('Column Divider'),
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
			<InspectorControls>
				<ColumnOrderPanel parentClientId={clientId} />
			</InspectorControls>
			<DividerControls
				clientId={clientId}
				dividerStyle={dividerStyle}
				dividerInset={dividerInset}
				setAttributes={setAttributes}
			/>
		</>
	);
}
