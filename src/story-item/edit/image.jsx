/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import { Picture } from 'react-responsive-picture';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { addQueryArgs } from '@wordpress/url';

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

function ImageDisplay({
	img,
	size,
	link,
	onClick = false,
	placeholder = false,
}) {
	// eslint-disable-next-line no-shadow
	const getImgURL = (variant) => {
		if (true === placeholder) {
			let dimensions = '';
			if ('A2' === size) {
				dimensions = '536x301';
			} else if ('A3' === size) {
				dimensions = '388x220';
			} else if ('A4' === size) {
				dimensions = '536x302';
			} else if ('XL' === size) {
				dimensions = '1440x810';
			} else {
				// Default to A1
				dimensions = '1128x634';
			}
			return `https://via.placeholder.com/${dimensions}.png?text=${size}`;
		}

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
				{true === placeholder && (
					<img src={getImgURL()} alt="Click to insert" />
				)}
				{true !== placeholder && (
					<Picture sources={getImgSrcSet()} alt="Click to edit" />
				)}
			</button>
		);
	}

	return (
		<Fragment>
			{'' === link && <Picture sources={getImgSrcSet()} />}
			{'' !== link && (
				<a href={link}>
					<Picture sources={getImgSrcSet()} />
				</a>
			)}
		</Fragment>
	);
}

function Edit({ img, size, setAttributes }) {
	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={(media) => setAttributes({ image: media.url })}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				render={({ open }) => (
					<Fragment>
						{
							// If we have an actual image here then display it otherwise give us the placeholder
						}
						{undefined !== img && 0 !== img.length && (
							<ImageDisplay img={img} size={size} link="" onClick={open} />
						)}
						{(undefined === img || 0 === img.length) && (
							<ImageDisplay
								img={img}
								size={size}
								link=""
								onClick={open}
								placeholder
							/>
						)}
					</Fragment>
				)}
			/>
		</MediaUploadCheck>
	);
}

/**
 * Props:
 * img: string url of image to display
 * size: string of image/slot size (A1,A2,A3,A4)
 * link: string of url to go to when image is clicked on front end
 * slot: if set to null then no image size chooser will be display
 * chartArt: if set to null then no chart art button will appear
 * setAttributes: defaults to false unless otherwise provided a function to pass data back up to a HOC state.
 *
 * <Img id={} img={} size={} slot={} chartArt={} setAttributes={}/>
 */

function Img({ img, size, slot, chartArt, setAttributes }) {
	if ('disabled' === slot) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment />;
	}

	const classes = () => {
		let isXL = false;
		let isA1 = false;
		let isA2 = false;
		let isA3 = false;
		let isA4 = false;
		if (false !== slot) {
			if ('XL' === size) {
				isXL = true;
			} else if ('A1' === size) {
				isA1 = true;
			} else if ('A2' === size) {
				isA2 = true;
			} else if ('A3' === size) {
				isA3 = true;
			} else if ('A4' === size) {
				isA4 = true;
			}
		}

		return classNames({
			ui: true, // @TODO is this necessary?
			XL: isXL,
			A1: isA1,
			A2: isA2,
			A3: isA3,
			A4: isA4,
			image: true,
			bordered: chartArt,
		});
	};

	return (
		<div className={classes()}>
			<Edit img={img} size={size} setAttributes={setAttributes} />
		</div>
	);
}

export default Img;
