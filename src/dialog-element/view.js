/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	withScope,
	withSyncEvent,
} from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import { isDialogDismissed, persistDialogDismissal } from './dismissal-storage';

/** Whether the reader has scrolled the document at least once this page load. */
let hasUserScrolled = false;

/** Wait for scrolling to settle before evaluating scroll-depth triggers (ms). */
const SCROLL_SETTLE_MS = 250;

/** Debounce timer for scroll-depth evaluation across all dialogs on the page. */
let scrollSettleTimer = null;

function addDialogIdToUrl(id) {
	const url = new URL(window.location.href);
	url.searchParams.set('dialogId', id);
	window.history.replaceState({}, '', url);
}

function removeDialogIdFromUrl() {
	const url = new URL(window.location.href);
	url.searchParams.delete('dialogId');
	window.history.replaceState({}, '', url);
}

/**
 * @return {number} Scroll position as a percentage of document height.
 */
function getDocumentScrollPercent() {
	const scrollTop =
		window.scrollY ||
		document.documentElement.scrollTop ||
		document.body.scrollTop ||
		0;
	const scrollHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	if (scrollHeight <= 0) {
		return 0;
	}

	return (scrollTop / scrollHeight) * 100;
}

/**
 * @param {string} dialogId Dialog element id.
 * @return {boolean} Whether scroll-depth auto-activation may run for this dialog.
 */
function isDialogArmable(dialogId) {
	const element = document.getElementById(dialogId);
	if (!element) {
		return false;
	}

	// Inside a hidden subtree (e.g. quiz results before display, group-quiz dialogs).
	return element.closest('[hidden]') === null;
}

/**
 * @param {Object} dialog Dialog state from the interactivity store.
 * @return {boolean} Whether auto-activation should be skipped for this dialog.
 */
function shouldSuppressAutoActivation(dialog) {
	if (!dialog?.id) {
		return false;
	}

	return isDialogDismissed(
		dialog.id,
		dialog.dismissalPersistenceScope || 'pageload'
	);
}

/**
 * @param {Object} dialog Dialog state from the interactivity store.
 */
function recordDismissalForDialog(dialog) {
	if (!dialog?.id) {
		return;
	}

	persistDialogDismissal(
		dialog.id,
		dialog.dismissalPersistenceScope || 'pageload'
	);
}

/**
 * @param {Object} dialogs Dialog state map from the interactivity store.
 * @return {boolean} Whether any dialog is currently open.
 */
function hasAnyOpenDialog(dialogs) {
	const dialogIds = Object.keys(dialogs);
	for (let i = 0; i < dialogIds.length; i++) {
		const dialog = dialogs[dialogIds[i]];
		if (dialog.isOpen || dialog.isClosing) {
			return true;
		}
	}
	return false;
}

/**
 * Opens a scroll-triggered dialog when the reader is already past its threshold.
 * Used after another dialog closes so scroll-only activation is not missed.
 *
 * @param {Object} storeActions Dialog store actions.
 */
function evaluateScrollTriggeredDialogs(storeActions) {
	const { dialogs } = state;

	if (!hasUserScrolled) {
		return;
	}

	if (hasAnyOpenDialog(dialogs)) {
		return;
	}

	const dialogIds = Object.keys(dialogs);
	for (let i = 0; i < dialogIds.length; i++) {
		const dialogId = dialogIds[i];
		const dialog = dialogs[dialogId];
		const threshold = dialog.scrollDepthPercentage;

		if (typeof threshold !== 'number' || threshold < 0) {
			continue;
		}

		if (dialog.hasTriggeredScrollOpen) {
			continue;
		}

		if (shouldSuppressAutoActivation(dialog)) {
			state.dialogs[dialogId].hasTriggeredScrollOpen = true;
			continue;
		}

		if (!isDialogArmable(dialogId)) {
			continue;
		}

		if (getDocumentScrollPercent() < threshold) {
			continue;
		}

		state.dialogs[dialogId].hasTriggeredScrollOpen = true;
		storeActions.closeAll();
		storeActions.open(dialogId);
		return;
	}
}

/**
 * Schedules scroll-depth evaluation after scrolling settles.
 * Avoids firing during programmatic smooth scroll (e.g. quiz results scroll-to-top).
 *
 * @param {Object} storeActions Dialog store actions.
 */
function scheduleScrollTriggeredDialogEvaluation(storeActions) {
	clearTimeout(scrollSettleTimer);
	scrollSettleTimer = setTimeout(
		withScope(() => {
			evaluateScrollTriggeredDialogs(storeActions);
		}),
		SCROLL_SETTLE_MS
	);
}

const { actions, state } = store('prc-block/dialog', {
	state: {
		get id() {
			const context = getContext();
			return context?.id;
		},
		get dialog() {
			return state.dialogs[state.id];
		},
		get dialogElement() {
			const context = getContext();
			if (!context?.id) {
				return null;
			}
			const { id } = context;
			return document.getElementById(id);
		},
	},
	actions: {
		/**
		 * Helper function to close all open dialogs.
		 */
		closeAll: () => {
			const { dialogs } = state;
			const ids = Object.keys(dialogs);
			ids.forEach((id) => {
				if (
					typeof dialogs[id] !== 'object' ||
					!Object.prototype.hasOwnProperty.call(dialogs[id], 'isOpen')
				) {
					return;
				}
				state.dialogs[id].isOpen = false;
			});
		},
		/**
		 * This function is used by dialog-trigger to open the dialog when clicked.
		 * Click triggers bypass dismissal persistence.
		 *
		 * @param event
		 */
		onClickOpen: withSyncEvent((event) => {
			event.preventDefault();
			const { id } = state;
			actions.open(id);
		}),
		/**
		 * This function is used by the close button in the dialog element, when clicked it closes the dialog.
		 *
		 * @param event
		 */
		onClickClose: withSyncEvent((event) => {
			event.preventDefault();
			const { id, dialog } = state;
			recordDismissalForDialog(dialog);
			actions.close(id);
		}),
		/**
		 * Records dismissal for the given dialog id so auto-activation is suppressed.
		 * Intended for external integrations (e.g. Mailchimp form submit success).
		 *
		 * @param {string} passthroughId
		 */
		recordDismissal: (passthroughId = false) => {
			let id = passthroughId;
			if (!id) {
				id = state.id;
			}
			if (!id || !state.dialogs[id]) {
				return;
			}
			recordDismissalForDialog(state.dialogs[id]);
		},
		/**
		 * This function allows you to directly open a dialog by passing an id from another store, like so:
		 * store('prc-block/dialog').actions.open('xyz123');
		 *
		 * @param {*} passthroughId
		 */
		open: (passthroughId = false) => {
			let id = passthroughId;
			if (!id) {
				id = state.id;
			}
			if (!id) {
				return;
			}
			state.dialogs[id].isOpen = true;
			state.dialogs[id].closingModal = false;
		},
		/**
		 * This function allows you to directly close a dialog by passing an id from another store, like so:
		 * store('prc-block/dialog').actions.close('xyz123');
		 *
		 * @param {*} passthroughId
		 */
		close: (passthroughId = false) => {
			let id = passthroughId;
			if (!id) {
				id = state.id;
			}
			if (!id) {
				return;
			}
			state.dialogs[id].isOpen = false;
		},
	},
	callbacks: {
		/**
		 * Handles the escape key event to close the dialog if it's open.
		 *
		 * @param event The keyboard event.
		 */
		onESCKey: withSyncEvent((event) => {
			const { id, dialog } = state;
			if (id && event.key === 'Escape') {
				if (true === dialog.isOpen) {
					event.preventDefault();
					recordDismissalForDialog(dialog);
					actions.close(id);
				}
			}
		}),
		/**
		 * Handles the dialog open event, this is triggered by the user clicking the open button or via an auto activation timer.
		 */
		onOpen: () => {
			const { dialogElement, dialog, id } = state;
			if (!id || !dialogElement) {
				return;
			}
			if (!dialog.isOpen) {
				return;
			}
			if (dialog.enableDeepLink) {
				addDialogIdToUrl(id);
			}
			dialogElement?.showModal();
		},
		/**
		 * Handles the dialog close event, this is triggered by the user clicking the close button, pressing the escape key or clicking outside the dialog when it's a non-modal dialog.
		 */
		onClose: () => {
			const { dialogElement, dialog, id } = state;
			if (!id || !dialogElement) {
				return;
			}
			if (dialog.isOpen) {
				return;
			}
			if (dialog.isClosing) {
				return;
			}
			if (!dialogElement.open) {
				return;
			}
			state.dialogs[id].isClosing = true;
			setTimeout(
				withScope(() => {
					dialogElement?.close();
					removeDialogIdFromUrl(id);
					state.dialogs[id].isClosing = false;
					state.dialogs[id].isOpen = false;
					evaluateScrollTriggeredDialogs(actions);
				}),
				dialog.animationDuration
			);
		},
		/**
		 * Closes the dialog if the backdrop is clicked.
		 *
		 * @param event
		 */
		onBackdropClick: withSyncEvent((event) => {
			const { ref } = getElement();
			const boundingRects = ref.getBoundingClientRect();
			if (
				event.clientX >= boundingRects.left &&
				event.clientX <= boundingRects.right &&
				event.clientY >= boundingRects.top &&
				event.clientY <= boundingRects.bottom
			) {
				return;
			}
			const { dialog, id } = state;
			if (true !== dialog.isOpen || dialog.isClosing) {
				return;
			}
			recordDismissalForDialog(dialog);
			actions.close(id);
		}),
		/**
		 * Opens the dialog when the reader scrolls past the configured depth threshold.
		 * Evaluation is debounced so programmatic smooth scroll does not open the dialog
		 * at an intermediate (stale) scroll position.
		 */
		onScroll: () => {
			hasUserScrolled = true;

			const { id, dialog } = state;
			if (!id || !dialog) {
				return;
			}

			const threshold = dialog.scrollDepthPercentage;
			if (typeof threshold !== 'number' || threshold < 0) {
				return;
			}

			if (dialog.hasTriggeredScrollOpen) {
				return;
			}

			scheduleScrollTriggeredDialogEvaluation(actions);
		},
		/**
		 * Initializes the Dialog element.
		 * Activates the current dialog element if there is an auto activation timer set.
		 */
		onInit: () => {
			const { id, dialog, dialogs } = state;
			if (
				!id &&
				!dialog.activationTimerDuration &&
				-1 !== dialog.activationTimerDuration
			) {
				return;
			}

			if (hasAnyOpenDialog(dialogs)) {
				return;
			}

			if (shouldSuppressAutoActivation(dialog)) {
				return;
			}

			if (1 <= dialog.activationTimerDuration) {
				setTimeout(
					withScope(() => {
						const currentDialog = state.dialogs[id];
						if (
							shouldSuppressAutoActivation(currentDialog) ||
							currentDialog?.hasTriggeredScrollOpen ||
							currentDialog?.isOpen ||
							currentDialog?.isClosing
						) {
							return;
						}
						actions.closeAll();
						actions.open(id);
					}),
					dialog.activationTimerDuration
				);
			}
		},
	},
});
