/**
 * WordPress Dependencies
 */
import { addQueryArgs } from '@wordpress/url';

export const SHARE_IMAGE_QUERY_ARG = 'share-image';

const WINDOW_NAMES = {
	facebook: 'fbShareWindow',
	linkedin: 'linkedinShareWindow',
	twitter: 'twtrShareWindow',
	threads: 'threadsShareWindow',
	bluesky: 'bskyShareWindow',
};

/**
 * Get the URL of the current page for sharing.
 *
 * A shared image request carries `share-image` in og:url so crawlers re-scrape
 * the image card. Strip it so page-level shares never inherit that card.
 * @return {URL} - The page URL
 */
export function getPageUrl() {
	const href =
		document
			.querySelector('meta[property="og:url"]')
			?.getAttribute('content') || window.location.href;
	const url = new URL(href, window.location.href);
	url.hash = '';
	url.searchParams.delete(SHARE_IMAGE_QUERY_ARG);
	return url;
}

/**
 * Open a popup window for social sharing
 * @param {string} url      - The URL to open
 * @param {string} platform - The social platform
 */
export function openShareWindow(url, platform) {
	const { innerWidth, innerHeight } = window;
	window.open(
		url,
		WINDOW_NAMES[platform] || 'shareWindow',
		`height=450, width=550, top=${innerHeight / 2 - 275}, left=${innerWidth / 2 - 225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
	);
}

/**
 * Generate share URL for different platforms
 * @param {string} platform  - The social platform
 * @param {Object} shareArgs - The sharing arguments
 * @return {string} - The share URL
 */
export function generateShareUrl(platform, shareArgs) {
	const { url, title, description } = shareArgs;

	switch (platform) {
		case 'facebook':
			return addQueryArgs('https://www.facebook.com/sharer/sharer.php', {
				u: url,
			});

		case 'linkedin':
			return addQueryArgs('https://www.linkedin.com/shareArticle', {
				summary: description,
				url,
				title,
				source: 'PewResearch',
			});

		case 'twitter':
			return addQueryArgs('https://twitter.com/intent/tweet', {
				text: description,
				url,
			});

		case 'threads':
			return addQueryArgs('https://www.threads.net/intent/post', {
				text: [description, url].filter(Boolean).join(' '),
			});

		case 'bluesky':
			return addQueryArgs('https://bsky.app/intent/compose', {
				text: [description, url].filter(Boolean).join(' '),
			});

		default:
			return url;
	}
}
