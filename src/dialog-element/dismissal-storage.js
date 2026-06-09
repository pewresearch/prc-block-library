/**
 * Client-side dismissal persistence for dialog auto-activation.
 * Follows the dark-mode-toggle storage pattern: namespaced keys, try/catch, graceful degradation.
 */

const STORAGE_KEY_PREFIX = 'prc-dialog-dismissed-';

/** @type {Set<string>} Dialog IDs dismissed during the current page load (pageload scope). */
const pageDismissals = new Set();

/**
 * @param {string} dialogId Dialog identifier from the parent Dialog block.
 * @return {string} Namespaced storage key.
 */
function getStorageKey(dialogId) {
	return `${STORAGE_KEY_PREFIX}${dialogId}`;
}

/**
 * @param {'pageload' | 'session' | 'device'} scope Persistence scope.
 * @return {Storage|null} Browser storage API or null for pageload scope.
 */
function getStorageForScope(scope) {
	if (scope === 'session') {
		return window.sessionStorage;
	}
	if (scope === 'device') {
		return window.localStorage;
	}
	return null;
}

/**
 * @param {string}                            dialogId Dialog identifier.
 * @param {'pageload' | 'session' | 'device'} scope    Persistence scope.
 * @return {boolean} Whether the dialog was previously dismissed.
 */
export function isDialogDismissed(dialogId, scope) {
	if (!dialogId) {
		return false;
	}

	if (scope === 'pageload') {
		return pageDismissals.has(dialogId);
	}

	const storage = getStorageForScope(scope);
	if (!storage) {
		return false;
	}

	try {
		return storage.getItem(getStorageKey(dialogId)) === '1';
	} catch (error) {
		return false;
	}
}

/**
 * @param {string}                            dialogId Dialog identifier.
 * @param {'pageload' | 'session' | 'device'} scope    Persistence scope.
 */
export function persistDialogDismissal(dialogId, scope) {
	if (!dialogId) {
		return;
	}

	if (scope === 'pageload') {
		pageDismissals.add(dialogId);
		return;
	}

	const storage = getStorageForScope(scope);
	if (!storage) {
		return;
	}

	try {
		storage.setItem(getStorageKey(dialogId), '1');
	} catch (error) {
		// Storage may be unavailable in private browsing modes.
	}
}
