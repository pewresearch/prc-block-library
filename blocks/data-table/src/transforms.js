/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

export default {
	from: [
		{
			type: 'block',
			blocks: ['core/table'],
			transform: ({ head, foot, body }) => {
				return createBlock('prc-block/data-table', {
					head: head.map((row) => {
						return row.cells.map((cell) => {
							return cell.content;
						});
					}),
					body: body.map((row) => {
						return row.cells.map((cell) => {
							return cell.content;
						});
					}),
				});
			},
		},
	],
};
