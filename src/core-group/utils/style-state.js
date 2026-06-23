/**
 * Helpers for reading and writing values inside Gutenberg's native responsive
 * "style states" structure on a block's `style` attribute.
 *
 * Gutenberg 23.3 nests per-viewport overrides under the standard `style`
 * attribute, keyed by viewport, e.g.:
 *
 *   style: {
 *     layout: { columnSpan: 2 },          // base / desktop
 *     tablet: { layout: { columnSpan: 3 } }
 *   }
 *
 * The viewport key is mid-refactor in core: 23.3.0 ships the un-prefixed
 * `tablet` / `mobile` keys (see the editor markup), while a later change moves
 * to an `@`-prefixed form (`@tablet` / `@mobile`). All reads tolerate both; all
 * writes use the format shipped in the pinned 23.3.0 build. Changing the active
 * write format later is a one-line change here.
 */

export const BASE_VIEWPORT = 'desktop';
export const RESPONSIVE_VIEWPORTS = ['tablet', 'mobile'];
export const ALL_VIEWPORTS = [BASE_VIEWPORT, ...RESPONSIVE_VIEWPORTS];

/**
 * Native responsive breakpoints, mirroring WP_Theme_JSON::RESPONSIVE_BREAKPOINTS
 * (mobile: width <= 480px, tablet: 480px < width <= 782px). Kept here so the
 * editor preview and any JS-side logic align with the SCSS media queries.
 */
export const VIEWPORT_MAX_WIDTH = {
	tablet: 782,
	mobile: 480,
};

/**
 * Candidate keys to read a responsive viewport bucket from, newest format last.
 *
 * @param {string} viewport Viewport slug (`tablet` or `mobile`).
 * @return {string[]} Candidate object keys.
 */
function readKeysForViewport(viewport) {
	return [viewport, `@${viewport}`];
}

/**
 * The key used when writing a responsive viewport bucket on 23.3.0.
 *
 * @param {string} viewport Viewport slug (`tablet` or `mobile`).
 * @return {string} Object key to write to.
 */
function writeKeyForViewport(viewport) {
	return viewport;
}

/**
 * Read a value from the block's style object for a given viewport.
 *
 * @param {Object|undefined} style    The block's `style` attribute.
 * @param {string}           viewport `desktop` (base), `tablet`, or `mobile`.
 * @param {string[]}         path     Property path within the bucket, e.g. `['layout','prcOrder']`.
 * @return {*} The stored value, or undefined.
 */
export function readStyleStateValue(style, viewport, path) {
	if (!style || typeof style !== 'object') {
		return undefined;
	}

	let bucket = style;
	if (viewport !== BASE_VIEWPORT) {
		bucket = readKeysForViewport(viewport)
			.map((key) => style[key])
			.find((value) => value && typeof value === 'object');
	}

	if (!bucket || typeof bucket !== 'object') {
		return undefined;
	}

	return path.reduce(
		(acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined),
		bucket
	);
}

const ORDER_PATH = ['layout', 'prcOrder'];

/**
 * Resolve the effective column order for a viewport, mirroring frontend SCSS
 * fallback: tablet/mobile use their own value when set, otherwise desktop.
 *
 * @param {Object|undefined} style    The block's `style` attribute.
 * @param {string}           viewport `desktop`, `tablet`, or `mobile`.
 * @return {number} Resolved order (defaults to 0).
 */
export function resolveOrderForViewport(style, viewport) {
	const explicit = readStyleStateValue(style, viewport, ORDER_PATH);
	if (explicit !== undefined) {
		return explicit;
	}
	if (viewport !== BASE_VIEWPORT) {
		return readStyleStateValue(style, BASE_VIEWPORT, ORDER_PATH) ?? 0;
	}
	return 0;
}

/**
 * Immutably set (or clear) a value in the block's style object for a viewport.
 *
 * Passing `undefined` removes the leaf key and prunes now-empty parent objects
 * so the serialized markup stays clean.
 *
 * @param {Object|undefined} style    The block's current `style` attribute.
 * @param {string}           viewport `desktop` (base), `tablet`, or `mobile`.
 * @param {string[]}         path     Property path within the bucket.
 * @param {*}                value    Value to set, or undefined to clear.
 * @return {Object} A new `style` object.
 */
export function setStyleStateValue(style, viewport, path, value) {
	const nextStyle = { ...(style || {}) };

	if (viewport === BASE_VIEWPORT) {
		return setDeep(nextStyle, path, value);
	}

	const writeKey = writeKeyForViewport(viewport);
	// Migrate any legacy/@-prefixed bucket onto the canonical write key.
	const existingBucket =
		readKeysForViewport(viewport)
			.map((key) => nextStyle[key])
			.find(
				(bucketValue) => bucketValue && typeof bucketValue === 'object'
			) || {};

	const nextBucket = setDeep({ ...existingBucket }, path, value);

	readKeysForViewport(viewport).forEach((key) => {
		delete nextStyle[key];
	});

	if (Object.keys(nextBucket).length > 0) {
		nextStyle[writeKey] = nextBucket;
	}

	return nextStyle;
}

/**
 * Immutably set a value deep in an object, pruning empties when clearing.
 *
 * @param {Object}   target Object to update (shallow-copied at each level).
 * @param {string[]} path   Property path.
 * @param {*}        value  Value to set, or undefined to clear.
 * @return {Object} Updated object.
 */
function setDeep(target, path, value) {
	const [head, ...rest] = path;

	if (rest.length === 0) {
		const next = { ...target };
		if (value === undefined || value === null || value === '') {
			delete next[head];
		} else {
			next[head] = value;
		}
		return next;
	}

	const child = setDeep(
		target[head] && typeof target[head] === 'object'
			? { ...target[head] }
			: {},
		rest,
		value
	);

	const next = { ...target };
	if (Object.keys(child).length > 0) {
		next[head] = child;
	} else {
		delete next[head];
	}
	return next;
}
