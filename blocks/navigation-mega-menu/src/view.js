/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	useState,
	useEffect,
} from '@wordpress/interactivity';

import { setValues } from './use-ref-resizer';

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
			const { ref } = getElement();
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

			const { width, left, top } = setValues(
				ref,
				ref.closest('.wp-block-navigation')
			);

			context.width = width;
			context.left = left;
			context.top = top;
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
		onResize() {
			actions.setMenuPositions();
		},
		getToggleClassname() {
			const defaults = [
				'wp-block-navigation-item__content',
				'wp-block-prc-block-navigation-mega-menu__toggle',
			];
			const context = getContext();
			const { activeClassnames } = context;
			// convert the array of activeClassnames to a string
			if (state.isActive) {
				const newClassnames =
					defaults.join(' ') + activeClassnames.join(' ');
				return newClassnames;
			}
			return defaults.join(' ');
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
		}
	},
});
