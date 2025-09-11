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
				// Map each tab to a carousel slide
				const slideBlocks = innerBlocks.map((tabBlock, index) => {
					const tabInnerBlocks = tabBlock.innerBlocks || [];

					// Create a carousel slide with the tab's content
					return createBlock(
						'prc-block/carousel-slide',
						{
							anchor: `slide-${index + 1}`,
						},
						tabInnerBlocks
					);
				});

				// Create the carousel controller with all slide blocks as children
				return createBlock(
					'prc-block/carousel-controller',
					{
						orientation: 'horizontal',
						enableDots: true,
						enableArrows: true,
						enableRewind: true,
					},
					slideBlocks
				);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['prc-block/tabs'],
			transform: (attributes, innerBlocks) => {
				// Map each carousel slide to a tab block
				const tabBlocks = innerBlocks.map((slideBlock, index) => {
					const slideInnerBlocks = slideBlock.innerBlocks || [];

					// Create a tab block with a generated label
					return createBlock(
						'prc-block/tab',
						{
							label: `Tab ${index + 1}`,
							anchor: `tab-${index + 1}`,
						},
						slideInnerBlocks
					);
				});

				// Create the tabs block with all tab blocks as children
				return createBlock(
					'prc-block/tabs',
					{
						tabsId: `tabs-${Date.now()}`, // Generate a unique ID
						activeTabIndex: 0,
						orientation: 'horizontal',
					},
					tabBlocks
				);
			},
		},
		{
			type: 'block',
			blocks: ['core/cover'],
			transform: (attributes, innerBlocks) => {
				return createBlock(
					'core/cover',
					{
						dimRatio: 50,
						overlayColor: 'black',
						minHeight: 400,
						contentPosition: 'center',
					},
					[
						createBlock(
							'prc-block/carousel-controller',
							{
								...attributes,
								orientation: 'vertical',
							},
							innerBlocks
						),
					]
				);
			},
		},
	],
};

export default transforms;
