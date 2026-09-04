/**
 * Count computed CSS grid column tracks on an element.
 *
 * `getComputedStyle` resolves `repeat()` / `minmax()` / `auto-fill` to a
 * space-separated list of track sizes. One token is one column.
 *
 * @param {Element|null|undefined} element Grid element.
 * @return {number} Track count, or 0 when the element is not a grid.
 */
export function countComputedGridTracks(element) {
	if (!element || typeof element !== 'object') {
		return 0;
	}
	const style = window.getComputedStyle(element);
	const columns = style?.gridTemplateColumns;
	if (!columns || columns === 'none') {
		return 0;
	}
	return columns.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Whether a grid currently stacks to a single column.
 *
 * @param {Element|null|undefined} element Grid element.
 * @return {boolean} True when exactly one track is laid out.
 */
export function gridIsStacked(element) {
	return countComputedGridTracks(element) === 1;
}
