/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
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
