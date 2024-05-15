/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import variationsJson from './variations.json';

const variations = [];
Object.keys(variationsJson).forEach((key) => {
	const variation = variationsJson[key];
	const { attributes } = variation;
	variations.push({
		...variation,
		name: `story-item-${key}`,
		scope: ['block', 'inserter', 'transform'],
		isActive: (currentAttributes) => {
			let isActive = true;
			Object.keys(attributes).forEach((key) => {
				if (attributes[key] !== currentAttributes[key]) {
					isActive = false;
				}
			});
			return isActive;
		},
	});
});

export default variations;
