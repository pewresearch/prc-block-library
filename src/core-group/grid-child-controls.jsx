/**
 * Adds PRC responsive-order controls to the direct children of a core/group
 * that uses the native grid layout, and outputs the order CSS variables plus
 * computed divider classes onto each child's editor wrapper.
 *
 * Order values are stored inside Gutenberg's native `style.{viewport}` structure
 * (co-located with the native `columnSpan`), via the style-state helpers.
 * The inspector shows one Column order field tied to the editor device preview
 * (`core/editor` getDeviceType); canvas order uses inline `order` from the active
 * preview device, not browser-width media queries. See utils/style-state.js.
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	Notice,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import {
	BASE_VIEWPORT,
	RESPONSIVE_VIEWPORTS,
	readStyleStateValue,
	resolveOrderForViewport,
	setStyleStateValue,
} from './utils/style-state';
import { readDividerBucket } from './utils/divider-placement';

const ORDER_PATH = ['layout', 'prcOrder'];

const ORDER_VIEWPORTS = [BASE_VIEWPORT, ...RESPONSIVE_VIEWPORTS];

/**
 * Current editor device preview (desktop, tablet, or mobile).
 *
 * @return {string} Lowercase device slug.
 */
function usePreviewDeviceType() {
	return useSelect((select) => {
		const type = select('core/editor').getDeviceType();
		return type ? type.toLowerCase() : BASE_VIEWPORT;
	}, []);
}

/**
 * Whether a block is a direct child of a core/group using grid layout.
 *
 * @param {string} clientId Block client id.
 * @return {boolean} True when the block sits inside a grid group.
 */
function useIsGridChild(clientId) {
	return useSelect(
		(select) => {
			const { getBlockRootClientId, getBlock } = select(blockEditorStore);
			const parentId = getBlockRootClientId(clientId);
			if (!parentId) {
				return false;
			}
			const parent = getBlock(parentId);
			return (
				parent?.name === 'core/group' &&
				parent?.attributes?.layout?.type === 'grid'
			);
		},
		[clientId]
	);
}

/**
 * Parse a NumberControl value into an integer order, or undefined to clear.
 *
 * @param {string|number|undefined} value Raw control value.
 * @return {number|undefined} Parsed integer, or undefined.
 */
function parseOrder(value) {
	if (value === '' || value === undefined || value === null) {
		return undefined;
	}
	const parsed = parseInt(value, 10);
	return Number.isNaN(parsed) ? undefined : parsed;
}

const withGridChildOrderControls = createHigherOrderComponent(
	(BlockEdit) =>
		function GridChildOrderControls(props) {
			const { name, attributes, setAttributes, clientId } = props;

			const isGridChild = useIsGridChild(clientId);
			const deviceType = usePreviewDeviceType();

			if (
				!isGridChild ||
				['core/template-part', 'core/pattern'].includes(name)
			) {
				return <BlockEdit {...props} />;
			}

			const { style } = attributes;

			const hasActiveOrder =
				readStyleStateValue(style, deviceType, ORDER_PATH) !==
				undefined;

			return (
				<>
					<InspectorControls group="dimensions">
						<ToolsPanelItem
							label={__('Column order', 'core-group')}
							hasValue={() => hasActiveOrder}
							onDeselect={() => {
								setAttributes({
									style: setStyleStateValue(
										style,
										deviceType,
										ORDER_PATH,
										undefined
									),
								});
							}}
							resetAllFilter={() => {
								let next = style;
								ORDER_VIEWPORTS.forEach((viewport) => {
									next = setStyleStateValue(
										next,
										viewport,
										ORDER_PATH,
										undefined
									);
								});
								return { style: next };
							}}
							panelId={clientId}
							isShownByDefault={false}
						>
							{deviceType === BASE_VIEWPORT ? (
								<Notice status="info" isDismissible={false}>
									{__(
										'Desktop order follows canvas position. Switch to tablet or mobile preview to set responsive order.',
										'core-group'
									)}
								</Notice>
							) : (
								<NumberControl
									label={__('Column order', 'core-group')}
									help={__(
										'Lower numbers appear first. Clear to fall back to desktop order.',
										'core-group'
									)}
									value={
										readStyleStateValue(
											style,
											deviceType,
											ORDER_PATH
										) ?? ''
									}
									onChange={(value) => {
										setAttributes({
											style: setStyleStateValue(
												style,
												deviceType,
												ORDER_PATH,
												parseOrder(value)
											),
										});
									}}
								/>
							)}
						</ToolsPanelItem>
					</InspectorControls>
					<BlockEdit {...props} />
				</>
			);
		},
	'withGridChildOrderControls'
);

/**
 * Build the editor wrapper props (CSS vars + divider classes) for a grid child.
 *
 * @param {Object} attributes   Block attributes.
 * @param {Object} wrapperProps Existing wrapper props.
 * @param {string} deviceType   Active editor device preview.
 * @return {Object} New wrapper props.
 */
function buildChildWrapperProps(attributes, wrapperProps, deviceType) {
	const { style } = attributes;
	const inlineStyle = { ...(wrapperProps?.style || {}) };

	ORDER_VIEWPORTS.forEach((viewport) => {
		const order = readStyleStateValue(style, viewport, ORDER_PATH);
		if (order !== undefined) {
			inlineStyle[`--${viewport}-order`] = order;
		}
	});

	inlineStyle.order = resolveOrderForViewport(style, deviceType);

	const classes = [wrapperProps?.className || ''];
	const dividers = readDividerBucket(style);
	if (dividers) {
		['desktop', 'tablet', 'mobile'].forEach((viewport) => {
			const flags = dividers[viewport];
			if (flags?.divider) {
				classes.push(`has-${viewport}-divider`);
			}
			if (flags?.full) {
				classes.push(`is-${viewport}-full-width`);
			}
		});
	}

	return {
		...wrapperProps,
		className: classes.filter(Boolean).join(' '),
		style: inlineStyle,
	};
}

const withGridChildWrapper = createHigherOrderComponent(
	(BlockListBlock) =>
		function GridChildWrapper(props) {
			const { attributes, wrapperProps, clientId } = props;
			const isGridChild = useIsGridChild(clientId);
			const deviceType = usePreviewDeviceType();

			if (!isGridChild) {
				return <BlockListBlock {...props} />;
			}

			return (
				<BlockListBlock
					{...props}
					wrapperProps={buildChildWrapperProps(
						attributes,
						wrapperProps,
						deviceType
					)}
				/>
			);
		},
	'withGridChildWrapper'
);

/**
 * Register the grid-child responsive-order controls and wrapper output.
 */
export default function registerGridChildControls() {
	addFilter(
		'editor.BlockEdit',
		'prc-block/core-group-grid-child-order',
		withGridChildOrderControls,
		20
	);
	addFilter(
		'editor.BlockListBlock',
		'prc-block/core-group-grid-child-wrapper',
		withGridChildWrapper,
		20
	);
}
