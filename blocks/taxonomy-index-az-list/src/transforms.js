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
				console.log(
					'Transforming from topic-index-az to taxonomy-index-az-list, attributes: ',
					attributes,
				);
				const newAttributes = attributes;
				if (newAttributes.exclude) {
					// check if exclude is a string
					if ('string' === typeof newAttributes.exclude) {
						// convert to array
						newAttributes.exclude = newAttributes.exclude.split(',');
					}
				}
				return createBlock('prc-block/taxonomy-index-az-list', newAttributes);
			},
		},
	],
};

export default transforms;
