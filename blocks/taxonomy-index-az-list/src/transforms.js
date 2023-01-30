/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/topic-index-az'],
			transform: (attributes) =>
				createBlock('prc-block/taxonomy-index-az-list', attributes),
		},
	],
};

export default transforms;
