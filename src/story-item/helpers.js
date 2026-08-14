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

const STORY_ITEM_ENTITY_STATUSES = ['publish', 'draft', 'future'];

const normalizeExcerpt = (excerpt) => {
	if ('string' !== typeof excerpt) {
		return '';
	}

	const trimmed = excerpt.trim();
	if ('' === trimmed) {
		return '';
	}

	const paragraphPattern = /<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi;
	const paragraphs = Array.from(trimmed.matchAll(paragraphPattern));
	if (
		0 < paragraphs.length &&
		'' === trimmed.replace(paragraphPattern, '').trim()
	) {
		return paragraphs.map(([, paragraph]) => paragraph.trim()).join('<br>');
	}

	if (!/<p(?:\s[^>]*)?>/i.test(trimmed) && /<\/p>\s*$/i.test(trimmed)) {
		return trimmed.replace(/\s*<\/p>\s*$/i, '');
	}

	return trimmed;
};

const setArtBySize = (imageSize, postId, setAttributes) => {
	if (0 !== postId && false !== setAttributes) {
		apiFetch({
			path: `/prc-api/v3/art-direction/get/${postId}`,
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
 * @param     options
 * @param {*} isRefresh
 * @return
 */
const getArtDirectionSlot = (artDirection, imageSize) => {
	if (!artDirection || 'object' !== typeof artDirection) {
		return null;
	}

	const slot = artDirection[imageSize];
	if (!slot || 'string' !== typeof slot.rawUrl || '' === slot.rawUrl) {
		return null;
	}

	return slot;
};

const getAttributesFromPost = (
	post,
	options = {
		imageSize: 'A1',
	}
) => {
	if (null === post) {
		return {};
	}

	const storyItem = {
		title:
			post.hasOwnProperty('title') &&
			post.title.hasOwnProperty('rendered')
				? post.title.rendered
				: '',
		excerpt:
			post.hasOwnProperty('excerpt') &&
			post.excerpt.hasOwnProperty('rendered')
				? normalizeExcerpt(post.excerpt.rendered)
				: '',
		url: post.link || '',
		label: post.hasOwnProperty('label') ? post.label : 'report',
		date: post.date ? formatDate('M j, Y', post.date) : '',
		postId: post.id,
		postType: post.type,
	};

	const artSlot = getArtDirectionSlot(post.art_direction, options.imageSize);
	if (artSlot) {
		storyItem.image = artSlot.rawUrl;
		storyItem.isChartArt = Boolean(artSlot.chartArt);
	} else {
		storyItem.image = '';
		storyItem.isChartArt = false;
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
 * @param     options
 * @return
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

	const type = 'post' === postType ? 'posts' : postType;

	apiFetch({
		path: `/wp/v2/${type}/${postId}`,
		method: 'GET',
	})
		.then((post) => {
			if (false !== post) {
				const attrs = getAttributesFromPost(post, {
					imageSize,
				});
				setAttributes(attrs);
			}
		})
		.catch((err) => console.error(err));
};

const getPostAttributes = (postId, postType, imageSize) => {
	const restType = 'post' === postType ? 'posts' : postType;
	return apiFetch({
		path: `/wp/v2/${restType}/${postId}`,
		method: 'GET',
	})
		.then((post) => {
			if (false !== post) {
				return getAttributesFromPost(post, { imageSize });
			}

			return {};
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
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
		'data-post-id': postId,
	};
	if ('disabled' !== imageSlot && '' !== imageSize) {
		blockPropsArgs['data-image-size'] = imageSize;
	}

	return useBlockProps(blockPropsArgs);
};

export {
	setArtBySize,
	normalizeExcerpt,
	getAttributesFromPost,
	getArtDirectionSlot,
	getPostAttributes,
	refreshPostAttributes,
	useStoryItemBlockProps,
	STORY_ITEM_ENTITY_STATUSES,
};
