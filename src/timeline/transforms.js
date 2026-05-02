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
					const tabLabel =
						typeof block.attributes.label === 'string'
							? block.attributes.label
							: '';
					const newBlock = {
						name: 'prc-block/timeline-slide',
						attributes: {
							metadata: {
								name: tabLabel,
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
					const slideLabel =
						block.attributes.metadata?.name ??
						block.attributes.label ??
						'';
					newBlocks.push(
						createBlock(
							'prc-block/tab',
							{ label: slideLabel },
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
					const slideLabel =
						block.attributes.metadata?.name ??
						block.attributes.label ??
						'';
					newBlocks.push(
						createBlock(
							'core/details',
							{
								summary: slideLabel,
								...(block.attributes.metadata
									? {
											metadata: {
												...block.attributes.metadata,
											},
									  }
									: {}),
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
