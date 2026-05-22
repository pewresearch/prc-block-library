/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const STORAGE_KEY = 'prc-color-scheme-preference';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * Read the persisted color-scheme preference, if any.
 *
 * @return {'light' | 'dark' | null} The saved preference or null when none.
 */
function readPreference() {
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
	} catch (error) {
		// localStorage may be unavailable in private browsing modes.
	}
	return null;
}

/**
 * Write or clear the persisted color-scheme preference.
 *
 * @param {'light' | 'dark' | null} value The preference to persist, or null to clear.
 */
function writePreference(value) {
	try {
		if (value === 'light' || value === 'dark') {
			window.localStorage.setItem(STORAGE_KEY, value);
		} else {
			window.localStorage.removeItem(STORAGE_KEY);
		}
	} catch (error) {
		// localStorage may be unavailable; the in-memory state will still apply.
	}
}

/**
 * Apply the user's color-scheme preference to the document root. When the
 * preference is null, the inline style is cleared so the OS default takes
 * over (the theme declares `color-scheme: light dark` at :root).
 *
 * @param {'light' | 'dark' | null} preference Effective preference to apply.
 */
function applyScheme(preference) {
	const root = document.documentElement;
	if (preference === 'light') {
		root.style.colorScheme = 'only light';
	} else if (preference === 'dark') {
		root.style.colorScheme = 'only dark';
	} else {
		root.style.colorScheme = '';
	}
}

/**
 * Whether the OS currently prefers dark mode.
 */
function osPrefersDark() {
	return (
		typeof window.matchMedia === 'function' &&
		window.matchMedia(DARK_MEDIA_QUERY).matches
	);
}

const { state } = store('prc-block/dark-mode-toggle', {
	state: {
		preference: readPreference(),
		osPrefersDark: osPrefersDark(),
		get effectiveScheme() {
			if (state.preference === 'light' || state.preference === 'dark') {
				return state.preference;
			}
			return state.osPrefersDark ? 'dark' : 'light';
		},
		get isDark() {
			return state.effectiveScheme === 'dark';
		},
		get label() {
			const context = getContext();
			return state.isDark ? context.lightLabel : context.darkLabel;
		},
		get ariaLabel() {
			const context = getContext();
			return state.isDark
				? context.lightLabel || 'Switch to light mode'
				: context.darkLabel || 'Switch to dark mode';
		},
	},
	actions: {
		toggle: () => {
			const next = state.isDark ? 'light' : 'dark';
			state.preference = next;
			writePreference(next);
			applyScheme(next);
		},
	},
	callbacks: {
		onInit: () => {
			applyScheme(state.preference);

			if (typeof window.matchMedia !== 'function') {
				return;
			}

			const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);
			const handleChange = (event) => {
				state.osPrefersDark = event.matches;
			};

			if (typeof mediaQuery.addEventListener === 'function') {
				mediaQuery.addEventListener('change', handleChange);
			} else if (typeof mediaQuery.addListener === 'function') {
				mediaQuery.addListener(handleChange);
			}
		},
	},
});
