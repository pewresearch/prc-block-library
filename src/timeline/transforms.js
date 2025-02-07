/**
 * WordPress dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	cloneBlock,
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
	to: [
		{
			type: 'block',
			blocks: ['prc-block/tabs'],
			transform: (attributes, innerBlocks) => {
				const newBlocks = [];
				innerBlocks.forEach((block) => {
					const { metadata } = block.attributes;
					const { name } = metadata;
					newBlocks.push(
						createBlock(
							'prc-block/tab',
							{ label: name, metadata: { ...metadata } },
							block.innerBlocks
						)
					);
				});
				return createBlock('prc-block/tabs', {}, newBlocks);
			},
		},
		{
			type: 'block',
			blocks: ['core/group'],
			transform: (attributes, innerBlocks) => {
				const newBlocks = [];
				innerBlocks.forEach((block) => {
					newBlocks.push(
						createBlock(
							'core/group',
							{
								metadata: {
									...block.attributes.metadata,
								},
							},
							block.innerBlocks
						)
					);
				});
				return createBlock('core/group', {}, newBlocks);
			},
		},
		{
			type: 'block',
			blocks: ['core/details'],
			transform: (attributes, innerBlocks) => {
				const newBlocks = [];
				innerBlocks.forEach((block) => {
					const { metadata } = block.attributes;
					const { name } = metadata;
					newBlocks.push(
						createBlock(
							'core/details',
							{
								summary: name,
								metadata: {
									...metadata,
								},
							},
							block.innerBlocks
						)
					);
				});
				return createBlock('core/group', {}, newBlocks);
			},
		},
	],
};

export default transforms;
