/**
 * Keyboard shortcut model for the Dialog Element block.
 *
 * A stored shortcut is a normalized string such as `mod+k`. Modifiers appear in
 * the fixed order `mod`, `ctrl`, `alt`, `shift`, followed by one letter or
 * digit. `mod` means Cmd on Apple platforms and Ctrl everywhere else, so one
 * stored value works on every platform. The PHP allowlist in
 * `class-dialog-element.php` mirrors `SHORTCUT_PATTERN` and `RESERVED_SHORTCUTS`.
 */

export const SHORTCUT_PATTERN = /^(mod\+)?(ctrl\+)?(alt\+)?(shift\+)?[a-z0-9]$/;

/**
 * Combos the browser or operating system owns. Page scripts cannot override
 * them reliably, so the recorder rejects them.
 */
export const RESERVED_SHORTCUTS = [
	'mod+w',
	'mod+t',
	'mod+n',
	'mod+r',
	'mod+q',
	'mod+l',
];

const APPLE_PLATFORM_PATTERN = /mac|iphone|ipad|ipod/i;

const MODIFIER_ORDER = ['mod', 'ctrl', 'alt', 'shift'];

const APPLE_SYMBOLS = {
	mod: '\u2318',
	ctrl: '\u2303',
	alt: '\u2325',
	shift: '\u21E7',
};

const OTHER_NAMES = {
	mod: 'Ctrl',
	ctrl: 'Ctrl',
	alt: 'Alt',
	shift: 'Shift',
};

const ARIA_NAMES = {
	ctrl: ['Control'],
	alt: ['Alt'],
	shift: ['Shift'],
};

/**
 * @return {boolean} Whether the current platform uses Cmd as its primary modifier.
 */
export function isApplePlatform() {
	const platform =
		window.navigator.platform ||
		window.navigator.userAgentData?.platform ||
		'';
	return APPLE_PLATFORM_PATTERN.test(platform);
}

/**
 * @param {string} shortcut Stored shortcut.
 * @return {{ mod: boolean, ctrl: boolean, alt: boolean, shift: boolean, key: string }|null}
 * Parsed shortcut, or null when the value is not a well-formed shortcut.
 */
export function parseShortcut(shortcut) {
	if (typeof shortcut !== 'string' || !SHORTCUT_PATTERN.test(shortcut)) {
		return null;
	}
	const tokens = shortcut.split('+');
	const key = tokens.pop();
	return {
		mod: tokens.includes('mod'),
		ctrl: tokens.includes('ctrl'),
		alt: tokens.includes('alt'),
		shift: tokens.includes('shift'),
		key,
	};
}

/**
 * Shortcuts must include Mod or Ctrl. A bare key, Shift alone, or Alt alone
 * would hijack ordinary typing (Option+letter types characters on Apple platforms).
 *
 * @param {string} shortcut Stored shortcut.
 * @return {{ valid: true }|{ valid: false, reason: 'format'|'modifier'|'reserved' }}
 * Validation result.
 */
export function validateShortcut(shortcut) {
	const parsed = parseShortcut(shortcut);
	if (!parsed) {
		return { valid: false, reason: 'format' };
	}
	if (!parsed.mod && !parsed.ctrl) {
		return { valid: false, reason: 'modifier' };
	}
	if (RESERVED_SHORTCUTS.includes(shortcut)) {
		return { valid: false, reason: 'reserved' };
	}
	return { valid: true };
}

/**
 * @param {KeyboardEvent} event Keyboard event.
 * @return {string} Lowercase letter or digit for the pressed key, or an empty string.
 */
function keyFromEvent(event) {
	const { code = '', key = '' } = event;
	if (event.altKey) {
		// Option and Alt change `event.key` on some layouts, so use the physical key.
		const codeMatch = /^(?:Key([A-Z])|Digit([0-9]))$/.exec(code);
		if (codeMatch) {
			return (codeMatch[1] ?? codeMatch[2]).toLowerCase();
		}
	}
	return key.length === 1 ? key.toLowerCase() : '';
}

/**
 * @param {KeyboardEvent} event   Keyboard event.
 * @param {boolean}       isApple Whether the platform uses Cmd as its primary modifier.
 * @return {boolean} Whether the event was produced by the platform's primary modifier.
 */
function hasPrimaryModifier(event, isApple) {
	return isApple ? event.metaKey : event.ctrlKey;
}

/**
 * Build the stored shortcut for a keydown. Used by the recorder.
 *
 * @param {KeyboardEvent} event   Keyboard event.
 * @param {boolean}       isApple Whether the platform uses Cmd as its primary modifier.
 * @return {string|null} Normalized shortcut, or null for modifier-only presses,
 * keys other than a letter or digit, and Meta on non-Apple platforms.
 */
export function shortcutFromEvent(event, isApple = isApplePlatform()) {
	const key = keyFromEvent(event);
	if (!key || !/^[a-z0-9]$/.test(key)) {
		return null;
	}
	if (!isApple && event.metaKey) {
		return null;
	}
	const tokens = [];
	if (hasPrimaryModifier(event, isApple)) {
		tokens.push('mod');
	}
	if (isApple && event.ctrlKey) {
		tokens.push('ctrl');
	}
	if (event.altKey) {
		tokens.push('alt');
	}
	if (event.shiftKey) {
		tokens.push('shift');
	}
	return [...tokens, key].join('+');
}

/**
 * @param {Object}        parsed  Result of parseShortcut().
 * @param {KeyboardEvent} event   Keyboard event.
 * @param {boolean}       isApple Whether the platform uses Cmd as its primary modifier.
 * @return {boolean} Whether the event is exactly this shortcut.
 */
export function matchesShortcut(parsed, event, isApple = isApplePlatform()) {
	if (!parsed || event.repeat) {
		return false;
	}
	const wantsCtrl = parsed.ctrl || (parsed.mod && !isApple);
	const wantsMeta = parsed.mod && isApple;
	return (
		event.ctrlKey === wantsCtrl &&
		event.metaKey === wantsMeta &&
		event.altKey === parsed.alt &&
		event.shiftKey === parsed.shift &&
		keyFromEvent(event) === parsed.key
	);
}

/**
 * @param {string}  shortcut Stored shortcut.
 * @param {boolean} isApple  Whether the platform uses Cmd as its primary modifier.
 * @return {string} Platform-native label such as "\u2318K" or "Ctrl K". Empty when invalid.
 */
export function formatShortcutLabel(shortcut, isApple = isApplePlatform()) {
	const parsed = parseShortcut(shortcut);
	if (!parsed) {
		return '';
	}
	const key = parsed.key.toUpperCase();
	const modifiers = MODIFIER_ORDER.filter((name) => parsed[name]);
	if (isApple) {
		return modifiers.map((name) => APPLE_SYMBOLS[name]).join('') + key;
	}
	const names = modifiers.map((name) => OTHER_NAMES[name]);
	return [...new Set(names), key].join(' ');
}

/**
 * @param {string} shortcut Stored shortcut.
 * @return {string} Value for the `aria-keyshortcuts` attribute. Covers both
 * Meta and Control for `mod`. Empty when invalid.
 */
export function formatAriaKeyShortcuts(shortcut) {
	const parsed = parseShortcut(shortcut);
	if (!parsed) {
		return '';
	}
	const key = parsed.key.toUpperCase();
	const modifierVariants = parsed.mod ? [['Meta'], ['Control']] : [[]];
	return modifierVariants
		.map((primary) => {
			const others = MODIFIER_ORDER.filter(
				(name) => name !== 'mod' && parsed[name]
			).flatMap((name) => ARIA_NAMES[name]);
			return [...primary, ...others, key].join('+');
		})
		.join(' ');
}
