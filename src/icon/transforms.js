/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { mapPrcIconToCoreIconAttributes } from './map-to-core-icon';

const CORE_ICON = 'core/icon';
const PRC_ICON = 'prc-block/icon';

addFilter(
	'blocks.registerBlockType',
	'prc-block/icon-to-core-icon',
	(settings) => {
		if (CORE_ICON !== settings.name) {
			return settings;
		}
		if ('undefined' === typeof settings.transforms) {
			settings.transforms = {};
		}
		if ('undefined' === typeof settings.transforms.from) {
			settings.transforms.from = [];
		}
		settings.transforms.from.push({
			type: 'block',
			blocks: [PRC_ICON],
			transform: (attributes) =>
				createBlock(
					CORE_ICON,
					mapPrcIconToCoreIconAttributes(attributes)
				),
		});
		return settings;
	}
);

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [CORE_ICON],
			transform: (attributes) =>
				createBlock(
					CORE_ICON,
					mapPrcIconToCoreIconAttributes(attributes)
				),
		},
	],
};

export default transforms;
