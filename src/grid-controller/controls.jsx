/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Notice,
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

const DESKTOP_MAX = 12;
const TABLET_MAX = 8;
const MOBILE_MAX = 4;

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	colors,
}) {
	const { verticalAlignment, dividerStyle, dividerWidth, dividerInset } =
		attributes;

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
			<BlockControls>
				<BlockVerticalAlignmentToolbar
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
					<div style={{ marginBottom: '1.5em' }}>
						<RangeControl
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
					</div>
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
			<DividerControls
				dividerStyle={dividerStyle}
				dividerWidth={dividerWidth}
				dividerInset={dividerInset}
				setAttributes={setAttributes}
			/>
		</>
	);
}
