/**
 * Shortcut hint tooltip, shared by every trigger of a dialog that has a keyboard shortcut.
 *
 * Meets WCAG 1.4.13 (Content on Hover or Focus):
 * - Dismissable: Escape hides it without moving pointer or focus.
 * - Hoverable: the pointer can move from the trigger onto the tooltip.
 * - Persistent: it stays until the pointer and focus leave, or it is dismissed.
 *
 * The tooltip lives in the browser top layer (`popover="manual"`), so trigger
 * ancestors cannot clip it or stack above it.
 */

const TOOLTIP_CLASS = 'prc-dialog-shortcut-tooltip';
const HOVER_SHOW_DELAY_MS = 400;
const HOVER_LEAVE_GRACE_MS = 150;
const GAP_PX = 8;
const VIEWPORT_MARGIN_PX = 8;

let tooltipCount = 0;

const tip = {
	element: null,
	trigger: null,
	hovering: false,
	focused: false,
	dismissed: false,
	visible: false,
	showTimer: null,
	leaveTimer: null,
	ignoreFocus: false,
	awaitingPointerMove: false,
};

function getTooltipElement() {
	if (tip.element) {
		return tip.element;
	}
	tooltipCount += 1;
	const element = document.createElement('div');
	element.id = `prc-dialog-shortcut-tooltip-${tooltipCount}`;
	element.className = TOOLTIP_CLASS;
	element.setAttribute('role', 'tooltip');
	element.setAttribute('popover', 'manual');
	element.addEventListener('pointerenter', () => {
		clearTimeout(tip.leaveTimer);
		tip.hovering = true;
	});
	element.addEventListener('pointerleave', () => {
		scheduleHoverEnd();
	});
	document.body.appendChild(element);
	tip.element = element;
	return element;
}

function onDocumentKeydown(event) {
	if (event.key === 'Escape' && tip.visible) {
		tip.dismissed = true;
		hide();
	}
}

function place(trigger, element) {
	const triggerRect = trigger.getBoundingClientRect();
	const { width, height } = element.getBoundingClientRect();
	const viewportWidth = document.documentElement.clientWidth;
	const viewportHeight = document.documentElement.clientHeight;

	const fitsBelow =
		triggerRect.bottom + GAP_PX + height <=
		viewportHeight - VIEWPORT_MARGIN_PX;
	const placement = fitsBelow ? 'bottom' : 'top';
	const top = fitsBelow
		? triggerRect.bottom + GAP_PX
		: triggerRect.top - GAP_PX - height;

	const centered = triggerRect.left + triggerRect.width / 2 - width / 2;
	const left = Math.max(
		VIEWPORT_MARGIN_PX,
		Math.min(centered, viewportWidth - width - VIEWPORT_MARGIN_PX)
	);

	element.dataset.placement = placement;
	element.style.top = `${Math.max(VIEWPORT_MARGIN_PX, top)}px`;
	element.style.left = `${left}px`;
}

function show() {
	const { trigger } = tip;
	const label = trigger?.getAttribute('data-shortcut-hint');
	if (!trigger || !label || tip.dismissed || tip.visible) {
		return;
	}
	const element = getTooltipElement();
	element.textContent = label;
	element.showPopover();
	place(trigger, element);
	trigger.setAttribute('aria-describedby', element.id);
	document.addEventListener('keydown', onDocumentKeydown);
	tip.visible = true;
}

function hide() {
	clearTimeout(tip.showTimer);
	clearTimeout(tip.leaveTimer);
	if (!tip.visible) {
		return;
	}
	tip.element.hidePopover();
	tip.trigger?.removeAttribute('aria-describedby');
	document.removeEventListener('keydown', onDocumentKeydown);
	tip.visible = false;
}

function settle() {
	if (!tip.hovering && !tip.focused) {
		tip.dismissed = false;
		hide();
	}
}

function scheduleHoverEnd() {
	clearTimeout(tip.leaveTimer);
	tip.leaveTimer = setTimeout(() => {
		tip.hovering = false;
		settle();
	}, HOVER_LEAVE_GRACE_MS);
}

function adopt(trigger) {
	if (tip.trigger && tip.trigger !== trigger) {
		hide();
		tip.hovering = false;
		tip.focused = false;
		tip.dismissed = false;
	}
	tip.trigger = trigger;
}

/**
 * Only mouse hover shows the tooltip. Touch users never see it.
 *
 * @param {HTMLElement} trigger     Trigger element carrying `data-shortcut-hint`.
 * @param {string}      pointerType Pointer event `pointerType`.
 */
export function handleTriggerPointerEnter(trigger, pointerType) {
	if (pointerType !== 'mouse' || tip.awaitingPointerMove) {
		return;
	}
	adopt(trigger);
	clearTimeout(tip.leaveTimer);
	tip.hovering = true;
	if (tip.visible) {
		return;
	}
	clearTimeout(tip.showTimer);
	tip.showTimer = setTimeout(show, HOVER_SHOW_DELAY_MS);
}

/**
 * @param {HTMLElement} trigger     Trigger element.
 * @param {string}      pointerType Pointer event `pointerType`.
 */
export function handleTriggerPointerLeave(trigger, pointerType) {
	if (pointerType !== 'mouse' || tip.trigger !== trigger) {
		return;
	}
	clearTimeout(tip.showTimer);
	scheduleHoverEnd();
}

/**
 * Keyboard focus shows the tooltip at once. Pointer-initiated focus does not.
 *
 * @param {HTMLElement} trigger Trigger element.
 */
export function handleTriggerFocus(trigger) {
	if (tip.ignoreFocus || !trigger.matches(':focus-visible')) {
		return;
	}
	adopt(trigger);
	tip.focused = true;
	show();
}

/**
 * @param {HTMLElement} trigger Trigger element.
 */
export function handleTriggerBlur(trigger) {
	if (tip.trigger !== trigger) {
		return;
	}
	tip.focused = false;
	settle();
}

/**
 * Resets all tooltip state. Called when a dialog opens.
 */
export function hideShortcutTooltip() {
	tip.hovering = false;
	tip.focused = false;
	tip.dismissed = false;
	hide();
}

function onPointerMoveAfterClose() {
	tip.awaitingPointerMove = false;
}

/**
 * Closes a dialog without the side effects showing the tooltip.
 *
 * Closing restores focus to the trigger, and that focus matches
 * `:focus-visible` after the reader typed in the dialog (always in Safari).
 * Browsers fire that focus event synchronously inside `close()`.
 *
 * A modal leaving the top layer also fires `pointerenter` on a trigger that
 * sits under a still pointer, with no `pointermove`. Hover waits for the
 * pointer to move.
 *
 * @param {Function} close Calls `HTMLDialogElement.close()`.
 */
export function closeWithoutTooltip(close) {
	tip.ignoreFocus = true;
	try {
		close();
	} finally {
		tip.ignoreFocus = false;
	}
	tip.awaitingPointerMove = true;
	document.addEventListener('pointermove', onPointerMoveAfterClose, {
		once: true,
	});
}
