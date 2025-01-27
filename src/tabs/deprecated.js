/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

// This should take the innerblocks, get the prc-block/tabs-menu -> and get all prc-block/tabs-menu-item and then construct new blocks for each with the label, then go through the pane blocks and move its innerblocks into the new tab blocks:

const migrate = (menuBlocks, paneBlocks) => {
	// we need to get all the title, slugs, and uuuid from the prc-block/tabs-menu-item blocks
	// then we need to get the uuid and contents/the innerblocks inside prc-block/tabs-pane blocks.
	// then we need to match the uuids and create new prc-block/tab blocks with the title, slug, and innerblocks
	const newBlocks = [];
	menuBlocks.forEach((menuBlock) => {
		const { title, slug, uuid } = menuBlock.attributes;
		const newBlock = {
			name: 'prc-block/tab',
			attributes: {
				label: title,
				slug,
			},
			innerBlocks: [],
		};
		paneBlocks.forEach((paneBlock) => {
			if (paneBlock.attributes.uuid === uuid) {
				const { innerBlocks } = paneBlock;
				// We may need to deconstruct the innerBlocks and add them to the newBlock
				newBlock.innerBlocks = innerBlocks;
			}
		});
		newBlocks.push(newBlock);
	});
	return newBlocks;
};

export default [
	{
		attributes: {
			vertical: {
				type: 'boolean',
				default: false,
			},
		},

		migrate(attributes, innerBlocks) {
			const { vertical } = attributes;

			// Get the prc-block/menu and prc-block/tabs-panes blocks
			const menuBlocks = innerBlocks[0].innerBlocks;
			const paneBlocks = innerBlocks[1].innerBlocks;
			const newBlocks = migrate(menuBlocks, paneBlocks);

			console.log(
				'MIGRATES TABS-CONTROLLER TO TABS BLOCK: ',
				newBlocks,
				innerBlocks
			);

			// Iterate over newBlocks and use createBlock to create the new blocks
			const newInnerBlocks = newBlocks.map((block) => {
				return createBlock(block.name, block.attributes, [
					...block.innerBlocks,
				]);
			});

			console.log("GETTING TO HERE....", newInnerBlocks)

			return [
				{
					orientation: vertical ? 'vertical' : 'horizontal',
				},
				[...newInnerBlocks],
			];
		},

		save(props) {
			return <InnerBlocks.Content />;
		},

		isEligible(attributes, innerBlocks, data) {
			console.log('isEligible: ', innerBlocks, attributes, data);
			// Determine if it has prc-block/tabs-menu and tabs-panes blocks, if so return true...
			if (
				innerBlocks.some(
					(block) =>
						block.attributes.originalName === 'prc-block/tabs-menu'
				) &&
				innerBlocks.some(
					(block) =>
						block.attributes.originalName === 'prc-block/tabs-panes'
				)
			) {
				return true;
			}

			return false;
		},
	},
];
