/**
 * WordPress dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/tabs'],
			priority: 1,
			transform: (attributes, innerBlocks) => {
				const newBlocks = [];
				innerBlocks.forEach((block) => {
					const { label } = block.attributes;
					const newBlock = {
						name: 'prc-block/timeline-slide',
						attributes: {
							metadata: {
								name: label,
							},
						},
						innerBlocks: block.innerBlocks,
					};
					newBlocks.push(newBlock);
				});
				return createBlock(
					'prc-block/timeline',
					{},
					createBlocksFromInnerBlocksTemplate(newBlocks)
				);
			},
		},
	],
};

export default transforms;
