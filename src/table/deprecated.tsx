/**
 * External Dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';

/**
 * WordPress Dependencies
 */
import {
	RichText,
	useBlockProps,
	// @ts-ignore: has no exported member
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { convertToObject } from './utils/style-converter';
import { toInteger } from './utils/helper';
import {
	normalizeRoundDecimalsValue,
	stripAutoManagedCellClassNames,
} from './utils/table-attribute-normalize';
import type {
	BlockAttributes,
	ColumnMeta,
	SectionName,
	Row,
} from './block-attributes';

// ---------------------------------------------------------------------------
// v2 — introduced columnMeta; migrates legacy hiddenColumns / sortableColumns /
//       columnRoundDecimals parallel arrays into the unified columnMeta array.
// ---------------------------------------------------------------------------

function getVColStartForCellV2(row: Row, cellIndex: number): number {
	let v = 0;
	for (let i = 0; i < cellIndex; i++) {
		const span = toInteger(row.cells[i].colSpan);
		v += span > 1 ? span : 1;
	}
	return v;
}

const v2 = {
	attributes: {
		contentJustification: { type: 'string' },
		hasFixedLayout: { type: 'boolean', default: true },
		isScrollOnPc: { type: 'boolean', default: false },
		isScrollOnMobile: { type: 'boolean', default: false },
		isStackedOnMobile: { type: 'boolean', default: false },
		sticky: { type: 'string' },
		tableStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'table',
			attribute: 'style',
		},
		sourceNote: {
			type: 'string',
			source: 'html',
			selector: 'p',
			__experimentalRole: 'content',
		},
		tableTitle: {
			type: 'string',
			source: 'html',
			selector: 'h4',
			__experimentalRole: 'content',
		},
		tableTitleStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'h4',
			attribute: 'style',
		},
		captionSide: { type: 'string', default: 'top' },
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
			__experimentalRole: 'content',
		},
		captionStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'figcaption',
			attribute: 'style',
		},
		head: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'thead tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
							__experimentalRole: 'content',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: { type: 'string', default: 'td', source: 'tag' },
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
						roundDecimals: {
							type: 'number',
							source: 'attribute',
							attribute: 'data-prc-round-decimals',
						},
					},
				},
			},
		},
		body: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tbody tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
							__experimentalRole: 'content',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: { type: 'string', default: 'td', source: 'tag' },
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
						roundDecimals: {
							type: 'number',
							source: 'attribute',
							attribute: 'data-prc-round-decimals',
						},
					},
				},
			},
		},
		foot: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tfoot tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
							__experimentalRole: 'content',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: { type: 'string', default: 'td', source: 'tag' },
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
						roundDecimals: {
							type: 'number',
							source: 'attribute',
							attribute: 'data-prc-round-decimals',
						},
					},
				},
			},
		},
		columnRoundDecimals: { type: 'array', default: [] },
		hiddenColumns: { type: 'array', default: [] },
		isSortable: { type: 'boolean', default: false },
		sortableColumns: { type: 'array', default: [] },
	},

	isEligible(attributes: BlockAttributes): boolean {
		const hasLegacyHidden =
			Array.isArray(attributes.hiddenColumns) &&
			attributes.hiddenColumns.length > 0;
		const hasLegacySortable =
			Array.isArray(attributes.sortableColumns) &&
			attributes.sortableColumns.length > 0;
		const hasLegacyRounding =
			Array.isArray(attributes.columnRoundDecimals) &&
			attributes.columnRoundDecimals.some(
				(v) => v !== null && v !== undefined
			);
		const hasColumnMeta =
			Array.isArray(attributes.columnMeta) &&
			attributes.columnMeta.length > 0;
		return (
			(hasLegacyHidden || hasLegacySortable || hasLegacyRounding) &&
			!hasColumnMeta
		);
	},

	migrate(attributes: BlockAttributes): BlockAttributes {
		const {
			hiddenColumns = [],
			sortableColumns = [],
			columnRoundDecimals = [],
			...rest
		} = attributes;

		// Determine the widest legacy array to set the columnMeta length.
		const colCount = Math.max(
			hiddenColumns.length > 0 ? Math.max(...hiddenColumns) + 1 : 0,
			sortableColumns.length > 0 ? Math.max(...sortableColumns) + 1 : 0,
			columnRoundDecimals.length
		);

		const columnMeta: ColumnMeta[] = Array.from(
			{ length: colCount },
			(_, i) => {
				const meta: ColumnMeta = { dataType: 'auto' };
				if (hiddenColumns.includes(i)) meta.hidden = true;
				if (sortableColumns.length > 0 && !sortableColumns.includes(i))
					meta.sortable = false;
				const rd = columnRoundDecimals[i] ?? null;
				if (rd !== null) meta.roundDecimals = rd;
				return meta;
			}
		);

		return {
			...rest,
			columnMeta,
			// Reset legacy arrays — they are no longer authoritative.
			hiddenColumns: [],
			sortableColumns: [],
			columnRoundDecimals: [],
		};
	},

	save({ attributes }: BlockSaveProps<BlockAttributes>) {
		const {
			contentJustification,
			tableStyles,
			hasFixedLayout,
			isStackedOnMobile,
			isScrollOnPc,
			isScrollOnMobile,
			sticky,
			head,
			body,
			foot,
			caption,
			captionSide,
			captionStyles,
			tableTitle,
			tableTitleStyles,
			sourceNote,
			hiddenColumns = [],
			isSortable = false,
			sortableColumns = [],
		} = attributes;

		const isEmpty: boolean =
			!head?.length && !body?.length && !foot?.length;
		if (isEmpty) return null;

		const tableStylesObj: Properties = convertToObject(tableStyles);
		const captionStylesObj: Properties = convertToObject(captionStyles);
		const tableTitleStylesObj: Properties =
			convertToObject(tableTitleStyles);
		const colorProps = getColorClassesAndStyles(attributes);

		const blockProps = useBlockProps.save({
			className: clsx({
				[`is-content-justification-${contentJustification}`]:
					contentJustification,
				'is-scroll-on-pc': isScrollOnPc,
				'is-scroll-on-mobile': isScrollOnMobile,
				'is-sortable': isSortable,
			}),
		});

		const tableClasses: string = clsx(colorProps.className, {
			'has-fixed-layout': hasFixedLayout,
			'is-stacked-on-mobile': isStackedOnMobile,
			[`is-sticky-${sticky}`]: sticky,
		});

		const hasCaption: boolean = !RichText.isEmpty(caption || '');
		const hasTableTitle: boolean = !RichText.isEmpty(tableTitle || '');
		const hasSourceNote: boolean = !RichText.isEmpty(sourceNote || '');

		const Section = ({
			type,
			rows,
		}: {
			type: SectionName;
			rows: Row[];
		}) => {
			if (!rows.length) return null;
			const Tag = `t${type}` as const;
			const isHeader = type === 'head';
			const isDataSection = type === 'body' || type === 'foot';

			return (
				<Tag>
					{rows.map(({ cells }, rowIndex) => (
						<tr key={rowIndex}>
							{cells.map(
								(
									{
										content,
										tag,
										className,
										id,
										headers,
										scope,
										rowSpan,
										colSpan,
										styles,
										roundDecimals,
									},
									cellIndex
								) => {
									const row = rows[rowIndex];
									const vColStart = getVColStartForCellV2(
										row,
										cellIndex
									);
									const isHidden =
										hiddenColumns.includes(vColStart);
									const isCellSortable =
										isSortable &&
										isHeader &&
										rowIndex === 0 &&
										(sortableColumns.length === 0 ||
											sortableColumns.includes(
												vColStart
											));
									const cellClassName = clsx(
										stripAutoManagedCellClassNames(
											className
										),
										{
											'is-column-hidden': isHidden,
											'is-sortable': isCellSortable,
										}
									);
									const dataSectionProps: Record<
										string,
										string
									> = isDataSection
										? {
												'data-prc-v-col':
													String(vColStart),
											}
										: {};
									const effectiveRoundDecimals =
										normalizeRoundDecimalsValue(
											roundDecimals
										);
									const roundDecimalsProps: Record<
										string,
										string
									> =
										isDataSection &&
										effectiveRoundDecimals !== undefined
											? {
													'data-prc-round-decimals':
														String(
															effectiveRoundDecimals
														),
												}
											: {};
									return (
										<RichText.Content
											key={cellIndex}
											tagName={tag}
											className={
												cellClassName || undefined
											}
											id={
												(tag === 'th' && id) ||
												undefined
											}
											headers={headers || undefined}
											scope={
												(tag === 'th' && scope) ||
												undefined
											}
											value={content}
											rowSpan={
												toInteger(rowSpan) > 1
													? toInteger(rowSpan)
													: undefined
											}
											colSpan={
												toInteger(colSpan) > 1
													? toInteger(colSpan)
													: undefined
											}
											style={convertToObject(styles)}
											{...dataSectionProps}
											{...roundDecimalsProps}
										/>
									);
								}
							)}
						</tr>
					))}
				</Tag>
			);
		};

		const Caption = () => (
			<RichText.Content
				className="prc-block-table-caption"
				tagName="figcaption"
				value={caption || ''}
				style={captionStylesObj}
			/>
		);
		const TableTitleEl = () => (
			<RichText.Content
				className="prc-block-table-title"
				tagName="h4"
				value={tableTitle || ''}
				style={tableTitleStylesObj}
			/>
		);
		const SourceNote = () => (
			<RichText.Content
				className="prc-block-table-source-note"
				tagName="p"
				value={sourceNote || ''}
			/>
		);

		return (
			<figure {...blockProps}>
				{hasTableTitle && <TableTitleEl />}
				{hasCaption && 'top' === captionSide && <Caption />}
				<table
					className={tableClasses ?? undefined}
					style={{ ...tableStylesObj, ...colorProps.style }}
				>
					<Section type="head" rows={head} />
					<Section type="body" rows={body} />
					<Section type="foot" rows={foot} />
				</table>
				{hasCaption && 'bottom' === captionSide && <Caption />}
				{hasSourceNote && <SourceNote />}
			</figure>
		);
	},
};

// ---------------------------------------------------------------------------
// v1 — original save before rounding/sorting/title/sourceNote were added.
// ---------------------------------------------------------------------------

// To fix a problem with link colors not being applied
const v1 = {
	attributes: {
		contentJustification: {
			type: 'string',
		},
		hasFixedLayout: {
			type: 'boolean',
			default: true,
		},
		isScrollOnPc: {
			type: 'boolean',
			default: false,
		},
		isScrollOnMobile: {
			type: 'boolean',
			default: false,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: false,
		},
		sticky: {
			type: 'string',
		},
		tableStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'table',
			attribute: 'style',
		},
		captionSide: {
			type: 'string',
			default: 'bottom',
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
		},
		captionStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'figcaption',
			attribute: 'style',
		},
		head: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'thead tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
		body: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tbody tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
		foot: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tfoot tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: ['row', 'col', 'rowgroup', 'colgroup'],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
	},
	supports: {
		anchor: true,
		align: ['left', 'right', 'wide', 'full'],
		color: {
			__experimentalSkipSerialization: true,
			gradients: true,
			link: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalTextTransform: true,
			__experimentalFontStyle: true,
			__experimentalFontWeight: true,
			__experimentalLetterSpacing: true,
		},
		spacing: {
			margin: true,
		},
		__experimentalSelector: '.wp-block-flexible-table-block-table > table',
	},
	save({ attributes }: BlockSaveProps<BlockAttributes>) {
		const {
			contentJustification,
			tableStyles,
			hasFixedLayout,
			isStackedOnMobile,
			isScrollOnPc,
			isScrollOnMobile,
			sticky,
			head,
			body,
			foot,
			caption,
			captionSide,
			captionStyles,
		} = attributes;

		const isEmpty: boolean = !head.length && !body.length && !foot.length;

		if (isEmpty) {
			return null;
		}

		const tableStylesObj: Properties = convertToObject(tableStyles);
		const captionStylesObj: Properties = convertToObject(captionStyles);

		const colorProps = getColorClassesAndStyles(attributes);

		const blockProps = useBlockProps.save({
			className: clsx({
				[`is-content-justification-${contentJustification}`]:
					contentJustification,
				'is-scroll-on-pc': isScrollOnPc,
				'is-scroll-on-mobile': isScrollOnMobile,
			}),
		});

		const tableClasses: string = clsx(colorProps.className, {
			'has-fixed-layout': hasFixedLayout,
			'is-stacked-on-mobile': isStackedOnMobile,
			[`is-sticky-${sticky}`]: sticky,
		});

		const hasCaption: boolean = !RichText.isEmpty(caption || '');

		const Section = ({
			type,
			rows,
		}: {
			type: SectionName;
			rows: Row[];
		}) => {
			if (!rows.length) {
				return null;
			}

			const Tag = `t${type}` as const;

			return (
				<Tag>
					{rows.map(({ cells }, rowIndex) => (
						<tr key={rowIndex}>
							{cells.map(
								(
									{
										content,
										tag,
										className,
										id,
										headers,
										scope,
										rowSpan,
										colSpan,
										styles,
									},
									cellIndex
								) => (
									<RichText.Content
										key={cellIndex}
										tagName={tag}
										className={className || undefined}
										id={(tag === 'th' && id) || undefined}
										headers={headers || undefined}
										scope={
											(tag === 'th' && scope) || undefined
										}
										value={content}
										rowSpan={
											toInteger(rowSpan) > 1
												? toInteger(rowSpan)
												: undefined
										}
										colSpan={
											toInteger(colSpan) > 1
												? toInteger(colSpan)
												: undefined
										}
										style={convertToObject(styles)}
									/>
								)
							)}
						</tr>
					))}
				</Tag>
			);
		};

		const Caption = () => (
			<RichText.Content
				tagName="figcaption"
				value={caption || ''}
				style={captionStylesObj}
			/>
		);

		return (
			<figure {...blockProps}>
				{hasCaption && 'top' === captionSide && <Caption />}
				<table
					className={tableClasses ?? undefined}
					style={{ ...tableStylesObj, ...colorProps.style }}
				>
					<Section type="head" rows={head} />
					<Section type="body" rows={body} />
					<Section type="foot" rows={foot} />
				</table>
				{hasCaption && 'bottom' === captionSide && <Caption />}
			</figure>
		);
	},
};

export default [v2, v1];
