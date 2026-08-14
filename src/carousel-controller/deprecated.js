/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * v1 save reproduced the original markup keyed on the `orientation` attribute,
 * before it was renamed to `viewType` and the coverflow counter / per-slide dot
 * color features were added. This deprecation lets WordPress match existing
 * serialized content by markup and migrate it forward without invalidating the
 * block.
 */
const v1 = {
	attributes: {
		orientation: {
			type: 'string',
			default: 'horizontal',
		},
		enableDots: {
			type: 'boolean',
			default: true,
		},
		enableArrows: {
			type: 'boolean',
			default: true,
		},
		enableRewind: {
			type: 'boolean',
			default: true,
		},
		arrowsSize: {
			type: 'string',
			default: 'medium',
		},
		dotsSize: {
			type: 'string',
			default: 'small',
		},
		dotColor: {
			type: 'string',
			default: 'black',
		},
		arrowColor: {
			type: 'string',
			default: 'black',
		},
	},
	supports: {
		html: false,
		align: ['wide', 'full'],
		spacing: {
			margin: ['top', 'bottom'],
			padding: true,
		},
		interactivity: true,
		typography: {
			fontSize: true,
			__experimentalFontFamily: true,
			__experimentalDefaultControls: {
				fontSize: true,
				__experimentalFontFamily: true,
			},
		},
		shadow: true,
		color: {
			background: true,
			text: true,
			button: true,
			enableContrastChecker: true,
			gradients: true,
			heading: true,
			link: true,
		},
		background: {
			color: true,
			gradient: true,
			image: true,
		},
		__experimentalBorder: {
			radius: true,
			color: true,
			width: true,
			style: true,
		},
	},
	migrate: (attributes) => {
		const { orientation, ...rest } = attributes;
		return {
			...rest,
			viewType: orientation ?? 'horizontal',
		};
	},
	isEligible: (attributes) => !attributes.viewType,
	save: ({ attributes }) => {
		const {
			orientation,
			enableArrows,
			enableDots,
			arrowsSize,
			dotsSize,
			dotColor,
			arrowColor,
		} = attributes;

		const blockProps = useBlockProps.save({
			className: clsx('wp-block-prc-block-carousel-controller', {
				'is-style-vertical': orientation === 'vertical',
				[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
				[`has-dots-${dotsSize}`]: enableDots && dotsSize,
				[`has-dot-color`]: dotColor,
				[`has-arrow-color`]: arrowColor,
			}),
		});
		const innerBlocksProps = useInnerBlocksProps.save({
			className: 'prc-block-carousel-controller__track__inner',
		});

		return (
			<div {...blockProps}>
				<div className="prc-block-carousel-controller__track">
					<div {...innerBlocksProps} />
				</div>
				{enableArrows && (
					<div className="prc-block-carousel-controller__arrows"></div>
				)}
				{enableDots && (
					<div className="prc-block-carousel-controller__dots"></div>
				)}
			</div>
		);
	},
};

/**
 * v2 save matches the first slideshow markup where play and arrows were
 * root-level siblings. Migrates forward into the controls wrapper so dots can
 * center under the floating counter.
 */
const v2 = {
	attributes: {
		viewType: {
			type: 'string',
			default: 'horizontal',
		},
		enableDots: {
			type: 'boolean',
			default: true,
		},
		useSlideBgForDots: {
			type: 'boolean',
			default: false,
		},
		enableArrows: {
			type: 'boolean',
			default: true,
		},
		enableRewind: {
			type: 'boolean',
			default: true,
		},
		arrowsSize: {
			type: 'string',
			default: 'medium',
		},
		dotsSize: {
			type: 'string',
			default: 'small',
		},
		dotColor: {
			type: 'string',
			default: 'black',
		},
		arrowColor: {
			type: 'string',
			default: 'black',
		},
	},
	supports: {
		html: false,
		align: ['wide', 'full'],
		spacing: {
			margin: ['top', 'bottom'],
			padding: true,
		},
		interactivity: true,
		typography: {
			fontSize: true,
			__experimentalFontFamily: true,
			__experimentalDefaultControls: {
				fontSize: true,
				__experimentalFontFamily: true,
			},
		},
		shadow: true,
		color: {
			background: true,
			text: true,
			button: true,
			enableContrastChecker: true,
			gradients: true,
			heading: true,
			link: true,
		},
		background: {
			color: true,
			gradient: true,
			image: true,
		},
		__experimentalBorder: {
			radius: true,
			color: true,
			width: true,
			style: true,
		},
	},
	isEligible: (attributes) => attributes.viewType === 'slideshow',
	save: ({ attributes }) => {
		const {
			viewType,
			enableArrows,
			enableDots,
			arrowsSize,
			dotsSize,
			dotColor,
			arrowColor,
			useSlideBgForDots,
		} = attributes;

		const isCoverflow = viewType === 'coverflow';
		const isSlideshow = viewType === 'slideshow';

		const blockProps = useBlockProps.save({
			className: clsx('wp-block-prc-block-carousel-controller', {
				'is-style-vertical': viewType === 'vertical',
				'has-view-coverflow': isCoverflow,
				'has-view-slideshow': isSlideshow,
				[`has-arrows-${arrowsSize}`]: enableArrows && arrowsSize,
				[`has-dots-${dotsSize}`]: enableDots && dotsSize,
				[`has-dot-color`]: dotColor && !useSlideBgForDots,
				[`has-arrow-color`]: arrowColor,
				'has-slide-bg-dots': useSlideBgForDots,
			}),
		});
		const innerBlocksProps = useInnerBlocksProps.save({
			className: 'prc-block-carousel-controller__track__inner',
		});

		return (
			<div {...blockProps}>
				<div className="prc-block-carousel-controller__track">
					<div {...innerBlocksProps} />
					{isSlideshow && (
						<div className="prc-block-carousel-controller__counter"></div>
					)}
				</div>
				{enableArrows && (
					<div className="prc-block-carousel-controller__arrows"></div>
				)}
				{enableDots && (
					<div className="prc-block-carousel-controller__dots"></div>
				)}
				{isSlideshow && (
					<div className="prc-block-carousel-controller__play"></div>
				)}
				{isCoverflow && (
					<div className="prc-block-carousel-controller__counter"></div>
				)}
			</div>
		);
	},
};

export default [v2, v1];
