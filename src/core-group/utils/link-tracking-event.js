/**
 * Link click event helpers for core/group link tracking.
 *
 * Pure helpers: every function takes the window it reads from, so the unit
 * tests can pass a stub instead of the real globals.
 */

export const LINK_TRACKING_SERVICES = ['parsely', 'google-analytics'];

export const DEFAULT_EVENT_NAME = 'link_click';

// GA4 event names are at most 40 characters.
export const MAX_EVENT_NAME_LENGTH = 40;

// GA4 event parameter values are at most 100 characters.
export const MAX_GA_PARAM_LENGTH = 100;

/**
 * Normalize an editor key to a GA4-safe event name: lowercase letters, numbers
 * and underscores, starting with a letter, at most 40 characters.
 *
 * @param {string} key Raw editor key.
 * @return {string} Normalized name, or an empty string.
 */
export function normalizeEventName(key) {
	if (typeof key !== 'string') {
		return '';
	}
	return key
		.toLowerCase()
		.replace(/[\s-]+/g, '_')
		.replace(/[^a-z0-9_]/g, '')
		.replace(/^[^a-z]+/, '')
		.slice(0, MAX_EVENT_NAME_LENGTH);
}

/**
 * The event name to send for a key, with the `link_click` fallback.
 *
 * @param {string} key Raw editor key.
 * @return {string} Event name.
 */
export function getEventName(key) {
	return normalizeEventName(key) || DEFAULT_EVENT_NAME;
}

/**
 * Whether a link should be tracked. `#`-only and empty hrefs are skipped.
 *
 * @param {Element} link Anchor element.
 * @return {boolean} True when the link has a real destination.
 */
export function isTrackableLink(link) {
	const href = (link?.getAttribute?.('href') || '').trim();
	return '' !== href && '#' !== href;
}

/**
 * Resolve a URL against a base URL.
 *
 * @param {string} url  URL, absolute or relative.
 * @param {string} base Base URL.
 * @return {string} Absolute URL, or an empty string when it cannot be resolved.
 */
export function toAbsoluteUrl(url, base) {
	if (!url) {
		return '';
	}
	try {
		return new URL(url, base).href;
	} catch {
		return '';
	}
}

/**
 * Truncate a string to a maximum length.
 *
 * @param {string} value String.
 * @param {number} max   Maximum length.
 * @return {string} Truncated string.
 */
export function truncate(value, max) {
	const str = typeof value === 'string' ? value : '';
	return str.length > max ? str.slice(0, max) : str;
}

/**
 * The visible text of a link, with whitespace collapsed. Falls back to the
 * aria-label or title for icon-only links.
 *
 * @param {Element} link Anchor element.
 * @return {string} Link text.
 */
export function getLinkText(link) {
	const text = (link?.textContent || '').replace(/\s+/g, ' ').trim();
	if (text) {
		return text;
	}
	return (
		link?.getAttribute?.('aria-label') ||
		link?.getAttribute?.('title') ||
		''
	).trim();
}

/**
 * Build the Parse.ly custom event payload for `PARSELY.beacon.trackPageView`.
 *
 * @param {Element} link Anchor element.
 * @param {string}  key  Raw editor key.
 * @param {Window}  win  Window to read the page URL and referrer from.
 * @return {Object} Parse.ly payload.
 */
export function buildParselyLinkEvent(link, key, win) {
	const pageUrl = win.location.href;
	return {
		url: pageUrl,
		urlref: toAbsoluteUrl(win.document?.referrer, pageUrl),
		action: `_${getEventName(key)}`,
		data: {
			_href: toAbsoluteUrl(link.getAttribute('href'), pageUrl),
			_text: getLinkText(link),
		},
		js: 1,
	};
}

/**
 * Build the GA4 event name and parameters.
 *
 * @param {Element} link Anchor element.
 * @param {string}  key  Raw editor key.
 * @param {Window}  win  Window to read the page URL from.
 * @return {{name: string, params: Object}} GA4 event.
 */
export function buildGoogleAnalyticsLinkEvent(link, key, win) {
	return {
		name: getEventName(key),
		params: {
			link_url: truncate(
				toAbsoluteUrl(link.getAttribute('href'), win.location.href),
				MAX_GA_PARAM_LENGTH
			),
			link_text: truncate(getLinkText(link), MAX_GA_PARAM_LENGTH),
		},
	};
}

/**
 * Send a link click to Parse.ly. Does nothing when the Parse.ly beacon is not
 * loaded or the link is not trackable.
 *
 * @param {Element} link Anchor element.
 * @param {string}  key  Raw editor key.
 * @param {Window}  win  Window with the `PARSELY` global.
 * @return {boolean} True when the event was sent.
 */
export function sendParselyLinkEvent(link, key, win = window) {
	const trackPageView = win?.PARSELY?.beacon?.trackPageView;
	if (typeof trackPageView !== 'function' || !isTrackableLink(link)) {
		return false;
	}
	trackPageView.call(
		win.PARSELY.beacon,
		buildParselyLinkEvent(link, key, win)
	);
	return true;
}

/**
 * Send a link click to Google Analytics through `gtag`, or push it to
 * `dataLayer` on GTM-only pages. Does nothing when neither is loaded or the
 * link is not trackable.
 *
 * @param {Element} link Anchor element.
 * @param {string}  key  Raw editor key.
 * @param {Window}  win  Window with the `gtag` or `dataLayer` global.
 * @return {boolean} True when the event was sent.
 */
export function sendGoogleAnalyticsLinkEvent(link, key, win = window) {
	if (!win || !isTrackableLink(link)) {
		return false;
	}
	const { name, params } = buildGoogleAnalyticsLinkEvent(link, key, win);
	if (typeof win.gtag === 'function') {
		win.gtag('event', name, params);
		return true;
	}
	if (Array.isArray(win.dataLayer)) {
		win.dataLayer.push({ event: name, ...params });
		return true;
	}
	return false;
}
