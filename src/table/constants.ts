/**
 * WordPress Dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	alignLeft,
	alignCenter,
	alignRight,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	alignTop,
	alignMiddle,
	alignBottom,
	borderSolid,
	borderDotted,
	borderDashed,
	borderDouble,
	borderCollapse as borderCollapseIcon,
	borderSeparate as borderSeparateIcon,
} from './icons';

// Custom store name.
export const STORE_NAME = 'prc-block' as const;

// Rest API routes.
export const REST_API_ROUTE = '/flexible-table-block/v1/options' as const;

// Table placeholder default settings.
export const DEFAULT_PREVIEW_ROWS = 3 as const;
export const DEFAULT_PREVIEW_COLUMNS = 3 as const;
export const MIN_PREVIEW_TABLE_HEIGHT = 150 as const;
export const MAX_PREVIEW_TABLE_COL = 50 as const;
export const MAX_PREVIEW_TABLE_ROW = 50 as const;
export const THRESHOLD_PREVIEW_TABLE_COL = 10 as const;
export const THRESHOLD_PREVIEW_TABLE_ROW = 10 as const;

// Upper and lower limits.
export const MAX_BORDER_RADIUS = {
	px: 200,
	em: 20,
	rem: 20,
} as const;

export const MAX_BORDER_WIDTH = {
	px: 50,
	em: 5,
	rem: 5,
} as const;

export const MAX_BORDER_SPACING = {
	px: 50,
	em: 5,
	rem: 5,
} as const;

// Responsive breakpoint settings.
export const DEFAULT_RESPONSIVE_BREAKPOINT = 768 as const;
export const MIN_RESPONSIVE_BREAKPOINT = 200 as const;
export const MAX_RESPONSIVE_BREAKPOINT = 1200 as const;

// Available units on UnitControl component.
export const FONT_SIZE_UNITS = ['px', 'em', 'rem', '%'];
export const TABLE_WIDTH_UNITS = ['px', 'em', 'rem', '%'];
export const CELL_WIDTH_UNITS = ['px', 'em', 'rem', '%'];
export const BORDER_SPACING_UNITS = ['px', 'em', 'rem'];
export const BORDER_RADIUS_UNITS = ['px', 'em', 'rem'];
export const BORDER_WIDTH_UNITS = ['px', 'em', 'rem'];
export const PADDING_UNITS = ['px', '%', 'em', 'rem', 'vw', 'vh'];

// Cell label & text variations.
export const CELL_ARIA_LABEL = {
	head: __('Header cell text', 'prc-block'),
	body: __('Body cell text', 'prc-block'),
	foot: __('Footer cell text', 'prc-block'),
} as const;

// Controls variations.
export const CONTENT_JUSTIFY_CONTROLS = [
	{
		icon: justifyLeft,
		label: __('Justify table left', 'prc-block'),
		value: 'left',
	},
	{
		icon: justifyCenter,
		label: __('Justify table center', 'prc-block'),
		value: 'center',
	},
	{
		icon: justifyRight,
		label: __('Justify table right', 'prc-block'),
		value: 'right',
	},
];

export const BORDER_COLLAPSE_CONTROLS = [
	{
		icon: borderCollapseIcon,
		label: __('Share', 'prc-block'),
		value: 'collapse',
	},
	{
		icon: borderSeparateIcon,
		label: __('Separate', 'prc-block'),
		value: 'separate',
	},
] as const;

export const BORDER_STYLE_CONTROLS = [
	{
		label: __('Solid', 'prc-block'),
		value: 'solid',
		icon: borderSolid,
	},
	{
		label: __('Dotted', 'prc-block'),
		value: 'dotted',
		icon: borderDotted,
	},
	{
		label: __('Dashed', 'prc-block'),
		value: 'dashed',
		icon: borderDashed,
	},
	{
		label: __('Double', 'prc-block'),
		value: 'double',
		icon: borderDouble,
	},
] as const;

export const TEXT_ALIGNMENT_CONTROLS = [
	{
		icon: alignLeft,
		label: __('Align left', 'prc-block'),
		value: 'left',
	},
	{
		icon: alignCenter,
		label: __('Align center', 'prc-block'),
		value: 'center',
	},
	{
		icon: alignRight,
		label: __('Align right', 'prc-block'),
		value: 'right',
	},
] as const;

export const VERTICAL_ALIGNMENT_CONTROLS = [
	{
		icon: alignTop,
		label: __('Align top', 'prc-block'),
		value: 'top',
	},
	{
		icon: alignMiddle,
		label: __('Align middle', 'prc-block'),
		value: 'middle',
	},
	{
		icon: alignBottom,
		label: __('Align bottom', 'prc-block'),
		value: 'bottom',
	},
] as const;

export const STICKY_CONTROLS = [
	{
		label: _x('none', 'Fixed control', 'prc-block'),
		value: 'none',
	},
	{
		label: __('Fixed header', 'prc-block'),
		value: 'header',
	},
	{
		label: __('Fixed first column', 'prc-block'),
		value: 'first-column',
	},
] as const;

export const CELL_TAG_CONTROLS = [
	{
		label: __('TH', 'prc-block'),
		value: 'th',
	},
	{
		label: __('TD', 'prc-block'),
		value: 'td',
	},
] as const;

export const CELL_SCOPE_CONTROLS = [
	{
		label: _x('none', 'Cell scope control', 'prc-block'),
		value: 'none',
	},
	{
		label: __('row', 'prc-block'),
		value: 'row',
	},
	{
		label: __('col', 'prc-block'),
		value: 'col',
	},
	{
		label: __('rowgroup', 'prc-block'),
		value: 'rowgroup',
	},
	{
		label: __('colgroup', 'prc-block'),
		value: 'colgroup',
	},
] as const;

export const CAPTION_SIDE_CONTROLS = [
	{
		label: __('Top', 'prc-block'),
		value: 'top',
	},
	{
		label: __('Bottom', 'prc-block'),
		value: 'bottom',
	},
] as const;

export const CORNER_CONTROLS = [
	{
		label: __('Top left', 'prc-block'),
		value: 'topLeft',
	},
	{
		label: __('Top right', 'prc-block'),
		value: 'topRight',
	},
	{
		label: __('Bottom right', 'prc-block'),
		value: 'bottomRight',
	},
	{
		label: __('Bottom left', 'prc-block'),
		value: 'bottomLeft',
	},
] as const;

export const DIRECTION_CONTROLS = [
	{
		label: __('Vertical', 'prc-block'),
		value: 'vertical',
	},
	{
		label: __('Horizontal', 'prc-block'),
		value: 'horizontal',
	},
] as const;

export const SIDE_CONTROLS = [
	{
		label: __('Top', 'prc-block'),
		value: 'top',
	},
	{
		label: __('Right', 'prc-block'),
		value: 'right',
	},
	{
		label: __('Bottom', 'prc-block'),
		value: 'bottom',
	},
	{
		label: __('Left', 'prc-block'),
		value: 'left',
	},
] as const;
