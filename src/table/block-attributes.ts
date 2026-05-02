/**
 * Internal Dependencies
 */
import type {
	CAPTION_SIDE_CONTROLS,
	CELL_TAG_CONTROLS,
	CELL_SCOPE_CONTROLS,
	CORNER_CONTROLS,
	DIRECTION_CONTROLS,
	SIDE_CONTROLS,
	CONTENT_JUSTIFY_CONTROLS,
	BORDER_COLLAPSE_CONTROLS,
	STICKY_CONTROLS,
} from './constants';

// ---------------------------------------------------------------------------
// Column metadata types
// ---------------------------------------------------------------------------

export type ColumnDataType =
	| 'auto'
	| 'text'
	| 'number'
	| 'date'
	| 'currency'
	| 'percentage'
	| 'url'
	| 'fips'
	| 'iso3alpha'
	| 'iso3numeric';

export interface ColumnMeta {
	dataType: ColumnDataType;
	hidden?: boolean;
	sortable?: boolean;
	/** 1–10, null = off */
	roundDecimals?: number | null;
}

type NestedObject = {
	[key: string]: NestedObject | null | undefined;
};

// Controls Attributes value types
export type CaptionSideValue = (typeof CAPTION_SIDE_CONTROLS)[number]['value'];
export type CellTagValue = (typeof CELL_TAG_CONTROLS)[number]['value'];
export type CellScopeValue = (typeof CELL_SCOPE_CONTROLS)[number]['value'];
export type CornerValue = (typeof CORNER_CONTROLS)[number]['value'];
export type DirectionValue = (typeof DIRECTION_CONTROLS)[number]['value'];
export type SideValue = (typeof SIDE_CONTROLS)[number]['value'];
export type ContentJustifyValue =
	(typeof CONTENT_JUSTIFY_CONTROLS)[number]['value'];
export type BorderCollapseValue =
	(typeof BORDER_COLLAPSE_CONTROLS)[number]['value'];
export type StickyValue = (typeof STICKY_CONTROLS)[number]['value'];

// Table section name types
export type SectionName = 'head' | 'body' | 'foot';

// Table attributes
export type TableAttributes = Record<SectionName, Row[]>;

// Table row attributes
export interface Row {
	cells: Cell[];
}

// Table cell attributes
export interface Cell {
	content: string;
	styles?: string;
	tag: CellTagValue;
	className?: string;
	id?: string;
	headers?: string;
	scope?: CellScopeValue;
	rowSpan?: string;
	colSpan?: string;
	/** When set, overrides column rounding for this cell (1–10). Omit to inherit column. */
	roundDecimals?: number;
}

// Sort direction type
export type SortDirection = 'asc' | 'desc' | 'none';

// Block attributes
export interface BlockAttributes extends TableAttributes {
	contentJustification: ContentJustifyValue | undefined;
	hasFixedLayout: boolean;
	isScrollOnPc: boolean;
	isScrollOnMobile: boolean;
	isStackedOnMobile: boolean;
	sticky: StickyValue;
	tableStyles?: string;
	captionStyles?: string;
	captionSide: CaptionSideValue;
	caption?: string;
	style: NestedObject;
	tableTitle?: string;
	tableTitleStyles?: string;
	sourceNote?: string;
	/** Unified per-column metadata. Replaces the three legacy arrays below. */
	columnMeta?: ColumnMeta[];
	/** Slug of the active validation schema (from window.prcTableValidationSchemas). */
	validationSchema?: string;
	/** Derived: true when all column types and the active schema pass validation. Never set directly by the editor. */
	isValid?: boolean;
	// ---------------------------------------------------------------------------
	// @deprecated — kept for migration period only; use columnMeta instead.
	// ---------------------------------------------------------------------------
	/** @deprecated Use columnMeta[i].hidden */
	hiddenColumns?: number[];
	/** @deprecated Use columnMeta[i].roundDecimals. Per virtual column index: `null`/missing index = Off; 1–10 = round half-up to that many decimals (body/footer). */
	columnRoundDecimals?: (number | null)[];
	/** @deprecated Use columnMeta[i].sortable */
	sortableColumns?: number[];
	isSortable?: boolean;
}

// Core Table Block attributes
export interface CoreTableBlockAttributes {
	head: {
		cells: CoreTableCell[];
	}[];
	body: {
		cells: CoreTableCell[];
	}[];
	foot: {
		cells: CoreTableCell[];
	}[];
	hasFixedLayout: boolean;
	caption: string;
	style: NestedObject;
}

export interface CoreTableCell {
	content: string;
	tag: CellTagValue;
	rowspan?: string;
	colspan?: string;
}
