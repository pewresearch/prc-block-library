/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls, { TabsOrientationControls } from './controls';
import registerTabLabelBinding from './tab-label-binding';
import './style.scss';

const VERTICAL_TAB_LIST_LAYOUT = {
	type: 'flex',
	orientation: 'vertical',
	flexWrap: 'nowrap',
};

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
			const orientation = attributes.orientation || 'horizontal';
			const isVertical = 'vertical' === orientation;

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
				...(isVertical ? { layout: VERTICAL_TAB_LIST_LAYOUT } : {}),
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
					orientation,
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

const coreTabsOrientationAttributes = {
	orientation: {
		type: 'string',
		enum: ['horizontal', 'vertical'],
		default: 'horizontal',
	},
	tabListPlacement: {
		type: 'string',
		enum: ['start', 'end'],
		default: 'start',
	},
};

/**
 * Add extended attributes to core/tabs and core/tab-list.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addAttributes(settings, name) {
	if (name === 'core/tabs') {
		return {
			...settings,
			attributes: {
				...settings.attributes,
				...coreTabsOrientationAttributes,
			},
			providesContext: {
				...settings.providesContext,
				'core/tabs-orientation': 'orientation',
			},
		};
	}

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
			usesContext: [
				...new Set([
					...(settings.usesContext || []),
					'core/tabs-orientation',
				]),
			],
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
 * Keep tab-list flex layout in sync with parent core/tabs orientation.
 *
 * @param {Object}   props
 * @param {string}   props.clientId
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 */
function SyncVerticalTabListLayout({ clientId, attributes, setAttributes }) {
	const parentOrientation = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockAttributes } =
				select(blockEditorStore);
			const parentId = getBlockRootClientId(clientId);
			if (!parentId) {
				return 'horizontal';
			}
			return getBlockAttributes(parentId)?.orientation || 'horizontal';
		},
		[clientId]
	);

	const isVertical = 'vertical' === parentOrientation;
	const layoutOrientation = attributes?.layout?.orientation;

	useEffect(() => {
		if (isVertical && layoutOrientation !== 'vertical') {
			setAttributes({ layout: VERTICAL_TAB_LIST_LAYOUT });
			return;
		}
		if (!isVertical && layoutOrientation === 'vertical') {
			setAttributes({
				layout: {
					type: 'flex',
					orientation: 'horizontal',
					flexWrap: 'wrap',
				},
			});
		}
	}, [isVertical, layoutOrientation, setAttributes]);

	return null;
}

/**
 * Extend core/tabs and core/tab-list edit with PRC controls.
 *
 * @param {Function} BlockEdit Original BlockEdit component
 * @return {Function} Enhanced BlockEdit component
 */
const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, clientId } = props;

		if ('core/tabs' === name) {
			return (
				<>
					<TabsOrientationControls
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<BlockEdit {...props} />
				</>
			);
		}

		if ('core/tab-list' === name) {
			return (
				<>
					<SyncVerticalTabListLayout
						clientId={clientId}
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<Controls {...{ attributes, setAttributes, clientId }} />
					<BlockEdit {...props} />
				</>
			);
		}

		return <BlockEdit {...props} />;
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
 * Editor wrapper classes for vertical core/tabs.
 *
 * @param {Object}   props
 * @param {Function} props.BlockListBlock
 * @param {Object}   props.blockProps
 */
function CoreTabsListBlockPreview({ BlockListBlock, blockProps }) {
	const { attributes, wrapperProps } = blockProps;
	const orientation = attributes?.orientation || 'horizontal';
	const tabListPlacement = attributes?.tabListPlacement || 'start';
	const extraClasses = [];

	if ('vertical' === orientation) {
		extraClasses.push('is-vertical');
		extraClasses.push(
			'end' === tabListPlacement
				? 'has-tab-list-end'
				: 'has-tab-list-start'
		);
	}

	if (!extraClasses.length) {
		return <BlockListBlock {...blockProps} />;
	}

	const mergedClassName = [wrapperProps?.className, ...extraClasses]
		.filter(Boolean)
		.join(' ');

	return (
		<BlockListBlock
			{...blockProps}
			wrapperProps={{
				...wrapperProps,
				className: mergedClassName,
			}}
		/>
	);
}

/**
 * Editor wrapper: vertical class + hover/active CSS vars for core/tab-list.
 *
 * @param {Object}   props
 * @param {Function} props.BlockListBlock
 * @param {Object}   props.blockProps
 */
function CoreTabListBlockPreview({ BlockListBlock, blockProps }) {
	const { attributes, wrapperProps, clientId } = blockProps;

	const parentOrientation = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockAttributes } =
				select(blockEditorStore);
			const parentId = getBlockRootClientId(clientId);
			if (!parentId) {
				return 'horizontal';
			}
			return getBlockAttributes(parentId)?.orientation || 'horizontal';
		},
		[clientId]
	);

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

	const isVertical = 'vertical' === parentOrientation;
	const mergedClassName = [
		wrapperProps?.className,
		isVertical ? 'is-vertical' : null,
	]
		.filter(Boolean)
		.join(' ');

	const mergedWrapperProps = {
		...wrapperProps,
		className: mergedClassName || wrapperProps?.className,
		style: {
			...(wrapperProps?.style || {}),
			...cssVars,
		},
	};

	return <BlockListBlock {...blockProps} wrapperProps={mergedWrapperProps} />;
}

/**
 * BlockListBlock HOC: editor wrapper classes for vertical tabs +
 * hover/active CSS custom properties on core/tab-list.
 */
const withCoreTabsPreview = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name } = props;

		if (name === 'core/tabs') {
			return (
				<CoreTabsListBlockPreview
					BlockListBlock={BlockListBlock}
					blockProps={props}
				/>
			);
		}

		if (name === 'core/tab-list') {
			return (
				<CoreTabListBlockPreview
					BlockListBlock={BlockListBlock}
					blockProps={props}
				/>
			);
		}

		return <BlockListBlock {...props} />;
	};
}, 'withCoreTabsPreview');

addFilter(
	'editor.BlockListBlock',
	'prc-block/core-tabs/with-core-tabs-preview',
	withCoreTabsPreview
);

registerTabLabelBinding();
