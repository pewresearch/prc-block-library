/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { select } from '@wordpress/data';
import { unregisterBlockStyle } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import Controls from './controls';

const BLOCKNAME = 'core/image';
const BLOCKIDENTIFIER = 'prc-block/core-image';

/**
 * Remove the "Rounded" style from the core/image block.
 */
domReady(() => {
	if (null === select('core/editor')) {
		return;
	}
	unregisterBlockStyle(BLOCKNAME, ['rounded']);
});

/**
 * Add the responsiveContainerQuery controls to the core/group block.
 */
addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-controls`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreGroup(props) {
				const { name, attributes, setAttributes, clientId } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<Controls
							{...{ attributes, setAttributes, clientId }}
						/>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withCoreImageControls'
	),
	21
);
