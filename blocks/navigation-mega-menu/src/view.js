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
		get isActive() {
			const context = getContext();
			const { id } = context;
			return state[id]?.isActive;
		},
		get width() {
			const context = getContext();
			return context.width;
		},
		get left() {
			const context = getContext();
			return context.left;
		},
		get top() {
			const context = getContext();
			return context.top;
		},
	},
	actions: {
		closeAll: () => {
			Object.keys(state).forEach((key) => {
				state[key].isActive = false;
			});
		},
		toggleMenuOnClick() {
			actions.toggleMenu();
		},
		closeMenuOnClick() {
			actions.closeMenu('click');
			actions.closeMenu('focus');
		},
		toggleMenu() {
			const context = getContext();
			const { id } = context;
			state[id].isActive = !state[id].isActive;
		},
		openMenu() {
			const context = getContext();
			const { id } = context;
			state[id].isActive = true;
		},
		closeMenu() {
			const context = getContext();
			const { id } = context;
			state[id].isActive = false;
		},
		setMenuPositions() {
			const { ref } = getElement();
			const menu = ref.querySelector(
				'.wp-block-prc-block-navigation-mega-menu__container'
			);
			if (!menu) {
				return;
			}

			const navBlock = menu.closest('.wp-block-navigation');
			if (!navBlock) {
				return;
			}

			const context = getContext();

			// Determine the height of the navigation block and set the mega menu top position.
			const height = navBlock.offsetHeight;
			context.top = height - 1;

			// Everything below is heavily cribbed from Nick Diego for the js math window math.
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

			if (menuWidth > windowSpace) {
				console.log('a');
				context.width = `${window.innerWidth}px`;
				context.left = `-${navBlockRect.left}px`;
			} else if (menuRect.left > 0 && leftSpace >= menuRect.left) {
				console.log('b');
				// Do nothing, the menu is positioned with CSS and it looks fine.
				context.left = '';
			} else if (leftOffset >= leftSpace) {
				console.log('c');
				// Reset width.
				context.width = '';
				context.left = `-${leftOffset - leftSpace}px`;
			} else {
				console.log('d');
				context.width = '';
				context.left = `${leftSpace - leftOffset}px`;
			}
		},
	},
	callbacks: {
		onInit() {
			const context = getContext();
			const { ref } = getElement();
			const menu = ref.querySelector(
				'.wp-block-prc-block-navigation-mega-menu__container'
			);
			context.menuRef = menu;
			console.log('onInit', ref, menu);

			actions.setMenuPositions();

			const innerGroup = menu.querySelector(
				'.wp-block-group.has-background'
			);
			if (innerGroup) {
				const activeClassnames = innerGroup.className.match(
					/(has-.*-background-color|has-background|has-text-color|has-.*-color)/g
				);
				context.activeClassnames = activeClassnames;
			}
		},
		getToggleClassname() {
			const defaults = [
				'wp-block-navigation-item__content',
				'wp-block-prc-block-navigation-mega-menu__toggle',
			];
			const context = getContext();
			const { activeClassnames } = context;
			// convert the array of activeClassnames to a string
			console.log('getToggleClassname', defaults, activeClassnames);
			if (state.isActive) {
				const newClassnames =
					defaults.join(' ') + activeClassnames.join(' ');
				return newClassnames;
			}
			return defaults.join(' ');
		},
		onResize() {
			actions.setMenuPositions();
		},
		onWindowClickCloseMegaMenu: (event) => {
			const context = getContext();
			const { id } = context;
			if (!id) {
				return;
			}
			if (!state[id]?.isActive) {
				return;
			}
			const elm = getElement();
			const { ref } = elm;
			console.log('onWindowClickCloseMegaMenu', elm, event.target);

			// check elm for any of the event.target
			// if present then return early
			if (
				ref.contains(event.target) &&
				!event.target.classList.contains(
					'wp-block-prc-block-popup-modal__outer'
				)
			) {
				return;
			}

			const megaMenuContainer = ref.querySelector(
				'.wp-block-prc-block-navigation-mega-menu__container'
			);
			if (
				!megaMenuContainer.innerHTML.includes(event.target.innerHTML) &&
				true === state[id].isActive
			) {
				state[id].isActive = false;
			}
		},
		onESCKey: (event) => {
			const context = getContext();
			const { id } = context;
			if (!id) {
				return;
			}
			if (event.key === 'Escape') {
				if (true === state[id].isActive) {
					event.preventDefault();
					state[id].isActive = false;
				}
			}
		},
	},
});
