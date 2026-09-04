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
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { InteriorDividerControls, GridDividerControls } from './controls';
import registerVariations from './variations';
import registerTransforms from './transforms';
import registerGridChildControls from './grid-child-controls';
import {
	clearDividerPlacement,
	gridStacksOnViewport,
	syncDividerPlacement,
} from './utils/divider-placement';
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
registerGridChildControls();

/**
 * Whether a group is using the native grid layout.
 *
 * @param {Object} attributes Block attributes.
 * @return {boolean} True for grid-layout groups.
 */
function isGridGroup(attributes) {
	return attributes?.layout?.type === 'grid';
}

/**
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
 * Also adds dividerColor/dividerStyle/dividerInset attributes for interior + grid-aware divider functionality.
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

		// Divider attributes for interior + grid-aware dividers.
		settings.attributes = {
			...settings.attributes,
			dividerColor: {
				type: 'string',
				default: null,
			},
			dividerStyle: {
				type: 'string',
				default: 'solid',
			},
			dividerInset: {
				type: 'number',
				default: 0,
			},
		};

		return settings;
	}
);

/**
 * Keep grid-child divider placement in sync as spans / column counts change.
 *
 * @param {Object} props            Block edit props.
 * @param {Object} props.attributes Block attributes.
 * @param {string} props.clientId   Block client id.
 * @return {null} Renders nothing.
 */
function GridDividerSync({ attributes, clientId }) {
	const { dividerColor } = attributes;

	const children = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId]
	);
	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const enabled = isGridGroup(attributes) && !!dividerColor;

	useEffect(() => {
		if (!enabled) {
			clearDividerPlacement(children, updateBlockAttributes);
			return;
		}
		syncDividerPlacement(
			children,
			attributes.layout,
			attributes.style,
			updateBlockAttributes
		);
	}, [
		enabled,
		children,
		attributes.layout,
		attributes.style,
		updateBlockAttributes,
	]);

	return null;
}

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
						<GridDividerControls {...props} />
						<GridDividerSync {...props} />
						<BlockEdit {...props} />
					</>
				);
			},
		'withGroupControls'
	),
	100
);

/**
 * Compute the editor wrapper props for a core/group, handling both the legacy
 * stacked interior divider and the grid-aware divider.
 *
 * @param {Object} attributes   Block attributes.
 * @param {Object} wrapperProps Existing wrapper props.
 * @return {Object} New wrapper props.
 */
function buildGroupWrapperProps(attributes, wrapperProps) {
	const { dividerColor } = attributes;
	const isGrid = isGridGroup(attributes);

	const newWrapperProps = { ...wrapperProps };
	const classes = [wrapperProps?.className || ''];
	const style = {
		...(wrapperProps?.style || {}),
		'--grid-gutter': getBlockGapSupportValue(
			attributes,
			isGrid ? 'horizontal' : 'vertical'
		),
	};

	if (dividerColor) {
		style['--divider-color'] = `var(--wp--preset--color--${dividerColor})`;
		if (isGrid) {
			classes.push('has-divider');
			classes.push(`has-${dividerColor}-divider-color`);
			if (
				gridStacksOnViewport(
					attributes.layout,
					attributes.style,
					'tablet'
				)
			) {
				classes.push('is-stacked-on-tablet');
			}
			if (
				gridStacksOnViewport(
					attributes.layout,
					attributes.style,
					'mobile'
				)
			) {
				classes.push('is-stacked-on-mobile');
			}
			if (
				attributes.dividerStyle &&
				attributes.dividerStyle !== 'solid'
			) {
				style['--divider-style'] = attributes.dividerStyle;
			}
			if (attributes.dividerInset) {
				style['--divider-inset'] = `${attributes.dividerInset}px`;
			}
		} else {
			classes.push('has-interior-divider');
			classes.push(`has-${dividerColor}-interior-divider-color`);
		}
	}

	newWrapperProps.className = classes.filter(Boolean).join(' ');
	newWrapperProps.style = style;
	return newWrapperProps;
}

/**
 * Add divider class names + CSS variables to the block wrapper in the editor.
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

			return (
				<BlockListBlock
					{...props}
					wrapperProps={buildGroupWrapperProps(
						attributes,
						wrapperProps
					)}
				/>
			);
		};
	}, 'withGroupWrapperProps'),
	100
);
