/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { getBlockGapSupportValue } from '@prc/block-utils';

import { useMemo } from 'react';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import './style.scss';

const BLOCKIDENTIFIER = 'prc-block/core-list';
const BLOCKNAME = 'core/list';

domReady(() => {
	console.log('HELLO!');
	registerBlockStyle(BLOCKNAME, {
		name: 'list-style-type-none',
		label: 'Unstyled List',
	});

	addFilter(
		'editor.BlockListBlock',
		`${BLOCKIDENTIFIER}-wrapper-props`,
		createHigherOrderComponent((BlockListBlock) => {
			return (props) => {
				const { attributes, name } = props;
				if (BLOCKNAME !== name) {
					return <BlockListBlock {...props} />;
				}
				const blockGap = useMemo(() => {
					return getBlockGapSupportValue(attributes, 'vertical');
				}, [attributes]);

				const wrapperProps = {
					...props.wrapperProps,
					'data-block-gap': 'sad',
					style: {
						'--block-gap': blockGap || 0,
					},
				};

				return (
					<BlockListBlock {...props} wrapperProps={wrapperProps} />
				);
			};
		}, 'withCoreListWrapperProps'),
		100
	);

	addFilter(
		'blocks.registerBlockType',
		`${BLOCKIDENTIFIER}-supports`,
		(settings) => {
			if (BLOCKNAME !== settings.name) {
				return settings;
			}
			settings.supports.spacing.blockGap = true;

			return settings;
		}
	);
});
