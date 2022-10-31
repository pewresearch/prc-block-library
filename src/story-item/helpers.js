/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { date as formatDate } from '@wordpress/date';
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
	console.log('getAttributesFromPost', post);

	if (null === post) {
		return {};
	}

	const date = formatDate('M j, Y', post.date);

	const storyItem = {
		title:
			post.hasOwnProperty('title') && post.title.hasOwnProperty('rendered')
				? post.title.rendered
				: '',
		excerpt:
			post.hasOwnProperty('excerpt') && post.excerpt.hasOwnProperty('rendered')
				? post.excerpt.rendered
				: '',
		url: post.canonical_url, // @TODO where is this `link` coming from, why is it not url or permalink.
		label: post.hasOwnProperty('label') ? post.label : 'report',
		date,
		postId: post.id || post.ID,
	};

	if (true !== isRefresh) {
		storyItem.extra = '';
	}

	if (post.art) {
		const { art } = post;
		storyItem.image = art[imageSize].rawUrl;
		storyItem.isChartArt = art[imageSize].chartArt;
	}

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
const refreshPostAttributes = (options) => {
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

const getStoryItemByURL = (newUrl) =>
	new Promise((resolve, reject) => {
		apiFetch({
			path: '/prc-api/v2/stub/get-post-by-url',
			method: 'POST',
			data: { url: newUrl },
		})
			.then((post) => {
				if ('object' !== typeof post) {
					reject(new Error('post is not an object'));
				}
				const newAttributes = getAttributesFromPost({
					post,
					imageSize: 'A1',
				});
				resolve(newAttributes);
			})
			.catch((err) => reject(err));
	});

const useStoryItemBlockProps = (attributes) => {
	const {
		imageSlot,
		imageSize,
		enableEmphasis,
		enableExcerptBelow,
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

// Everything except site's 19 and 17.
// @TODO: I wish there was a more systemic way to approach this but it'll work for now
const stubEnabledSiteIds = Array.from(Array(19).keys()).filter(
	(id) => 17 !== id && 0 !== id,
);

export {
	setArtBySize,
	getStoryItemByURL,
	getAttributesFromPost,
	refreshPostAttributes,
	useStoryItemBlockProps,
	stubEnabledSiteIds,
};
