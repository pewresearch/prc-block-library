/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */
import { useClientWidth } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import { Fragment, useRef, useState, useEffect } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

const MIN_SIZE = 100;

export default function LogoResizer({
	attributes,
	setAttributes,
	naturalMeasurements = {
		naturalWidth: 0,
		naturalHeight: 0,
	},
	imgWrapper,
	logoRef,
}) {
	const { width, justification } = attributes;
	const { naturalWidth, naturalHeight } = naturalMeasurements;
	// Set the default width to a reasonable size.
	const defaultWidth = 361;

	// This image logic is taken directly from core/site-logo
	const clientWidth = useClientWidth(logoRef, [justification]);
	const isLargeViewport = useViewportMatch('medium');
	const isResizable = isLargeViewport;
	const { toggleSelection } = useDispatch('core/block-editor');
	const { maxWidth } = useSelect((select) => {
		const settings = select('core/block-editor').getSettings();
		return {
			maxWidth: settings.maxWidth,
		};
	}, []);
	let imageWidthWithinContainer;
	if (clientWidth && naturalWidth && naturalHeight) {
		const exceedMaxWidth = naturalWidth > clientWidth;
		imageWidthWithinContainer = exceedMaxWidth ? clientWidth : naturalWidth;
	}
	const currentWidth = width || defaultWidth;
	const ratio = naturalWidth / naturalHeight;
	const currentHeight = currentWidth / ratio;
	const minWidth =
		naturalWidth < naturalHeight ? MIN_SIZE : Math.ceil(MIN_SIZE * ratio);
	const minHeight =
		naturalHeight < naturalWidth ? MIN_SIZE : Math.ceil(MIN_SIZE / ratio);

	// With the current implementation of ResizableBox, an image needs an
	// explicit pixel value for the max-width. In absence of being able to
	// set the content-width, this max-width is currently dictated by the
	// vanilla editor style. The following variable adds a buffer to this
	// vanilla style, so 3rd party themes have some wiggleroom. This does,
	// in most cases, allow you to scale the image beyond the width of the
	// main column, though not infinitely.
	// @todo It would be good to revisit this once a content-width variable
	// becomes available.
	const maxWidthBuffer = maxWidth * 2.5;
	let showRightHandle = false;
	let showLeftHandle = false;

	/* eslint-disable no-lonely-if */
	// See https://github.com/WordPress/gutenberg/issues/7584.
	if (justification === 'center') {
		// When the image is centered, show both handles.
		showRightHandle = true;
		showLeftHandle = true;
	} else {
		// Show the left handle and hide the right handle only when the
		// image is aligned right. Otherwise always show the right handle.
		if (justification === 'right') {
			showLeftHandle = true;
		} else {
			showRightHandle = true;
		}
	}
	// END core/site-logo logic

	return (
		<Fragment>
			{(!isResizable || !imageWidthWithinContainer) && (
				<div style={{ width }}>{imgWrapper}</div>
			)}
			{isResizable && imageWidthWithinContainer && (
				<ResizableBox
					className="wp-block-prc-block-logo__dimensions"
					size={{
						width: currentWidth,
						height: currentHeight,
					}}
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
