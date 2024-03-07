/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */
import classnames from 'classnames';
import { useClientWidth } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import { Fragment, useRef, useState, useEffect } from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { ResizableBox } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import { ReactComponent as Logo } from '../assets/primary.svg';
import { ReactComponent as LogoWhite } from '../assets/primary-white.svg';
import { ReactComponent as LogoAlt } from '../assets/alternate.svg';
import { ReactComponent as LogoAltWhite } from '../assets/alternate-white.svg';
import { ReactComponent as DecodedLogo } from '../assets/decoded.svg';
import { ReactComponent as DecodedLogoWhite } from '../assets/decoded-white.svg';

const MIN_SIZE = 100;

function LogoInner({ onLoad, className, width }) {
	// we can know exactly which svg based on the classname is-style-x format.
	// from that we can also extract the height and width from the viewBox attribute
	// and use that to set the "natural" size of the image.

	useEffect(() => {
		// check that onLoad is a function and that className is a string...
		if (typeof onLoad !== 'function' || typeof className !== 'string') {
			return;
		}

		const selectedStyle = className.match(/is-style-([a-z0-9-]+)/);

		const svgLoad = (svg) => {
			const svgEl = svg();

			const [width, height] = svgEl.props.viewBox.split(' ').slice(2);

			console.log('svgEl', svgEl, svgEl.props.viewBox, width, height);

			onLoad(width, height);
		};

		switch (selectedStyle[1]) {
			case 'primary-only':
				svgLoad(Logo);
				break;
			case 'alt-only':
				svgLoad(LogoAlt);
				break;
			case 'decoded':
				svgLoad(DecodedLogo);
				break;
			default:
				svgLoad(Logo);
				break;
		}
	}, [className]);

	return (
		<div
			className="wp-block-prc-block-logo__inner"
			style={{ maxWidth: `${width}px` }}
		>
			<div className="wp-block-prc-block-logo__inner__logo">
				<Logo data-browser-theme="light" />
				<LogoWhite data-browser-theme="dark" />
			</div>
			<div className="wp-block-prc-block-logo__inner__logo-alt">
				<LogoAlt data-browser-theme="light" />
				<LogoAltWhite data-browser-theme="dark" />
			</div>
			<div className="wp-block-prc-block-logo__inner__decoded">
				<DecodedLogo data-browser-theme="light" />
				<DecodedLogoWhite data-browser-theme="dark" />
			</div>
		</div>
	);
}

function LogoResize({
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
	console.log(
		'imageWidthWithinContainer',
		naturalWidth,
		clientWidth,
		logoRef
	);
	if (clientWidth && naturalWidth && naturalHeight) {
		const exceedMaxWidth = naturalWidth > clientWidth;
		imageWidthWithinContainer = exceedMaxWidth ? clientWidth : naturalWidth;
	}

	// Set the default width to a responsible size.
	// Note that this width is also set in the attached frontend CSS file.
	const defaultWidth = 280;

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

	console.log('maxWidth', maxWidth, maxWidthBuffer);

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

export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	clientId,
}) {
	const { className, width } = attributes;
	const ref = useRef();
	const [{ naturalWidth, naturalHeight }, setNaturalSize] = useState({});

	const blockProps = useBlockProps({
		ref,
		className: classnames(className, {
			'item-justified-center': attributes.justification === 'center',
			'item-justified-right': attributes.justification === 'right',
			'item-justified-left': attributes.justification === 'left',
		}),
	});

	const imgWrapper = (
		<LogoInner
			{...{
				className,
				width,
				onLoad: (w, h) =>
					setNaturalSize({
						naturalWidth: w,
						naturalHeight: h,
					}),
			}}
		/>
	);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				{!isSelected && imgWrapper}
				{isSelected && (
					<LogoResize
						{...{
							attributes,
							setAttributes,
							naturalMeasurements: {
								naturalWidth,
								naturalHeight,
							},
							imgWrapper,
							logoRef: ref,
						}}
					/>
				)}
			</div>
		</Fragment>
	);
}
