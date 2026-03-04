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
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { convertToObject } from './utils/style-converter';
import { toInteger } from './utils/helper';
import type { BlockAttributes, SectionName, Row } from './block-attributes';

/**
 * Parses underscore-prefix notation: leading underscores set display decimal precision.
 * e.g. _0.01 → display "0.0", sort 0.01; __0.002 → display "0.00", sort 0.002
 * @param htmlContent
 */
function parseUnderscoreNotation(htmlContent: string): {
	displayContent: string;
	sortValue: string;
} | null {
	const text = htmlContent.replace(/<[^>]*>/g, '').trim();
	const match = text.match(/^(_+)(-?[\d,]+\.?\d*%?)$/);
	if (!match) return null;

	const underscoreCount = match[1].length;
	const rawValue = match[2];
	const numericStr = rawValue.replace(/[,%]/g, '');
	const num = parseFloat(numericStr);
	if (isNaN(num)) return null;

	const formatted = num.toFixed(underscoreCount);
	const isPercent = rawValue.endsWith('%');
	return {
		displayContent: isPercent ? `${formatted}%` : formatted,
		sortValue: numericStr,
	};
}

export default function save({ attributes }: BlockSaveProps<BlockAttributes>) {
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

	const isEmpty: boolean = !head?.length && !body?.length && !foot?.length;

	if (isEmpty) {
		return null;
	}

	const tableStylesObj: Properties = convertToObject(tableStyles);
	const captionStylesObj: Properties = convertToObject(captionStyles);
	const tableTitleStylesObj: Properties = convertToObject(tableTitleStyles);
	const colorProps = getColorClassesAndStyles(attributes);

	// Prepare interactivity context for sortable tables
	const interactivityContext = isSortable
		? JSON.stringify({
				sortColumn: null,
				sortDirection: 'none',
				sortableColumns,
			})
		: undefined;

	const blockProps = useBlockProps.save({
		className: clsx({
			[`is-content-justification-${contentJustification}`]:
				contentJustification,
			'is-scroll-on-pc': isScrollOnPc,
			'is-scroll-on-mobile': isScrollOnMobile,
			'is-sortable': isSortable,
		}),
		...(isSortable && {
			'data-wp-interactive': 'prc-block/table',
			'data-wp-context': interactivityContext,
			'data-wp-init': 'callbacks.onInit',
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

	const Section = ({ type, rows }: { type: SectionName; rows: Row[] }) => {
		if (!rows.length) {
			return null;
		}

		const Tag = `t${type}` as const;
		const isHeader = type === 'head';

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
							) => {
								const isHidden =
									hiddenColumns.includes(cellIndex);

								// Determine if this header cell is sortable
								const isCellSortable =
									isSortable &&
									isHeader &&
									rowIndex === 0 && // Only first row of header
									(sortableColumns.length === 0 ||
										sortableColumns.includes(cellIndex));

								const cellClassName = clsx(className, {
									'is-column-hidden': isHidden,
									'is-sortable': isCellSortable,
								});

								// Prepare sortable props for header cells
								const sortableProps = isCellSortable
									? {
											'data-wp-on--click':
												'actions.onHeaderClick',
											'data-column-index':
												cellIndex.toString(),
											role: 'button',
											tabIndex: 0,
										}
									: {};

								const underscoreParsed =
									parseUnderscoreNotation(content);
								const displayContent =
									underscoreParsed?.displayContent ?? content;
								const sortValueAttr = underscoreParsed
									? {
											'data-sort-value':
												underscoreParsed.sortValue,
										}
									: {};

								return (
									<RichText.Content
										key={cellIndex}
										tagName={tag}
										className={cellClassName || undefined}
										id={(tag === 'th' && id) || undefined}
										headers={headers || undefined}
										scope={
											(tag === 'th' && scope) || undefined
										}
										value={displayContent}
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
										{...sortValueAttr}
										{...sortableProps}
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

	const TableTitle = () => (
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
			{hasTableTitle && <TableTitle />}
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
}
