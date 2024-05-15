/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { date as formatDate } from '@wordpress/date';
import { useBlockProps } from '@wordpress/block-editor';

const setArtBySize = (imageSize, postId, setAttributes) => {
	if (0 !== postId && false !== setAttributes) {
		apiFetch({
			path: `/prc-api/v3/art-direction/get/?postId=${postId}`,
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
const getAttributesFromPost = (post, options = {
	imageSize: 'A1',
}) => {
	console.log('getAttributesFromPost', post, options);

	if (null === post) {
		return {};
	}

	const storyItem = {
		title:
			post.hasOwnProperty('title') && post.title.hasOwnProperty('rendered')
				? post.title.rendered
				: '',
		excerpt:
			post.hasOwnProperty('excerpt') && post.excerpt.hasOwnProperty('rendered')
				? post.excerpt.rendered
				: '',
		url: post.link,
		label: post.hasOwnProperty('label') ? post.label : 'report',
		date: formatDate('M j, Y', post.date),
		postId: post.id,
		postType: post.type,
	};

	if (post.artDirection) {
		const { artDirection } = post;
		const { imageSize } = options;
		storyItem.image = artDirection[imageSize].rawUrl;
		storyItem.isChartArt = artDirection[imageSize].chartArt;
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
		postType = 'post',
		imageSize = 'A1',
		isRefresh = false,
	} = options;

	if (false === postId || undefined === setAttributes) {
		return;
	}

	let type = 'post' === postType ? 'posts' : postType;

	apiFetch({
		path: `/wp/v2/${type}/${postId}`,
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

const useStoryItemBlockProps = (attributes, asSave = false) => {
	const {
		imageSlot,
		imageSize,
		enableEmphasis,
		enableExcerptBelow,
		className,
		postId,
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
		'data-post-id': postId
	};
	if ('disabled' !== imageSlot && '' !== imageSize) {
		blockPropsArgs['data-image-size'] = imageSize;
	}

	return useBlockProps(blockPropsArgs);
};

export {
	setArtBySize,
	getAttributesFromPost,
	refreshPostAttributes,
	useStoryItemBlockProps,
};
