/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

const BLOCKNAME = 'core/cover';
const BLOCKIDENTIFIER = 'prc-block-library/core-cover';

addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-controls`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreCover(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes, context: false }}
						/>
					</Fragment>
				);
			},
		'withCoreCoverControls'
	),
	21
);

/**
 * Add responsive background attributes to the core/cover block.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-supports`,
	(settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}

		settings.attributes = {
			...settings.attributes,
			mobileId: {
				type: 'number',
			},
			mobileUrl: {
				type: 'string',
			},
			tabletId: {
				type: 'number',
			},
			tabletUrl: {
				type: 'string',
			},
		};

		return settings;
	}
);
