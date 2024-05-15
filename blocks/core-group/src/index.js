/* eslint-disable max-len */
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
import registerVariations from './variations';
import registerTransforms from './transforms';
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
const BLOCKIDENTIFIER = 'prc-block/core-group';

registerVariations();
registerTransforms();

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
		'withCoreGroupControls'
	),
	21
);

/**
 * Add html attributes for each responsiveContainerQuery attribute value on the core/group block.
 */
addFilter(
	'editor.BlockListBlock',
	`${BLOCKIDENTIFIER}-wrapper-props`,
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { attributes, wrapperProps, name } = props;
			if (BLOCKNAME !== name) {
				return <BlockListBlock {...props} />;
			}

			const {
				responsiveContainerQuery: {
					hideOnDesktop,
					hideOnTablet,
					hideOnMobile,
				} = {},
			} = attributes;

			const newWrapperProps = {
				...wrapperProps,
				'data-hide-on-desktop': hideOnDesktop,
				'data-hide-on-tablet': hideOnTablet,
				'data-hide-on-mobile': hideOnMobile,
			};
			return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
		};
	}, 'withCoreGroupResponsiveWrapper')
);

/**
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
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
			responsiveContainerQuery: {
				type: 'object',
				default: {
					hideOnDesktop: false,
					hideOnTablet: false,
					hideOnMobile: false,
				},
			},
		};

		if (settings.supports.align) {
			// During the group block's development the alignment options have changed, here we are enforcing all alignments to be available.
			settings.supports.align = [
				'left',
				'right',
				'center',
				'wide',
				'full',
			];
		}

		return settings;
	}
);
