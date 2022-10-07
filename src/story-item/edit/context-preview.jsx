/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useEntityRecord } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import { date as formatDate } from '@wordpress/date';
import { Placeholder, Spinner } from '@wordpress/components';

/**
 * Internal Dependencies
 */

const IMAGE_SIZES = {
	A1: [1128, 634],
	A2: [526, 301],
	A3: [388, 220],
	A4: [536, 302],
	XL: [1440, 810],
};

export default function ContextPreview({ attributes, clientId, context }) {
	const { postId, postType, queryId } = context;
	const { record, isResolving } = useEntityRecord('postType', postType, postId);

	const { title, excerpt, label, date, art } = record;

	const {
		imageSlot,
		imageSize,
		headerSize,
		enableHeader,
		enableExcerpt,
		enableMeta,
		className,
	} = attributes;

	const headerClasses = classNames('header', {
		large: 1 === headerSize,
		medium: 2 === headerSize,
		small: 3 === headerSize,
		light: false,
	});

	const imageClasses = classNames('image', {
		bordered: art && art[imageSize] && art[imageSize].chartArt,
		XL: 'XL' === imageSize,
		A4: 'A4' === imageSize,
		A3: 'A3' === imageSize,
		A2: 'A2' === imageSize,
		A1: 'A1' === imageSize,
	});

	const excerptClasses = classNames('description');

	console.log('ContextPreview', {
		attributes,
		clientId,
		context,
		record,
		isResolving,
	});

	const displayImage =
		art &&
		art[imageSize] &&
		art[imageSize].url &&
		undefined !== imageSlot &&
		'disabled' !== imageSlot &&
		undefined !== imageSize &&
		'' !== imageSize;

	const logicalClasses = {};
	if (displayImage) {
		logicalClasses[imageSlot] = true;
		logicalClasses.aligned = true;
	}
	const blockPropsArgs = {
		className: classNames('story item', className, logicalClasses),
	};
	console.log('blockPropsArgs', blockPropsArgs);
	if (displayImage) {
		blockPropsArgs['data-image-size'] = imageSize;
	}

	const blockProps = useBlockProps(blockPropsArgs);

	console.log('blockProps', blockProps);

	useEffect(() => {
		if (record) {
			console.log('record', record);
		}
	}, [record]);

	if (isResolving) {
		return (
			<div {...blockProps}>
				<span>Loading... </span> <Spinner />
			</div>
		);
	}

	return (
		<article {...blockProps}>
			{enableMeta && (
				<div className="meta">
					<span className="label">{label}</span> |{' '}
					<span className="date">{date ? formatDate('M j, Y', date) : ''}</span>
				</div>
			)}
			{displayImage && (
				<div className={`${imageClasses}`}>
					{(undefined === art || false === art) && (
						<Placeholder
							className="block-editor-media-placeholder"
							withIllustration
						/>
					)}
					{undefined !== art && false !== art && (
						<picture>
							<img
								srcSet={art[imageSize].url}
								width={IMAGE_SIZES[imageSize][0]}
								height={IMAGE_SIZES[imageSize][1]}
								alt=""
							/>
						</picture>
					)}
				</div>
			)}
			{enableHeader && (
				<RichText.Content
					tagName={`h${headerSize}`}
					value={title.rendered}
					className={headerClasses}
				/>
			)}
			{enableExcerpt && (
				<RichText.Content
					tagName="div"
					value={excerpt.rendered}
					multiline="p"
					className={excerptClasses}
				/>
			)}
		</article>
	);
}
