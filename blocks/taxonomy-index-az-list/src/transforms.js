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
					// check if exclude is a string and has value (not empty)
					if (
						'string' === typeof newAttributes.exclude &&
						newAttributes.exclude.length > 0
					) {
						// convert to array
						newAttributes.exclude = newAttributes.exclude.split(',');
					}
				}
				// Ensure all the value in the array are integers
				newAttributes.exclude = newAttributes.exclude.map((item) =>
					parseInt(item, 10)
				);
				console.log(
					'Transforming from topic-index-az to taxonomy-index-az-list, attributes: ',
					attributes,
					' newAttributes: ',
					newAttributes
				);
				return createBlock(
					'prc-block/taxonomy-index-az-list',
					newAttributes
				);
			},
		},
	],
};

export default transforms;
