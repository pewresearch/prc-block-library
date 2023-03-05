/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const transformDeprecatedMenuBlock = (innerBlocks) => {
	const menuItems = innerBlocks;

	const innerBlocksTemplate = menuItems.map((block, index) => {
		const { label, url, id } = block.attributes;
		return [
			'prc-block/taxonomy-menu-link',
			{
				label,
				url,
				id,
			},
			[],
		];
	});

	return createBlock(
		'prc-block/taxonomy-menu',
		{
			backgroundColor: 'white',
			borderColor: 'gray-light',
			textColor: 'gray-alt',
			fontFamily: 'sans-serif',
			layout: {
				justifyContent: 'left',
				type: 'flex',
				orientation: 'horizontal',
			},
		},
		createBlocksFromInnerBlocksTemplate(innerBlocksTemplate)
	);
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['prc-block/menu'],
			transform: (attributes, innerBlocks) => {
				if (!Array.isArray(innerBlocks) || 0 === innerBlocks.length) {
					return false;
				}
				return transformDeprecatedMenuBlock(innerBlocks);
			},
		},
	],
};

export default transforms;
