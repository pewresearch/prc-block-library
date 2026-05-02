/* eslint-disable max-len */
/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/functions';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { withColors } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { InteriorDividerControls } from './controls';
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
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
 * Also adds dividerColor attribute for interior divider functionality.
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

		// Add dividerColor attribute for interior divider
		settings.attributes = {
			...settings.attributes,
			dividerColor: {
				type: 'string',
				default: null,
			},
		};

		return settings;
	}
);

/**
 * Add additional controls to the core/group block inspector.
 */
addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-controls`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function GroupWithControls(props) {
				const { name } = props;

				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<>
						<InteriorDividerControls {...props} />
						<BlockEdit {...props} />
					</>
				);
			},
		'withGroupControls'
	),
	100
);

/**
 * Add interior divider class names to the block wrapper in the editor.
 */
addFilter(
	'editor.BlockListBlock',
	`${BLOCKIDENTIFIER}-wrapper-props`,
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { name, attributes, wrapperProps } = props;

			if (BLOCKNAME !== name) {
				return <BlockListBlock {...props} />;
			}

			const { dividerColor } = attributes;

			const newWrapperProps = {
				...wrapperProps,
			};

			if (undefined !== dividerColor && null !== dividerColor) {
				newWrapperProps.className = `${wrapperProps?.className || ''} has-interior-divider has-${dividerColor}-interior-divider-color`;
			}
			newWrapperProps.style = {
				'--grid-gutter': getBlockGapSupportValue(
					attributes,
					'vertical'
				),
			};
			return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
		};
	}, 'withGroupWrapperProps'),
	100
);
