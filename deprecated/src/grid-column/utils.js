/**
 * Shared constants and utilities for grid-column block controls.
 */

export const MARKS = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
	{ value: 7, label: '7' },
	{ value: 8, label: '8' },
	{ value: 9, label: '9' },
	{ value: 10, label: '10' },
	{ value: 11, label: '11' },
	{ value: 12, label: '12' },
];

/**
 * Calculate which columns should have dividers based on visual position.
 * A column gets a divider if it's NOT in position 1 (first visual position).
 *
 * @param {Array}    siblingColumns        - Array of column blocks
 * @param {Function} updateBlockAttributes - Function to update block attributes
 */
export function calculateDividers(siblingColumns, updateBlockAttributes) {
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
