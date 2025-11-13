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
import { withColors } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import './style.scss';
import './editor.scss';
import {
	ColorControls,
	CSSHelpersLibrary,
	MaxWidthControls,
	BoxShadowControls,
} from './controls';

const CustomColorsControls = withColors({
	isStuckBackground: 'color',
	isStuckText: 'color',
})(ColorControls);

/**
 * Add attributes for:
 * 1. stuck background color
 * 2. stuck text color
 * 3. max width
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
addFilter(
	'blocks.registerBlockType',
	`prc-block/supports`,
	(settings) => {
		// If the block supports position sticky then add isStuckBackground and isStuckText attributes.
		if (
			undefined !== settings.supports &&
			true === settings.supports.sticky
		) {
			settings.attributes = {
				...settings.attributes,
				isStuckBackground: {
					type: 'string',
					default: null,
				},
				isStuckText: {
					type: 'string',
					default: null,
				},
				isStuckBoxShadow: {
					type: 'boolean',
					default: false,
				},
			};
		}

		settings.attributes = {
			...settings.attributes,
			maxWidth: {
				type: 'object',
				default: {
					desktop: null,
					tablet: null,
					mobile: null,
				},
			},
		};

		return settings;
	}
);


/**
 * Add controls to the inspector controls area for:
 * 1. stuck background color
 * 2. stuck text color
 * 3. stuck box shadow toggle
 * 4. max width
 */
addFilter(
	'editor.BlockEdit',
	`prc-block/supports`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function SupportsControls(props) {
				const { name, attributes, setAttributes, clientId } = props;
				return (
					<>
						<CustomColorsControls
							attributes={attributes}
							setAttributes={setAttributes}
							clientId={clientId}
						/>
						<MaxWidthControls
							attributes={attributes}
							setAttributes={setAttributes}
							clientId={clientId}
						/>
						<BoxShadowControls
							attributes={attributes}
							setAttributes={setAttributes}
							clientId={clientId}
						/>
						<CSSHelpersLibrary {...props} />
						<BlockEdit {...props} />
					</>
				);
			},
		'withSupportsControls'
	),
	101
);

/**
 * Add block wrapper html attributes and class names for:
 * 1. stuck background
 * 2. stuck text
 */
addFilter(
	'editor.BlockListBlock',
	`prc-block/supports`,
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { attributes, wrapperProps, className = '' } = props;
			const {
				isStuckBackground,
				isStuckText,
				isStuckBoxShadow,
				maxWidth,
			} = attributes;

			const newWrapperProps = {
				...wrapperProps,
			};

			// Add class names for stuck background, text, and box shadow.
			if (undefined !== isStuckBackground) {
				console.log("BLOCK SUPPORTS ATTRIBUTES: ", attributes);
				newWrapperProps.className = `${newWrapperProps?.className || ''} has-stuck-background has-sticky-background-${isStuckBackground}-color`;
			}
			if (undefined !== isStuckText) {
				console.log("BLOCK SUPPORTS ATTRIBUTES: ", attributes);
				newWrapperProps.className = `${newWrapperProps?.className || ''} has-stuck-text has-sticky-text-${isStuckText}-color`;
			}
			if (undefined !== isStuckBoxShadow && isStuckBoxShadow) {
				console.log("BLOCK SUPPORTS ATTRIBUTES: ", attributes);
				newWrapperProps.className = `${newWrapperProps?.className || ''} has-stuck-box-shadow`;
			}

			// Add max width styles and class.
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
					newWrapperProps.className = `${newWrapperProps?.className || ''} has-max-width-constraint`;
				}
				// else {
				// 	newWrapperProps.className = className.replace(
				// 		'has-max-width-constraint',
				// 		''
				// 	);
				// }
			} else if (className.includes('has-max-width-constraint')) {
				newWrapperProps.className = className.replace(
					'has-max-width-constraint',
					''
				);
			}

			return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
		};
	}, 'withSupportsWrapperProps'),
	101,
);

