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
import Controls from './controls';
import StyleEngine from './style-engine';

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

	const { hasChildBlocks, deviceType, parentIsSelected, gutterLabel } =
		useSelect(
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

				let label = '';
				if (gap) {
					const raw = typeof gap === 'string' ? gap : gap?.left || '';
					if (raw.startsWith('var:preset|spacing|')) {
						label = raw.replace('var:preset|spacing|', 'S-');
					} else {
						label = raw;
					}
				}

				return {
					hasChildBlocks: 0 < getBlockOrder(clientId).length,
					deviceType: type ? type.toLowerCase() : 'desktop',
					parentIsSelected: rootId ? isSelected_(rootId) : false,
					gutterLabel: label,
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
			[`column${index}-desktop-grid__span-${desktopSpan}`]: desktopSpan,
			'has-desktop-divider': desktopDivider,
			[`column${index}-tablet-grid__span-${tabletSpan}`]: tabletSpan,
			[`column${index}-tablet-position-${tabletPosition}`]:
				tabletPosition,
			'has-tablet-divider': tabletDivider,
			[`column${index}-mobile-grid__span-${mobileSpan}`]: mobileSpan,
			[`column${index}-mobile-position-${mobilePosition}`]:
				mobilePosition,
			'has-mobile-divider': mobileDivider,
			'is-resizing': isResizing,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
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
			<StyleEngine attributes={attributes} clientId={clientId} />
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<span className="grid-column-span-badge">{spanLabel}</span>
				{parentIsSelected && index > 1 && gutterLabel && (
					<span className="grid-column-gutter-label">
						{gutterLabel}
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
