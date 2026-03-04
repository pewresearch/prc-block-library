/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { addQueryArgs } = wp.url;

const { innerWidth, innerHeight, open } = window;

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
		url =
			document
				.querySelector('meta[property="og:url"]')
				?.getAttribute('content') || window.location.href;
	}

	return { url, title, description };
}

/**
 * Open a popup window for social sharing
 * @param {string} url        - The URL to open
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
 * @param {string} platform  - The social platform
 * @param {Object} shareArgs - The sharing arguments
 * @return {string} - The share URL
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
 * @return {string} - The window name
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

const { actions, state } = store('core/social-links', {
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
					console.error('Invalid URL:', anchor.href);
				}
			}

			const context = getContext();
			const { platform } = context;
			console.log('Social Tools Click:', { ...context });

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
			const windowName = getWindowName(platform);
			openShareWindow(shareUrl, windowName);
		},
		onPrintClick: () => {
			// @TODO: Future print engine hook here.
			// Add ?pdf=true to the url and redirect to the pdf view.
			const url = new URL(window.location.href);
			url.searchParams.set('pdf', 'true');
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
