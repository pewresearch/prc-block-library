/**
 * External Dependencies
 */
import * as moment from 'moment';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';

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

const getAttributesFromURL = (opts) => {
	const { url, imageSize } = opts;

	return new Promise((resolve, reject) => {
		apiFetch({
			path: '/prc-api/v2/blocks/story-item/get-post-by-url',
			method: 'POST',
			data: { url },
		})
			.then((post) => {
				console.log('getAttributesFromURL', post);
				if (false !== post) {
					const attrs = getAttributesFromPost({
						post,
						imageSize,
						isRefresh: false,
					});
					resolve(attrs);
				} else {
					reject(post);
				}
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
};

/**
 * Get the attributes for a stub, then throw a warning that a stub can not be found.
 * @TODO allow searching by post id OR url, if its by url use the above function. We need to cehck for a url and then use getAttributesFromURL.
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
		url = false,
		imageSize = 'A1',
		isRefresh = false,
	} = options;

	if ((false === postId && false === url) || undefined === setAttributes) {
		return;
	}

	if (false !== url) {
		getAttributesFromURL({
			url,
			imageSize,
		})
			.then((attrs) => {
				console.log('setPostAttributes -> by url:', attrs);
				setAttributes(attrs);
			})
			.catch((err) => {
				console.error(err);
			});
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

const resetAttributes = (options) => {};

export { setArtBySize, setPostAttributes, resetAttributes };
