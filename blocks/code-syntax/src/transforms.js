/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */

const BLOCKNAME = 'core/code';
const BLOCKIDENTIFIER = 'prc-block/core-code-transforms';

// Enable transforms from prc-block/code-syntax to core/code
addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, (settings) => {
	if (BLOCKNAME !== settings.name) {
		return settings;
	}
	if ('undefined' !== typeof settings.transforms) {
		if ('undefined' !== typeof settings.transforms.from) {
			settings.transforms.from.push({
				type: 'block',
				blocks: ['prc-block/code-syntax'],
				transform: ({ value }) =>
					createBlock(BLOCKNAME, {
						content: value,
					}),
			});
		}
	}
	return settings;
});

// Enable transforms from core/code to prc-block/code-syntax
const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/code'],
			transform: ({ content }) => {
				return createBlock('prc-block/code-syntax', {
					value: content,
				});
			},
		},
	],
};

export default transforms;
