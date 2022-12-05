/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { createBlock, rawHandler } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import registerVariations from './variations';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

const BLOCKNAME = 'core/group';
const BLOCKIDENTIFIER = 'prc-block-library/core-group';

registerVariations();

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreGroup(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<Controls {...{ attributes, setAttributes }} />
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withCoreGroupControls',
	),
	21,
);

/**
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
addFilter('blocks.registerBlockType', 'prc-block/group', (settings) => {
	if (BLOCKNAME !== settings.name) {
		return settings;
	}

	if ('undefined' !== typeof settings.supports.align) {
		// During the group block's development the alignment options have changed, here we are enforcing all alignments to be available.
		settings.supports.align = ['left', 'right', 'center', 'wide', 'full'];
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
						innerBlocks,
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
					const innerBlocks = rawHandler({ HTML: node.innerHTML });

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
		}
	}

	return settings;
});
