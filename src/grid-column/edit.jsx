/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-param-names, jsdoc/no-undefined-types */
/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useState, useRef, useCallback, useMemo } from '@wordpress/element';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { getBlockGapSupportValue } from '@prc/functions';
import Controls from './controls';

const DESKTOP_COLS = 12;
const TABLET_COLS = 12;
const MOBILE_COLS = 4;

/**
 * Reads the grid metrics from a parent grid-controller element.
 *
 * @param {HTMLElement} parentEl The grid-controller DOM element.
 * @param {number}      cols     Number of grid columns (12 or 4).
 * @return {{ colWidth: number, gap: number }} Pixel width of one column track and gap.
 */
function getGridMetrics(parentEl, cols) {
	const parentWidth = parentEl.offsetWidth;
	const gap =
		parseFloat(
			// eslint-disable-next-line no-undef
			window.getComputedStyle(parentEl).getPropertyValue('column-gap')
		) || 0;
	const colWidth = (parentWidth - (cols - 1) * gap) / cols;
	return { colWidth, gap };
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Block context.
 * @param {string}   props.clientId      Block client ID.
 * @param {boolean}  props.isSelected    Whether the block is selected.
 *
 * @return {Element} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { gridLayout, allowedBlocks, templateLock, verticalAlignment } =
		attributes;

	const {
		index,
		desktopSpan,
		tabletSpan,
		mobileSpan,
		desktopStart,
		tabletStart,
		mobileStart,
		desktopRow,
		tabletRow,
		mobileRow,
		tabletPosition,
		mobilePosition,
		desktopDivider,
		tabletDivider,
		mobileDivider,
	} = gridLayout;

	const columnRef = useRef(null);
	const [isResizing, setIsResizing] = useState(false);
	const startSpanRef = useRef(null);

	const { toggleSelection } = useDispatch('core/block-editor');

	const {
		hasChildBlocks,
		deviceType,
		parentIsSelected,
		gutterLabel,
		rowGutterLabel,
		isFirstInRow,
	} = useSelect(
		(select) => {
			const {
				getBlockOrder,
				getBlockRootClientId,
				isBlockSelected: isSelected_,
				getBlock,
			} = select(blockEditorStore);
			const type = select('core/editor').getDeviceType();
			const rootId = getBlockRootClientId(clientId);
			const parentBlock = rootId ? getBlock(rootId) : null;
			const gap = parentBlock?.attributes?.style?.spacing?.blockGap;

			const formatLabel = (raw) => {
				if (!raw) return '';
				if (raw.startsWith('var:preset|spacing|')) {
					return raw.replace('var:preset|spacing|', 'S-');
				}
				return raw;
			};

			let label = '';
			let rowLabel = '';
			if (gap) {
				const leftRaw = typeof gap === 'string' ? gap : gap?.left || '';
				const topRaw = typeof gap === 'string' ? gap : gap?.top || '';
				label = formatLabel(leftRaw);
				rowLabel = formatLabel(topRaw);
			}

			const device = type ? type.toLowerCase() : 'desktop';
			const spanKey =
				device === 'mobile'
					? 'mobileSpan'
					: device === 'tablet'
					? 'tabletSpan'
					: 'desktopSpan';
			const maxCols = device === 'mobile' ? 4 : 12;

			let firstInRow = false;
			if (rootId) {
				const siblingIds = getBlockOrder(rootId);
				const myIndex = siblingIds.indexOf(clientId);
				if (myIndex > 0) {
					let currentRowUsed = 0;
					for (let i = 0; i < myIndex; i++) {
						const sib = getBlock(siblingIds[i]);
						const sibSpan =
							sib?.attributes?.gridLayout?.[spanKey] ?? 4;
						if (currentRowUsed + sibSpan > maxCols) {
							currentRowUsed = sibSpan;
						} else {
							currentRowUsed += sibSpan;
						}
					}
					const ourSpan = gridLayout?.[spanKey] ?? 4;
					firstInRow =
						currentRowUsed >= maxCols ||
						currentRowUsed + ourSpan > maxCols;
				}
			}

			return {
				hasChildBlocks: 0 < getBlockOrder(clientId).length,
				deviceType: device,
				parentIsSelected: rootId ? isSelected_(rootId) : false,
				gutterLabel: label,
				rowGutterLabel: rowLabel,
				isFirstInRow: firstInRow,
			};
		},
		[clientId]
	);

	const { maxCols, currentSpan, spanKey } = useMemo(() => {
		if (deviceType === 'mobile') {
			return {
				maxCols: MOBILE_COLS,
				currentSpan: mobileSpan,
				spanKey: 'mobileSpan',
			};
		}
		if (deviceType === 'tablet') {
			return {
				maxCols: TABLET_COLS,
				currentSpan: tabletSpan,
				spanKey: 'tabletSpan',
			};
		}
		return {
			maxCols: DESKTOP_COLS,
			currentSpan: desktopSpan,
			spanKey: 'desktopSpan',
		};
	}, [deviceType, desktopSpan, tabletSpan, mobileSpan]);

	const handleResizeStart = useCallback(
		(_event, _direction, elt) => {
			setIsResizing(true);
			toggleSelection(false);
			startSpanRef.current = currentSpan;
		},
		[toggleSelection, currentSpan]
	);

	const handleResize = useCallback(
		(_event, _direction, elt, delta) => {
			const parentEl = elt.closest('.wp-block-prc-block-grid-controller');
			if (!parentEl) {
				return;
			}

			const { colWidth, gap } = getGridMetrics(parentEl, maxCols);
			const startWidth =
				startSpanRef.current * colWidth +
				(startSpanRef.current - 1) * gap;
			const targetWidth = startWidth + delta.width;

			let newSpan = Math.round((targetWidth + gap) / (colWidth + gap));
			newSpan = Math.max(1, Math.min(maxCols, newSpan));

			if (newSpan !== gridLayout[spanKey]) {
				setAttributes({
					gridLayout: {
						...gridLayout,
						[spanKey]: newSpan,
					},
				});
			}
		},
		[gridLayout, maxCols, spanKey, setAttributes]
	);

	const handleResizeStop = useCallback(() => {
		setIsResizing(false);
		toggleSelection(true);
		startSpanRef.current = null;
	}, [toggleSelection]);

	const spanLabel = `${currentSpan} / ${maxCols}`;

	const blockProps = useBlockProps({
		ref: columnRef,
		className: classnames({
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
			'has-desktop-divider': desktopDivider,
			'has-tablet-divider': tabletDivider,
			'has-mobile-divider': mobileDivider,
			'is-resizing': isResizing,
			'is-first-in-row': isFirstInRow,
		}),
		style: {
			'--desktop-span': desktopSpan,
			'--tablet-span': tabletSpan,
			'--mobile-span': mobileSpan,
			'--tablet-order': tabletPosition || undefined,
			'--mobile-order': mobilePosition || undefined,
		},
		'data-desktop-span': String(desktopSpan),
		'data-tablet-span': String(tabletSpan),
		'data-mobile-span': String(mobileSpan),
	});

	const gridColumnGap = getBlockGapSupportValue(attributes, 'vertical');

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: layoutClassNames,
			style: {
				...(gridColumnGap && { '--grid-column-gap': gridColumnGap }),
			},
		},
		{
			allowedBlocks,
			orientation: 'vertical',
			templateLock,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<span className="grid-column-span-badge">{spanLabel}</span>
				{parentIsSelected &&
					index > 1 &&
					gutterLabel &&
					!isFirstInRow && (
						<span className="grid-column-gutter-label">
							{gutterLabel}
						</span>
					)}
				{parentIsSelected && isFirstInRow && rowGutterLabel && (
					<span className="grid-column-gutter-label grid-column-gutter-label--vertical">
						{rowGutterLabel}
					</span>
				)}
				{isSelected ? (
					<ResizableBox
						size={{ width: '100%', height: 'auto' }}
						minWidth="50"
						minHeight="50"
						enable={{
							top: false,
							right: true,
							bottom: false,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						}}
						onResizeStart={handleResizeStart}
						onResize={handleResize}
						onResizeStop={handleResizeStop}
						className="grid-column-resizable"
					>
						<div {...innerBlocksProps} />
					</ResizableBox>
				) : (
					<div {...innerBlocksProps} />
				)}
			</div>
		</>
	);
}
