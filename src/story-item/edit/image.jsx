/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import { Picture } from 'react-responsive-picture';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { addQueryArgs } from '@wordpress/url';
import { Placeholder } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

const A1 = {
	default: '564,317',
	small: '690,388',
	hidpi: '1128,634',
	smallHidpi: '1380,776',
};

const A2 = {
	default: '268,151',
	small: '690,388',
	hidpi: '536,301',
	smallHidpi: '1380,776',
};

const A3 = {
	default: '194,110',
	small: '148,84',
	hidpi: '388,220',
	smallHidpi: '296,168',
};

const A4 = {
	default: '268,151',
	small: '690,388',
	hidpi: '536,302',
	smallHidpi: '1380,776',
};

const XL = {
	default: '720,405',
	small: '690,388',
	hidpi: '1440,810',
	smallHidpi: '1380,776',
};

function ImageDisplay({ img, size, onClick = false }) {
	// eslint-disable-next-line no-shadow
	const getImgURL = (variant) => {
		if ('' === img || false === img) {
			return img;
		}

		// Default to A1
		let args = { resize: A1[variant] };
		if ('A2' === size) {
			args = { resize: A2[variant] };
		} else if ('A3' === size) {
			args = { resize: A3[variant] };
		} else if ('A4' === size) {
			args = { resize: A4[variant] };
		} else if ('XL' === size) {
			args = { resize: XL[variant] };
		}

		return addQueryArgs(img, args);
	};

	// eslint-disable-next-line no-shadow
	const getImgSrcSet = (threshold = 767) => [
		{
			srcSet: `${getImgURL('default')} 1x, ${getImgURL('hidpi')} 2x`,
			media: `(min-width: ${threshold}px)`,
		},
		{
			srcSet: `${getImgURL('small')} 1x, ${getImgURL('smallHidpi')} 2x`,
			media: `(max-width: ${threshold}px)`,
		},
	];

	if (false !== onClick) {
		return (
			<button
				type="button"
				onClick={onClick}
				style={{ padding: 0, border: 'none', cursor: 'pointer' }}
			>
				<Picture sources={getImgSrcSet()} alt="Click to edit" />
			</button>
		);
	}

	return <Picture sources={getImgSrcSet()} />;
}

export default function Img({ attributes, setAttributes }) {
	const { image, imageSlot, imageSize, isChartArt } = attributes;

	if ('disabled' === imageSlot) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const classes = () => {
		let isXL = false;
		let isA1 = false;
		let isA2 = false;
		let isA3 = false;
		let isA4 = false;
		if (false !== imageSlot) {
			if ('XL' === imageSize) {
				isXL = true;
			} else if ('A1' === imageSize) {
				isA1 = true;
			} else if ('A2' === imageSize) {
				isA2 = true;
			} else if ('A3' === imageSize) {
				isA3 = true;
			} else if ('A4' === imageSize) {
				isA4 = true;
			}
		}

		return classNames({
			image: true,
			XL: isXL,
			A1: isA1,
			A2: isA2,
			A3: isA3,
			A4: isA4,
			bordered: isChartArt,
		});
	};

	return (
		<div className={classes()}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => setAttributes({ image: media.url })}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					render={({ open }) => (
						<Fragment>
							{(undefined === image || 0 === image.length) && (
								<Placeholder
									className="block-editor-media-placeholder"
									withIllustration
									label={__('Image')}
									instructions={__(
										'Upload an image file, pick one from the media library, or add one with a URL.',
									)}
									onClick={open}
								/>
							)}
							{undefined !== image && 0 < image.length && (
								<ImageDisplay img={image} size={imageSize} onClick={open} />
							)}
						</Fragment>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
}
