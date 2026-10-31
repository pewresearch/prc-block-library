/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import {
	generateShareUrl,
	getPageUrl,
	openShareWindow,
} from './shared/share-urls.js';

/**
 * Get social sharing arguments from context
 * @param {Object} context - The block context
 * @return {Object} - Object containing url, title, and description
 */
function getShareArgs(context) {
	let { url, title, description } = context;

	// Fallback to meta tags if not provided in context
	if (!description) {
		description =
			document
				.querySelector('meta[property="og:description"]')
				?.getAttribute('content') || '';
	}

	if (!title) {
		title =
			document
				.querySelector('meta[property="og:title"]')
				?.getAttribute('content') || '';
	}

	if (!url) {
		url = getPageUrl().toString();
	}

	return { url, title, description };
}

const { actions } = store('core/social-links', {
	actions: {
		onClick: (event) => {
			const { ref } = getElement();

			// first we need to check if the ref has an a tag child, and if it has a href attribute set
			const anchor = ref.querySelector('.wp-block-social-link-anchor');
			if (anchor && anchor.href) {
				// validate the href attribute is a valid URL
				try {
					new URL(anchor.href);
					window.location.href = anchor.href;
					return;
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Invalid URL:', anchor.href);
				}
			}

			const context = getContext();
			const { platform } = context;

			if (!platform) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			if ('print' === platform) {
				actions.onPrintClick();
			} else if ('mail' === platform) {
				actions.onMailClick();
			} else if ('bookmark' === platform) {
				actions.onBookmarkClick();
			} else {
				actions.onShareClick();
			}
		},
		onShareClick: () => {
			const context = getContext();
			const { platform } = context;
			if (!platform) {
				return;
			}
			const shareArgs = getShareArgs(context);
			const shareUrl = generateShareUrl(platform, shareArgs);
			openShareWindow(shareUrl, platform);
		},
		onPrintClick: () => {
			const url = new URL(window.location.href);
			url.searchParams.delete('pdf');
			const path = url.pathname.replace(/\/+$/, '');
			if (!path.endsWith('/print')) {
				url.pathname = `${path}/print`;
			}
			window.location.href = url.toString();
		},
		onMailClick: () => {
			const context = getContext();
			const { url, title, description } = getShareArgs(context);

			const mailtoLink = `mailto:?subject=${encodeURIComponent(
				title
			)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;

			window.location.href = mailtoLink;
		},
		onBookmarkClick: () => {
			// @TODO: Future PRC User Accounts Bookmarks hook here.
		},
	},
});
