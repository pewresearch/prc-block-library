/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createBlock, rawHandler } from '@wordpress/blocks';

const BLOCKNAME = 'core/group';
const BLOCKIDENTIFIER = 'prc-block/core-group-transforms';

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
			// Handle legacy prc-block/callout block to be converted to a group with the callout style.
			if ('undefined' !== typeof settings.transforms.from) {
				settings.transforms.from.push({
					type: 'block',
					blocks: ['core/group', 'prc-block/callout'],
					transform: (attributes, innerBlocks) =>
						createBlock(
							BLOCKNAME,
							{
								className: 'is-style-callout',
								backgroundColor: 'beige',
								...attributes,
							},
							innerBlocks
						),
				});

				// Handle converting div html with a class of `callout` to a group block with the same style.
				settings.transforms.from.push({
					type: 'raw',
					isMatch: (node) =>
						// If the element has a class of callout return true and proceed to trasnform...
						node.classList.contains('callout'),
					transform: (node) => {
						// Loop through the node child nodes and get its outerHtml and create a block from the HTML string, then add that to innerBlocks.
						const innerBlocks = rawHandler({
							HTML: node.innerHTML,
						});

						const attrs = {
							className: 'is-style-callout',
							backgroundColor: 'beige',
						};
						if (node.getAttribute('align')) {
							attrs.align = node.getAttribute('align');
						}

						return createBlock(BLOCKNAME, attrs, [...innerBlocks]);
					},
					priority: 11,
				});

				// Handle old [callout] shortcodes
				settings.transforms.from.push({
					type: 'shortcode',
					tag: 'callout',
					transform({}, {shortcode}) {
						const {content} = shortcode;
						return createBlock('core/group', {
							className: 'is-style-callout',
							backgroundColor: 'beige',
						}, rawHandler({HTML: content}));
					}
				});
			}
		}

		return settings;
	});
}
