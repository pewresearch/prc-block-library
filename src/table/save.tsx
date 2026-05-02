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
import {
	normalizeRoundDecimalsValue,
	stripAutoManagedCellClassNames,
} from './utils/table-attribute-normalize';
import { getEffectiveColumnMeta } from './utils/column-meta';
import type { BlockAttributes, SectionName, Row } from './block-attributes';

/**
 * Virtual column index at the start of this cell (accounts for colspan in prior cells).
 *
 * @param row       Row containing the cell.
 * @param cellIndex Index of the cell within the row.
 */
function getVColStartForCell(row: Row, cellIndex: number): number {
	let v = 0;
	for (let i = 0; i < cellIndex; i++) {
		const span = toInteger(row.cells[i].colSpan);
		v += span > 1 ? span : 1;
	}
	return v;
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
		isSortable = false,
	} = attributes;

	const isEmpty: boolean = !head?.length && !body?.length && !foot?.length;

	if (isEmpty) {
		return null;
	}

	const tableStylesObj: Properties = convertToObject(tableStyles);
	const captionStylesObj: Properties = convertToObject(captionStyles);
	const tableTitleStylesObj: Properties = convertToObject(tableTitleStyles);
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

	const Section = ({ type, rows }: { type: SectionName; rows: Row[] }) => {
		if (!rows.length) {
			return null;
		}

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
								const vColStart = getVColStartForCell(
									row,
									cellIndex
								);

								const colMeta = getEffectiveColumnMeta(
									vColStart,
									attributes
								);

								const isHidden = !!colMeta.hidden;

								// Determine if this header cell is sortable.
								// colMeta.sortable === false means explicitly non-sortable;
								// undefined/true means sortable when isSortable is on.
								const isCellSortable =
									isSortable &&
									isHeader &&
									rowIndex === 0 &&
									colMeta.sortable !== false;

								const cellClassName = clsx(
									stripAutoManagedCellClassNames(className),
									{
										'is-column-hidden': isHidden,
										'is-sortable': isCellSortable,
									}
								);

								const dataSectionProps: Record<string, string> =
									isDataSection
										? {
												'data-prc-v-col':
													String(vColStart),
											}
										: {};

								const effectiveRoundDecimals =
									normalizeRoundDecimalsValue(roundDecimals);
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
										className={cellClassName || undefined}
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
