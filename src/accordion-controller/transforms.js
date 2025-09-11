/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/tabs'],
			transform: (attributes, innerBlocks) => {
				// Map each tab to an accordion block
				const accordionBlocks = innerBlocks.map((tabBlock) => {
					const { label } = tabBlock.attributes;
					const tabInnerBlocks = tabBlock.innerBlocks || [];

					// Create an accordion block with the tab's label as the title
					return createBlock(
						'prc-block/accordion',
						{
							title: label || 'Accordion Section',
						},
						tabInnerBlocks
					);
				});

				// Create the accordion controller with all accordion blocks as children
				return createBlock(
					'prc-block/accordion-controller',
					{},
					accordionBlocks
				);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['prc-block/tabs'],
			transform: (attributes, innerBlocks) => {
				// Map each accordion to a tab block
				const tabBlocks = innerBlocks.map((accordionBlock, index) => {
					const { title } = accordionBlock.attributes;
					const accordionInnerBlocks = accordionBlock.innerBlocks || [];

					// Create a tab block with the accordion's title as the label
					return createBlock(
						'prc-block/tab',
						{
							label: title || `Tab ${index + 1}`,
							anchor: `tab-${index + 1}`,
						},
						accordionInnerBlocks
					);
				});

				// Create the tabs block with all tab blocks as children
				return createBlock(
					'prc-block/tabs',
					{
						tabsId: `tabs-${Date.now()}`, // Generate a unique ID
						activeTabIndex: 0,
					},
					tabBlocks
				);
			},
		},
	],
};

export default transforms;

