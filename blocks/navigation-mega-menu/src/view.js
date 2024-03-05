/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

// Function to convert a complex CSS value to pixels
function convertCssValueToPixels(cssValue) {
	// Create a temporary element
	const tempElement = document.createElement('div');

	// Apply the CSS value to the temporary element
	// For example, setting its width to the complex CSS value
	tempElement.style.width = cssValue;

	// Append the temporary element to the body to make it part of the document
	document.body.appendChild(tempElement);

	// Use getComputedStyle to get the computed width in pixels
	const computedWidth = window.getComputedStyle(tempElement).width;

	// Remove the temporary element from the document
	document.body.removeChild(tempElement);

	// Return the computed width as a number
	return parseFloat(computedWidth);
}

const { state, actions } = store('prc-block/navigation-mega-menu', {
	state: {
		get isMenuOpen() {
			// The menu is opened if either `click` or `focus` is true.
			return Object.values(state.menuOpenedBy).filter(Boolean).length > 0;
		},
		get menuOpenedBy() {
			const context = getContext();
			return context.menuOpenedBy;
		},
		get width() {
			const context = getContext();
			return context.width;
		},
		get left() {
			const context = getContext();
			return context.left;
		},
	},
	actions: {
		toggleMenuOnClick() {
			const context = getContext();
			const { ref } = getElement();
			// Safari won't send focus to the clicked element, so we need to manually place it: https://bugs.webkit.org/show_bug.cgi?id=22261
			if (window.document.activeElement !== ref) ref.focus();

			if (state.menuOpenedBy.click || state.menuOpenedBy.focus) {
				actions.closeMenu('click');
				actions.closeMenu('focus');
			} else {
				context.previousFocus = ref;
				actions.openMenu('click');
			}
		},
		closeMenuOnClick() {
			actions.closeMenu('click');
			actions.closeMenu('focus');
		},
		handleMenuKeydown(event) {
			if (state.menuOpenedBy.click) {
				// If Escape close the menu.
				if (event?.key === 'Escape') {
					actions.closeMenu('click');
					actions.closeMenu('focus');
				}
			}
		},
		handleMenuFocusout(event) {
			const context = getContext();
			const menuContainer = context.megaMenu?.querySelector(
				'.wp-block-prc-block-navigation-mega-menu__container'
			);
			// If focus is outside menu, and in the document, close menu
			// event.target === The element losing focus
			// event.relatedTarget === The element receiving focus (if any)
			// When focusout is outside the document,
			// `window.document.activeElement` doesn't change.

			// The event.relatedTarget is null when something outside the navigation menu is clicked. This is only necessary for Safari.
			// TODO: There is still an issue in Safari where clicking on the menu link closes the menu. We don't want this. The toggleMenuOnClick callback should handle this.
			if (
				event.relatedTarget === null ||
				(!menuContainer?.contains(event.relatedTarget) &&
					event.target !== window.document.activeElement)
			) {
				actions.closeMenu('click');
				actions.closeMenu('focus');
			}
		},
		openMenu(menuOpenedOn = 'click') {
			state.menuOpenedBy[menuOpenedOn] = true;
		},
		closeMenu(menuClosedOn = 'click') {
			const context = getContext();
			state.menuOpenedBy[menuClosedOn] = false;

			// Reset the menu reference and button focus when closed.
			if (!state.isMenuOpen) {
				if (context.megaMenu?.contains(window.document.activeElement)) {
					context.previousFocus?.focus();
				}
				context.previousFocus = null;
				context.megaMenu = null;
			}
		},
		setMenuPositions() {
			const { ref } = getElement();

			const context = getContext();
			const menu = ref;

			const navBlock = menu.closest('.wp-block-navigation');
			if (!navBlock) return;

			// Determine the justification of the navigation block.
			let justification = 'left';

			if (
				navBlock.classList.contains('items-justified-center') ||
				navBlock.classList.contains(
					'items-justified-space-between'
				)
			) {
				justification = 'center';
			} else if (
				navBlock.classList.contains('items-justified-right')
			) {
				justification = 'right';
			}

			// TODO: Refactor
			if (menu.classList.contains('menu-justified-center')) {
				justification = 'center';
			} else if (
				menu.classList.contains('menu-justified-right')
			) {
				justification = 'right';
			} else if (menu.classList.contains('menu-justified-left')) {
				justification = 'right';
			}

			const bodyStyles = window.getComputedStyle(document.body);
			const rootPaddingLeft = bodyStyles
				.getPropertyValue('--wp--style--root--padding-left')
				.trim();
			const rootPaddingRight = bodyStyles
				.getPropertyValue('--wp--style--root--padding-left')
				.trim();
			// Convert the CSS variable value to pixels.
			const rootPaddingLeftValue =
				convertCssValueToPixels(rootPaddingLeft);
			const rootPaddingRightValue =
				convertCssValueToPixels(rootPaddingRight);

			console.log(justification);
			// Get the window space and the native width of the mega menu.
			const windowSpace =
				window.innerWidth -
				rootPaddingRightValue -
				rootPaddingLeftValue;
			const menuWidth = menu.offsetWidth;

			// Get the bounding rectangle of the navigation block containing the menu.
			const menuRect = menu.getBoundingClientRect();
			const navBlockRect = navBlock.getBoundingClientRect();

			// Assumes that the navigation block is always offset by the root padding.
			const leftOffset =
				navBlockRect.left <= rootPaddingLeftValue
					? rootPaddingLeftValue - navBlockRect.left
					: navBlockRect.left - rootPaddingLeftValue;
			const leftSpace = (windowSpace - menuWidth) / 2;

			if (justification === 'center') {
				if (menuWidth > windowSpace) {
					menu.style.width = `${windowSpace}px`;
					menu.style.left = `-${leftOffset}px`;
				} else if (
					menuRect.left > 0 &&
					leftSpace >= menuRect.left
				) {
					// Do nothing, the menu is positioned with CSS and it looks fine.
					context.left = '';
				} else if (leftOffset >= leftSpace) {
					// Reset width.
					context.width = '';
					context.left = `-${leftOffset - leftSpace}px`;
				} else {
					context.width = '';
					context.left = `${leftSpace - leftOffset}px`;
				}
			} else if (
				justification === 'left' ||
				justification === 'right'
			) {
				// The left value doesn't need to change for left and right justifications.
				if (menuWidth > windowSpace) {
					context.width = `${windowSpace}px`;
					context.left = `${leftOffset}px`;
				} else {
					context.width = '';

					// Make sure the menu does not extend off the left-side of the screen.
					if (menuRect.left <= 0) {
						// TODO: This is not correct when justified right in some scenarios.
						context.left = `${leftOffset}px`;
					} else {
						context.left = '';
					}
				}
			}
		},
	},
	callbacks: {
		initMenu() {
			const context = getContext();
			const { ref } = getElement();

			// Set the menu reference when initialized.
			if (state.isMenuOpen) {
				context.megaMenu = ref;
			}
			// set the
		},
		onResize() {
			actions.setMenuPositions();
		},
	},
});

// Adjust mega menu positions on window resize.
// window.addEventListener('resize', adjustMegaMenus);

// // // Initial adjustment on page load.
// if (document.readyState === 'complete') {
// 	adjustMegaMenus();
// } else {
// 	window.addEventListener('load', adjustMegaMenus);
// }
