/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { date as formatDate } from '@wordpress/date';
import { Placeholder } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { useStoryItemBlockProps } from '../helpers';

const IMAGE_SIZES = {
	A1: [1128, 634],
	A2: [526, 301],
	A3: [388, 220],
	A4: [536, 302],
	XL: [1440, 810],
};

function Preview({ attributes }) {
	const {
		title,
		excerpt,
		extra,
		label,
		date,
		image,
		imageSlot,
		imageSize,
		isChartArt,
		headerSize,
		enableHeader,
		enableExcerpt,
		enableExtra,
		enableBreakingNews,
		enableMeta,
	} = attributes;

	const blockProps = useStoryItemBlockProps(attributes);

	const headerClasses = classNames('header', {
		large: 1 === headerSize,
		medium: 2 === headerSize,
		small: 3 === headerSize,
		light: false,
	});

	const imageClasses = classNames('image', {
		bordered: isChartArt,
		XL: 'XL' === imageSize,
		A4: 'A4' === imageSize,
		A3: 'A3' === imageSize,
		A2: 'A2' === imageSize,
		A1: 'A1' === imageSize,
	});

	const excerptClasses = classNames('description');

	const displayImage =
		undefined !== imageSlot &&
		'disabled' !== imageSlot &&
		undefined !== imageSize &&
		'' !== imageSize;

	return (
		<article {...blockProps}>
			{enableMeta && (
				<div className="meta">
					<span className="label">{label}</span> |{' '}
					<span className="date">{formatDate('M j, Y', date)}</span>
				</div>
			)}

			{displayImage && (
				<div className={`${imageClasses}`}>
					{(undefined === image || 0 === image.length) && (
						<Placeholder
							className="block-editor-media-placeholder"
							withIllustration
						/>
					)}
					{undefined !== image && 0 < image.length && (
						<picture>
							<img
								srcSet={image}
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
					value={title}
					className={headerClasses}
				/>
			)}

			{enableExcerpt && (
				<RichText.Content
					tagName="div"
					value={excerpt}
					multiline="p"
					className={excerptClasses}
				/>
			)}

			{enableExtra && (
				<RichText.Content tagName="ul" value={extra} className="extra" />
			)}

			{true === enableBreakingNews && false !== window.prcBreakingNews && (
				<ul className="extra-breaking-news">
					<li>
						<a
							href={window.prcBreakingNews.url}
							className="kicker-breaking-news"
						>
							{window.prcBreakingNews.label}
						</a>
					</li>
				</ul>
			)}
		</article>
	);
}

export default Preview;
