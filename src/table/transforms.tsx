/**
 * WordPress dependencies
 */
import {
	createBlock,
	store as blocksStore,
	type TransformBlock,
} from '@wordpress/blocks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	splitMergedCell,
	toVirtualRows,
	toVirtualTable,
	type VCell,
} from './utils/table-state';
import { normalizeRowColSpan } from './utils/helper';
import type {
	BlockAttributes,
	CoreTableCell,
	CoreTableBlockAttributes,
} from './block-attributes';

interface Transforms {
	readonly from: ReadonlyArray<TransformBlock<CoreTableBlockAttributes>>;
	readonly to: ReadonlyArray<TransformBlock<BlockAttributes>>;
}

const transforms: Transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/table'],
			transform: (attributes) => {
				const { hasFixedLayout, head, body, foot, caption, style } =
					attributes;

				// Mapping rowspan and colspan properties.
				const convertedSections = (
					section: { cells: CoreTableCell[] }[]
				) => {
					if (!section.length) {
						return section;
					}
					return section.map((row) => {
						if (!row.cells.length) {
							return row;
						}
						return {
							cells: row.cells.map((cell) => {
								const { content, tag, colspan, rowspan } = cell;
								return {
									content,
									tag,
									colSpan: normalizeRowColSpan(colspan),
									rowSpan: normalizeRowColSpan(rowspan),
								};
							}),
						};
					});
				};

				return createBlock('prc-block/table', {
					head: convertedSections(head),
					body: convertedSections(body),
					foot: convertedSections(foot),
					hasFixedLayout,
					caption,
					style,
				});
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/table'],
			transform: (attributes) => {
				// Check if the core table block supports rowspan and colspan.
				const {
					// @ts-ignore
					getBlockType,
				} = select(blocksStore);
				const blockType = getBlockType('core/table');
				const hasRowColSpanSupport =
					!!blockType.attributes.head.query.cells.query.rowspan &&
					!!blockType.attributes.head.query.cells.query.colspan;

				// Create virtual object array with the cells placed in positions based on how they actually look.
				let vTable = toVirtualTable(attributes);

				// Find rowspan & colspan cells.
				const vRows = toVirtualRows(vTable);
				const rowColSpanCells = vRows
					.reduce(
						(cells: VCell[], row) => cells.concat(row.cells),
						[]
					)
					.filter(
						({ rowSpan, colSpan }) => rowSpan > 1 || colSpan > 1
					);

				// Split the found rowspan and colspan cells If the core table block doesn't support it.
				if (rowColSpanCells.length && !hasRowColSpanSupport) {
					rowColSpanCells.forEach((cell) => {
						vTable = splitMergedCell(vTable, cell);
					});
				}

				// Convert to core table block attributes.
				const sectionAttributes = Object.entries(vTable).reduce(
					(coreTableAttributes: any, [sectionName, section]) => {
						if (!section.length) {
							return coreTableAttributes;
						}

						const newSection = section.map(({ cells }) => ({
							cells: cells
								// Delete cells marked as deletion.
								.filter((cell) => !cell.isHidden)
								// Keep only the properties needed.
								.map((cell) => ({
									content: cell.content,
									tag:
										'head' === cell.sectionName
											? 'th'
											: 'td',
									rowspan: hasRowColSpanSupport
										? normalizeRowColSpan(cell.rowSpan)
										: undefined,
									colspan: hasRowColSpanSupport
										? normalizeRowColSpan(cell.colSpan)
										: undefined,
								})),
						}));
						coreTableAttributes[sectionName] = newSection;
						return coreTableAttributes;
					},
					{}
				);

				return createBlock('core/table', {
					...sectionAttributes,
					hasFixedLayout: attributes.hasFixedLayout,
					caption: attributes.caption,
					style: attributes.style,
				});
			},
		},
	],
};

export default transforms;
