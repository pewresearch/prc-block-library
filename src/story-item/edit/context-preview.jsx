/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useEntityRecord } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { date as formatDate } from '@wordpress/date';
import { Placeholder } from '@wordpress/components';

/**
 * Internal Dependencies
 */

const randomTitlePlaceholder = () => {
	const opts = [
		'The Role of Alternative Social Media in the News and Information Environment',
		'How Global Public Opinion of China Has Shifted in the Xi Era',
		'Most Latinos Say Democrats Care About Them and Work Hard for Their Vote, Far Fewer Say So of GOP',
		'More Americans are joining the ‘cashless’ economy',
		'Americans Anxious about Climate Change',
	];
	return opts[Math.floor(Math.random() * opts.length)];
};

const randomExcerptPlaceholder = () => {
	const opts = [
		'In recent years, several new options have emerged in the social media universe, many of which explicitly present themselves as alternatives to more established social media platforms. Free speech ideals and heated political themes prevail on these sites, which draw praise from their users and skepticism from other Americans.',
		'Elections in Italy and Sweden have underscored the growing electoral strength that populist parties have displayed in Europe in recent years.',
		'In less than a decade, the share of Americans who go “cashless” in a typical week has increased by double digits.',
		'72% of U.S. adults say that, on the issues that matter to them, their side in politics has been losing more often than winning.',
		'56% of U.S. adults say that oil executives should be tried for crimes against humanity for their role in climate change.',
	];
	return `<p>${opts[Math.floor(Math.random() * opts.length)]}</p>`;
};

const IMAGE_SIZES = {
	A1: [1128, 634],
	A2: [526, 301],
	A3: [388, 220],
	A4: [536, 302],
	XL: [1440, 810],
};

export default function ContextPreview({ attributes, clientId, context }) {
	const { postId, postType } = context;
	const { record, isResolving } = useEntityRecord(
		'postType',
		postType,
		postId
	);

	const { title, excerpt, label, date, artDirection } = useMemo(() => {
		if (!record) {
			return {};
		}
		return {
			title: record?.title,
			excerpt: record?.excerpt,
			label: record?.label ? record?.label : 'Format Label',
			date: record?.date,
			artDirection: record?.artDirection,
		};
	}, [record]);

	const {
		imageSlot,
		imageSize,
		headerSize,
		enableHeader,
		enableExcerpt,
		enableMeta,
		className,
	} = attributes;

	const memoizedTitle = useMemo(() => {
		if (!title) {
			return randomTitlePlaceholder();
		}
		if (title.raw && !title.rendered) {
			return title.raw;
		}
		if (title.rendered) {
			return title.rendered;
		}
		return randomTitlePlaceholder();
	}, [title]);

	const memoizedExcerpt = useMemo(() => {
		if (!excerpt) {
			return randomExcerptPlaceholder();
		}
		if (excerpt.raw && !excerpt.rendered) {
			return excerpt.raw;
		}
		if (excerpt.rendered) {
			return excerpt.rendered;
		}
		return randomExcerptPlaceholder();
	}, [excerpt]);

	const headerClasses = classNames('header', {
		large: 1 === headerSize,
		medium: 2 === headerSize,
		small: 3 === headerSize,
		light: false,
	});

	const imageClasses = classNames('image', {
		bordered:
			artDirection &&
			artDirection[imageSize] &&
			artDirection[imageSize].chartArt,
		XL: 'XL' === imageSize,
		A4: 'A4' === imageSize,
		A3: 'A3' === imageSize,
		A2: 'A2' === imageSize,
		A1: 'A1' === imageSize,
	});

	const excerptClasses = classNames('description');

	const displayImage =
		artDirection &&
		artDirection[imageSize] &&
		artDirection[imageSize].url &&
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
		className: classNames(className, logicalClasses),
	};

	if (displayImage) {
		blockPropsArgs['data-image-size'] = imageSize;
	}

	const blockProps = useBlockProps(blockPropsArgs);

	if (isResolving) {
		return (
			<article
				{...{
					...blockProps,
					style: {
						opacity: 0.8,
					},
				}}
			>
				{enableMeta && (
					<div className="meta">
						<span className="label">Report</span>
						<span className="date">{formatDate('M j, Y')}</span>
					</div>
				)}
				{displayImage && (
					<div className={`${imageClasses}`}>
						<Placeholder
							className="block-editor-media-placeholder"
							withIllustration
						/>
					</div>
				)}
				{enableHeader && (
					<RichText.Content
						tagName={`h${headerSize}`}
						value={memoizedTitle}
						className={headerClasses}
					/>
				)}
				{enableExcerpt && (
					<RichText.Content
						tagName="div"
						value={memoizedExcerpt}
						multiline="p"
						className={excerptClasses}
					/>
				)}
			</article>
		);
	}

	return (
		<article {...blockProps}>
			{enableMeta && (
				<div className="meta">
					<span className="label">{label}</span>
					<span className="date">
						{date ? formatDate('M j, Y', date) : ''}
					</span>
				</div>
			)}
			{displayImage && (
				<div className={`${imageClasses}`}>
					{(undefined === artDirection || false === artDirection) && (
						<Placeholder
							className="block-editor-media-placeholder"
							withIllustration
						/>
					)}
					{undefined !== artDirection && false !== artDirection && (
						<picture>
							<img
								srcSet={artDirection[imageSize].url}
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
					value={memoizedTitle}
					className={headerClasses}
				/>
			)}
			{enableExcerpt && (
				<RichText.Content
					tagName="div"
					value={memoizedExcerpt}
					multiline="p"
					className={excerptClasses}
				/>
			)}
		</article>
	);
}
