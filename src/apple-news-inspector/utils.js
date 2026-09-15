/**
 * Apple News inspector helpers.
 *
 * Alignment override lives on attrs.appleNews.align so web `align` is unchanged.
 */

export const APPLE_NEWS_BLOCKS = ['core/image', 'core/group'];

export const APPLE_NEWS_POST_TYPE_SUPPORT = 'prc-apple-news';

/**
 * Must match OPEN_APPLE_NEWS_PREVIEW in prc-apple-news.
 */
export const OPEN_APPLE_NEWS_PREVIEW = 'prcAppleNews.openPreview';

export const APPLE_NEWS_ALIGN_OPTIONS = [
	{
		label: 'Inherit (use web alignment)',
		value: 'inherit',
	},
	{
		label: 'Wide on Apple News',
		value: 'wide',
	},
	{
		label: 'Center on Apple News',
		value: 'center',
	},
	{
		label: 'Left on Apple News',
		value: 'left',
	},
	{
		label: 'Right on Apple News',
		value: 'right',
	},
];

export const APPLE_NEWS_ATTRIBUTE = {
	type: 'object',
	default: {},
};

/**
 * Whether a REST post type record opts into Apple News.
 *
 * @param {Object|null|undefined} postTypeRecord Post type from core data.
 * @return {boolean} True when supports.prc-apple-news is present.
 */
export function postTypeSupportsAppleNews(postTypeRecord) {
	if (!postTypeRecord || typeof postTypeRecord !== 'object') {
		return false;
	}
	const supports = postTypeRecord.supports;
	if (!supports || typeof supports !== 'object') {
		return false;
	}
	return Boolean(supports[APPLE_NEWS_POST_TYPE_SUPPORT]);
}

/**
 * Normalize the stored Apple News align override for the select control.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} inherit | wide | center | left | right
 */
export function getAppleNewsAlign(attributes) {
	const value = attributes?.appleNews?.align;
	if (
		value === 'wide' ||
		value === 'center' ||
		value === 'left' ||
		value === 'right'
	) {
		return value;
	}
	return 'inherit';
}

/**
 * Next appleNews attribute object for a select change.
 *
 * Inherit omits `align` so the block comment stays small.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} align      Selected value.
 * @return {Object} Partial attributes for setAttributes.
 */
export function nextAppleNewsAlign(attributes, align) {
	const current =
		attributes?.appleNews && typeof attributes.appleNews === 'object'
			? { ...attributes.appleNews }
			: {};

	if (!align || align === 'inherit') {
		delete current.align;
	} else {
		current.align = align;
	}

	return { appleNews: current };
}
