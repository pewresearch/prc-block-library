/**
 * WordPress Dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import TabControls from './controls-tab';
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

			const tabButtonBlocks = tabPanelBlocks.map((panelBlock, index) => {
				const anchor =
					panelBlock.attributes.anchor || `tab-${index + 1}`;
				return createBlock('core/tab', {
					anchor: `${anchor}-button`,
				});
			});

			const tabListBlock = createBlock(
				'core/tab-list',
				{ lock: { remove: true } },
				tabButtonBlocks
			);

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
 * Hover/active color attributes added to both core/tab-list and core/tab.
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
 * Add extended attributes to the core/tab-list and core/tab blocks.
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

	if (name === 'core/tab') {
		return {
			...settings,
			attributes: {
				...settings.attributes,
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
 * The four context keys that core/tab-list provides to core/tab children.
 * Each key carries the resolved preset-slug (not hex) so the tab's control
 * can display the inherited value. Custom hex values live in the paired
 * customHover/customActive attrs on the parent.
 */
const TAB_LIST_CONTEXT_KEYS = {
	'prc-block/tab-list-hoverBackgroundColor': 'hoverBackgroundColor',
	'prc-block/tab-list-hoverTextColor': 'hoverTextColor',
	'prc-block/tab-list-activeBackgroundColor': 'activeBackgroundColor',
	'prc-block/tab-list-activeTextColor': 'activeTextColor',
	'prc-block/tab-list-customHoverBackgroundColor':
		'customHoverBackgroundColor',
	'prc-block/tab-list-customHoverTextColor': 'customHoverTextColor',
	'prc-block/tab-list-customActiveBackgroundColor':
		'customActiveBackgroundColor',
	'prc-block/tab-list-customActiveTextColor': 'customActiveTextColor',
};

/**
 * Wire core/tab-list as a provider and core/tab as a consumer for
 * hover/active color context so the editor context prop carries
 * parent values into the core/tab Edit component.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addColorContext(settings, name) {
	if (name === 'core/tab-list') {
		return {
			...settings,
			providesContext: {
				...(settings.providesContext || {}),
				...TAB_LIST_CONTEXT_KEYS,
			},
		};
	}

	if (name === 'core/tab') {
		return {
			...settings,
			usesContext: [
				...(settings.usesContext || []),
				...Object.keys(TAB_LIST_CONTEXT_KEYS),
			],
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-color-context',
	addColorContext
);

/**
 * Extend core/tab-list edit: color controls + sync tab button count with tab panels.
 * Also wires color controls onto core/tab.
 *
 * @param {Function} BlockEdit Original BlockEdit component
 * @return {Function} Enhanced BlockEdit component
 */
const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, clientId, context } = props;

		if ('core/tab' === name) {
			return (
				<>
					<TabControls
						{...{ attributes, setAttributes, clientId, context }}
					/>
					<BlockEdit {...props} />
				</>
			);
		}

		if ('core/tab-list' !== name) {
			return <BlockEdit {...props} />;
		}

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const { menuItemBlocks, tabPanelBlocks } = useSelect(
			(select) => {
				const { getBlocks, getBlockRootClientId, getBlock } =
					select(blockEditorStore);
				const parentId = getBlockRootClientId(clientId);
				const parent = parentId ? getBlock(parentId) : null;
				const tabPanels = parent?.innerBlocks?.find(
					(b) => b.name === 'core/tab-panels'
				);
				return {
					menuItemBlocks: getBlocks(clientId),
					tabPanelBlocks:
						tabPanels?.innerBlocks?.filter(
							(b) => b.name === 'core/tab-panel'
						) ?? [],
				};
			},
			[clientId]
		);

		const migrated = useRef(false);

		useEffect(() => {
			if (migrated.current) {
				return;
			}
			if (
				tabPanelBlocks.length > 0 &&
				menuItemBlocks.length < tabPanelBlocks.length
			) {
				migrated.current = true;
				const newButtons = tabPanelBlocks.map((panelBlock, index) => {
					const anchor =
						panelBlock.attributes.anchor || `tab-${index + 1}`;
					return createBlock('core/tab', {
						anchor: `${anchor}-button`,
					});
				});
				replaceInnerBlocks(clientId, newButtons, false);
			}
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
 * into the wrapper element's inline style for core/tab-list and core/tab
 * so the editor canvas reflects the configured colors live.
 *
 * For core/tab, falls back to parent tab-list context values when the tab's
 * own attrs are not set.
 */
const withHoverActiveColorPreview = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const { name, attributes, context, wrapperProps } = props;

			if (name !== 'core/tab-list' && name !== 'core/tab') {
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

			// For core/tab: fall back to parent context values if own attr unset.
			const effectiveHoverBg =
				resolveColorValue(
					hoverBackgroundColor,
					customHoverBackgroundColor
				) ||
				(name === 'core/tab'
					? resolveColorValue(
							context?.[
								'prc-block/tab-list-hoverBackgroundColor'
							],
							context?.[
								'prc-block/tab-list-customHoverBackgroundColor'
							]
						)
					: '');

			const effectiveHoverText =
				resolveColorValue(hoverTextColor, customHoverTextColor) ||
				(name === 'core/tab'
					? resolveColorValue(
							context?.['prc-block/tab-list-hoverTextColor'],
							context?.[
								'prc-block/tab-list-customHoverTextColor'
							]
						)
					: '');

			const effectiveActiveBg =
				resolveColorValue(
					activeBackgroundColor,
					customActiveBackgroundColor
				) ||
				(name === 'core/tab'
					? resolveColorValue(
							context?.[
								'prc-block/tab-list-activeBackgroundColor'
							],
							context?.[
								'prc-block/tab-list-customActiveBackgroundColor'
							]
						)
					: '');

			const effectiveActiveText =
				resolveColorValue(activeTextColor, customActiveTextColor) ||
				(name === 'core/tab'
					? resolveColorValue(
							context?.['prc-block/tab-list-activeTextColor'],
							context?.[
								'prc-block/tab-list-customActiveTextColor'
							]
						)
					: '');

			const cssVars = {};
			if (effectiveHoverBg)
				cssVars['--custom-tab-hover-color'] = effectiveHoverBg;
			if (effectiveHoverText)
				cssVars['--custom-tab-hover-text-color'] = effectiveHoverText;
			if (effectiveActiveBg)
				cssVars['--custom-tab-active-color'] = effectiveActiveBg;
			if (effectiveActiveText)
				cssVars['--custom-tab-active-text-color'] =
					effectiveActiveText;

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
