/**
 * External Dependencies
 */
import { MarkedRangeControl } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { CardDivider, PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Calculate which columns should have dividers based on visual position
 * A column gets a divider if it's NOT in position 1 (first visual position)
 * @param siblingColumns
 * @param updateBlockAttributes
 */
function calculateDividers(siblingColumns, updateBlockAttributes) {
	if (!siblingColumns || siblingColumns.length === 0) return;

	siblingColumns.forEach((column, domIndex) => {
		const columnLayout = column.attributes.gridLayout || {};
		const columnIndex = domIndex + 1; // 1-based index

		// Desktop uses DOM order - first column (index 1) has no divider
		const desktopDivider = columnIndex !== 1;

		// Tablet uses tabletPosition if set, otherwise DOM order
		const tabletPos = columnLayout.tabletPosition || columnIndex;
		const tabletDivider = tabletPos !== 1;

		// Mobile uses mobilePosition if set, otherwise DOM order
		const mobilePos = columnLayout.mobilePosition || columnIndex;
		const mobileDivider = mobilePos !== 1;

		// Only update if values have changed
		if (
			columnLayout.desktopDivider !== desktopDivider ||
			columnLayout.tabletDivider !== tabletDivider ||
			columnLayout.mobileDivider !== mobileDivider
		) {
			updateBlockAttributes(column.clientId, {
				gridLayout: {
					...columnLayout,
					desktopDivider,
					tabletDivider,
					mobileDivider,
				},
			});
		}
	});
}

/**
 * Smart position management - adjusts other columns when one column's position changes
 * This prevents position conflicts and maintains a sensible ordering
 * @param siblingColumns
 * @param movingColumnId
 * @param newPosition
 * @param device
 * @param updateBlockAttributes
 */
function adjustSiblingPositions(
	siblingColumns,
	movingColumnId,
	newPosition,
	device,
	updateBlockAttributes
) {
	if (!siblingColumns || siblingColumns.length === 0) return;

	const positionKey =
		device === 'tablet' ? 'tabletPosition' : 'mobilePosition';

	console.log('Adjusting positions for', device, 'to', newPosition);
	console.log(
		'adjustSiblingPositions',
		siblingColumns,
		movingColumnId,
		newPosition,
		device
	);

	// Get current positions of all columns
	const columnPositions = siblingColumns.map((column, domIndex) => {
		const columnLayout = column.attributes.gridLayout || {};
		const defaultPosition = domIndex + 1; // DOM order as default
		const currentPosition = columnLayout[positionKey] || defaultPosition;

		return {
			clientId: column.clientId,
			domIndex: domIndex + 1,
			currentPosition,
			layout: columnLayout,
		};
	});

	// Find the column that's moving
	const movingColumn = columnPositions.find(
		(col) => col.clientId === movingColumnId
	);
	if (!movingColumn) return;

	const oldPosition = movingColumn.currentPosition;

	// If position hasn't actually changed, no need to adjust
	if (oldPosition === newPosition) return;

	// Update positions for affected columns
	columnPositions.forEach((column) => {
		if (column.clientId === movingColumnId) {
			// This is the column being moved - handled by caller
			return;
		}

		let adjustedPosition = column.currentPosition;

		if (newPosition < oldPosition) {
			// Moving column is moving up (to lower position number)
			// Shift columns between newPosition and oldPosition down by 1
			if (
				column.currentPosition >= newPosition &&
				column.currentPosition < oldPosition
			) {
				adjustedPosition = column.currentPosition + 1;
			}
		} else {
			// Moving column is moving down (to higher position number)
			// Shift columns between oldPosition and newPosition up by 1
			if (
				column.currentPosition > oldPosition &&
				column.currentPosition <= newPosition
			) {
				adjustedPosition = column.currentPosition - 1;
			}
		}

		// Only update if position actually changed
		if (adjustedPosition !== column.currentPosition) {
			// If adjusted position equals DOM order, set to null (sequential)
			const positionValue =
				adjustedPosition === column.domIndex ? null : adjustedPosition;

			updateBlockAttributes(column.clientId, {
				gridLayout: {
					...column.layout,
					[positionKey]: positionValue,
				},
			});
		}
	});
}

export default function OrderControls({ gridLayout, setAttributes, clientId }) {
	const { index, tabletPosition, mobilePosition } = gridLayout;

	const { columnCount, siblingColumns } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockCount, getBlocks } =
				select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			return {
				columnCount: getBlockCount(rootId),
				siblingColumns: getBlocks(rootId),
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// Generate marks for ordering based on column count
	const orderMarks = Array.from({ length: columnCount }, (_, i) => ({
		value: i + 1,
		label: String(i + 1),
	}));

	/**
	 * Get current position (1-based for display)
	 * @param device
	 */
	const getCurrentPosition = (device) => {
		if (device === 'tablet') {
			return tabletPosition || index;
		}
		if (device === 'mobile') {
			return mobilePosition || index;
		}
		return index;
	};

	/**
	 * Update column position with smart adjustment of sibling columns
	 * @param newPosition
	 * @param device
	 */
	const handlePositionChange = (newPosition, device) => {
		const positionKey =
			device === 'tablet' ? 'tabletPosition' : 'mobilePosition';

		// @TODO: Get this to work properly.
		// // First, adjust sibling columns to make room for the new position
		// adjustSiblingPositions(
		// 	siblingColumns,
		// 	clientId,
		// 	newPosition,
		// 	device,
		// 	updateBlockAttributes
		// );

		// Then update this column's position
		// If setting to sequential position (matching DOM order), set to null
		const positionValue = newPosition === index ? null : newPosition;

		setAttributes({
			gridLayout: {
				...gridLayout,
				[positionKey]: positionValue,
			},
		});

		// Recalculate dividers after position changes
		// Use setTimeout to ensure all attribute updates are processed first
		setTimeout(() => {
			calculateDividers(siblingColumns, updateBlockAttributes);
		}, 50); // Slightly longer timeout to account for multiple updates
	};

	// Calculate dividers when columns are added, removed, or reordered
	useEffect(() => {
		calculateDividers(siblingColumns, updateBlockAttributes);
	}, [columnCount, tabletPosition, mobilePosition]);

	return (
		<PanelBody title="Column Order" initialOpen={false}>
			<div className="css-grid-column-controls">
				<p
					style={{
						fontSize: '12px',
						color: '#757575',
						marginTop: 0,
					}}
				>
					Set the visual order of this column at different screen
					sizes. Desktop order follows the column position in the
					editor.
				</p>
				<MarkedRangeControl
					label="Tablet Position"
					value={getCurrentPosition('tablet')}
					onChange={(newPosition) => {
						handlePositionChange(newPosition, 'tablet');
					}}
					withInputField={false}
					min={1}
					max={columnCount}
					marks={orderMarks}
					help="Visual position of this column on tablet devices"
				/>
				<CardDivider />
				<MarkedRangeControl
					label="Mobile Position"
					value={getCurrentPosition('mobile')}
					onChange={(newPosition) => {
						handlePositionChange(newPosition, 'mobile');
					}}
					withInputField={false}
					min={1}
					max={columnCount}
					marks={orderMarks}
					help="Visual position of this column on mobile devices"
				/>
			</div>
		</PanelBody>
	);
}
