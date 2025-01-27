/**
 * External Dependencies
 */

import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';
import Toolbar from './toolbar';

const BLOCKNAME = 'core/post-featured-image';
const BLOCKIDENTIFIER = 'prc-block-library/core-post-featured-image';

domReady(() => {
	addFilter(
		'editor.BlockEdit',
		`${BLOCKIDENTIFIER}-wrapper-props`,
		createHigherOrderComponent((BlockEdit) => {
			return (props) => {
				const { name, isSelected, attributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}
				const { imageSize, isChartArt } = attributes;
				const classes = () => {
					return classNames({
						image: true,
						XL: 'XL' === imageSize,
						A1: 'A1' === imageSize,
						A2: 'A2' === imageSize,
						A3: 'A3' === imageSize,
						A4: 'A4' === imageSize,
						bordered: isChartArt,
					});
				};
				return (
					<div className={classes()}>
						<BlockEdit {...props} />
						{isSelected && <Toolbar {...props} />}
					</div>
				);
			};
		}, 'withCorePostFeaturedImageWrapperProps'),
		100
	);
});
