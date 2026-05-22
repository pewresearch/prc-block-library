/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useRef, useState } from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useClientWidth } from '@prc/hooks';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const MIN_SIZE = 24;

// Asset URLs are provided by PHP via wp_add_inline_script on the editor handle.
// Falls back to an empty map so the block degrades gracefully during SSR or
// when the inline script hasn't loaded yet.
const STYLE_TO_URL = window.prcBlockLogoAssets || {};

const DIMENSIONS = {
	'primary-only': { width: 483.97, height: 72 },
	'primary-stable-white': { width: 483.97, height: 72 },
	'alt-only': { width: 483.97, height: 72 },
	'alt-stable-white': { width: 483.97, height: 72 },
	'decoded-only': { width: 210.29, height: 92 },
	'symbol-only': { width: 216, height: 216 },
	'symbol-stable-white': { width: 216, height: 216 },
	'pew-knight-only': { width: 168, height: 32 },
};

const DEFAULT_STYLE = 'primary-only';

function getStyleFromClassName(className) {
	if (!className || typeof className !== 'string') {
		return DEFAULT_STYLE;
	}
	const m = className.match(/is-style-([a-z0-9-]+)/);
	return m && STYLE_TO_URL[m[1]] ? m[1] : DEFAULT_STYLE;
}

function LogoInner({ className, width }) {
	const style = getStyleFromClassName(className);
	const src = STYLE_TO_URL[style] || STYLE_TO_URL[DEFAULT_STYLE];

	if (!src) {
		return null;
	}

	return (
		<div
			className="wp-block-prc-block-logo__inner"
			style={{ maxWidth: width ? `${width}px` : undefined }}
		>
			<img src={src} alt="" width="100%" />
		</div>
	);
}

function LogoResize({
	attributes,
	setAttributes,
	naturalMeasurements = { naturalWidth: 0, naturalHeight: 0 },
	imgWrapper,
	logoRef,
}) {
	const { width, justification } = attributes;
	const { naturalWidth, naturalHeight } = naturalMeasurements;
	const clientWidth = useClientWidth(logoRef, [justification]);
	const isLargeViewport = useViewportMatch('medium');
	const isResizable = isLargeViewport;
	const { toggleSelection } = useDispatch('core/block-editor');
	const { maxWidth } = useSelect((select) => {
		const settings = select('core/block-editor').getSettings();
		return { maxWidth: settings.maxWidth };
	}, []);

	let imageWidthWithinContainer;
	if (clientWidth && naturalWidth && naturalHeight) {
		const exceedMaxWidth = naturalWidth > clientWidth;
		imageWidthWithinContainer = exceedMaxWidth ? clientWidth : naturalWidth;
	}

	const defaultWidth = 280;
	const currentWidth = width || defaultWidth;
	const ratio = naturalWidth / naturalHeight;
	const currentHeight = currentWidth / ratio;
	const minWidth =
		naturalWidth < naturalHeight ? MIN_SIZE : Math.ceil(MIN_SIZE * ratio);
	const minHeight =
		naturalHeight < naturalWidth ? MIN_SIZE : Math.ceil(MIN_SIZE / ratio);
	const maxWidthBuffer = maxWidth * 2.5;

	let showRightHandle = false;
	let showLeftHandle = false;
	if (justification === 'center') {
		showRightHandle = true;
		showLeftHandle = true;
	} else if (justification === 'right') {
		showLeftHandle = true;
	} else {
		showRightHandle = true;
	}

	return (
		<Fragment>
			{(!isResizable || !imageWidthWithinContainer) && (
				<div style={{ width: currentWidth }}>{imgWrapper}</div>
			)}
			{isResizable && imageWidthWithinContainer && (
				<ResizableBox
					className="wp-block-prc-block-logo__dimensions"
					size={{ width: currentWidth, height: currentHeight }}
					showHandle={true}
					minWidth={minWidth}
					maxWidth={maxWidthBuffer}
					minHeight={minHeight}
					maxHeight={maxWidthBuffer / ratio}
					lockAspectRatio
					enable={{
						top: false,
						right: showRightHandle,
						bottom: true,
						left: showLeftHandle,
					}}
					onResizeStart={() => toggleSelection(false)}
					onResizeStop={(event, direction, elt, delta) => {
						toggleSelection(true);
						setAttributes({
							width: parseInt(currentWidth + delta.width, 10),
							height: parseInt(currentHeight + delta.height, 10),
						});
					}}
				>
					{imgWrapper}
				</ResizableBox>
			)}
		</Fragment>
	);
}

export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	clientId,
}) {
	const { className, width } = attributes;
	const ref = useRef();

	const blockProps = useBlockProps({
		ref,
		className: classnames(className, {
			'item-justified-center': attributes.justification === 'center',
			'item-justified-right': attributes.justification === 'right',
			'item-justified-left': attributes.justification === 'left',
		}),
	});

	const style = getStyleFromClassName(blockProps.className);
	const { naturalWidth, naturalHeight } =
		DIMENSIONS[style] || DIMENSIONS['primary-only'];

	const imgWrapper = (
		<LogoInner className={blockProps.className} width={width} />
	);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				{!isSelected && imgWrapper}
				{isSelected && (
					<LogoResize
						attributes={attributes}
						setAttributes={setAttributes}
						naturalMeasurements={{ naturalWidth, naturalHeight }}
						imgWrapper={imgWrapper}
						logoRef={ref}
					/>
				)}
			</div>
		</Fragment>
	);
}
