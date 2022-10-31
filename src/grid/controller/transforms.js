/**
 * WordPress Dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

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
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate),
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
				console.log('transform rows...', attributes, rows);

				return constructGridController(rows[0].innerBlocks);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/columns'],
			transform: (attributes, columns) => {
				if (!Array.isArray(columns) || 0 === columns.length) {
					return false;
				}
				const innerBlocksTemplate = columns.map((block, index) => {
					const { innerBlocks } = block;
					return ['core/column', {}, [...innerBlocks]];
				});
				return createBlock(
					'core/columns',
					{},
					createBlocksFromInnerBlocksTemplate(innerBlocksTemplate),
				);
			},
		},
	],
};

export default transforms;
