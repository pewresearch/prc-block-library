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
			// Map prc-block/tab innerBlocks to core/tab blocks
			const tabBlocks = innerBlocks.map((tabBlock, index) => {
				const { label, anchor } = tabBlock.attributes;
				return createBlock(
					'core/tab',
					{
						label: label || `Tab ${index + 1}`,
						anchor: anchor || `tab-${index + 1}`,
					},
					tabBlock.innerBlocks
				);
			});

			// One tabs-menu-item per tab (Gutenberg 22.8+); anchor pairs with core/tab (tab-N -> tab-N-button).
			const tabsMenuItemBlocks = tabBlocks.map((tabBlock, index) => {
				const anchor = tabBlock.attributes.anchor || `tab-${index + 1}`;
				return createBlock('core/tabs-menu-item', {
					anchor: `${anchor}-button`,
				});
			});

			const tabsMenuBlock = createBlock(
				'core/tabs-menu',
				{ lock: { remove: true } },
				tabsMenuItemBlocks
			);

			// Create locked tab-panel block with tab children
			const tabPanelsBlock = createBlock(
				'core/tab-panel',
				{ lock: { remove: true } },
				tabBlocks
			);

			// Create core/tabs wrapper
			return createBlock(
				'core/tabs',
				{
					tabsId: attributes.tabsId,
					activeTabIndex: attributes.activeTabIndex || 0,
				},
				[tabsMenuBlock, tabPanelsBlock]
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
 * Add extended attributes to the core/tabs-menu block.
 * This is where you can add new attributes that extend the base tabs block.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addAttributes(settings, name) {
	if (name !== 'core/tabs-menu') {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			// Mobile dropdown functionality
			mobileDropdown: {
				type: 'boolean',
				default: false,
			},
			mobileDropdownWidth: {
				type: 'number',
				default: 768,
			},
			// Add additional attributes here as needed in the future
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-attributes',
	addAttributes
);

/**
 * Enable Custom CSS block support on core/tabs-menu so editors can define
 * --custom-tab-* CSS variables (and other overrides) via the Styles panel.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addCustomCSSSupport(settings, name) {
	if (name !== 'core/tabs-menu') {
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
 * Extend the core/tabs-menu block edit component with additional controls and
 * a one-time runtime migration that brings the menu item count in sync with the
 * tab count.
 *
 * Background: core/tabs-menu previously used a single template core/tabs-menu-item
 * that was replicated at render time. It now requires one explicit inner block per
 * tab. Existing content may have fewer core/tabs-menu-item blocks than core/tab
 * blocks. The block deprecation API cannot reliably update inner blocks on a
 * currently-valid block (isEligible fires but the migrated inner blocks are not
 * reflected in the editor store), so the migration is done here instead.
 *
 * @param {Function} BlockEdit Original BlockEdit component
 * @return {Function} Enhanced BlockEdit component
 */
const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, clientId } = props;

		if ('core/tabs-menu' !== name) {
			return <BlockEdit {...props} />;
		}

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const { menuItemBlocks, tabBlocks } = useSelect(
			(select) => {
				const { getBlocks, getBlockRootClientId, getBlock } =
					select(blockEditorStore);
				const parentId = getBlockRootClientId(clientId);
				const parent = parentId ? getBlock(parentId) : null;
				const tabPanel = parent?.innerBlocks?.find(
					(b) => b.name === 'core/tab-panel'
				);
				return {
					menuItemBlocks: getBlocks(clientId),
					tabBlocks:
						tabPanel?.innerBlocks?.filter(
							(b) => b.name === 'core/tab'
						) ?? [],
				};
			},
			[clientId]
		);

		const migrated = useRef(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally
		// runs once on mount; deps are stable at the time the HOC mounts and
		// we guard against re-runs with migrated ref.
		useEffect(() => {
			if (migrated.current) {
				return;
			}
			if (
				tabBlocks.length > 0 &&
				menuItemBlocks.length < tabBlocks.length
			) {
				migrated.current = true;
				const newMenuItems = tabBlocks.map((tabBlock, index) => {
					const anchor =
						tabBlock.attributes.anchor || `tab-${index + 1}`;
					return createBlock('core/tabs-menu-item', {
						anchor: `${anchor}-button`,
					});
				});
				replaceInnerBlocks(clientId, newMenuItems, false);
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

registerTabLabelBinding();
