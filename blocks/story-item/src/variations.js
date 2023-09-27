/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import variationsJson from './variations.json';

// loop through variationsJson and add a isActive function check checking the attributes against each other...

const variations = variationsJson.map((variation, key) => {
	const { attributes } = variation;
	return {
		...variation,
		name: `story-item-${key}`,
		isActive: (currentAttributes) => {
			let isActive = true;
			Object.keys(attributes).forEach((key) => {
				if (attributes[key] !== currentAttributes[key]) {
					isActive = false;
				}
			});
			return isActive;
		},
	};
});

export default variations;
