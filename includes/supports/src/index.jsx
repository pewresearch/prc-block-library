/* eslint-disable max-len */
/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/functions';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { withColors } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	registerBlockCollection,
	unregisterBlockType,
	unregisterBlockVariation,
} from '@wordpress/blocks';

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

registerBlockCollection('prc-block', {
	title: 'Pew Research Center Block Library',
	icon: () => (
		<svg
			id="tiny-logo"
			data-name="Tiny PRC Logo"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 198 198"
			height="20"
		>
			<path d="M142.83,131.63,174,162.77a98.58,98.58,0,0,0,12.74-19l-66.08-27.37a27.49,27.49,0,0,0,6-14.44l66.05,27.36a97.65,97.65,0,0,0,4.47-22.46h-44a56.14,56.14,0,0,0,.62-7.83,54.79,54.79,0,0,0-.63-7.84s0,0,0,0h44a97.65,97.65,0,0,0-4.47-22.46L126.63,96.08a27.43,27.43,0,0,0-6-14.44l66.09-27.37a98.58,98.58,0,0,0-12.74-19L142.83,66.38a54.89,54.89,0,0,0-11.05-11.06l31.14-31.14a98.08,98.08,0,0,0-19-12.73L116.52,77.52a27.57,27.57,0,0,0-14.45-6l27.36-66A98,98,0,0,0,107,1V45h0a53.41,53.41,0,0,0-7.85-.63,54.6,54.6,0,0,0-7.81.62V1A97.65,97.65,0,0,0,68.87,5.47L96.24,71.52a27.54,27.54,0,0,0-14.45,6L54.43,11.44a98.27,98.27,0,0,0-19,12.74L66.53,55.32A54.52,54.52,0,0,0,55.46,66.39s0,0,0,0L24.32,35.23a98.53,98.53,0,0,0-12.73,19L77.66,81.64a27.49,27.49,0,0,0-6,14.44l-66-27.36A97.65,97.65,0,0,0,1.15,91.18h44v0A56.28,56.28,0,0,0,44.57,99a56.14,56.14,0,0,0,.62,7.83h-44a97.65,97.65,0,0,0,4.47,22.46l66.05-27.36a27.49,27.49,0,0,0,6,14.44L11.59,143.73a98.53,98.53,0,0,0,12.73,19l31.15-31.14a54.94,54.94,0,0,0,11.06,11.06h0L35.39,173.83a98.23,98.23,0,0,0,19,12.73l27.36-66.08a27.46,27.46,0,0,0,14.45,6L68.87,192.54A98.18,98.18,0,0,0,91.33,197V153A49.75,49.75,0,0,0,107,153h0v44a97.46,97.46,0,0,0,22.45-4.47l-27.36-66a27.49,27.49,0,0,0,14.45-6l27.36,66.08a98.53,98.53,0,0,0,19-12.73l-31.14-31.14h0a54.68,54.68,0,0,0,11.06-11.06Z" />
		</svg>
	),
});

/**
 * Unregister core block types and embed variations the platform does not use.
 * Runs after block registration.
 */
domReady(() => {
	const blockTypesToRemove = [
		'core/archives',
		'core/calendar',
		'core/latest-comments',
		'core/tag-cloud',
		'core/verse',
	];
	blockTypesToRemove.forEach((blockType) => {
		unregisterBlockType(blockType);
	});

	const embedVariationsToRemove = [
		'animoto',
		'spotify',
		'flickr',
		'cloudup',
		'collegehumor',
		'issuu',
		'kickstarter',
		'mixcloud',
		'reverbnation',
		'smugmug',
		'amazon-kindle',
		'pinterest',
		'loom',
		'smartframe',
		'descript',
	];
	embedVariationsToRemove.forEach((name) => {
		unregisterBlockVariation('core/embed', name);
	});
});

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
addFilter('blocks.registerBlockType', `prc-block/supports`, (settings) => {
	// If the block supports position sticky then add isStuckBackground and isStuckText attributes.
	if (undefined !== settings.supports && true === settings.supports.sticky) {
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
});

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
				console.log('BLOCK SUPPORTS ATTRIBUTES: ', attributes);
				newWrapperProps.className = `${newWrapperProps?.className || ''} has-stuck-background has-sticky-background-${isStuckBackground}-color`;
			}
			if (undefined !== isStuckText) {
				console.log('BLOCK SUPPORTS ATTRIBUTES: ', attributes);
				newWrapperProps.className = `${newWrapperProps?.className || ''} has-stuck-text has-sticky-text-${isStuckText}-color`;
			}
			if (undefined !== isStuckBoxShadow && isStuckBoxShadow) {
				console.log('BLOCK SUPPORTS ATTRIBUTES: ', attributes);
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
	101
);
