/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/topic-index-az'],
			transform: (attributes) => {
				const newAttributes = attributes;
				if (newAttributes.exclude) {
					newAttributes.exclude = newAttributes.exclude.split(',');
				}
				return createBlock('prc-block/taxonomy-index-az-list', newAttributes);
			},
		},
	],
};

export default transforms;
