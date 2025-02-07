/* eslint-disable max-len */
/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { withColors } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import {
	ResponsiveControls,
	ColorControls,
	MaxWidthControls,
} from './controls';
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

const GroupColorControls = withColors({
	dividerColor: 'color',
	isStuckBackground: 'color',
	isStuckText: 'color',
})(ColorControls);

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
						<GroupColorControls
							{...{ attributes, setAttributes, clientId }}
						/>
						<ResponsiveControls
							{...{ attributes, setAttributes }}
						/>
						<MaxWidthControls
							{...{ attributes, setAttributes, clientId }}
						/>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withCoreGroupControls'
	),
	100
);

/**
 * Add html attributes for each responsiveContainerQuery attribute value on the core/group block.
 */
addFilter(
	'editor.BlockListBlock',
	`${BLOCKIDENTIFIER}-wrapper-props`,
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { attributes, wrapperProps, name, className } = props;
			if (BLOCKNAME !== name) {
				return <BlockListBlock {...props} />;
			}

			const {
				responsiveContainerQuery: {
					hideOnDesktop,
					hideOnTablet,
					hideOnMobile,
				} = {},
				dividerColor,
				isStuckBackground,
				isStuckText,
				maxWidth,
			} = attributes;

			const newWrapperProps = {
				...wrapperProps,
				'data-hide-on-desktop': hideOnDesktop,
				'data-hide-on-tablet': hideOnTablet,
				'data-hide-on-mobile': hideOnMobile,
			};
			if (undefined !== dividerColor) {
				newWrapperProps.className = `has-interior-divider has-${dividerColor}-interior-divider-color`;
			}
			if (undefined !== isStuckBackground) {
				newWrapperProps.className = `has-stuck-background has-sticky-background-${isStuckBackground}-color`;
			}
			if (undefined !== isStuckText) {
				newWrapperProps.className = `has-stuck-text has-sticky-text-${isStuckText}-color`;
			}
			newWrapperProps.style = {
				'--grid-gutter': getBlockGapSupportValue(
					attributes,
					'vertical'
				),
			};
			if (undefined !== maxWidth) {
				// We need to add the data attr for each device type to the wrapper element.
				if (null !== maxWidth.desktop) {
					newWrapperProps.style = {
						...newWrapperProps.style,
						'--max-width__desktop': maxWidth.desktop,
					};
				}
				if (null !== maxWidth.tablet) {
					newWrapperProps.style = {
						...newWrapperProps.style,
						'--max-width__tablet': maxWidth.tablet,
					};
				}
				if (null !== maxWidth.mobile) {
					newWrapperProps.style = {
						...newWrapperProps.style,
						'--max-width__mobile': maxWidth.mobile,
					};
				}
				if (
					!className.includes('has-max-width-constraint') &&
					maxWidth.desktop !== null
				) {
					newWrapperProps.className = `${className} has-max-width-constraint`;
				} else {
					newWrapperProps.className = className.replace(
						'has-max-width-constraint',
						''
					);
				}
			} else if (className.includes('has-max-width-constraint')) {
				newWrapperProps.className = className.replace(
					'has-max-width-constraint',
					''
				);
			}
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
			maxWidth: {
				type: 'object',
				default: {
					desktop: null,
					tablet: null,
					mobile: null,
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
