/* global MutationObserver */

/**
 * Logo block: on Safari/WebKit, bind `img` src from context because SVG loaded via
 * `<img>` does not receive dark mode inside the image document. Other platforms
 * rely on the SVG's internal media query; the init callback no-ops there.
 *
 * Safari also ignores the page `color-scheme` override set by the dark-mode
 * toggle, so this module follows the toggle store / inline style / localStorage
 * / OS — the same sources of truth — and swaps to dedicated light/dark assets.
 */

import { store, getContext, withScope } from '@wordpress/interactivity';
import {
	DARK_MEDIA_QUERY,
	getEffectiveScheme,
	readPreference,
} from './effective-color-scheme';

/**
 * True for WebKit browsers that do not apply prefers-color-scheme inside SVG
 * `<img>` documents: all iOS browsers (Apple requires WebKit) and desktop Safari.
 * Desktop Chromium/Firefox also include "AppleWebKit" in their UA — exclude those.
 *
 * @return {boolean} True on iOS browsers and desktop Safari.
 */
function isSafariWebKit() {
	const ua = window.navigator.userAgent;
	// Every iOS browser is WebKit (CriOS/FxiOS/EdgiOS included).
	if (/iPad|iPhone|iPod/.test(ua)) {
		return true;
	}
	return (
		/AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua)
	);
}

/**
 * Effective scheme for the current page: toggle store, then the html
 * `color-scheme` override, then localStorage, then the OS media query.
 *
 * @return {'light' | 'dark'} The scheme the logo should display.
 */
function readDocumentScheme() {
	let toggleScheme = null;
	try {
		const { state: darkMode } = store('prc-block/dark-mode-toggle');
		toggleScheme = darkMode.effectiveScheme;
	} catch (error) {
		// Toggle store may be absent on pages without the block.
	}

	return getEffectiveScheme({
		toggleScheme,
		inlineColorScheme: document.documentElement.style.colorScheme,
		preference: readPreference(window.localStorage),
		osPrefersDark:
			typeof window.matchMedia === 'function' &&
			window.matchMedia(DARK_MEDIA_QUERY).matches,
	});
}

function applySafariSrc() {
	const context = getContext();
	context.currentSrc =
		readDocumentScheme() === 'dark' ? context.srcDark : context.srcLight;
}

store('prc-block/logo', {
	callbacks: {
		/**
		 * Re-applies the Safari/WebKit img src. Used by `data-wp-watch` so the
		 * logo follows `prc-block/dark-mode-toggle` state when that store exists.
		 */
		applySafariColorScheme: () => {
			if (!isSafariWebKit()) {
				return;
			}
			applySafariSrc();
		},
		/**
		 * Subscribes to OS prefers-color-scheme and the document `color-scheme`
		 * style (set by the dark-mode-toggle) on Safari/WebKit.
		 */
		setupSafariColorScheme: () => {
			if (!isSafariWebKit()) {
				return;
			}
			applySafariSrc();

			if (typeof window.matchMedia === 'function') {
				const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
				const handleChange = withScope(() => {
					applySafariSrc();
				});
				if (typeof mediaQuery.addEventListener === 'function') {
					mediaQuery.addEventListener('change', handleChange);
				} else if (typeof mediaQuery.addListener === 'function') {
					mediaQuery.addListener(handleChange);
				}
			}

			const observer = new MutationObserver(
				withScope(() => {
					applySafariSrc();
				})
			);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['style'],
			});
		},
	},
});
