/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import registerTabLabelBinding from './tab-label-binding';
import './style.scss';

/**
 * Add transform from prc-block/tabs to core/tabs.
 * This allows users to convert legacy tabs to the new core/tabs structure.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addTransformToCoreTabs(settings, name) {
	if (name !== 'core/tabs') {
		return settings;
	}

	const prcTabsTransform = {
		type: 'block',
		blocks: ['prc-block/tabs'],
		transform: (attributes, innerBlocks) => {
			const tabPanelBlocks = innerBlocks.map((tabBlock, index) => {
				const { label, anchor } = tabBlock.attributes;
				return createBlock(
					'core/tab-panel',
					{
						label: label || `Tab ${index + 1}`,
						anchor: anchor || `tab-${index + 1}`,
					},
					tabBlock.innerBlocks
				);
			});

			const tabListBlock = createBlock('core/tab-list', {
				lock: { remove: true },
				tabs: tabPanelBlocks.map((panelBlock) => ({
					label: panelBlock.attributes.label || 'Tab',
				})),
			});

			const tabPanelsBlock = createBlock(
				'core/tab-panels',
				{ lock: { remove: true } },
				tabPanelBlocks
			);

			return createBlock(
				'core/tabs',
				{
					tabsId: attributes.tabsId,
					activeTabIndex: attributes.activeTabIndex || 0,
				},
				[tabListBlock, tabPanelsBlock]
			);
		},
	};

	return {
		...settings,
		transforms: {
			...settings.transforms,
			from: [...(settings.transforms?.from || []), prcTabsTransform],
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-transform-to-core-tabs',
	addTransformToCoreTabs
);

/**
 * Hover/active color attributes added to core/tab-list.
 * Follows the WP preset-slug + customHex pair pattern used by native color supports.
 */
const hoverActiveColorAttributes = {
	hoverBackgroundColor: { type: 'string' },
	customHoverBackgroundColor: { type: 'string' },
	hoverTextColor: { type: 'string' },
	customHoverTextColor: { type: 'string' },
	activeBackgroundColor: { type: 'string' },
	customActiveBackgroundColor: { type: 'string' },
	activeTextColor: { type: 'string' },
	customActiveTextColor: { type: 'string' },
};

/**
 * Add extended attributes to the core/tab-list block.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addAttributes(settings, name) {
	if (name === 'core/tab-list') {
		return {
			...settings,
			attributes: {
				...settings.attributes,
				mobileDropdown: {
					type: 'boolean',
					default: false,
				},
				mobileDropdownWidth: {
					type: 'number',
					default: 768,
				},
				...hoverActiveColorAttributes,
			},
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-attributes',
	addAttributes
);

/**
 * Enable Custom CSS block support on core/tab-list.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addCustomCSSSupport(settings, name) {
	if (name !== 'core/tab-list') {
		return settings;
	}
	return {
		...settings,
		supports: {
			...settings.supports,
			customCSS: true,
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-custom-css-support',
	addCustomCSSSupport
);

/**
 * Extend core/tab-list edit with color controls.
 *
 * @param {Function} BlockEdit Original BlockEdit component
 * @return {Function} Enhanced BlockEdit component
 */
const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, clientId } = props;

		if ('core/tab-list' !== name) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<Controls {...{ attributes, setAttributes, clientId }} />
				<BlockEdit {...props} />
			</>
		);
	};
}, 'withExtendedControls');

addFilter(
	'editor.BlockEdit',
	'prc-block/core-tabs/with-extended-controls',
	withExtendedControls
);

/**
 * Resolve a preset-slug or custom-hex pair to a CSS value string.
 * Mirrors the PHP resolve_color() helper.
 *
 * @param {string|undefined} slug      Preset color slug (e.g. 'ui-midnight').
 * @param {string|undefined} customHex Custom hex value (e.g. '#1a1a1a').
 * @return {string} CSS value or empty string.
 */
function resolveColorValue(slug, customHex) {
	if (slug) {
		return `var(--wp--preset--color--${slug})`;
	}
	return customHex || '';
}

/**
 * BlockListBlock HOC: inject the four hover/active CSS custom properties
 * into the wrapper element's inline style for core/tab-list so the editor
 * canvas reflects the configured colors live.
 */
const withHoverActiveColorPreview = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const { name, attributes, wrapperProps } = props;

			if (name !== 'core/tab-list') {
				return <BlockListBlock {...props} />;
			}

			const {
				hoverBackgroundColor,
				customHoverBackgroundColor,
				hoverTextColor,
				customHoverTextColor,
				activeBackgroundColor,
				customActiveBackgroundColor,
				activeTextColor,
				customActiveTextColor,
			} = attributes;

			const cssVars = {};
			const effectiveHoverBg = resolveColorValue(
				hoverBackgroundColor,
				customHoverBackgroundColor
			);
			const effectiveHoverText = resolveColorValue(
				hoverTextColor,
				customHoverTextColor
			);
			const effectiveActiveBg = resolveColorValue(
				activeBackgroundColor,
				customActiveBackgroundColor
			);
			const effectiveActiveText = resolveColorValue(
				activeTextColor,
				customActiveTextColor
			);

			if (effectiveHoverBg)
				cssVars['--custom-tab-hover-color'] = effectiveHoverBg;
			if (effectiveHoverText)
				cssVars['--custom-tab-hover-text-color'] = effectiveHoverText;
			if (effectiveActiveBg)
				cssVars['--custom-tab-active-color'] = effectiveActiveBg;
			if (effectiveActiveText)
				cssVars['--custom-tab-active-text-color'] = effectiveActiveText;

			const mergedWrapperProps = {
				...wrapperProps,
				style: {
					...(wrapperProps?.style || {}),
					...cssVars,
				},
			};

			return (
				<BlockListBlock {...props} wrapperProps={mergedWrapperProps} />
			);
		};
	},
	'withHoverActiveColorPreview'
);

addFilter(
	'editor.BlockListBlock',
	'prc-block/core-tabs/with-hover-active-color-preview',
	withHoverActiveColorPreview
);

registerTabLabelBinding();
