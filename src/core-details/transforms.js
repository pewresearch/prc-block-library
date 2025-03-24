/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createBlock } from '@wordpress/blocks';

const BLOCKNAME = 'core/details';
const BLOCKIDENTIFIER = 'prc-block/core-details-transforms';

export default function registerTransforms() {
	/**
	 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
	 *
	 * @param {Object} settings Settings for the block.
	 *
	 * @return {Object} settings Modified settings.
	 */
	addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, (settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}

		if ('undefined' !== typeof settings.transforms) {
			if ('undefined' !== typeof settings.transforms.from) {
				settings.transforms.from.push({
					priority: 1,
					type: 'block',
					blocks: ['prc-block/collapsible'],
					isMatch: (attributes, block) =>
						block.name === 'prc-block/collapsible' &&
						true !== attributes.isCoBranded,
					transform: (attributes, innerBlocks) =>
						createBlock(
							BLOCKNAME,
							{
								className: 'is-style-plus-icon',
								backgroundColor: 'ui-beige-very-light',
								summary: attributes.title || 'How we did this',
								borderColor: 'ui-gray-light',
								fontFamily: 'sans-serif',
								style: {
									border: {
										width: '1px',
									},
									spacing: {
										blockGap: 'var:preset|spacing|40',
										padding: {
											bottom: 'var:preset|spacing|20',
											left: 'var:preset|spacing|30',
											right: 'var:preset|spacing|30',
											top: 'var:preset|spacing|20',
										},
									},
									typography: {
										fontSize: '0.88em',
									},
								},
							},
							innerBlocks
						),
				});

				settings.transforms.from.push({
					priority: 2,
					type: 'block',
					blocks: ['prc-block/collapsible'],
					isMatch: (attributes, block) =>
						block.name === 'prc-block/collapsible' &&
						false !== attributes.isCoBranded,
					transform: (attributes, innerBlocks) =>
						createBlock(
							BLOCKNAME,
							{
								className: 'is-style-pew-knight-co-branded',
								summary: 'Pew Knight Initiative',
								borderColor: 'ui-gray-light',
								fontFamily: 'sans-serif',
								style: {
									border: {
										top: {
											width: '1px',
											color: 'var:preset|color|ui-gray-light',
										},
										right: {
											width: '0px',
											style: 'none',
										},
										bottom: {
											width: '1px',
											color: 'var:preset|color|ui-gray-light',
										},
										left: {
											width: '0px',
											style: 'none',
										},
									},
									spacing: {
										blockGap: 'var:preset|spacing|40',
										padding: {
											bottom: 'var:preset|spacing|20',
											left: 'var:preset|spacing|30',
											right: 'var:preset|spacing|30',
											top: 'var:preset|spacing|20',
										},
									},
									typography: {
										fontSize: '0.88em',
									},
								},
							},
							innerBlocks
						),
				});
			}
		}
		return settings;
	});
}
