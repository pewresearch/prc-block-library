/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
} from '@wordpress/interactivity';

/**
 * Writes the distance from the viewport top to the bottom of the
 * wrapper's containing `core/navigation` block so the top-layer `<dialog>`
 * can sit flush under the nav bar (`position: fixed; top: …`).
 *
 * The variable is set on the dialog element (not `document.documentElement`)
 * so multiple mega menus in different navigation blocks do not overwrite a
 * single shared root custom property when their ResizeObservers fire.
 *
 * @param {HTMLElement|null} wrapperEl Mega-menu wrapper (IxN `ref`).
 */
function setMegaMenuAnchorTop(wrapperEl) {
	if (!wrapperEl) {
		return;
	}
	const nav = wrapperEl.closest('.wp-block-navigation');
	const dialogEl = wrapperEl.querySelector(
		'.wp-block-prc-block-navigation-mega-menu__dialog'
	);
	if (!nav || !dialogEl) {
		return;
	}
	const bottom = Math.round(nav.getBoundingClientRect().bottom);
	dialogEl.style.setProperty('--prc-mega-menu-anchor-top', `${bottom}px`);
}

/**
 * Mega menu interactivity store.
 *
 * The overlay is a native `<dialog>` rendered into the browser's top layer.
 * This store tracks per-instance open state under `state[id].isActive` and
 * uses a `data-wp-watch` callback (`syncDialogState`) on the wrapper to call
 * `dialogEl.showModal()` / `dialogEl.close()` whenever that flag flips. All
 * Escape, focus-trap, stacking and `::backdrop` outside-click semantics are
 * delegated to the dialog element itself.
 */
const { state, actions } = store('prc-block/navigation-mega-menu', {
	state: {
		get isActive() {
			const { id } = getContext();
			return state[id]?.isActive || false;
		},
	},
	actions: {
		/**
		 * Closes every open mega menu in the page. Used to enforce the
		 * single-open invariant when the user toggles a different menu.
		 */
		closeAll() {
			Object.keys(state).forEach((key) => {
				if (
					typeof state[key] === 'object' &&
					state[key] !== null &&
					'isActive' in state[key]
				) {
					state[key].isActive = false;
				}
			});
		},
		toggleMenuOnClick: withSyncEvent((event) => {
			event.preventDefault();
			const { id } = getContext();
			const wasActive = state[id].isActive;
			actions.closeAll();
			state[id].isActive = !wasActive;
		}),
		closeMenuOnClick: withSyncEvent((event) => {
			event.preventDefault();
			const { id } = getContext();
			state[id].isActive = false;
		}),
		openMenu() {
			const { id } = getContext();
			actions.closeAll();
			state[id].isActive = true;
		},
		closeMenu() {
			const { id } = getContext();
			state[id].isActive = false;
		},
	},
	callbacks: {
		onInit() {
			const { ref } = getElement();
			const dialogEl = ref.querySelector(
				'.wp-block-prc-block-navigation-mega-menu__dialog'
			);
			if (!dialogEl) {
				return;
			}
			const nav = ref.closest('.wp-block-navigation');
			if (nav) {
				const ro = new window.ResizeObserver(() =>
					setMegaMenuAnchorTop(ref)
				);
				ro.observe(nav);
				setMegaMenuAnchorTop(ref);
			}
			// Cache the active-state classnames declared on the inner group
			// so we can mirror them onto the toggle when the menu is open.
			const innerGroup = dialogEl.querySelector(
				'.wp-block-group.has-background'
			);
			if (innerGroup) {
				const context = getContext();
				const activeClassnames = innerGroup.className.match(
					/(has-.*-background-color|has-background|has-text-color|has-.*-color)/g
				);
				context.activeClassnames = activeClassnames;
			}
		},
		/**
		 * Driven by `data-wp-watch` on the wrapper. Whenever the per-instance
		 * `isActive` flag changes, push the new state into the DOM by calling
		 * the matching imperative dialog API. Reading state inside the watch
		 * callback is what registers the dependency.
		 */
		syncDialogState() {
			const { id, dialogId } = getContext();
			const wantOpen = state[id]?.isActive ?? false;
			const dialogEl = document.getElementById(dialogId);
			if (!dialogEl) {
				return;
			}
			if (wantOpen && !dialogEl.open) {
				const { ref } = getElement();
				setMegaMenuAnchorTop(ref);
				dialogEl.showModal();
			} else if (!wantOpen && dialogEl.open) {
				dialogEl.close();
			}
		},
		/**
		 * Native `close` event fires for ESC, the close button, and explicit
		 * `dialog.close()` calls. Sync state back so IxN remains the source
		 * of truth (covers the ESC path that bypasses our actions entirely).
		 */
		onDialogClose() {
			const { id } = getContext();
			if (state[id]?.isActive) {
				state[id].isActive = false;
			}
		},
		/**
		 * On a modal `<dialog>`, clicks on the backdrop arrive at the dialog
		 * element itself (event.target === the dialog). Inner content clicks
		 * bubble from descendants.
		 */
		onBackdropClick: withSyncEvent((event) => {
			const { ref } = getElement();
			if (event.target !== ref) {
				return;
			}
			const { id } = getContext();
			state[id].isActive = false;
		}),
	},
});

if (typeof window !== 'undefined') {
	let resizeScheduled = false;
	window.addEventListener('resize', () => {
		if (resizeScheduled) {
			return;
		}
		resizeScheduled = true;
		window.requestAnimationFrame(() => {
			resizeScheduled = false;
			document
				.querySelectorAll(
					'.wp-block-prc-block-navigation-mega-menu.is-active'
				)
				.forEach((el) => {
					setMegaMenuAnchorTop(el);
				});
		});
	});
}
