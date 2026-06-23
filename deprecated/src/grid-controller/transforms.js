/**
 * WordPress Dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Build a child block for a core/group grid from a legacy grid-column block.
 * Maps the per-breakpoint span + order onto Gutenberg's native style.{viewport}
 * structure (column span) and the PRC responsive order key.
 *
 * @param {Object} column A prc-block/grid-column block.
 * @return {Object} A core/group block to place inside the grid.
 */
const constructGridChild = (column) => {
	const gl = column.attributes?.gridLayout || {};
	const style = {
		layout: { columnSpan: gl.desktopSpan || 4 },
	};
	if (gl.tabletSpan) {
		style.tablet = { layout: { columnSpan: gl.tabletSpan } };
	}
	if (gl.mobileSpan) {
		style.mobile = { layout: { columnSpan: gl.mobileSpan } };
	}
	if (gl.tabletPosition) {
		style.tablet = {
			layout: {
				...(style.tablet?.layout || {}),
				prcOrder: gl.tabletPosition,
			},
		};
	}
	if (gl.mobilePosition) {
		style.mobile = {
			layout: {
				...(style.mobile?.layout || {}),
				prcOrder: gl.mobilePosition,
			},
		};
	}
	return createBlock(
		'core/group',
		{ layout: { type: 'constrained' }, style },
		[...(column.innerBlocks || [])]
	);
};

/**
 * Build a core/group using the native grid layout from legacy grid-column blocks.
 *
 * @param {Object} attributes Grid controller attributes.
 * @param {Array}  columns    The grid-column child blocks.
 * @return {Object} A core/group (grid) block.
 */
const constructCoreGroupGrid = (attributes, columns) => {
	const children = columns.map(constructGridChild);
	const groupAttributes = {
		layout: { type: 'grid', columnCount: 12 },
		// Reflow to 4 columns on mobile, mirroring the legacy grid.
		style: { mobile: { layout: { columnCount: 4 } } },
	};
	if (attributes?.dividerColor) {
		groupAttributes.dividerColor = attributes.dividerColor;
	}
	if (attributes?.dividerStyle) {
		groupAttributes.dividerStyle = attributes.dividerStyle;
	}
	if (attributes?.dividerInset) {
		groupAttributes.dividerInset = attributes.dividerInset;
	}
	return createBlock('core/group', groupAttributes, children);
};

const constructGridController = (columns) => {
	const numberOfColumns = columns.length;

	const innerBlocksTemplate = columns.map((block, index) => {
		const { innerBlocks } = block;
		return [
			'prc-block/grid-column',
			{
				gridLayout: {
					index: index + 1,
					desktopSpan: Math.floor(12 / numberOfColumns),
					tabletSpan: Math.floor(8 / numberOfColumns),
					mobileSpan: 4,
				},
			},
			[...innerBlocks],
		];
	});
	return createBlock(
		'prc-block/grid-controller',
		{},
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
	);
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/columns'],
			transform: (attributes, columns) => {
				if (!Array.isArray(columns) || 0 === columns.length) {
					return false;
				}
				return constructGridController(columns);
			},
		},
		{
			type: 'block',
			blocks: ['prc-block/grid'],
			transform: (attributes, rows) => {
				if (!Array.isArray(rows) || 0 === rows.length) {
					return false;
				}
				const toReturn = rows.map((row) => {
					return constructGridController(row.innerBlocks);
				});

				return toReturn;
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/group'],
			transform: (attributes, columns) => {
				if (!Array.isArray(columns) || 0 === columns.length) {
					return false;
				}
				return constructCoreGroupGrid(attributes, columns);
			},
		},
		{
			type: 'block',
			blocks: ['core/columns'],
			transform: (attributes, columns) => {
				if (!Array.isArray(columns) || 0 === columns.length) {
					return false;
				}
				const innerBlocksTemplate = columns.map((block) => {
					const { innerBlocks } = block;
					return ['core/column', {}, [...innerBlocks]];
				});
				return createBlock(
					'core/columns',
					{},
					createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
				);
			},
		},
	],
};

export default transforms;
