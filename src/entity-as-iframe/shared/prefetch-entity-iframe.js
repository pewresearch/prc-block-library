/**
 * Best-effort prefetch of an entity iframe document (same-origin).
 *
 * @param {string} url Full iframe URL to warm HTTP cache before first open.
 */
const prefetched = new Set();

export function prefetchEntityIframeUrl(url) {
	if (!url || prefetched.has(url)) {
		return;
	}
	prefetched.add(url);
	const link = document.createElement('link');
	link.rel = 'prefetch';
	link.href = url;
	link.as = 'document';
	document.head.appendChild(link);
}
