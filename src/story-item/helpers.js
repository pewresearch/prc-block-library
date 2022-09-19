/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import * as moment from 'moment';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useBlockProps } from '@wordpress/block-editor';

const setArtBySize = (imageSize, postId, setAttributes) => {
	if (0 !== postId && false !== setAttributes) {
		apiFetch({
			path: `/prc-api/v2/get-art/?postId=${postId}`,
		}).then((data) => {
			if (false !== data) {
				if (undefined !== data[imageSize] && false !== setAttributes) {
					setAttributes({
						image: data[imageSize].rawUrl,
						isChartArt: data[imageSize].chartArt,
					});
				}
			}
		});
	}
};

/**
 * Converts a post object to attributes for a story item.
 * @TODO Have moment clean up the date data.
 * @param {*} post
 * @param {*} imageSize
 * @param {*} isRefresh
 * @returns
 */
const getAttributesFromPost = (opts) => {
	const { post, imageSize, isRefresh = false } = opts;
	console.log(getAttributesFromPost, post);

	const d = new Date(post.date);
	const date = moment(d).format('MMM D, YYYY');

	const storyItem = {
		title: post.title.hasOwnProperty('rendered')
			? post.title.rendered
			: post.title,
		// @TODO change back to excerpt everywhere, write a deprecation transition for that and excerptBelow?
		excerpt: post.excerpt.hasOwnProperty('rendered')
			? post.excerpt.rendered
			: post.excerpt,
		url: post.link, // @TODO where is this `link` coming from, why is it not url or permalink.
		label: post.hasOwnProperty('label') ? post.label : 'Report',
		date,
		postId: post.id,
	};

	if (true !== isRefresh) {
		storyItem.extra = '';
	}

	if (post.art) {
		const { art } = post;
		storyItem.image = art[imageSize].rawUrl;
		storyItem.isChartArt = art[imageSize].chartArt;
	}

	console.log('getAttributesFromPost', post, storyItem);

	return storyItem;
};

/**
 * Set attributes for a story item from a stub by post id OR by url.
 *
 * @param {*} postId
 * @param {*} imageSize
 * @param {*} isRefresh
 * @param {*} setAttributes
 * @returns
 */
const setPostAttributes = (options) => {
	const {
		setAttributes,
		postId = false,
		imageSize = 'A1',
		isRefresh = false,
	} = options;

	if (false === postId || undefined === setAttributes) {
		return;
	}

	apiFetch({
		path: `/wp/v2/stub/${postId}`,
		method: 'GET',
	})
		.then((post) => {
			console.log('setPostAttributes -> by id:', postId, post);
			if (false !== post) {
				const attrs = getAttributesFromPost({
					post,
					imageSize,
					isRefresh,
				});
				setAttributes(attrs);
			}
		})
		.catch((err) => console.error(err));
};

const useStoryItemBlockProps = (attributes) => {
	const {
		imageSlot,
		imageSize,
		isChartArt,
		postId,
		headerSize,
		enableEmphasis,
		enableHeader,
		enableExcerpt,
		enableExcerptBelow,
		enableExtra,
		enableBreakingNews,
		enableMeta,
		metaTaxonomy,
		inLoop,
		isPreview,
		className,
	} = attributes;

	const logicalClasses = {
		bordered: enableEmphasis,
		'alt-excerpt': enableExcerptBelow,
	};
	if ('disabled' !== imageSlot) {
		logicalClasses[imageSlot] = true;
		logicalClasses.aligned = true;
	}
	const blockPropsArgs = {
		className: classNames('story item', className, logicalClasses),
	};
	if ('disabled' !== imageSlot && '' !== imageSize) {
		blockPropsArgs['data-image-size'] = imageSize;
	}

	return useBlockProps(blockPropsArgs);
};

const stubEnabledSiteIds = Array.from(Array(19).keys()).filter(
	(id) => 17 !== id && 0 !== id,
);

export {
	setArtBySize,
	setPostAttributes,
	useStoryItemBlockProps,
	stubEnabledSiteIds,
};
