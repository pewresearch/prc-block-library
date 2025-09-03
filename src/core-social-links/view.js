/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { addQueryArgs } = wp.url;

const { innerWidth, innerHeight, open } = window;

/**
 * Get social sharing arguments from context
 * @param {Object} context - The block context
 * @returns {Object} - Object containing url, title, and description
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
		url =
			document
				.querySelector('meta[property="og:url"]')
				?.getAttribute('content') || window.location.href;
	}

	return { url, title, description };
}

/**
 * Open a popup window for social sharing
 * @param {string} url - The URL to open
 * @param {string} windowName - The name of the window
 */
function openShareWindow(url, windowName) {
	open(
		url,
		windowName,
		`height=450, width=550, top=${innerHeight / 2 - 275}, left=${innerWidth / 2 - 225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
	);
}

/**
 * Generate share URL for different platforms
 * @param {string} platform - The social platform
 * @param {Object} shareArgs - The sharing arguments
 * @returns {string} - The share URL
 */
function generateShareUrl(platform, shareArgs) {
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
				text: `${description} ${url}`,
			});

		case 'bluesky':
			return addQueryArgs('https://bsky.app/intent/compose', {
				text: `${description} ${url}`,
			});

		default:
			return url;
	}
}

/**
 * Get window name for different platforms
 * @param {string} platform - The social platform
 * @returns {string} - The window name
 */
function getWindowName(platform) {
	const windowNames = {
		facebook: 'fbShareWindow',
		linkedin: 'linkedinShareWindow',
		twitter: 'twtrShareWindow',
		threads: 'threadsShareWindow',
		bluesky: 'bskyShareWindow',
	};

	return windowNames[platform] || 'shareWindow';
}

store('core/social-links', {
	actions: {
		onShareClick: (event) => {
			const context = getContext();
			const { platform } = context;
			if (!platform) {
				return;
			}
			const shareArgs = getShareArgs(context);

			event.preventDefault();
			event.stopPropagation();

			const shareUrl = generateShareUrl(platform, shareArgs);
			const windowName = getWindowName(platform);

			openShareWindow(shareUrl, windowName);
		},
	},
});
