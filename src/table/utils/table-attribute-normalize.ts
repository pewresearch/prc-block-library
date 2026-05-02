/**
 * Normalize parsed table cell fields so save() output matches block attributes (validation).
 *
 * `is-sortable` / `is-column-hidden` are re-applied in save.tsx from block state; if they remain
 * in parsed `className`, clsx stacks duplicates on every load/save cycle.
 */

import type {
	BlockAttributes,
	Cell,
	Row,
	SectionName,
} from '../block-attributes';

const AUTO_MANAGED_CELL_CLASSES = new Set(['is-sortable', 'is-column-hidden']);

/**
 * Remove auto-managed classes from stored cell `class` so save can add them once.
 * @param className
 */
export function stripAutoManagedCellClassNames(
	className: string | undefined
): string {
	if (!className?.trim()) {
		return '';
	}
	return className
		.split(/\s+/)
		.filter((token) => token && !AUTO_MANAGED_CELL_CLASSES.has(token))
		.join(' ');
}

function classesNeedStrip(className: string | undefined): boolean {
	if (!className?.trim()) {
		return false;
	}
	return className
		.split(/\s+/)
		.some((token) => AUTO_MANAGED_CELL_CLASSES.has(token));
}

/**
 * Coerce HTML-parsed roundDecimals (string) to integer 1–10 for save + attributes.
 * @param value
 */
export function normalizeRoundDecimalsValue(
	value: unknown
): number | undefined {
	if (value === undefined || value === null) {
		return undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		const n = Math.round(value);
		if (n >= 1 && n <= 10) {
			return n;
		}
		return undefined;
	}
	if (typeof value === 'string') {
		const n = parseInt(value, 10);
		if (!Number.isNaN(n) && n >= 1 && n <= 10) {
			return n;
		}
	}
	return undefined;
}

/**
 * Normalize a single cell for persistence (strip auto classes, coerce roundDecimals).
 * @param cell
 */
export function normalizeCellPersistedFields(cell: Cell): {
	cell: Cell;
	changed: boolean;
} {
	const classChanged = classesNeedStrip(cell.className);

	const n = normalizeRoundDecimalsValue(cell.roundDecimals);
	const roundDecimalsChanged =
		cell.roundDecimals !== n &&
		(cell.roundDecimals !== undefined || n !== undefined);

	if (!classChanged && !roundDecimalsChanged) {
		return { cell, changed: false };
	}

	const strippedClass = stripAutoManagedCellClassNames(cell.className);
	const next: Cell = { ...cell };
	next.className = strippedClass || undefined;
	if (n !== undefined) {
		next.roundDecimals = n;
	} else {
		delete next.roundDecimals;
	}
	return { cell: next, changed: true };
}

/**
 * Returns a partial attribute patch when any cell needs normalization, else null.
 * @param attrs
 */
export function normalizeBlockAttributes(
	attrs: BlockAttributes
): Partial<BlockAttributes> | null {
	const sections: SectionName[] = ['head', 'body', 'foot'];
	const out: Partial<BlockAttributes> = {};
	let touched = false;

	for (const sectionName of sections) {
		const rows = attrs[sectionName];
		if (!rows?.length) {
			continue;
		}
		let sectionTouched = false;
		const newRows: Row[] = rows.map((row) => ({
			...row,
			cells: row.cells.map((cell) => {
				const { cell: next, changed } =
					normalizeCellPersistedFields(cell);
				if (changed) {
					sectionTouched = true;
				}
				return next;
			}),
		}));
		if (sectionTouched) {
			out[sectionName] = newRows;
			touched = true;
		}
	}

	return touched ? out : null;
}
