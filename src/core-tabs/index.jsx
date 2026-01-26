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

			// Create tabs-menu-item block with color attributes for styling
			const tabsMenuItemBlock = createBlock('core/tabs-menu-item', {
				customActiveBackgroundColor: attributes.customTabActiveColor,
				customActiveTextColor: attributes.customTabActiveTextColor,
				customHoverBackgroundColor: attributes.customTabHoverColor,
				customHoverTextColor: attributes.customTabHoverTextColor,
			});

			// Create locked tabs-menu block with tabs-menu-item as inner block
			const tabsMenuBlock = createBlock(
				'core/tabs-menu',
				{ lock: { remove: true } },
				[tabsMenuItemBlock]
			);

			// Create locked tab-panels block with tab children
			const tabPanelsBlock = createBlock(
				'core/tab-panels',
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
 * Extend the core/tabs-menu block edit component with additional controls.
 * This Higher-Order Component wraps the core/tabs-menu block's edit component
 * and injects our extended controls into the editor sidebar.
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
