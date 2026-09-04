/**
 * Grid-aware divider placement for the direct children of a core/group that
 * uses the native grid layout.
 *
 * Ports the intent of the legacy grid-column `calculateDividers` helper, but
 * sources column spans and column counts from Gutenberg's native grid layout
 * attributes instead of a bespoke `gridLayout` attribute:
 *
 * - child span:  style.layout.columnSpan (base) + style.{viewport}.layout.columnSpan
 * - grid columns: layout.columnCount (base) + style.{viewport}.layout.columnCount
 *
 * For each viewport we compute, per child:
 * - `divider`: whether a divider should be drawn before this child (i.e. it is
 *    not the first visual item in its row).
 * - `full`: whether the child spans the whole row (=> horizontal divider).
 *
 * When the column count is unknown (fluid grids using only minimumColumnWidth),
 * we estimate how many tracks fit at the viewport. If only one track fits,
 * every child except the first gets a horizontal divider. Otherwise we fall
 * back to DOM order: every child except the first gets a vertical divider.
 * Results are written to a namespaced `style.prcGridDivider` bucket on
 * each child so both the editor wrapper and PHP render can read them without any
 * parent lookup.
 */

import {
	ALL_VIEWPORTS,
	BASE_VIEWPORT,
	readStyleStateValue,
	resolveOrderForViewport,
	VIEWPORT_MAX_WIDTH,
} from './style-state';

const DIVIDER_KEY = 'prcGridDivider';

/**
 * Fallback grid gap used when clamping auto-fill tracks to a viewport width.
 * Matches Gutenberg's default `--wp--style--block-gap` when the group does
 * not resolve a concrete pixel gap at compute time.
 */
const DEFAULT_GAP_PX = 24;

/**
 * Resolve a viewport value with fallback to the base value.
 *
 * @param {Object|undefined} style    Block style attribute.
 * @param {string}           viewport Viewport slug.
 * @param {string[]}         path     Path within the layout bucket.
 * @return {*} Resolved value (viewport override or base).
 */
function resolveWithBase(style, viewport, path) {
	if (viewport === BASE_VIEWPORT) {
		return readStyleStateValue(style, BASE_VIEWPORT, path);
	}
	const override = readStyleStateValue(style, viewport, path);
	return override ?? readStyleStateValue(style, BASE_VIEWPORT, path);
}

/**
 * Children in visual order for a viewport (DOM order on desktop).
 *
 * @param {Array}  children Direct child blocks.
 * @param {string} viewport Viewport slug.
 * @return {Array} Children sorted for divider placement.
 */
function childrenInVisualOrder(children, viewport) {
	if (viewport === BASE_VIEWPORT) {
		return children;
	}
	return [...children].sort((a, b) => {
		const orderA = resolveOrderForViewport(a.attributes?.style, viewport);
		const orderB = resolveOrderForViewport(b.attributes?.style, viewport);
		if (orderA !== orderB) {
			return orderA - orderB;
		}
		return children.indexOf(a) - children.indexOf(b);
	});
}

/**
 * Compute divider flags for one viewport across all children.
 *
 * @param {Array}            children    Direct child blocks of the grid group.
 * @param {string}           viewport    Viewport slug.
 * @param {number|undefined} columnCount Resolved grid column count for the group at this viewport.
 * @return {Object} Map of clientId -> { divider, full }.
 */
function computeViewport(children, viewport, columnCount) {
	const result = {};
	let columnsFilled = 0;
	const tracks =
		Number.isInteger(columnCount) && columnCount > 0 ? columnCount : null;
	const orderedChildren = childrenInVisualOrder(children, viewport);

	orderedChildren.forEach((child, visualIndex) => {
		const span =
			resolveWithBase(child.attributes?.style, viewport, [
				'layout',
				'columnSpan',
			]) || 1;

		const fullWidthItem = tracks ? span >= tracks : false;

		let isFirstInRow;
		if (tracks) {
			if (columnsFilled === 0 || columnsFilled + span > tracks) {
				isFirstInRow = true;
				columnsFilled = span;
			} else {
				isFirstInRow = false;
				columnsFilled += span;
			}
			if (columnsFilled >= tracks) {
				columnsFilled = 0;
			}
		} else {
			isFirstInRow = visualIndex === 0;
		}

		// A 1-track (stacked) grid still needs a divider between children.
		// First-in-row would otherwise be true for every item and drop the line.
		let divider;
		let full;
		if (tracks === 1) {
			divider = visualIndex !== 0;
			full = divider;
		} else {
			divider = !isFirstInRow;
			full = Boolean(fullWidthItem && divider);
		}

		result[child.clientId] = {
			divider,
			full,
		};
	});

	return result;
}

/**
 * Resolve the grid column count for a group at a given viewport.
 *
 * @param {Object} groupLayout Group `layout` attribute.
 * @param {Object} groupStyle  Group `style` attribute.
 * @param {string} viewport    Viewport slug.
 * @return {number|undefined} Column count, or undefined for fluid grids.
 */
function resolveColumnCount(groupLayout, groupStyle, viewport) {
	const base = groupLayout?.columnCount;
	if (viewport === BASE_VIEWPORT) {
		return base;
	}
	const override = readStyleStateValue(groupStyle, viewport, [
		'layout',
		'columnCount',
	]);
	return override ?? base;
}

/**
 * Parse a CSS length used as `minimumColumnWidth` into CSS pixels.
 *
 * @param {string|number|undefined} value Length (`300px`, `12rem`, or a number).
 * @return {number|undefined} Pixel value, or undefined when unparseable.
 */
export function parseCssLengthToPx(value) {
	if (value === undefined || value === null || value === '') {
		return undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	const match = String(value)
		.trim()
		.match(/^(-?[\d.]+)\s*(px|rem|em)?$/i);
	if (!match) {
		return undefined;
	}
	const n = parseFloat(match[1]);
	if (!Number.isFinite(n)) {
		return undefined;
	}
	const unit = (match[2] || 'px').toLowerCase();
	if (unit === 'rem' || unit === 'em') {
		return n * 16;
	}
	return n;
}

/**
 * How many auto-fill tracks fit inside a viewport when a minimum column width
 * is set. Desktop is unbounded (Gutenberg does not wrap the base grid).
 *
 * @param {string|number|undefined} minimumColumnWidth Layout min column width.
 * @param {string}                  viewport           Viewport slug.
 * @return {number|undefined} Track count, or undefined when not applicable.
 */
function tracksThatFit(minimumColumnWidth, viewport) {
	if (viewport === BASE_VIEWPORT) {
		return undefined;
	}
	const minPx = parseCssLengthToPx(minimumColumnWidth);
	if (!minPx || minPx <= 0) {
		return undefined;
	}
	const maxWidth = VIEWPORT_MAX_WIDTH[viewport];
	if (!maxWidth) {
		return undefined;
	}
	return Math.max(
		1,
		Math.floor((maxWidth + DEFAULT_GAP_PX) / (minPx + DEFAULT_GAP_PX))
	);
}

/**
 * Resolve min column width from a viewport override, then the group layout.
 *
 * @param {Object} groupLayout Group `layout` attribute.
 * @param {Object} groupStyle  Group `style` attribute.
 * @param {string} viewport    Viewport slug.
 * @return {string|number|undefined} Minimum column width.
 */
function resolveMinimumColumnWidth(groupLayout, groupStyle, viewport) {
	if (viewport !== BASE_VIEWPORT) {
		const override = readStyleStateValue(groupStyle, viewport, [
			'layout',
			'minimumColumnWidth',
		]);
		if (override !== undefined && override !== null && override !== '') {
			return override;
		}
	}
	return groupLayout?.minimumColumnWidth;
}

/**
 * Column count used for divider placement: configured count, clamped by how
 * many `minimumColumnWidth` tracks fit at this viewport (auto-fill wrap).
 *
 * @param {Object} groupLayout Group `layout` attribute.
 * @param {Object} groupStyle  Group `style` attribute.
 * @param {string} viewport    Viewport slug.
 * @return {number|undefined} Effective column count.
 */
export function resolveEffectiveColumnCount(groupLayout, groupStyle, viewport) {
	const configured = resolveColumnCount(groupLayout, groupStyle, viewport);
	const fit = tracksThatFit(
		resolveMinimumColumnWidth(groupLayout, groupStyle, viewport),
		viewport
	);
	if (!fit) {
		return configured;
	}
	if (!Number.isInteger(configured) || configured <= 0) {
		return fit;
	}
	return Math.min(configured, fit);
}

/**
 * Whether the grid collapses to a single column at this viewport.
 *
 * @param {Object} groupLayout Group `layout` attribute.
 * @param {Object} groupStyle  Group `style` attribute.
 * @param {string} viewport    Viewport slug.
 * @return {boolean} True when children stack.
 */
export function gridStacksOnViewport(groupLayout, groupStyle, viewport) {
	if (viewport === BASE_VIEWPORT) {
		return false;
	}
	return resolveEffectiveColumnCount(groupLayout, groupStyle, viewport) === 1;
}

/**
 * Compute the per-child divider bucket for every viewport.
 *
 * @param {Array}  children    Direct child blocks.
 * @param {Object} groupLayout Group `layout` attribute.
 * @param {Object} groupStyle  Group `style` attribute.
 * @return {Object} Map of clientId -> divider bucket (per-viewport flags).
 */
export function computeDividerBuckets(children, groupLayout, groupStyle) {
	const perViewport = {};
	ALL_VIEWPORTS.forEach((viewport) => {
		perViewport[viewport] = computeViewport(
			children,
			viewport,
			resolveEffectiveColumnCount(groupLayout, groupStyle, viewport)
		);
	});

	const buckets = {};
	children.forEach((child) => {
		buckets[child.clientId] = {
			desktop: perViewport.desktop[child.clientId],
			tablet: perViewport.tablet[child.clientId],
			mobile: perViewport.mobile[child.clientId],
		};
	});
	return buckets;
}

/**
 * Whether two divider buckets are equivalent (avoids redundant updates).
 *
 * @param {Object|undefined} a First bucket.
 * @param {Object|undefined} b Second bucket.
 * @return {boolean} True when equal.
 */
function bucketsEqual(a, b) {
	return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * Recompute divider placement for a grid group's children and persist any
 * changes onto each child's `style.prcGridDivider` bucket.
 *
 * @param {Array}    children              Direct child blocks.
 * @param {Object}   groupLayout           Group `layout` attribute.
 * @param {Object}   groupStyle            Group `style` attribute.
 * @param {Function} updateBlockAttributes Dispatcher to update a block's attributes.
 */
/**
 * Remove persisted divider buckets from grid-group children.
 *
 * @param {Array}    children              Direct child blocks.
 * @param {Function} updateBlockAttributes Dispatcher to update a block's attributes.
 */
export function clearDividerPlacement(children, updateBlockAttributes) {
	if (!children || children.length === 0) {
		return;
	}

	children.forEach((child) => {
		const style = child.attributes?.style;
		if (!style?.[DIVIDER_KEY]) {
			return;
		}
		const nextStyle = { ...style };
		delete nextStyle[DIVIDER_KEY];
		updateBlockAttributes(child.clientId, { style: nextStyle });
	});
}

export function syncDividerPlacement(
	children,
	groupLayout,
	groupStyle,
	updateBlockAttributes
) {
	if (!children || children.length === 0) {
		return;
	}

	const buckets = computeDividerBuckets(children, groupLayout, groupStyle);

	children.forEach((child) => {
		const current = child.attributes?.style?.[DIVIDER_KEY];
		const next = buckets[child.clientId];
		if (bucketsEqual(current, next)) {
			return;
		}
		updateBlockAttributes(child.clientId, {
			style: {
				...(child.attributes?.style || {}),
				[DIVIDER_KEY]: next,
			},
		});
	});
}

/**
 * Read a child's stored divider bucket.
 *
 * @param {Object|undefined} style Child `style` attribute.
 * @return {Object|undefined} Divider bucket if present.
 */
export function readDividerBucket(style) {
	return style?.[DIVIDER_KEY];
}

export { DIVIDER_KEY };
