/**
 * Color-scheme helpers for the logo Safari/WebKit `<img>` src swap.
 *
 * The dark-mode-toggle persists the visitor override in localStorage under
 * STORAGE_KEY and sets `document.documentElement.style.colorScheme` to
 * `only light` / `only dark`. Safari does not apply that override inside SVG
 * documents loaded via `<img>`, so the logo block must pick a dedicated
 * light/dark asset from the same sources of truth.
 */

export const STORAGE_KEY = 'prc-color-scheme-preference';
export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * Read the persisted color-scheme preference, if any.
 *
 * @param {{ getItem: (key: string) => string | null }} storage Web Storage-like object.
 * @return {'light' | 'dark' | null} The saved preference or null when none.
 */
export function readPreference(storage) {
	try {
		const stored = storage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
	} catch (error) {
		// localStorage may be unavailable in private browsing modes.
	}
	return null;
}

/**
 * Resolve a forced scheme from an inline `color-scheme` style value.
 *
 * `only light` / `light` → light. `only dark` / `dark` → dark.
 * `light dark` (follow OS) and empty strings return null.
 *
 * @param {string} inline Inline style.colorScheme value.
 * @return {'light' | 'dark' | null} Forced scheme, or null when the document follows the OS.
 */
export function schemeFromInlineColorScheme(inline) {
	if (typeof inline !== 'string' || inline === '') {
		return null;
	}
	const hasLight = /\blight\b/.test(inline);
	const hasDark = /\bdark\b/.test(inline);
	if (hasLight && !hasDark) {
		return 'light';
	}
	if (hasDark && !hasLight) {
		return 'dark';
	}
	return null;
}

/**
 * Resolve the effective color scheme from toggle state, the document override,
 * a persisted preference, then the OS.
 *
 * @param {Object}                  sources                     Scheme inputs in priority order.
 * @param {'light' | 'dark' | null} [sources.toggleScheme]      Scheme from the dark-mode-toggle store.
 * @param {string}                  [sources.inlineColorScheme] Inline html color-scheme style.
 * @param {'light' | 'dark' | null} [sources.preference]        Persisted localStorage preference.
 * @param {boolean}                 [sources.osPrefersDark]     Whether the OS prefers dark mode.
 * @return {'light' | 'dark'} The scheme the logo should display.
 */
export function getEffectiveScheme({
	toggleScheme = null,
	inlineColorScheme = '',
	preference = null,
	osPrefersDark = false,
} = {}) {
	if (toggleScheme === 'light' || toggleScheme === 'dark') {
		return toggleScheme;
	}
	const fromInline = schemeFromInlineColorScheme(inlineColorScheme);
	if (fromInline) {
		return fromInline;
	}
	if (preference === 'light' || preference === 'dark') {
		return preference;
	}
	return osPrefersDark ? 'dark' : 'light';
}
